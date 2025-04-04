import { useState } from "react";
import SlowList from "../SlowList/SlowList";
import classes from "./DeferredValue.module.scss";

// Main component comparing Suspense vs useDeferredValue
const DeferredValueSlowRenderNormal = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <h4>Deferred Value with Slow Render Normal</h4>
      <div className={classes.container}>
        <label>
          Search albums:
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>

        <div className={classes.left}>
          <SlowList text={query} />
        </div>
      </div>
    </>
  );
};

export default DeferredValueSlowRenderNormal;
