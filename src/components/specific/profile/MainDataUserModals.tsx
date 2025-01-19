import { DataOutUser } from "@dataType/fetch"

const MainDataUserModals = (
    {
        profile
    }: {
        profile: DataOutUser | null
    }
) => {
    return (
        <div className="flex flex-col mt-5">
            <div className="flex justify-between w-full">
                <h2 className="font-bold text-lg">Your Account</h2>
                <a href="/users/settings" className="underline font-semibold">Change in settings</a>
            </div>
            <table className="mt-3">
                <colgroup>
                    <col style={{ width: "30%" }} />
                    <col style={{ width: "70%" }} />
                </colgroup>
                <tbody>
                    <tr className="border-b-2 border-gray-400">
                        <td className="font-medium">Username</td>
                        <td>{profile?.username}</td>
                    </tr>
                    <tr className="border-b-2 border-gray-400">
                        <td className="font-medium">Email</td>
                        <td>{profile?.email || "Haven't configured it yet"}</td>
                    </tr>
                    <tr className="border-b-2 border-gray-400">
                        <td className="font-medium">Password</td>
                        <td>
                            <input
                                type="password"
                                disabled
                                value={"Nuh uh, you can't see the value!"}
                                maxLength={1}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default MainDataUserModals