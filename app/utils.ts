import { productType } from "./types";

export async function fetchData(): Promise<productType[]> {
  const res = await fetch("lists.json");
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}
