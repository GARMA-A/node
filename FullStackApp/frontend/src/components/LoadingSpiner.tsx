export function LoadingSpinner({ loading }: { loading: boolean }) {

    return (<>
        {loading && (<div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div> </div>)}
    </>);

}
