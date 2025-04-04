import { Link } from "react-router";
import styles from "./Sidebar.module.scss";
import React from "react";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>React Optimizations</h2>
      <ul>
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/cal">📅 Code splitting - Calendar</Link>
        </li>
        <li>
          <Link to="/reselect">🔄 Reselect</Link>
        </li>

        <li>
          <Link to="/concurrent-rendering">⚡ Concurrent Rendering</Link>
        </li>
        <li>
          <Link to="/concurrent-rendering-web-worker">
            ⚡⚡ Concurrent Rendering with Webworker
          </Link>
        </li>
        <li>
          <Link to="/deferred-value">⏳ Deferred Value</Link>
        </li>
        <li>
          <Link to="/deferred-value-slow-render-normal">
            ⏳⏳ Deferred Value with Slow Render Normal
          </Link>
        </li>
        <li>
          <Link to="/deferred-value-slow-render-optimized">
            ⏳⚡ Deferred Value with Slow Render Optimized
          </Link>
        </li>

        <li>
          <Link to="/virtualized-list"> Virtualized List</Link>
        </li>

        <li>
          <Link to="/autobatching">🚀 AutoBatching</Link>
        </li>

        <li>
          <Link to="/slow-vs-optimized-context">
            ⚡ Slow vs Optimized Context
          </Link>
        </li>
        {React.version.startsWith("19") && (
          <>
            <li>
              <Link to="/react-compiler">🛠️ React Compiler</Link>
            </li>
            <li>
              <Link to="/auto-memoization">🔄 Auto Memoization</Link>
            </li>
            {/* <li>
              <Link to="/asset-loading">📂 Asset Loading</Link>
            </li>
            <li>
              <Link to="/partial-pre-rendering">🔄 Partial Pre-Rendering</Link>
            </li>
            <li>
              <Link to="/actions-api">📝 Actions API</Link>
            </li> */}
          </>
        )}
      </ul>
    </div>
  );
}
