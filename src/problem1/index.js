// Loop version
var sum_to_n_a = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  // Loop version with for loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
  // Loop version with Array.reduce
  // return Array.from({ length: n }, (_, i) => i + 1).reduce(
  //   (acc, val) => acc + val,
  //   0
  // );
};

// Recursive version
var sum_to_n_b = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
};

// Mathematical formula version
var sum_to_n_c = function (n) {
  if (n >= Number.MAX_SAFE_INTEGER) return Number.MAX_SAFE_INTEGER;
  if (n === 1) return 1;
  return (n * (n + 1)) / 2;
};

console.log(sum_to_n_a(50000000));
console.log(sum_to_n_b(50000000));
console.log(sum_to_n_c(50000000));