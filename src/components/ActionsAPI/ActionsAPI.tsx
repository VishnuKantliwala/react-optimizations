import { useState } from "react";
import styles from "./ActionsAPI.module.scss";

const ActionsAPI = () => {
  const [count, setCount] = useState(0);

  async function increment() {
    setCount((prev) => prev + 1);
  }

  return (
    <div className={styles.container}>
      <h2>Actions API</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Increase</button>
    </div>
  );
};

export default ActionsAPI;
