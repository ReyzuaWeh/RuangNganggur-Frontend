import LandingLayout from "@components/LandingLayout";
import Pagination from "@components/Paginations";
import { DataOutUser } from "@dataType/fetch";
import { RoleType } from "@dataType/khusus";
import fetchUser from "@utils/fetch/users";
import functionSets from "@utils/function";
import OurRoute from "@utils/route";
import { useEffect, useState } from "react";
import Is401 from "./is401";

const CompanyListing = () => {
    const [dataCompany, setDataCompany] = useState<DataOutUser[]>([])
    const [statusIs401, setIs401] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [filter, setFilter] = useState({
        company_name: "",
        location: ""
    })
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilter({
            ...filter,
            [name]: value
        })
    }
    const handleSearch = () => {
        fetchUser.getUsers({
            role: RoleType.employer,
            ...filter
        }).then(data => setDataCompany(data)).catch(err => {
            if (err.status === 404) setDataCompany([])
            console.log(err)
        })
    }
    const dataPagination = functionSets.setDataPagination({
        itemsPerPage: 4,
        currentPage,
        setCurrentPage,
        dataSlice: dataCompany
    })
    const currentDataCompany = dataPagination.currentData as DataOutUser[]
    useEffect(() => {
        fetchUser.getUsers({
            role: RoleType.employer
        }).then(data => {
            setDataCompany(data)
            setIs401(false)
        }).catch(e => {
            console.log(e)
            if (e.status === 401) {
                setIs401(true)
            }
            console.error(e)
        })
    }, [])
    if (statusIs401) return <Is401 />
    return (
        <LandingLayout>
            <div className="bg-gradient-home flex flex-col text-white py-8">
                <form
                    className="flex flex-col justify-center items-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch()
                    }}
                >
                    <div className="bg-gray-300 p-4 mb-4 rounded-lg">
                        <h1 className="text-4xl text-accents font-semibold">
                            Ruang<span className="text-primary">Nganggur.</span>
                        </h1>
                    </div>

                    <div className="flex lg:flex-row flex-col mx-0 lg:mx-auto items-center gap-2 justify-center">
                        <input
                            type="text"
                            name="company_name"
                            value={filter.company_name}
                            className="bg-white text-primary w-full lg:w-1/2 p-2 rounded outline-none"
                            placeholder="Company Name"
                            onChange={handleFilter}
                        />
                        <div className="lg:w-1/2 w-full flex flex-0 justify-between gap-x-2">
                            <input
                                type="text"
                                name="location"
                                value={filter.location}
                                className="bg-white text-primary w-3/4 p-2 rounded outline-none"
                                placeholder="Location"
                                onChange={handleFilter}
                            />
                            <button className="bg-accents p-2 w-1/4 rounded-lg text-primary text-sm">
                                Cari
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-1 flex-1 lg:grid-cols-2 2xl:grid-cols-4 p-4 lg:px-14  gap-6 place-items-center">
                {currentDataCompany.map((company, index) => (
                    <div key={index} className="bg-primary text-white p-6 w-full h-fit min-h-full shadow-md rounded-lg flex flex-col justify-between">
                        <div className="flex-1 overflow-x-hidden">
                            <h2 className="text-xl font-bold text-accents border-b-2 flex-1 border-[#3170ac] pb-2">{company.employer?.company_name}</h2>
                            <div className="grid grid-cols-[1fr_min-content] sm:grid-cols-[auto_min-content_1fr] gap-x-3 mt-1">
                                <p className="w-fit font-semibold">Company Phone</p>
                                <p className="w-fit"> : </p>
                                <p className="w-fit pb-2 col-span-2 sm:col-span-1">{company.employer?.company_phone_number || "N/A"}</p>

                                <p className="w-fit font-semibold">Company Email</p>
                                <p className="w-fit"> : </p>
                                <p className="w-fit pb-2 col-span-2 sm:col-span-1">{company.email}</p>

                                <p className="w-fit font-semibold">Company Location</p>
                                <p className="w-fit"> : </p>
                                <p className="w-fit pb-2 col-span-2 sm:col-span-1">{company.employer?.company_address || "N/A"}</p>
                            </div>
                        </div>
                        <div className="pt-2">
                            <div
                                className="h-[200px] scrollbar-modals-apply-description
                                 text-justify bg-gray-400 text-[#3d3d3d] p-3 rounded-md w-full h-75 overflow-auto">
                                {company.employer?.company_description || "No description...."}
                            </div>
                            <div className="flex justify-end mt-2">
                                <a
                                    href={`${OurRoute.DataRoute["Detail User"]}${company.id}`}
                                    className="btn-accent items-start rounded-md font-semibold w-1/3 self-end text-white"
                                >
                                    Detail
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {dataPagination.totalDataPerPages > 1 && (<div className="flex items-center justify-between p-4">
                <div className="p-4 text-center">
                    <p className="text-sm text-gray-600">
                        Showing {currentPage} of {dataPagination.totalDataPerPages} pages
                    </p>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={dataPagination.totalDataPerPages}
                    onPageChange={dataPagination.handlePageChange}
                />
            </div>)}
        </LandingLayout>
    );
}
export default CompanyListing