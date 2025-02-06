import { productType, RangeValue } from "./types";

export async function fetchData(): Promise<productType[]> {
  const res = await fetch("lists.json");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function scaleValue(
  value: number,
  fromRange: RangeValue,
  toRange: RangeValue = [0, 100]
) {
  const [fromMin, fromMax] = fromRange;
  const [toMin, toMax] = toRange;

  // Scaling factor to map the value from one range to another
  const scale = (toMax - toMin) / (fromMax - fromMin);

  // Applying the scaling factor to the value and adjusting by the minimum of the target range
  return (value - fromMin) * scale + toMin;
}
