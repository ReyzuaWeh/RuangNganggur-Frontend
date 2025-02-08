import FilterPopupLayout, { FilterPopupProps } from "@components/PopUpFilter";
import { RoleType } from "@dataType/khusus";

const FilterUserPopup: React.FC<FilterPopupProps> = ({
    isOpen,
    onClose,
    dataFilter,
    setDataFilter,
    setDataFilterNull,
    submitFilter,
    titleName
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
            {/* Form Content */}
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    <label htmlFor='role' className="block text-white">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={dataFilter?.role || ""}
                        onChange={setDataFilter}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                        <option value="">All Roles</option>
                        {Object.values(RoleType).map((role) => (
                            <option key={role} value={role as string}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label htmlFor='status' className="block text-white">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={String(dataFilter?.status)}
                        onChange={setDataFilter}
                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
                    >
                        <option value="">All Status</option>
                        <option value="true">Active</option>
                        <option value="false">Disabled</option>
                    </select>
                </div>
            </div>

        </FilterPopupLayout>
    );
};

export default FilterUserPopup;