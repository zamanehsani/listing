"use client";
import { Select, SelectItem, Button, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import SidebarDrawer from "./components/sidebar-drawer";
import FiltersWrapper from "./components/filters-wrapper";
import ProductsGrid from "./components/products-grid";
import { notFound } from "next/navigation";
import Skaleton from "./components/skaleton";
import { useState, useEffect } from "react";
import { fetchData } from "./utils";
import { productType } from "./types";
import { Suspense } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = useState<productType[]>([]);
  const [sorted, setSorted] = useState<productType[]>([]);
  const [filteredAndSorted, setFilteredAndSorted] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [sorting, setSorting] = useState<string | undefined>();
  const [filters, setFilters] = useState<string[]>([]);

  async function loadData() {
    try {
      const jsonData = await fetchData();
      setProducts(jsonData);
      const filtered = filterProducts(jsonData);
      const sorted = sortProducts(filtered);
      setFilteredAndSorted(sorted);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error && err.message === "Data not found.") {
        notFound(); // Trigger Next.js 404 page
      } else {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (error) {
    return <div>Error: {error?.message}</div>;
  }

  const handleFiltering = (opt: string[]) => {
    setFilters(opt);
  };

  const filterProducts = (list: productType[]) => {
    if (filters.length > 0) {
      return list.filter((product) =>
        filters.includes(product.bedrooms.toString())
      );
    }
    return list;
  };

  const sortProducts = (list: productType[]) => {
    if (!sorting) return list;

    const sorted = [...list]; // Sort the provided list (filtered products)
    switch (sorting) {
      case "recent":
        sorted.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "price_low_to_high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_high_to_low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "by_name":
        sorted.sort((a, b) => a.address.localeCompare(b.address));
        break;
    }
    return sorted;
  };

  // Re-apply filters and sorting when filters or sorting change
  useEffect(() => {
    const filtered = filterProducts(products);
    const sorted = sortProducts(filtered);
    setFilteredAndSorted(sorted);
  }, [filters, sorting, products]); // Include products in dependencies

  return (
    <div className="max-w-8xl h-full w-full px-2 lg:px-24">
      <div className="flex gap-x-6 mt-4">
        <SidebarDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
          <FiltersWrapper
            handleFiltering={handleFiltering}
            bedFilters={filters}
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
