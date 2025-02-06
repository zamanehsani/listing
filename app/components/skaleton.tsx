import { Card, Skeleton } from "@heroui/react";

export default function Skaleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((product) => (
        <Card key={product} className="p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-32 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="flex flex-col space-y-3 p-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-8 w-full rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}
