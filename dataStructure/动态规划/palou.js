// fn = fn(n-1) + fn(n-2)

const cache = {};
function PN (num) {
  if (num < 0) {
    return Error('边界错误');
  }
  if (num === 0) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  if (num === 2) {
    return 2;
  }
}
