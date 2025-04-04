import { useState, useTransition } from "react";

export default function PrimeCalculator() {
  const [range, setRange] = useState({ start: 1, end: 5000000 });
  const [primes, setPrimes] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const isPrime = (num: number) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleCalculate = () => {
    startTransition(() => {
      // CPU-bound vs. I/O-bound tasks:
      const primeNumbers = [];
      for (let i = range.start; i <= range.end; i++) {
        if (isPrime(i)) primeNumbers.push(i);
      }
      setPrimes(primeNumbers);
    });
  };

  return (
    <div>
      <h2>Prime Number Finder (With useTransition)</h2>
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
      <button onClick={handleCalculate} disabled={isPending}>
        {isPending ? "Calculating..." : "Find Primes"}
      </button>
      <ul>
        {primes.slice(0, 50).map((prime, index) => (
          <li key={index}>{prime}</li>
        ))}
      </ul>
    </div>
  );
}
