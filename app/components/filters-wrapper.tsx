"use client";

import React from "react";
import { Checkbox, CheckboxGroup, Divider, Spacer } from "@heroui/react";
import PriceSlider from "./price-slider";

const FiltersWrapper = ({
  handleLPFiltering,
  handleHPFiltering,
  bedFilters,
  handleFiltering,
}: {
  bedFilters: string[] | undefined;
  handleFiltering: (values: string[]) => void;
  handleLPFiltering: (opt?: number) => void;
  handleHPFiltering: (opt?: number) => void;
}) => {
  return (
    <div className="h-full max-h-fit w-full max-w-sm rounded-medium bg-content1 p-6">
      <h2 className="text-lg font-bold text-foreground">Filter by price</h2>
      <Divider className="my-3 bg-default-100" />

      <div className="flex flex-col ">
        <PriceSlider
          aria-label={"Price Range"}
          range={{
            min: 0,
            defaultValue: [0, 50000],
            max: 50000,
            step: 1,
          }}
          handleLPFiltering={handleLPFiltering}
          handleHPFiltering={handleHPFiltering}
        />
        <Spacer className="py-4" />
        <h1 className="font-bold text-lg text-foreground">Filter by bedroom</h1>
        <Divider className="my-2 bg-default-200" />
        <CheckboxGroup
          defaultValue={bedFilters}
          onChange={(e) => handleFiltering(Array.from(e.values()))}
          aria-label={"number of bed"}>
          <Checkbox key={1} value={"1"}>
            {"One bedroom"}
          </Checkbox>
          <Checkbox key={2} value={"2"}>
            {"Two bedrooms"}
          </Checkbox>
          <Checkbox key={3} value={"3"}>
            {"Three bedrooms"}
          </Checkbox>
          <Checkbox key={4} value={"4"}>
            {"Four bedrooms"}
          </Checkbox>
          <Checkbox key={5} value={"5"}>
            {"Five bedrooms"}
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
};

FiltersWrapper.displayName = "FiltersWrapper";

export default FiltersWrapper;
