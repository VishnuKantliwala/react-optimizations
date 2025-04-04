self.onmessage = function (e) {
  const { start, end } = e.data;
  let primes = [];

  function isPrime(num: number) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }

  for (let i = start; i <= end; i++) {
    if (isPrime(i)) primes.push(i);
  }

  postMessage(primes);
};
