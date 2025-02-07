"use client";
import { Select, SelectItem, Button, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import SidebarDrawer from "./components/sidebar-drawer";
import FiltersWrapper from "./components/filters-wrapper";
import { notFound } from "next/navigation";
import Skaleton from "./components/skaleton";
import { useState, useEffect } from "react";
import {
  fetchData,
  filterProducts,
  sortProducts,
  priceRangeFilter,
} from "./utils";
import { productType } from "./types";
import { lazy, Suspense } from "react";

const ProductsGrid = lazy(() => import("./components/products-grid"));

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = useState<productType[]>([]);
  const [filteredAndSorted, setFilteredAndSorted] = useState<productType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [sorting, setSorting] = useState<string | undefined>();
  const [filters, setFilters] = useState<string[]>([]);
  const [lowPriceFilter, setLowPriceFilter] = useState(0);
  const [highPriceFilter, setHighPriceFilter] = useState(50000);

  async function loadData() {
    try {
      const jsonData = await fetchData();
      setProducts(jsonData);
      const filteredByPrice = priceRangeFilter(
        jsonData,
        lowPriceFilter,
        highPriceFilter
      );

      const filtered = filterProducts(filteredByPrice, filters);
      const sorted = sortProducts(filtered, sorting);
      setFilteredAndSorted(sorted);
    } catch (err) {
      setError(error);
      notFound();
    } finally {
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center ">
        Error: {error?.message}
      </div>
    );
  }

  const handleFiltering = (opt: string[]) => {
    setFilters(opt);
  };

  // Re-apply filters and sorting when filters or sorting change
  useEffect(() => {
    const filteredByPrice = priceRangeFilter(
      products,
      lowPriceFilter,
      highPriceFilter
    );

    const filtered = filterProducts(filteredByPrice, filters);
    const sorted = sortProducts(filtered, sorting);
    setFilteredAndSorted(sorted);
  }, [filters, sorting, products, lowPriceFilter, highPriceFilter]);

  const handleLPFiltering = (opt?: number) => {
    opt && setLowPriceFilter(opt);
  };
  const handleHPFiltering = (opt?: number) => {
    opt && setHighPriceFilter(opt);
  };

  return (
    <div className="max-w-8xl h-full w-full px-2 lg:px-24">
      <div className="flex gap-x-6 mt-4">
        <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <FiltersWrapper
            bedFilters={filters}
            handleFiltering={handleFiltering}
            handleLPFiltering={handleLPFiltering}
            handleHPFiltering={handleHPFiltering}
          />
        </SidebarDrawer>

        <div className="w-full flex-1 flex-col">
          <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-100 px-4 pb-3 pt-2 md:pt-3">
            <div className="flex items-center gap-1 md:hidden md:gap-2">
              <h2 className="text-large font-medium">Nest</h2>
              <span className="text-small text-default-400">(1250)</span>
            </div>
            <div className="flex  items-center justify-between gap-2 ">
              <div className="flex flex-row gap-2">
                <Button
                  className="flex border-default-200 sm:hidden"
                  startContent={
                    <Icon
                      className="text-default-500"
                      height={16}
                      icon="solar:filter-linear"
                      width={16}
                    />
                  }
                  variant="bordered"
                  onPress={onOpen}>
                  Filters
                </Button>
                <div className="hidden items-center gap-1 md:flex">
                  <h2 className="text-medium font-medium">Result</h2>
                  <span className="text-small text-default-400">(1250)</span>
                </div>
              </div>
              <Select
                onSelectionChange={(e) => setSorting(e.currentKey)}
                aria-label="Sort by"
                classNames={{
                  base: "items-center justify-end",
                  label:
                    "hidden lg:block text-tiny whitespace-nowrap md:text-small text-default-400",
                  mainWrapper: "max-w-xs",
                }}
                defaultSelectedKeys={["most_popular"]}
                label="Sort by"
                labelPlacement="outside-left"
                placeholder="Select an option"
                variant="bordered">
                <SelectItem key="recent" value="recent">
                  Most Recent
                </SelectItem>
                <SelectItem key="price_low_to_high" value="price_low_to_high">
                  Price: Low to High
                </SelectItem>
                <SelectItem key="price_high_to_low" value="price_high_to_low">
                  Price: High to Low
                </SelectItem>
                <SelectItem key="by_name" value="by_name">
                  By Name (alphabat)
                </SelectItem>
              </Select>
            </div>
          </header>
          <main className="mt-4 h-full w-full overflow-visible px-1">
            <div className="block rounded-medium">
              <Suspense fallback={<Skaleton />}>
                <ProductsGrid
                  products={filteredAndSorted}
                  className="grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
