import { useState, useDeferredValue } from "react";
import SlowList from "../SlowList/SlowList";
import classes from "./DeferredValue.module.scss";

// Main component comparing Suspense vs useDeferredValue
const DeferredValueSlowRenderOptimized = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <h4>Deferred Value with Slow Render Optimized</h4>
      <div className={classes.container}>
        <label>
          Search albums:
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>

        <div className={classes.left}>
          <SlowList text={deferredQuery} />
        </div>
      </div>
    </>
  );
};

export default DeferredValueSlowRenderOptimized;
