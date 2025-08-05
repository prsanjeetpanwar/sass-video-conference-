import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="px-1 py-4 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6  p-10  w-full">
        
      
        <div className="flex flex-col gap-2 w-full mt-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
};
