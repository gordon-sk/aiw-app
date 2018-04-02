export function add(a, b) {
    return a + b;
}

export function precisionRound(number) {
  var factor = Math.pow(10, 1);
  return Math.round(number * factor) / factor;
}
