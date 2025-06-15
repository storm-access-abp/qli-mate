import { headers } from "next/headers";
import { auth } from "./auth";

async function checkAdm() {
    const session = await auth.api.getSession({ headers: await headers() })
    return session?.user?.role === "admin"
}   

async function userSession() {
    const session = await auth.api.getSession({ headers: await headers() })
    return { name: session?.user?.name, email: session?.user?.email }
}

async function checkGoogle() {
    const session = await auth.api.getSession({ headers: await headers() })
    return !!session?.user.emailVerified
}

export { checkAdm, userSession, checkGoogle }