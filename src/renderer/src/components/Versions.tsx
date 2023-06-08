import { useState } from 'react'

function Versions(): JSX.Element {
    const [versions] = useState(window.electron.process.versions)

    return (
        <ul className="flex gap-2">
            <li className="">Electron v{versions.electron}</li>
            <li className="">Chromium v{versions.chrome}</li>
            <li className="">Node v{versions.node}</li>
            <li className="">V8 v{versions.v8}</li>
        </ul>
    )
}

export default Versions
