import { useState } from "react";

interface MethodCallInterface {
    methodFunction: () => Promise<void>
    text: string
}

const MethodCall = ({ methodFunction, text }: MethodCallInterface) => {

    const [loading, setLoading] = useState<boolean>(false);

    const methodCallFunc = async () => {
        try {
            setLoading(true)
            await methodFunction()
            setLoading(false)
        } catch (e) {
            setLoading(false)
        }
    }

    return (
        <div>
            <button className="btn mt-2" onClick={methodCallFunc}>
                {loading ? <span className="loading loading-spinner" /> : text}
            </button>
        </div>
    )
}

export default MethodCall