import { useEffect, useState } from "react";
import styles from "./AssetLoading.module.scss";

const AssetLoading = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    import("./image.png").then((img) => setImage(img.default));
  }, []);

  return (
    <div className={styles.container}>
      <h2>Asset Loading</h2>
      {image && <img src={image} alt="Dynamically Loaded" />}
    </div>
  );
};

export default AssetLoading;
