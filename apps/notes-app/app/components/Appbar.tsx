import {NavBar} from "@repo/ui"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/authOptions"


export async function Appbar() {
    const session = await getServerSession(authOptions)
    return (
        <NavBar session={session}/>
    )
}