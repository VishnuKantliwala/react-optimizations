import { useState, useEffect, useRef } from "react";

export default function PrimeCalculator() {
  const [range, setRange] = useState({ start: 1, end: 5000000 });
  const [primes, setPrimes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../workers/primeWorker.ts", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      setPrimes(e.data);
      setIsLoading(false);
    };

    return () => workerRef.current?.terminate();
  }, []);

  const handleCalculate = () => {
    setIsLoading(true);
    setPrimes([]); // Clear previous results
    workerRef.current?.postMessage(range);
  };

  return (
    <div>
      <h2>Prime Number Finder (With Web Worker)</h2>
      <input
        type="number"
        value={range.start}
        onChange={(e) => setRange({ ...range, start: +e.target.value })}
      />
      <input
        type="number"
        value={range.end}
        onChange={(e) => setRange({ ...range, end: +e.target.value })}
      />
      <button onClick={handleCalculate} disabled={isLoading}>
        {isLoading ? "Calculating..." : "Find Primes"}
      </button>
      <ul>
        {primes.slice(0, 50).map((prime, index) => (
          <li key={index}>{prime}</li>
        ))}
      </ul>
    </div>
  );
}
