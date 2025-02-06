"use client";

import React from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Spacer,
} from "@heroui/react";
import { cn } from "@heroui/react";
import PriceSlider from "./price-slider";
import { FiltersWrapperProps } from "../types";

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-full max-h-fit w-full max-w-sm rounded-medium bg-content1 p-6",
          className
        )}>
        <h2 className="text-lg font-bold text-foreground">Filter by price</h2>
        <Divider className="my-3 bg-default-100" />

        <div className="flex flex-col ">
          <PriceSlider
            aria-label={"Price Range"}
            range={{
              min: 0,
              defaultValue: [550, 5000],
              max: 5000,
              step: 1,
            }}
          />
          <Spacer className="py-4" />
          <h1 className="font-bold text-lg text-foreground">
            Filter by bedroom
          </h1>
          <Divider className="my-2 bg-default-200" />
          <CheckboxGroup aria-label={"number of bed"}>
            <Checkbox key={1} value={"1"}>
              {"One bedroom"}
            </Checkbox>
            <Checkbox key={2} value={"2"}>
              {"Two bedroom"}
            </Checkbox>
            <Checkbox key={3} value={"3"}>
              {"Three bedroom"}
            </Checkbox>
            <Checkbox key={4} value={"4"}>
              {"Four bedroom"}
            </Checkbox>
          </CheckboxGroup>
        </div>

        <Divider className="my-6 bg-default-200" />
        <div className="mt-auto flex flex-col gap-2">
          <Button className="text-default-500" radius="sm" variant="flat">
            Clear all filters
          </Button>
        </div>
      </div>
    );
  }
);

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
