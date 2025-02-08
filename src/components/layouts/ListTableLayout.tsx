
const ListTableLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="overflow-x-auto w-full">
            <div className="p-5 rounded-md shadow-md w-fit min-w-full">
                {children}
            </div>
        </div>
    )
}

export default ListTableLayout
