import { ReactNode } from "react"

export default function If({ condition, children }: {
    condition: boolean,
    children: ReactNode
}) {
    return condition ? <>{children}</> : <></>
}
