import FilterOption from "@/components/commons/FilterOption";
import DashboardLayout from "@components/DashboardLayout";
import ListTableLayout from "@components/ListTableLayout";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
import FilterUserPopup from "@components/popup/FilterUserPopUp";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import { useMyProfile } from "@provider/userProvider";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import { useEffect, useState } from "react";

const ListUserAdmin = () => {
    const { profile } = useMyProfile()
    if (profile?.role !== RoleType.admin) {
        return <NotFound is403={true} />
    }
    const [users, setUsers] = useState<DataOutUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [filterSets, setFilterSets] = useState<{
        search?: string,
        role?: RoleType | null,
        status?: boolean | undefined,
    }>({})
    const [openFilter, setOpenFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const {
        totalDataPerPages: totalPages,
        currentData,
        handlePageChange
    } = functionSets.setDataPagination({ itemsPerPage, currentPage, setCurrentPage, dataSlice: users })
    const currentUsers = currentData as DataOutUser[]
    const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterSets((prev) => ({
            ...prev,
            [name]: value === "" ? undefined : name === "status" ? (value === "true" ? true : false) : value,
        }));
    };
    const setClearFilter = () => {
        setFilterSets({})
    }
    const setOpenPopUp = () => {
        setOpenFilter(true)
    }
    const submitFilter = () => {
        setSaving(true)
        fetchUser.getUsers({ ...filterSets }).then(res => {
            setUsers(res)
            setCurrentPage(1)
        }).catch(err => {
            if (err.status === 404) {
                setUsers([])
            }
            console.log(err)
        }).finally(() => setSaving(false))
    }
    useEffect(() => {
        fetchUser.getUsers({}).then(res => {
            setUsers(res)
        }).catch(err => {
            if (err.status === 404) {
                setUsers([])
            }
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    return loading ? <Loading /> : (
        <DashboardLayout>
            <FilterUserPopup
                isOpen={openFilter}
                onClose={() => setOpenFilter(false)}
                dataFilter={filterSets}
                setDataFilter={handleChangeFilter}
                setDataFilterNull={setClearFilter}
                submitFilter={submitFilter}
                titleName={"Filter User"}
            />
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">List Data User</h1>
            </div>
            <div className="w-full rounded bg-white">
                <FilterOption
                    filterSets={filterSets}
                    submitFilter={submitFilter}
                    setOpenPopUp={setOpenPopUp}
                    setClearFilter={setClearFilter}
                    handleChangeFilter={handleChangeFilter}
                    placeholder={"Search by username or email"}
                />
                <hr />
                <div className="flex w-full sm:flex-row flex-col sm:items-baseline items-end justify-between py-2 px-5 mx-auto">
                    <h2 className="text-lg font-semibold">Total: {users.length}</h2>
                    <a href={OurRoute.DataRoute["Admin Create Job"]}
                        className="bg-orange-400 hover:bg-orange-600 w-fit transition-colors text-white rounded py-1 px-2"
                    >Add</a>
                </div>
                <ListTableLayout>
                    {/* Table */}
                    <div className="w-full overflow-x-hidden">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border p-2 w-fit">No</th>
                                    <th className="border p-2">Username</th>
                                    <th className="border p-2 w-fit">Email</th>
                                    <th className="border p-2">Role</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!users ? (
                                    <tr>
                                        <td colSpan={6} className="text-center">No data user</td>
                                    </tr>
                                ) : saving ?
                                    <tr>
                                        <td colSpan={6} className="text-center">Finding....</td>
                                    </tr>
                                    : (currentUsers.map((user) => (
                                        <tr key={user.id} className={`text-left ${user.username}`}>
                                            <td className="border p-2 w-fit">
                                                {(currentPage - 1) * itemsPerPage + currentUsers.indexOf(user) + 1}.
                                            </td>
                                            <td className="border p-2">{user.username}</td>
                                            <td className="border p-2 w-fit">{user.email}</td>
                                            <td className="border p-2">{functionSets.capitalizeFirstLetter(user.role)}</td>
                                            <td
                                                className={`text-center text-white ${user.disabled ? "bg-red-500" : "bg-green-500"}`}
                                            >{user.disabled ? "Disabled" : "Active"}</td>
                                            <td className="border p-2">
                                                {/* Action Buttons */}
                                                <div className="flex justify-center text-center space-x-2">
                                                    <a
                                                        className="btn-primary text-white px-5 py-1 rounded flex items-center"
                                                        href={`${OurRoute.DataRoute["Admin Detail User"]}${user.id}`}
                                                    >
                                                        Detail
                                                    </a>
                                                    <button className="btn-danger text-white px-5 py-1 rounded flex items-center">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )))}
                            </tbody>
                        </table>
                    </div>
                </ListTableLayout>
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </DashboardLayout>
    );
};

export default ListUserAdmin;