import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/dal";
import { isManagerMiddleware } from "./app/lib/user";

const publicRoutes = ['/login', '/']
const protectedRoutes = ['/statistics']

export default async function middleware(req: NextRequest) {
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname)
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
    if (isProtectedRoute && !(await isManagerMiddleware())) {
        return NextResponse.redirect(new URL('/forbidden', req.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
}
