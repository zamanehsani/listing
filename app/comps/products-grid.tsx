"use client";

import React from "react";
import { cn } from "@heroui/react";

import { products } from "../lists";

import ProductListItem from "./product-list-item";

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
  itemClassName?: string;
};

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ itemClassName, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
          className
        )}
        {...props}>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            removeWrapper
            {...product}
            className={cn("w-full snap-start", itemClassName)}
          />
        ))}
      </div>
    );
  }
);

ProductsGrid.displayName = "ProductsGrid";

export default ProductsGrid;
