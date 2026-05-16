import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PersonDetailsSkeleton = () => (
    <div className="container mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64 rounded" />
                            <Skeleton className="h-4 w-32 rounded" />
                        </div>
                        <Skeleton className="h-6 w-28 rounded-full" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col lg:flex-row gap-8">
                        <Skeleton className="w-full max-w-xs sm:w-80 h-64 sm:h-80 rounded-lg flex-shrink-0" />
                        <div className="flex-1 space-y-4">
                            <Skeleton className="h-6 w-40 rounded" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="space-y-1">
                                        <Skeleton className="h-3 w-24 rounded" />
                                        <Skeleton className="h-4 w-36 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><Skeleton className="h-6 w-56 rounded" /></CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-4 w-5/6 rounded" />
                    <Skeleton className="h-4 w-4/6 rounded" />
                </CardContent>
            </Card>
        </div>

        <div className="xl:col-span-1 space-y-6">
            <Card>
                <CardHeader><Skeleton className="h-6 w-24 rounded" /></CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-10 w-full rounded" />
                    <Skeleton className="h-10 w-full rounded" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader><Skeleton className="h-6 w-28 rounded" /></CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-14 w-full rounded" />
                    <Skeleton className="h-14 w-full rounded" />
                    <Skeleton className="h-14 w-full rounded" />
                </CardContent>
            </Card>
        </div>
    </div>
);

export default PersonDetailsSkeleton;
