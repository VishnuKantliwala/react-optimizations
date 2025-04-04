import styles from "./ReactCompiler.module.scss";

const ReactCompiler = () => {
  return (
    <div className={styles.container}>
      <h2>React Compiler</h2>
      <p>
        React 19 introduces an optimizing compiler for performance improvements.
      </p>
    </div>
  );
};

export default ReactCompiler;
