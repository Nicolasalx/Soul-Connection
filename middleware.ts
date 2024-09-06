import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/dal";

const publicRoutes = ['/login', '/']

export default async function middleware(req: NextRequest) {
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
    const userConnected = await verifyToken() !== null

    if (!isPublicRoute && !userConnected) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if (isPublicRoute && userConnected) {
        return NextResponse.redirect(new URL('/home', req.nextUrl))
    }
    if (req.nextUrl.pathname === '/' && !userConnected) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
}
