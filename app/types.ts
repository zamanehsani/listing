import type { SliderProps } from "@heroui/react";

export interface productType {
  id: number;
  image: string;
  address: string;
  size: number;
  bedrooms: number;
  currency: string;
  price: number;
  date: string;
}

export type ProductListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  removeWrapper?: boolean;
} & productType;

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
  itemClassName?: string;
  products: productType[];
};

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  handleFiltering: (opt: string[]) => void;
  bedFilters?: string[];
  priceFiltering?: { low: number; high: number };
  handlepricingfilters?: (low: number, high: number) => void;
};

export type PriceSliderAnimation = "opacity" | "height";
export type RangeValue = [number, number];
export type RangeFilter = {
  min: number;
  max: number;
  step: number;
  defaultValue: RangeValue;
};

export type PriceSliderProps = Omit<SliderProps, "ref"> & {
  range?: RangeFilter;
  handleLPFiltering?: (opt: number) => void;
  handleHPFiltering?: (opt: number) => void;
  animation?: PriceSliderAnimation;
};

export type PriceSliderPipProps = {
  isInRange: boolean;
  animation?: PriceSliderAnimation;
};
