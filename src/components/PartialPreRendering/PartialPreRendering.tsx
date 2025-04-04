import styles from "./PartialPreRendering.module.scss";

const PartialPreRendering = () => {
  return (
    <div className={styles.container}>
      <h2>Partial Pre-Rendering</h2>
      <p>
        React 19 supports pre-rendering parts of a page to improve performance.
      </p>
    </div>
  );
};

export default PartialPreRendering;
