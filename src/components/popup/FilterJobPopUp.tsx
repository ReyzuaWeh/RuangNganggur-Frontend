import functionSets from "@/utils/function";
import FilterPopupLayout, { FilterPopupProps } from "@components/PopUpFilter";
import { GenderType, JobType } from "@dataType/khusus";

const FilterJobPopup: React.FC<FilterPopupProps & { companyRecord?: Record<number, string> | null }> = ({
    isOpen,
    onClose,
    dataFilter,
    setDataFilter,
    setDataFilterNull,
    submitFilter,
    titleName,
    companyRecord
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
                {companyRecord && <div>
                    <label htmlFor="employer_id" className="block text-white">Company</label>
                    <select
                        id="employer_id"
                        name="employer_id"
                        value={dataFilter?.employer_id || 0}
                        onChange={setDataFilter}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                        <option value={0}>All Company</option>
                        {Object.entries(companyRecord).map(([key, value]) => (
                            <option key={key} value={parseInt(key)}>{value}</option>
                        ))}
                    </select>
                </div>}
                <div>
                    <label htmlFor="gender" className="block text-white">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={dataFilter?.gender || ""}
                        onChange={setDataFilter}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                        <option value="">All Gender</option>
                        {Object.entries(GenderType).map(([key, value]) => (
                            <option key={key} value={value}>{functionSets.capitalizeFirstLetter(value)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="type_job" className="block text-white">Type Job</label>
                    <select
                        id="type_job"
                        name="type_job"
                        value={dataFilter?.type_job || ""}
                        onChange={setDataFilter}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                        <option value="">All Type Job</option>
                        {Object.entries(JobType).map(([key, value]) => (
                            <option key={key} value={value}>{functionSets.capitalizeFirstLetter(value.replace(/_/g, " "))}</option>
                        ))}
                    </select>
                </div>
            </div>
        </FilterPopupLayout>
    )
}
export default FilterJobPopup