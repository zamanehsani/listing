"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  ScrollShadow,
} from "@heroui/react";
import { cn } from "@heroui/react";
import PriceSlider from "./price-slider";

export type FiltersWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  showTitle?: boolean;
  showActions?: boolean;
  className?: string;
  scrollShadowClassName?: string;
};

const FiltersWrapper = React.forwardRef<HTMLDivElement, FiltersWrapperProps>(
  ({ showActions = true, className, scrollShadowClassName }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-full max-h-fit w-full max-w-sm rounded-medium bg-content1 p-6",
          className
        )}>
        <h2 className="text-large font-medium text-foreground">
          Filter by price
        </h2>
        <Divider className="my-3 bg-default-100" />

        <ScrollShadow
          className={cn(
            "-mx-6 h-full px-6",
            {
              "max-h-[calc(100%_-_220px)]": showActions,
            },
            scrollShadowClassName
          )}>
          <div className="flex flex-col gap-6">
            <PriceSlider
              aria-label={"Price Range"}
              range={{
                min: 0,
                defaultValue: [550, 5000],
                max: 5000,
                step: 1,
              }}
            />

            <Divider className="my-3 bg-default-200" />

            <Accordion className="px-0" defaultExpandedKeys={["1"]}>
              <AccordionItem
                key="options"
                classNames={{
                  title: "text-medium font-medium leading-8 text-default-600",
                  trigger: "p-0",
                  content: "px-1",
                }}
                title={"Filter by bedrooom"}>
                <CheckboxGroup aria-label={"number of bed"}>
                  <Checkbox key={1} value={"1"}>
                    {"one bedroom"}
                  </Checkbox>
                  <Checkbox key={2} value={"2"}>
                    {"two bedroom"}
                  </Checkbox>
                  <Checkbox key={3} value={"3"}>
                    {"three bedroom"}
                  </Checkbox>
                  <Checkbox key={4} value={"4"}>
                    {"four bedroom"}
                  </Checkbox>
                </CheckboxGroup>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollShadow>

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
