import { Suspense, useDeferredValue, useState } from "react";
import classes from "./DeferredValue.module.scss";
import SearchResults from "./SearchResults";

// Main component comparing Suspense vs useDeferredValue
const DeferredValue = () => {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query); // Defers filtering for a smoother experience
  const isStale = query !== deferredQuery;

  return (
    <>
      <h2>Deferred Value </h2>
      <div className={classes.container}>
        <label>
          Search albums:
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>

        {/* Left: Suspense for Data Fetching */}
        <div className={classes.left}>
          <h3>Suspense (Loading Data)</h3>
          <Suspense fallback={<h2>Loading...</h2>}>
            <SearchResults query={query} />
          </Suspense>
        </div>

        {/* Right: useDeferredValue for Smooth Search */}
        <div className={classes.right}>
          <h3>useDeferredValue (Optimized Search)</h3>
          <Suspense fallback={<h2>Loading...</h2>}>
            <div
              style={{
                opacity: isStale ? 0.5 : 1,
                transition: isStale
                  ? "opacity 0.2s 0.2s linear"
                  : "opacity 0s 0s linear",
              }}
            >
              <SearchResults query={deferredQuery} />
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default DeferredValue;
