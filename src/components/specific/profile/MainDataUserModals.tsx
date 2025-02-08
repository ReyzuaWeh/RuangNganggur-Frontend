import { DataOutUser } from "@dataType/fetch"
import OurRoute from "@utils/route"

const MainDataUserModals = (
    {
        profile
    }: {
        profile: DataOutUser | null
    }
) => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col mt-5 overflow-hidden">
                {/* Header: judul dan link settings */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full">
                    <h2 className="font-bold text-lg">Your Account</h2>
                    {/* Pada layar kecil, tambahkan margin top agar link tidak terlalu mepet */}
                    <a
                        href={OurRoute.DataRoute["Setting"]}
                        className="underline font-semibold mt-2 sm:mt-0"
                    >
                        Change in settings
                    </a>
                </div>

                {/* Grid untuk data akun */}
                <div className="mt-3 grid gap-y-2">
                    {/* Row Username */}
                    <div className="grid grid-cols-1 sm:grid-cols-[30%_70%] sm:items-center border-b-2 border-gray-400 py-1">
                        <div className="font-semibold">Username</div>
                        <div>{profile?.username}</div>
                    </div>

                    {/* Row Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-[30%_70%] sm:items-center border-b-2 border-gray-400 py-1">
                        <div className="font-semibold">Email</div>
                        <div>{profile?.email || "Haven't configured it yet"}</div>
                    </div>

                    {/* Row Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-[30%_70%] sm:items-center border-b-2 border-gray-400 py-1">
                        <div className="font-semibold">Password</div>
                        <div>
                            <input
                                type="password"
                                disabled
                                value="Nuh uh, you can't see the value!"
                                maxLength={1}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainDataUserModals