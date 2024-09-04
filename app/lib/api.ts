/*
** EPITECH PROJECT, 2024
** api.ts
** File description:
** useful functions to call APIs
*/

import { verifyToken } from "./dal"

// Adds the Bearer token and the API token to the request
export async function callAPI(req: Request) {
    const token = await verifyToken()
    if (!token) {
        return Response.json({ error: 'Not logged in.' }, { status: 403 })
    }
    const api_token = process.env.API_TOKEN
    if (!api_token) {
        console.error("Missing API token.")
        return Response.json({ error: 'Unauthorized.' }, { status: 401 })
    }
    try {
        const url = process.env.apiUrl
        if (!url) {
            return Response.json({ error: 'API url not found.' }, { status: 500 })
        }
        const newUrl = new URL(url).origin + new URL(req.url).pathname
        console.log(newUrl)
        req.headers.append('Content-Type', 'application/json')
        req.headers.append('Authorization', `Bearer ${token}`)
        req.headers.append('X-Group-Authorization', api_token)
        const result = await fetch(newUrl, {
            method: req.method,
            headers: req.headers,
        })
        return result
    } catch(err) {
        console.error(err)
        return Response.json({ error: err }, { status: 500 })
    }
}
