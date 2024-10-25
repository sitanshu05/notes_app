"use client"
import { Tab, Tabs, TabsProps, Button, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useState } from "react";
import { Gallery } from "./layouts/Gallery";
import { Unsplash } from "./layouts/Unsplash";

export function ImageUploadPopover() {
    const [selected, setSelected] = useState("gallery");

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Button size="sm">Choose Image</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-full min-w-96">
                    <Tabs
                    fullWidth
                    size="md"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    >
                        <Tab title="Gallery" key={"gallery"}>
                            <div className="w-full">
                                <Gallery/>
                            </div>
                        </Tab>
                        <Tab title="Unsplash" key={"unsplash"}>
                            <div className="w-full">
                                <Unsplash/>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </PopoverContent>
        </Popover>
    );
}