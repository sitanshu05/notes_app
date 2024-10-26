"use client"
import { RecoilRoot } from "recoil";
import {NextUIProvider} from "@nextui-org/react";
import {SessionProvider} from "next-auth/react"
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { useRouter} from "next/navigation"


export const Providers = ({children}: {children: React.ReactNode}) => {

    const router = useRouter();
    return (
        <NextUIProvider navigate={router.push}>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <RecoilRoot>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </RecoilRoot>
            </NextThemesProvider>
        </NextUIProvider>


    )

}