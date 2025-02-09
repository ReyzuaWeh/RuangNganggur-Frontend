import { MdFilterListAlt } from "react-icons/md";

const FilterOption = ({ filterSets, submitFilter, setOpenPopUp, setClearFilter, handleChangeFilter, placeholder, seacrhId }: {
    filterSets: Record<any, any>,
    submitFilter: () => void,
    setOpenPopUp: () => void,
    setClearFilter: () => void,
    handleChangeFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    placeholder?: string | null,
    seacrhId?: string | null
}) => (<form
    className="w-full bg-white p-6 rounded-lg"
    onSubmit={e => {
        e.preventDefault();
        submitFilter();
    }}
>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Input Search */}
        <div className="flex flex-col">
            <label htmlFor={seacrhId || `search`} className="text-sm font-medium text-gray-700">
                Search
            </label>
            <input
                type="text"
                id={seacrhId || `search`}
                name={seacrhId || `search`}
                value={filterSets[seacrhId || "search"] || ""}
                onChange={handleChangeFilter}
                placeholder={placeholder || ""}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            />
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-end  md:flex-row flex-col  justify-end gap-2">
            <button
                type="button"
                onClick={setOpenPopUp}
                className="flex items-center text-primary hover:text-blue-500 transition-colors"
            >
                <MdFilterListAlt size={24} />
                <span className="ml-1 hidden sm:inline-block">More Filters</span>
            </button>
            <div className="flex gap-x-2">
                <button
                    type="button"
                    onClick={setClearFilter}
                    className="bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Clear
                </button>
                <button
                    type="submit"
                    className="btn-primary text-white font-medium py-1 px-3 rounded-md transition duration-200"
                >
                    Find
                </button>
            </div>
        </div>
    </div>
</form>
)
export default FilterOption;