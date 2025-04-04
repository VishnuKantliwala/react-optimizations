import styles from "./StreamingSSR.module.scss";

const StreamingSSR = () => {
  return (
    <div className={styles.container}>
      <h2>Streaming SSR</h2>
      <p>
        React 18 introduced streaming server-side rendering for faster page
        loads.
      </p>
    </div>
  );
};

export default StreamingSSR;
