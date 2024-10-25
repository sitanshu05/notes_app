"use client"
import { RecoilRoot } from "recoil";
import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react"
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { useRouter} from "next/navigation"


export const Providers = ({children}: {children: React.ReactNode}) => {

    const router = useRouter();
    return (
    <RecoilRoot>
        <SessionProvider>
            <NextUIProvider navigate={router.push}>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                    {children}
                </NextThemesProvider>
            </NextUIProvider>
        </SessionProvider>
    </RecoilRoot>


    )

}