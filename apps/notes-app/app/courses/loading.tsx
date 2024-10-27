
import { Card, CardFooter } from "@nextui-org/card"
import { Skeleton } from "@nextui-org/skeleton"

export default function Loading() {

        return (
            <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-5 pt-10 md:pt-16 text-left">
                <div className="w-full flex justify-between items-center px-2 md:px-5 md:pb-8">
                    <Skeleton className="rounded-xl">
                        <div className="text-4xl font-bold tracking-tight w-20 py-4"></div>
                    </Skeleton>
                </div>
    
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-3 w-full">
                    {Array.from({length: 6}).map((_,i) => {
                    return (
                        <Card
                            isFooterBlurred
                            radius="lg"
                            className="border-none w-full max-w-md transition-all box-shadow duration-300"
                        >
                            {/* Image Skeleton */}
                            <Skeleton className="h-56 w-full" />
                
                            <CardFooter className="justify-between bg-zinc-800/55 border-white/20 border-1 overflow-hidden py-2 absolute rounded-xl bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 min-h-16">
                                <div className="flex justify-between items-start w-full text-left">
                                    <div className="flex flex-col gap-1">
                                        {/* Title Skeleton */}
                                        <Skeleton className="h-4 w-40 rounded-md" />
                                        {/* Subtitle Skeleton */}
                                        <Skeleton className="h-3 w-1/2 rounded-md mt-1" />
                                    </div>

                                        {/* Star count Skeleton */}
                                        <div className="flex items-center gap-1">
                                            <Skeleton className="h-4 w-8 rounded-md" />
                                        </div>

                                </div>
                            </CardFooter>
                        </Card>
                    )
                    }
                )}
                </div>
            </div>
        )
}