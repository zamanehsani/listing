"use client";
import React, { useState, useEffect } from "react";
import { cn } from "@heroui/react";
import ProductListItem from "./product-list-item";
import { fetchData } from "../utils";
import { productType } from "../types";
import { notFound } from "next/navigation";
import Skaleton from "./skaleton";
export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
  itemClassName?: string;
};

const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({ itemClassName, className, ...props }, ref) => {
    const [products, setProducts] = useState<productType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
      async function loadData() {
        try {
          const jsonData = await fetchData();
          setProducts(jsonData);
        } catch (err) {
          if (err instanceof Error && err.message === "Data not found.") {
            notFound(); // Trigger Next.js 404 page
          } else {
            setError(err instanceof Error ? err : new Error(String(err)));
          }
        } finally {
          setLoading(false);
        }
      }

      loadData();
    }, []);

    if (loading) {
      return <Skaleton />;
    }

    if (error) {
      return <div>Error: {error?.message}</div>;
    }

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
