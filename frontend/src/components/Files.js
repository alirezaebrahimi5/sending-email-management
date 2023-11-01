import useStore from "../store";

export default function Files(){
    const files = useStore((state) => state.files)

    return(
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8 h-96 overflow-y-scroll">
        <div className="flex items-center justify-between pb-6">
            <div>
            <h2 className="font-semibold text-gray-700">Your Files</h2>
            <span className="text-xs text-gray-500">CSV files</span>
            </div>

        </div>
        <div className="rounded-lg border">
            <table className="w-full">
                <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th className="px-5 py-3">ID</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Date created</th>
                </tr>
                </thead>
                <tbody className="text-gray-500">
                {files.map((file, key) => 
                    <tr key={key}>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{file.id}</p>
                        </td>
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{file.title}</p>
                        </td>  
                        <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap">{file.date_created}</p>
                        </td>             
                    </tr>       
                )}
            </tbody>
            </table>
        </div>
        </div>

    )
}