import { useEffect, useState } from "react";
import styles from "./AutoBatching.module.scss";

export default function AutoBatching() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const updateText = () => {
    setText("Updated in function");
  };

  const handleClick = () => {
    setCount((c) => c + 1);
    // setText("Updated");
    // updateText();
  };

  useEffect(() => {
    updateText();
  }, [count]);

  useEffect(() => {
    console.log("Rerendered Auto Batching component");
  });

  return (
    <div className={styles.container}>
      <h2>Auto Batching</h2>
      <p>Count: {count}</p>
      <p>Text: {text}</p>
      <button onClick={handleClick}>Update State</button>
    </div>
  );
}
