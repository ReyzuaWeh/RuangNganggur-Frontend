import DownloadPembukuanComponent from "@components/DownloadPembukuanComponent";
import Pagination from "@components/Paginations";
import { DataOutUser } from "@dataType/fetch";
import { tahun_akhir_web, tahun_awal_web } from "@utils/BaseData";
import fetchPembukuan from "@utils/fetch/pembukuan";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserDetail from "./UserDetail";

const DataUsersComponent = () => {
    const [dataUsers, setDataUsers] = useState<DataOutUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [years, setYears] = useState<Record<number, string>>({});
    const [selectedUser, setSelectedUser] = useState<DataOutUser | null>(null);
    const [selectedYear, setSelectedYear] = useState(`${tahun_awal_web}/${tahun_awal_web + 1}`);
    const [currentPage, setCurrentPage] = useState(1)
    const dataPagination = functionSets.setDataPagination({
        itemsPerPage: 6,
        currentPage,
        setCurrentPage,
        dataSlice: dataUsers
    })
    const currentUserList = dataPagination.currentData as DataOutUser[]
    const handleDownload = () => {
        fetchPembukuan.getPembukuanUser(
            Number(selectedYear.split("/")[0]),
            Number(selectedYear.split("/")[1])
        )
            .then(async res => {
                // Sekarang header Content-Disposition seharusnya sudah tersedia
                const contentDisposition = res.headers.get("Content-Disposition");
                let filename = "download.xlsx";
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="(.+?)"/);
                    if (match) {
                        filename = match[1];
                    }
                }
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                window.URL.revokeObjectURL(url);
                Swal.fire({
                    title: "Success!",
                    text: `Pembukuan ${selectedYear} berhasil diunduh.`,
                    icon: "success",
                });
            })
            .catch(async error => {
                if (error.status) {
                    const message = await error.json()
                    Swal.fire({
                        title: "Error!",
                        text: `Gagal mengunduh pembukuan: ${message.detail}`,
                        icon: "error",
                    });
                }
                console.error("Error downloading pembukuan:", error);
            });
    };
    const handlePreview = () => {
        setLoading(true)
        fetchUser.getUsers({
            min_years: Number(selectedYear.split("/")[0]),
            max_years: Number(selectedYear.split("/")[1]),
            not_admin: true
        }).then(data => {
            setDataUsers(data)
            dataPagination.handlePageChange(1)
        }).catch(error => {
            console.error("Error fetching jobs:", error);
        }).finally(() => setLoading(false))
    }
    const confirmDownload = () => {
        Swal.fire({
            title: "Download Pembukuan",
            text: `Apakah Anda yakin ingin mengunduh pembukuan untuk tahun ${selectedYear}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                handleDownload();
            }
        });
    }
    useEffect(() => {
        fetchUser.getUsers({
            min_years: Number(selectedYear.split("/")[0]),
            max_years: Number(selectedYear.split("/")[1]),
            not_admin: true
        }).then(data => setDataUsers(data)).catch(error => {
            console.error("Error fetching users:", error);
        }).finally(() => setLoading(false))
        Array.from({ length: tahun_akhir_web - tahun_awal_web }).forEach((_, index) => {
            setYears(prev => ({
                ...prev,
                [tahun_awal_web + index]: `${tahun_awal_web + index}/${tahun_awal_web + index + 1}`
            }))
        })
    }, [])
    return (
        <div className="max-w-full mx-auto p-4">
            <h3 className="text-2xl font-semibold mb-4">User</h3>
            <div className="p-4 shadow border min-h-[25vh] grid m-0 grid-cols-1 sm:grid-cols-2 bg-white rounded lg:grid-cols-3 gap-x-4">
                {!dataUsers.length ? loading ? (
                    <div className="flex justify-center items-center w-full sm:col-span-2 lg:col-span-3 space-y-4 min-h-[25vh]">
                        Fetching data.....
                    </div>
                ) : (
                    <div className="flex justify-center items-center w-full sm:col-span-2 lg:col-span-3 space-y-4 min-h-[25vh]">
                        No data for these years
                    </div>
                ) : currentUserList.map((user, index) => (
                    <div key={index} className="border flex flex-col overflow-hidden rounded-lg p-4 shadow-md text-sm">
                        <p className="text-sm font-semibold flex items-center">
                            {user.username}
                        </p>
                        <p className="text-sm">Email: {user.email}</p>
                        <p className="text-sm">Role: {user.role}</p>
                        <p className="text-sm font-bold w-full text-end">{functionSets.formatDatetoString(user.registered_at)}</p>
                        <button
                            onClick={() => {
                                setSelectedUser(user);
                            }}
                            className="bg-blue-600 hover:bg-blue-900 transition-all self-end text-white py-1 px-3 mt-2 rounded w-full"
                        >
                            Detail
                        </button>
                    </div>
                ))}
            </div>
            {/* Select & Button Responsive */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                {Boolean(dataUsers.length) && <Pagination
                    currentPage={currentPage}
                    totalPages={dataPagination.totalDataPerPages}
                    onPageChange={dataPagination.handlePageChange}
                />}
                <DownloadPembukuanComponent
                    years_option={years}
                    setSelectedYear={setSelectedYear}
                    handlePreview={handlePreview}
                    handleConfirmDownload={confirmDownload}
                />
            </div>

            {selectedUser && (
                <UserDetail
                    data_user={selectedUser}
                    handleClose={() => setSelectedUser(null)}
                />
            )}

        </div>
    )
}
export default DataUsersComponent
