'use server'
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import Employees from "../back/models/employees";

export async function deleteToken() {
    cookies().delete('token')
}

export async function saveToken(employeeInfos: Employees, access_token: string) {
    const expiresAt = new Date(Date.now())
    expiresAt.setHours(expiresAt.getHours() + 24)   // wait 24 hours before token expiration in cookies
    let token: string = ''

    if (process.env.ENCRYPT_KEY) {
        token = await new SignJWT({ token: access_token, infos: employeeInfos })
            .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
            .setIssuedAt()
            .setExpirationTime('24 hours')
            .sign(new TextEncoder().encode(process.env.ENCRYPT_KEY));
    }
    cookies().set('token', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        path: '/',
    })
}
