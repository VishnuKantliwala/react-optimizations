import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import styles from "./SlowVsOptimizedContext.module.scss"; // SCSS Modules
import ThemeComparisonWithProviders from "./ThemeComparision";

// 🚨 Unoptimized Context (Re-renders everything)
const UnoptimizedThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const UnoptimizedThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <UnoptimizedThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={styles.unoptimized}>{children}</div>
    </UnoptimizedThemeContext.Provider>
  );
};

// ✅ Optimized Context (Prevents unnecessary re-renders)
const ThemeValueContext = createContext("light");
const ThemeToggleContext = createContext(() => {});

const OptimizedThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeValueContext.Provider value={theme}>
      <ThemeToggleContext.Provider value={toggleTheme}>
        <div className={styles.optimized}>{children}</div>
      </ThemeToggleContext.Provider>
    </ThemeValueContext.Provider>
  );
};

// 🔥 Flash Effect to Highlight Re-Renders
const FlashComponent = ({
  level,
  children,
}: {
  level: number;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(false); // Reset animation
    void ref.current?.offsetWidth; // Trigger reflow
    setFlash(true);
  });

  return (
    <div ref={ref} className={`${styles.stack} ${flash ? styles.flash : ""}`}>
      Level {level} {children}
    </div>
  );
};

// 🚨 Unoptimized Components
const UnoptimizedButton = () => {
  console.log("❌ Unoptimized Button Re-rendered!");
  const { toggleTheme } = useContext(UnoptimizedThemeContext);
  return (
    <button className={styles.button} onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

const UnoptimizedThemeDisplay = () => {
  console.log("❌ Unoptimized Theme Display Re-rendered!");
  const { theme } = useContext(UnoptimizedThemeContext);
  return <p>Current Theme: {theme}</p>;
};

const UnoptimizedNested = ({ level }: { level: number }) => {
  console.log(`❌ Unoptimized Stack Level ${level} Re-rendered!`);

  return (
    <FlashComponent level={level}>
      {level < 5 ? <UnoptimizedNested level={level + 1} /> : null}
    </FlashComponent>
  );
};

// ✅ Optimized Components
const OptimizedButton = memo(() => {
  console.log("✅ Optimized Button Re-rendered!");
  const toggleTheme = useContext(ThemeToggleContext);
  return (
    <button className={styles.button} onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
});

const OptimizedThemeDisplay = memo(() => {
  console.log("✅ Optimized Theme Display Re-rendered!");
  const theme = useContext(ThemeValueContext);
  return <p>Current Theme: {theme}</p>;
});

const OptimizedNested = memo(({ level }: { level: number }) => (
  <FlashComponent level={level}>
    {level < 5 ? <OptimizedNested level={level + 1} /> : null}
  </FlashComponent>
));

// 🎬 Final Comparison Component
export default function ContextPerformanceComparison() {
  return (
    <div className={styles.comparison}>
      {/* 🚨 Unoptimized */}
      <div className={styles.section}>
        <h2>🚨 Unoptimized Context</h2>
        <UnoptimizedThemeProvider>
          <UnoptimizedButton />
          <UnoptimizedThemeDisplay />
        </UnoptimizedThemeProvider>
      </div>

      {/* ✅ Optimized */}
      <div className={styles.section}>
        <h2>✅ Optimized Context</h2>
        <OptimizedThemeProvider>
          <OptimizedButton />
          <OptimizedThemeDisplay />
        </OptimizedThemeProvider>
      </div>

      <div>{/* <ThemeComparisonWithProviders /> */}</div>
    </div>
  );
}
