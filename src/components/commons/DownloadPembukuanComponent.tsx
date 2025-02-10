const DownloadPembukuanComponent = ({
    years_option,
    setSelectedYear,
    handlePreview,
    handleConfirmDownload
}: {
    years_option: Record<number, any>,
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>,
    handlePreview: () => void,
    handleConfirmDownload: () => void
}) => (
    <div className="flex flex-col-reverse flex-1 sm:justify-end sm:flex-row items-center gap-2 mt-4 md:mt-0">
        <select
            value={years_option[0]}
            onChange={(e) => {
                setSelectedYear(e.target.value)
            }}
            className="border p-2 rounded"
        >
            {Object.entries(years_option).map(([key, value]) => (
                <option key={key} value={value}>{value}</option>
            ))}
        </select>
        <button
            onClick={handlePreview}
            className="hover:bg-gray-400 bg-gray-300 hover:text-white text-black transition-all  px-3 py-2 rounded w-fit"
        >
            Preview
        </button>
        <button onClick={handleConfirmDownload} className="bg-green-600 text-white px-3 py-2 rounded">
            Download
        </button>
    </div>

)
export default DownloadPembukuanComponent