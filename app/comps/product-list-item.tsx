"use client";

import React from "react";
import { Button, Image } from "@heroui/react";
import { cn } from "@heroui/react";
import { productType } from "../lists";
import { Icon } from "@iconify/react";

export type ProductListItemProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "id"
> & {
  isPopular?: boolean;
  removeWrapper?: boolean;
} & productType;

const ProductListItem = React.forwardRef<HTMLDivElement, ProductListItemProps>(
  (
    {
      id,
      image,
      address,
      size,
      bedrooms,
      currency,
      price,
      added,
      removeWrapper,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          " flex w-64 max-w-full flex-none scroll-ml-6 flex-col p-2 shadow-medium",
          {
            "rounded-md border border-default-200 shadow-none": removeWrapper,
          },
          className
        )}
        {...props}>
        <div className=" flex h-52 max-h-full w-full flex-col items-center justify-center overflow-visible rounded-md bg-content2">
          <Image
            removeWrapper
            alt={address}
            className={cn(
              "z-0 h-full max-h-full w-full max-w-[80%] overflow-visible object-contain object-center hover:scale-110"
            )}
            src={image}
          />
        </div>
        <div className="flex flex-col gap-3 px-1">
          <div className="flex items-center justify-between py-2">
            <h1 className="text-lg font-bold text-default-700 flex">
              <Icon
                className="text-default-500"
                height={25}
                icon="solar:bed-bold-duotone"
                width={25}
              />
              <span className="px-2">{bedrooms} Bedrooms</span>
            </h1>
            <p className="text-medium font-medium text-default-500">
              {currency} {price}
            </p>
          </div>

          <div className="flex items-center ">
            <p className="flex items-center">
              <Icon
                className="text-default-500"
                height={25}
                icon="solar:map-bold"
                width={25}
              />
              <span className="px-2">{address}</span>
            </p>
          </div>
          <div className="flex items-center ">
            <p className="flex items-center gap-x-2 border-r border-default-200 w-[48%] mr-3">
              <Icon
                className="text-default-500"
                height={30}
                icon="solar:calendar-date-bold-duotone"
                width={30}
              />
              {new Date(added).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="flex items-center w-[40%]">
              <Icon
                className="text-default-500"
                height={25}
                icon="solar:code-scan-bold"
                width={25}
              />
              <span className="px-2">{size}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              fullWidth
              className="font-medium rounded-md"
              color="primary"
              radius="lg"
              variant="solid">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ProductListItem.displayName = "ProductListItem";

export default ProductListItem;
