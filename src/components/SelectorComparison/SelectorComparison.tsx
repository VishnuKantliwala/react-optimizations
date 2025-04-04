import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../store/counterSlice";
import {
  selectMultipliedValue,
  selectFormattedValue,
} from "../../store/selectors";
import type { AppDispatch, RootState } from "../../store/store";
import "./SelectorComparison.scss";

// Define the FormattedValue interface to match the selector
interface FormattedValue {
  value: number;
  lastUpdated: string;
  isPositive: boolean;
}

const ReselectDemo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [renderCount, setRenderCount] = useState(0);
  const [selectorCalls, setSelectorCalls] = useState(0);
  const [executionTime, setExecutionTime] = useState(0);
  const [forceRender, setForceRender] = useState(0);
  const [lastCalculationTime, setLastCalculationTime] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [executionTimes, setExecutionTimes] = useState<number[]>([]);
  const [averageExecutionTime, setAverageExecutionTime] = useState(0);
  const [counterValue, setCounterValue] = useState(0);

  // Track selector calls
  const selectorRef = useRef(0);

  // Using Reselect selector (will only recalculate when inputs change)
  const multipliedValue = useSelector<RootState, number>(selectMultipliedValue);

  // Using complex Reselect selector
  const formattedValue = useSelector<RootState, FormattedValue>(
    selectFormattedValue
  );

  // Simulate work for performance measurement
  const simulateWork = () => {
    setIsCalculating(true);

    // Use a random value to simulate different calculation times
    const randomValue = Math.floor(Math.random() * 1000);
    const start = performance.now();

    // Simulate a complex calculation that takes time
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sin(i) * Math.cos(i) * Math.tan(i);
      result += Math.sqrt(Math.abs(Math.log(Math.abs(randomValue) + 1)));
      result += Math.pow(Math.E, Math.sin(i) * 0.01);
    }

    // Add some delay to make it more noticeable
    const delayStart = performance.now();
    while (performance.now() - delayStart < 100) {
      // Busy wait to simulate processing
    }

    const end = performance.now();
    setIsCalculating(false);
    return end - start;
  };

  // Handle selector recalculation
  const handleSelectorRecalculation = () => {
    selectorRef.current += 1;
    setSelectorCalls(selectorRef.current);

    // Measure the actual execution time
    const time = simulateWork();
    setExecutionTime(time);
    setLastCalculationTime(new Date().toLocaleTimeString());

    // Update execution times
    setExecutionTimes((prev) => [...prev, time]);
    setAverageExecutionTime(
      [...executionTimes, time].reduce((a, b) => a + b, 0) /
        (executionTimes.length + 1)
    );
  };

  // Force a re-render without changing state
  const handleForceRender = () => {
    setForceRender((prev) => prev + 1);
    setRenderCount((prev) => prev + 1);
  };

  const handleIncrement = () => {
    setCounterValue((prev) => prev + 1);
    setExecutionTime(0);
    dispatch(increment());
    setRenderCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCounterValue((prev) => prev - 1);
    setExecutionTime(0);
    dispatch(decrement());
    setRenderCount((prev) => prev + 1);
  };

  // Override console.log to track selector calls
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      if (args[0] === "Reselect selector recalculating...") {
        handleSelectorRecalculation();
      }
      originalLog(...args);
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  return (
    <div className="selector-comparison">
      <h2>Reselect Performance Demo</h2>

      <div className="performance-stats">
        <div className="stat-box">
          <h3>Performance Metrics</h3>
          <p>
            <span>Component Renders:</span>
            <span>{renderCount}</span>
          </p>
          <p>
            <span>Selector Calls:</span>
            <span className={selectorCalls > renderCount ? "highlight" : ""}>
              {selectorCalls}
            </span>
          </p>
          <p>
            <span>Current Execution Time:</span>
            <span className={executionTime > 100 ? "highlight" : ""}>
              {executionTime.toFixed(2)}ms
            </span>
          </p>
          <p>
            <span>Average Execution Time:</span>
            <span className={averageExecutionTime > 100 ? "highlight" : ""}>
              {averageExecutionTime.toFixed(2)}ms
            </span>
          </p>
          <p>
            <span>Force Render Count:</span>
            <span>{forceRender}</span>
          </p>
          <p>
            <span>Last Calculation:</span>
            <span>{lastCalculationTime}</span>
          </p>
          <p>
            <span>Status:</span>
            <span className={isCalculating ? "calculating" : ""}>
              {isCalculating ? "Calculating..." : "Idle"}
            </span>
          </p>
        </div>

        <div className="stat-box">
          <h3>Current Values</h3>
          <p>
            <span>Counter Value:</span>
            <span>{counterValue}</span>
          </p>
          <p>
            <span>Multiplied Value:</span>
            <span>{multipliedValue}</span>
          </p>
          <p>
            <span>Formatted Value:</span>
            <span>{formattedValue.value}</span>
          </p>
          <p>
            <span>Last Updated:</span>
            <span>{formattedValue.lastUpdated}</span>
          </p>
          <p>
            <span>Is Positive:</span>
            <span>{formattedValue.isPositive ? "Yes" : "No"}</span>
          </p>
        </div>
      </div>

      <div className="controls">
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleForceRender}>Force Render</button>
      </div>

      <div className="key-points">
        <h3>Reselect Performance Benefits:</h3>
        <ul>
          <li>
            <strong>Memoization:</strong> Reselect caches results and only
            recalculates when inputs change
          </li>
          <li>
            <strong>Reduced Calculations:</strong> Notice how selector calls (
            {selectorCalls}) are less than render count ({renderCount})
          </li>
          <li>
            <strong>Force Render Impact:</strong> Click "Force Render" to see
            that it doesn't trigger unnecessary calculations
          </li>
          <li>
            <strong>Performance Tracking:</strong> Each calculation is timed and
            logged for performance monitoring
          </li>
          <li>
            <strong>Heavy Calculation:</strong> The selector performs a
            computationally intensive task that would be expensive to
            recalculate on every render
          </li>
          <li>
            <strong>Execution Time Variation:</strong> Each calculation uses a
            random value to demonstrate varying execution times
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReselectDemo;
