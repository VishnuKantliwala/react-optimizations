self.onmessage = function (e) {
  const value = e.data;
  let result = [];
  const chunkSize = 5000; // Send in batches

  for (let i = 0; i < 20000; i++) {
    result.push(`${value} ${i}`);

    if (i % chunkSize === 0) {
      postMessage({ type: "partial", data: [...result] });
      result = []; // Reset batch to avoid duplicate sends
    }
  }

  postMessage({ type: "final", data: result });
};
