import React, { useState, useEffect } from "react";
import styles from "./AutoMemoization.module.scss";

// Expensive calculation function that would typically need useMemo
const calculateExpensiveValue = (input: number): number => {
  console.log("Expensive calculation running");
  // Simulate expensive computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sin(i) * Math.cos(i) * input;
  }
  return result;
};

// Complex object creation that would typically need useMemo
const createComplexObject = (value: number) => {
  console.log("Complex object creation running");
  return {
    id: value,
    timestamp: Date.now(),
    data: Array.from({ length: 100 }, (_, i) => ({
      key: `item-${i}-${value}`,
      value: Math.random() * value,
    })),
  };
};

// Event handler that would typically need useCallback
const handleItemClick = (id: number) => {
  console.log(`Item ${id} clicked`);
  return `Processed item ${id}`;
};

const AutoMemoization: React.FC = () => {
  const [count, setCount] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [renderCount, setRenderCount] = useState(0);

  // In React 19, these functions are automatically memoized
  // No need for useMemo or useCallback
  const expensiveValue = calculateExpensiveValue(count);
  const complexObject = createComplexObject(count);
  const clickHandler = handleItemClick;

  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  }, [count]);

  return (
    <div className={styles.container}>
      <h1>React 19 Auto-Memoization Demo</h1>

      <div className={styles.infoPanel}>
        <h2>Performance Metrics</h2>
        <p>
          <span>Component Renders:</span>
          <span>{renderCount}</span>
        </p>
        <p>
          <span>Current Count:</span>
          <span>{count}</span>
        </p>
        <p>
          <span>Expensive Value:</span>
          <span>{expensiveValue.toFixed(2)}</span>
        </p>
        <p>
          <span>Object Items:</span>
          <span>{complexObject.data.length}</span>
        </p>
      </div>

      <div className={styles.controls}>
        <button onClick={() => setCount((c) => c + 1)}>Increment Count</button>
        <button onClick={() => setSelectedId(Math.floor(Math.random() * 100))}>
          Select Random Item
        </button>
      </div>

      <div className={styles.explanation}>
        <h2>How React 19 Helps</h2>
        <ul>
          <li>
            <strong>Automatic Function Memoization:</strong> React 19
            automatically memoizes function definitions, eliminating the need
            for useCallback.
          </li>
          <li>
            <strong>Value Memoization:</strong> Expensive calculations are
            automatically memoized based on their inputs, replacing useMemo.
          </li>
          <li>
            <strong>Object Stability:</strong> Objects created during render are
            automatically stabilized when their inputs don't change.
          </li>
          <li>
            <strong>Performance:</strong> Check the console to see that
            expensive calculations only run when inputs change.
          </li>
        </ul>
      </div>

      <div className={styles.itemsList}>
        <h2>Sample Items</h2>
        <div className={styles.itemsGrid}>
          {complexObject.data.slice(0, 10).map((item) => (
            <div
              key={item.key}
              className={`${styles.item} ${
                selectedId === parseInt(item.key.split("-")[1])
                  ? styles.selected
                  : ""
              }`}
              onClick={() => clickHandler(parseInt(item.key.split("-")[1]))}
            >
              <span>{item.key}</span>
              <span>{item.value.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoMemoization;
