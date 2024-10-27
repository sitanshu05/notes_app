import { Skeleton } from "@nextui-org/skeleton";

export default function Loading() {
    return (
        <div>
            {/* Image Loader */}
            <Skeleton className="w-full h-64 rounded-lg" />

            <div className="flex justify-center px-3">
                <div className="flex flex-col items-center justify-center pt-10 w-full md:w-10/12">
                    <div className="flex items-start justify-between mx-2 w-full">
                        <div>
                            {/* Title and Author Loaders */}
                            <Skeleton className="h-10 w-60 rounded-md mb-3" />
                            <Skeleton className="h-6 w-40 rounded-md" />
                        </div>
                        {/* Star Button Loader */}
                        <Skeleton className="h-10 w-20 rounded-md" />
                    </div>
                    {/* About Section Loader */}
                    <Skeleton className="w-full h-20 mt-5 rounded-md" />

                    {/* Accordion Section Loader */}
                    <div className="flex w-full flex-col gap-5 my-10 ">
                        <Skeleton className="h-8 w-full rounded-md" />
                        <Skeleton className="h-8 w-full rounded-md" />
                        <Skeleton className="h-8 w-full rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}