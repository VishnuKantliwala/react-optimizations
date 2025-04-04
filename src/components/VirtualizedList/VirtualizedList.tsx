import React from "react";
import { FixedSizeList as List } from "react-window";
import { VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styles from "./VirtualizedList.module.scss";

// Example data
const items = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  title: `Item ${index}`,
  description: `This is the description for item ${index}`,
}));

// Fixed height row component
const Row = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => (
  <div style={style} className={styles.row}>
    <h3>{items[index].title}</h3>
    <p>{items[index].description}</p>
  </div>
);

// Variable height row component
const VariableRow = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => {
  const item = items[index];
  const height = Math.floor(Math.random() * 100) + 50; // Random height between 50-150px

  return (
    <div style={{ ...style, height }} className={styles.variableRow}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className={styles.heightInfo}>Height: {height}px</div>
    </div>
  );
};

// Fixed height list component
export const FixedHeightList: React.FC = () => {
  return (
    <div>
      <h2 className={styles.listHeader}>Fixed Height List</h2>
      <div className={styles.listContainer}>
        <List height={500} width="100%" itemCount={items.length} itemSize={80}>
          {Row}
        </List>
      </div>
    </div>
  );
};

// Variable height list component
export const VariableHeightList: React.FC = () => {
  const getItemSize = (index: number) => Math.floor(Math.random() * 100) + 50;

  return (
    <div>
      <h2 className={styles.listHeader}>Variable Height List</h2>
      <div className={styles.listContainer}>
        <VariableSizeList
          height={500}
          width="100%"
          itemCount={items.length}
          itemSize={getItemSize}
        >
          {VariableRow}
        </VariableSizeList>
      </div>
    </div>
  );
};

// Auto-sized list component
export const AutoSizedList: React.FC = () => {
  return (
    <div>
      <h2 className={styles.listHeader}>Auto-sized List</h2>
      <div className={styles.listContainer}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              height={height}
              width={width}
              itemCount={items.length}
              itemSize={80}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
};

// Main component that combines all examples
const VirtualizedList: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>React Window Examples</h1>
      <FixedHeightList />
      <VariableHeightList />
      <AutoSizedList />
    </div>
  );
};

export default VirtualizedList;
