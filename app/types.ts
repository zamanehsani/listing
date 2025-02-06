import type { SliderProps } from "@heroui/react";

export interface productType {
  id: number;
  image: string;
  address: string;
  size: string;
  bedrooms: number;
  currency: string;
  price: string;
  added: string;
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
};

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
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
  animation?: PriceSliderAnimation;
};

export type PriceSliderPipProps = {
  isInRange: boolean;
  animation?: PriceSliderAnimation;
};
