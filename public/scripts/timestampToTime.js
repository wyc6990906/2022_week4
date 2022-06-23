export default function (timestamp) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D = date.getDate() + " ";
  const hh = date.getHours() + ":";
  const mm = date.getMinutes() + ":";
  const ss = date.getSeconds();
  return Y + M + D + hh + mm + ss;
}

