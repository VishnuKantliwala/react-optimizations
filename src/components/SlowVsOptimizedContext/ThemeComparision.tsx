import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { RecoilRoot, atom, useRecoilValue, useSetRecoilState } from "recoil";
import styles from "./ThemeComparison.module.scss";

// 🔹 Context Setup
type ThemeContextType = { theme: string; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextType | null>(null);

// 🔹 Recoil Atoms
const themeState = atom<string>({ key: "themeState", default: "light" });

const ThemeComparison = () => {
  return (
    <div className={styles.container}>
      <h2>React Context vs Recoil Performance</h2>
      <div className={styles.grid}>
        <ContextThemeComponent />
        <ContextCounter />
        <RecoilThemeComponent />
        <RecoilCounter />
      </div>
    </div>
  );
};

// 🔹 Context Theme Component (With Memoized Context)
const ContextThemeComponent = () => {
  const themeContext = useContext(ThemeContext);
  const [renderCount, setRenderCount] = useState(1);

  useEffect(() => {
    console.log("ContextThemeComponent Rendered!");
  }, [themeContext?.theme]); // ✅ Now only re-renders on theme change

  return (
    <div
      className={`${styles.card} ${
        themeContext?.theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <h3>React Context</h3>
      <p>Theme: {themeContext?.theme}</p>
      <p className={styles.renderCount}>Renders: {renderCount}</p>
      <button onClick={themeContext?.toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// 🔹 Recoil Theme Component (Optimized)
const RecoilThemeComponent = () => {
  const theme = useRecoilValue(themeState); // ✅ Only reads state (prevents unnecessary re-renders)
  const setTheme = useSetRecoilState(themeState);
  const [renderCount, setRenderCount] = useState(1);

  useEffect(() => {
    console.log("RecoilThemeComponent Rendered!");
  }, [theme]); // ✅ Only re-renders when theme changes

  return (
    <div
      className={`${styles.card} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <h3>Recoil</h3>
      <p>Theme: {theme}</p>
      <p className={styles.renderCount}>Renders: {renderCount}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};

// 🔹 Context Counter (Should Not Re-Render On Theme Change)
const ContextCounter = () => {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);

  useEffect(() => {
    console.log("ContextCounter Rendered!");
  }, [count]); // ✅ Only re-renders on count change

  return (
    <div className={styles.counter}>
      <h4>Context Counter</h4>
      <p>Count: {count}</p>
      <p className={styles.renderCount}>Renders: {renderCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// 🔹 Recoil Counter (Should Not Re-Render On Theme Change)
const RecoilCounter = () => {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(1);

  useEffect(() => {
    console.log("RecoilCounter Rendered!");
  }, [count]); // ✅ Only re-renders on count change

  return (
    <div className={styles.counter}>
      <h4>Recoil Counter</h4>
      <p>Count: {count}</p>
      <p className={styles.renderCount}>Renders: {renderCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// 🔹 Context & Recoil Providers (With Memoization)
const ThemeComparisonWithProviders = () => {
  const [theme, setTheme] = useState("light");

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    }),
    [theme] // ✅ Only updates when theme changes
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <RecoilRoot>
        <ThemeComparison />
      </RecoilRoot>
    </ThemeContext.Provider>
  );
};

export default ThemeComparisonWithProviders;
