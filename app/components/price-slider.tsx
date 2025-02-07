"use client";
import React, { useEffect } from "react";
import { Divider, Input, Slider } from "@heroui/react";
import { cn } from "@heroui/react";
import { RangeValue, PriceSliderProps, PriceSliderPipProps } from "../types";
import { clampValue, scaleValue } from "../utils";

const PriceSliderPip: React.FC<PriceSliderPipProps> = ({
  animation = "height",
  isInRange,
}) => {
  const [rand, setRand] = React.useState(0);

  React.useEffect(() => {
    setRand(Math.floor(Math.random() * 100));
  }, []);

  const height = clampValue(rand, 30, 100) + "%";

  const pip = React.useMemo(() => {
    if (animation === "height") {
      return (
        <span
          className="relative h-12 w-1 rounded-full bg-default-100 after:absolute after:bottom-0 after:h-0 after:w-full after:rounded-full after:bg-primary after:transition-all after:!duration-500 after:content-[''] data-[in-range=true]:after:h-full"
          data-in-range={isInRange}
          style={{
            height,
          }}
        />
      );
    }

    return (
      <span
        className="h-12 w-1 rounded-full bg-primary transition-all !duration-500"
        style={{
          background: isInRange
            ? "hsl(var(--nextui-primary-500))"
            : "hsl(var(--nextui-default-100))",
          height,
        }}
      />
    );
  }, [isInRange, height, animation]);

  return pip;
};

const PriceSlider = ({
  range,
  animation,
  className,
  handleLPFiltering,
  handleHPFiltering,
  ...props
}: PriceSliderProps) => {
  const defaultValue = React.useMemo<RangeValue>(
    () => range?.defaultValue || [0, 50000],
    [range?.defaultValue]
  );

  const [value, setValue] = React.useState<RangeValue>(defaultValue);

  const rangePercentageValue = React.useMemo(() => {
    const rangeScale = [
      range?.min || defaultValue[0],
      range?.max || defaultValue[1],
    ] as RangeValue;

    const minPercentage = Math.floor(scaleValue(value[0], rangeScale));
    const maxPercentage = Math.floor(scaleValue(value[1], rangeScale));

    return [minPercentage, maxPercentage] as const;
  }, [value, range?.min, range?.max, defaultValue]);

  const rangePips = React.useMemo(() => {
    return Array.from({ length: 32 }).map((_, index) => {
      const pipValuePercentage = Math.round(scaleValue(index, [0, 31]));

      const isInRange =
        pipValuePercentage >= rangePercentageValue[0] + 5 &&
        pipValuePercentage <= rangePercentageValue[1] + 2;

      return (
        <PriceSliderPip
          key={index}
          animation={animation}
          isInRange={isInRange}
        />
      );
    });
  }, [animation, rangePercentageValue]);

  const onMinInputValueChange = React.useCallback(
    (inputValue: string) => {
      const newValue = Number(inputValue);
      const minValue = range?.min ?? defaultValue[0];

      if (!isNaN(newValue)) {
        const clampedValue = clampValue(newValue, minValue, value[1]);

        setValue([clampedValue, value[1]]);
      }
    },
    [value, range?.min, defaultValue]
  );

  const onMaxInputValueChange = React.useCallback(
    (inputValue: string) => {
      const newValue = Number(inputValue);
      const maxValue = range?.max ?? defaultValue[1];

      if (!isNaN(newValue) && newValue <= maxValue) {
        setValue([value[0], newValue]);
      }
    },
    [value, range?.max, defaultValue]
  );

  // update the listing after a second when inputs are changed
  // this is to avoid exesive updates and renders.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleLPFiltering?.(value[0]);
      handleHPFiltering?.(value[1]);
    }, 600);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-col gap-1">
        <div className="flex h-12 w-full items-end justify-between px-2">
          {rangePips}
        </div>
        <Slider
          {...props}
          formatOptions={{ style: "currency", currency: "AED" }}
          maxValue={range?.max}
          minValue={range?.min}
          size="sm"
          step={range?.step}
          value={value}
          onChange={(value) => {
            const [minValue, maxValue] = value as RangeValue;
            setValue([minValue, maxValue]);
          }}
        />
      </div>
      <div className="flex items-center">
        <Input
          aria-label="Min price"
          labelPlacement="outside"
          startContent={<p className="text-default-400">AED</p>}
          type="number"
          radius="sm"
          value={`${value[0]}`}
          onValueChange={onMinInputValueChange}
        />
        <Divider className="mx-2 w-2" />
        <Input
          radius="sm"
          aria-label="Max price"
          labelPlacement="outside"
          startContent={<p className="text-default-400">AED</p>}
          type="number"
          value={`${value[1]}`}
          onValueChange={onMaxInputValueChange}
        />
      </div>
    </div>
  );
};

PriceSlider.displayName = "PriceSlider";

export default PriceSlider;
