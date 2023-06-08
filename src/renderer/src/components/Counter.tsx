import { useState } from 'react'

export default function App(): JSX.Element {
    const [count, setcount] = useState(0)

    return (
        <div className="absolute inset-0 grid place-items-center">
            <div className="">
                <h1 className="text-center uppercase font-bold">Count: {count}</h1>
                <button
                    className="bg-blue-500 p-2 rounded"
                    onClick={(): void => setcount(count + 1)}
                >
                    Click Me
                </button>
            </div>
        </div>
    )
}
