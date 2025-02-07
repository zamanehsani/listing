import { productType, RangeValue } from "./types";

export async function fetchData(): Promise<productType[]> {
  /**
   * gets listing from the file and return as json list
   */
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

export function formatNumber(num: number) {
  /**
   * better formating of the number.
   * e.g: 1000 -> 1k
   * e.g: 25,000 -> 25k
   * @param num
   * @return string
   */
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString(); // Return as is if less than 1000
}

export function filterProducts(list: productType[], filters: string[]) {
  if (filters.length > 0) {
    return list.filter((product) =>
      filters.includes(product.bedrooms.toString())
    );
  }
  return list;
}

export function sortProducts(list: productType[], sort: string | undefined) {
  if (!sort) return list;

  const sorted = [...list]; // Sort the provided list (filtered products)
  switch (sort) {
    case "recent":
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      break;
    case "price_low_to_high":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price_high_to_low":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "by_name":
      sorted.sort((a, b) => a.address.localeCompare(b.address));
      break;
  }
  return sorted;
}
