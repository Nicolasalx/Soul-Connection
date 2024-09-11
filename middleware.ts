import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/lib/dal";
import { isManager } from "./app/lib/user";

const publicRoutes = ['/login', '/']
const protectedRoutes = ['/employee/statistics', '/employee/coaches']

export default async function middleware(req: NextRequest) {
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname)
    const userPayload = await verifyToken()

    if (!isPublicRoute && !userPayload) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if (isPublicRoute && userPayload) {
        return NextResponse.redirect(new URL(`/${userPayload.role as string}/home`, req.nextUrl))
    }
    if (req.nextUrl.pathname === '/' && !userPayload) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
    if ((isProtectedRoute && !(await isManager())) ||
        (!isPublicRoute && userPayload && !req.nextUrl.toString().includes(userPayload.role as string))) {
        return NextResponse.rewrite(new URL('/forbidden', req.nextUrl), { status: 403 })
    }
    return NextResponse.next()
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|.*\\.png$).*)'
}
