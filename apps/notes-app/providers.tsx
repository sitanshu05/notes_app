"use client"
import { RecoilRoot } from "recoil";
import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react"
import {ThemeProvider as NextThemesProvider} from "next-themes";


export const Providers = ({children}: {children: React.ReactNode}) => {

    return (
    <RecoilRoot>
        <SessionProvider>
            <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    </RecoilRoot>


    )

}