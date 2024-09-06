import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ['/login', '/']

export default async function middleware(req: NextRequest) {
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
    const token = cookies().get('token')?.value

    if (!isPublicRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL('/home', req.nextUrl))
    }
    if (req.nextUrl.pathname === '/' && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
}
