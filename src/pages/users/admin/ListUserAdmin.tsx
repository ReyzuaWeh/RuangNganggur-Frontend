import DashboardLayout from "@components/DashboardLayout";
import ListTableLayout from "@components/ListTableLayout";
import Loading from "@components/Loading";
import NotFound from "@components/NotFound";
import Pagination from "@components/Paginations";
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
        return <NotFound />
    }
    const [users, setUsers] = useState<DataOutUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [filterSets, setFilterSets] = useState<{
        search: string,
        role: RoleType | null,
        status: boolean | undefined,
    }>({
        search: "",
        role: null,
        status: undefined,
    })
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
            <div className="flex items-center gap-x-4 mb-5 md:mb-10">
                <h1 className="text-lg md:text-2xl font-semibold">List Data User</h1>
            </div>
            <div className="w-full bg-white">
                <form className="w-full bg-white p-6 rounded-lg"
                    onSubmit={e => {
                        e.preventDefault()
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
                    }}
                >
                    <h2 className="text-xl text-center font-bold mb-6 text-gray-700">
                        Filter
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Search Input */}
                        <div className="flex flex-col">
                            <label htmlFor="search" className="text-sm font-medium text-gray-700">
                                Search:
                            </label>
                            <input
                                type="text"
                                value={filterSets.search}
                                onChange={handleChangeFilter}
                                id="search"
                                name="search"
                                placeholder="Search by username or email"
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
                            />
                        </div>

                        {/* Role Select */}
                        <div className="flex flex-col">
                            <label htmlFor="role" className="text-sm font-medium text-gray-700">
                                Role:
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={filterSets.role || ""}
                                onChange={handleChangeFilter}
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full bg-white"
                            >
                                <option value="">All Roles</option>
                                {Object.values(RoleType).map((role) => (
                                    <option key={role} value={role as string}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Status Select */}
                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">
                                Status:
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={String(filterSets.status)}
                                onChange={handleChangeFilter}
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full bg-white"
                            >
                                <option value="">All Status</option>
                                <option value="true">Active</option>
                                <option value="false">Disabled</option>
                            </select>
                        </div>
                    </div>

                    {/* Button Apply Filter */}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="btn-primary text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            {saving ? "Applying.." : "Apply Filter"}
                        </button>
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
                                ) : currentUsers.map((user) => (
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
                                ))}
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