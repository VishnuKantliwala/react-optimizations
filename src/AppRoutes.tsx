import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import AutoBatching from "./components/AutoBatching/AutoBatching";
import ConcurrentRendering from "./components/ConcurrentRendering/ConcurrentRendering";
import DeferredValue from "./components/DeferredValue/DeferredValue";
import StreamingSSR from "./components/StreamingSSR/StreamingSSR";
import Sidebar from "./components/Sidebar/Sidebar";

// React 19 features
import ReactCompiler from "./components/ReactCompiler/ReactCompiler";
import AssetLoading from "./components/AssetLoading/AssetLoading";
import PartialPreRendering from "./components/PartialPreRendering/PartialPreRendering";
import ActionsAPI from "./components/ActionsAPI/ActionsAPI";
import React from "react";
import Calendar from "./pages/Calendar/Calendar";
import ConcurrentRenderingWebWorker from "./components/ConcurrentRendering/ConcurrentRenderingWebWorker";
import DeferredValueSlowRenderNormal from "./components/DeferredValue/DeferredValueSlowRenderNormal";
import DeferredValueSlowRenderOptimized from "./components/DeferredValue/DeferredValueSlowRenderOptimized";
import SlowVsOptimizedContext from "./components/SlowVsOptimizedContext/SlowVsOptimizedContext";
import SelectorComparison from "./components/SelectorComparison/SelectorComparison";
import VirtualizedList from "./components/VirtualizedList/VirtualizedList";
import AutoMemoization from "./components/AutoMemoization/AutoMemoization";

export default function AppRoutes() {
  return (
    <Router>
      <div style={{ display: "flex", width: "96vw" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cal" element={<Calendar />} />
            <Route path="/autobatching" element={<AutoBatching />} />
            <Route path="/auto-memoization" element={<AutoMemoization />} />
            <Route
              path="/concurrent-rendering"
              element={<ConcurrentRendering />}
            />
            <Route
              path="/concurrent-rendering-web-worker"
              element={<ConcurrentRenderingWebWorker />}
            />
            <Route path="/deferred-value" element={<DeferredValue />} />
            <Route
              path="/deferred-value-slow-render-normal"
              element={<DeferredValueSlowRenderNormal />}
            />
            <Route
              path="/deferred-value-slow-render-optimized"
              element={<DeferredValueSlowRenderOptimized />}
            />
            <Route
              path="/slow-vs-optimized-context"
              element={<SlowVsOptimizedContext />}
            />
            <Route path="/streaming-ssr" element={<StreamingSSR />} />
            <Route path="/reselect" element={<SelectorComparison />} />
            <Route path="/virtualized-list" element={<VirtualizedList />} />
            {/* React 19 Features */}
            {React.version.startsWith("19") && (
              <>
                <Route path="/react-compiler" element={<ReactCompiler />} />
                <Route path="/asset-loading" element={<AssetLoading />} />
                <Route
                  path="/partial-pre-rendering"
                  element={<PartialPreRendering />}
                />
                <Route path="/actions-api" element={<ActionsAPI />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
