"use client";
import React from "react";
import { cn } from "@heroui/react";
import ProductListItem from "./product-list-item";

import { ProductGridProps } from "../types";

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ itemClassName, className, products, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3",
          className
        )}
        {...props}>
        {products &&
          products.map((product) => (
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
