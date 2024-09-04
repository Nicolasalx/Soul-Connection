import { ReactNode } from "react"

export default async function If({ condition, conditionAsync, children }: {
    condition?: boolean,
    conditionAsync?: () => Promise<boolean>,
    children: ReactNode
}) {
    if (condition) {
        return condition ? <>{children}</> : <></>
    }
    if (conditionAsync) {
        return (await conditionAsync()) ? <>{children}</> : <></>
    }
    return <></>
}
