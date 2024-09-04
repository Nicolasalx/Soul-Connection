import { callAPI } from "@/app/lib/api"

export async function GET(req: Request) {
    return await callAPI(req)
}
