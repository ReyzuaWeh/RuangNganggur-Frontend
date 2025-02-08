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
import { MdFilterListAlt } from "react-icons/md";

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
                setDataFilterNull={() => setFilterSets({})}
                submitFilter={submitFilter}
                titleName={"Filter User"}
            />
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">List Data User</h1>
            </div>
            <div className="w-full bg-white">
                <form
                    className="w-full bg-white p-6 rounded-lg"
                    onSubmit={e => {
                        e.preventDefault();
                        submitFilter();
                    }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Input Search */}
                        <div className="flex flex-col">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700">
                                Search
                            </label>
                            <input
                                type="text"
                                id="search"
                                name="search"
                                value={filterSets?.search || ""}
                                onChange={handleChangeFilter}
                                placeholder="Search by username or email"
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
                            />
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex items-end justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setOpenFilter(true)}
                                className="flex items-center text-primary hover:text-blue-500 transition-colors"
                            >
                                <MdFilterListAlt size={24} />
                                <span className="ml-1 hidden sm:inline-block">More Filters</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFilterSets({})}
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
                </form>
                <hr />
                <div className="flex w-full justify-between py-2 px-5 mx-auto">
                    <h2 className="text-lg font-semibold">Total Users: {users.length}</h2>
                    <a href={OurRoute.DataRoute["Admin Create User"]} className="btn-primary rounded py-1 px-2">Add User</a>
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