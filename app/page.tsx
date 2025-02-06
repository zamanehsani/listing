"use client";
import { Select, SelectItem, Button, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="max-w-8xl h-full w-full px-2 lg:px-24">
      <div className="flex gap-x-6 mt-4">
        {/* add sidebar drower here
         */}

        <div className="w-full flex-1 flex-col">
          {/* /main content here... */}
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
                  <h2 className="text-medium font-medium">Nest</h2>
                  <span className="text-small text-default-400">(1250)</span>
                </div>
              </div>
              <Select
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
                <SelectItem key="newest" value="newest">
                  Newest
                </SelectItem>
                <SelectItem key="price_low_to_high" value="price_low_to_high">
                  Price: Low to High
                </SelectItem>
                <SelectItem key="price_high_to_low" value="price_high_to_low">
                  Price: High to Low
                </SelectItem>
                <SelectItem key="top_rated" value="top_rated">
                  Top Rated
                </SelectItem>
                <SelectItem key="most_popular" value="most_popular">
                  Most Popular
                </SelectItem>
              </Select>
            </div>
          </header>
          {/* header first  and main contain second*/}
        </div>
      </div>
    </div>
  );
}
