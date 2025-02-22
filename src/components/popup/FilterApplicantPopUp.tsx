import FilterPopupLayout, { FilterPopupProps } from "@components/PopUpFilter";

const FilterApplicantPopup: React.FC<FilterPopupProps & {
    applierRecord?: Record<number, string> | null
    employerRecord?: Record<number, string> | null
}> = ({
    isOpen,
    onClose,
    dataFilter,
    setDataFilter,
    setDataFilterNull,
    submitFilter,
    titleName,
    applierRecord,
    employerRecord
}) => {
        const handleSubmit = () => {
            submitFilter();
            onClose();
        };
        return (
            <FilterPopupLayout
                isOpen={isOpen}
                handleSubmit={handleSubmit}
                titleName={titleName}
                onClose={onClose}
                dataFilter={dataFilter}
                setDataFilter={setDataFilter}
                setDataFilterNull={setDataFilterNull}
                submitFilter={submitFilter}
            >
                {/* Content of the popup */}
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="jobseeker_id" className="block text-white">Applier</label>
                        <select
                            id="jobseeker_id"
                            name="jobseeker_id"
                            value={dataFilter?.jobseeker_id || 0}
                            onChange={setDataFilter}
                            className="w-full p-2 rounded bg-gray-700 text-white ltr border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                        >
                            <option value={0}>All Applier</option>
                            {applierRecord && Object.entries(applierRecord).map(([key, value]) => (
                                <option key={key} value={parseInt(key)}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="employer_id" className="block text-white">Job Name</label>
                        <select
                            id="employer_id"
                            name="employer_id"
                            value={dataFilter?.employer_id || 0}
                            onChange={setDataFilter}
                            className="w-full p-2 rounded bg-gray-700 ltr text-white border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                        >
                            <option value={0}>All Company</option>
                            {employerRecord && Object.entries(employerRecord).map(([key, value]) => (
                                <option key={key} value={parseInt(key)}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </FilterPopupLayout>
        )
    }
export default FilterApplicantPopup