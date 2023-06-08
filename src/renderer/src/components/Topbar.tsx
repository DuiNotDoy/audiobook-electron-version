export default function Topbar(): JSX.Element {
    return (
        <div className="bg-yellow-500 flex justify-between items-center px-4 py-2">
            <div className="grid items-center bg-gray-100 w-8 h-8 rounded-full">
                <p className="text-center text-sm">logo</p>
            </div>
            <div>
                <a href={'/'}>Audiobook</a>
            </div>
            <div>
                <a href={'/about'} className="hover:underline">
                    About Us
                </a>
            </div>
        </div>
    )
}
