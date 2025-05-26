export function ErrorMessage({ error }: { error: string }) {
    return (<>{
        error && (<div className="flex justify-center items-center h-screen">
            <div className="text-red-500 text-xl">{error}</div>
        </div>)
    }</>)

}


