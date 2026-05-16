import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PersonCardSkeleton = () => (
    <Card className="flex flex-col items-center md:flex-row p-4 m-2 w-full sm:w-auto md:m-4 md:h-[268px]">
        <Skeleton className="w-[200px] h-[236px] flex-shrink-0 rounded-md" />

        <CardContent className="w-full md:w-[250px] p-0 pl-0 pt-4 md:pl-4 md:pt-0 flex flex-col justify-between h-[236px]">
            <div className="flex flex-col gap-3">
                <Skeleton className="h-4 w-4/5 rounded" />
                <Skeleton className="h-3 w-3/5 rounded" />
                <Skeleton className="h-3 w-2/5 rounded" />
                <Skeleton className="h-3 w-3/5 rounded" />
                <Skeleton className="h-3 w-4/5 rounded" />
                <Skeleton className="h-5 w-28 rounded-full mt-1" />
            </div>
            <Skeleton className="h-9 w-full rounded-md mt-4" />
        </CardContent>
    </Card>
);

export default PersonCardSkeleton;
