import SaveComponent from "@components/profile/SaveComponent";
import { DataOutUser } from "@dataType/fetch";
import { SaveProfileType, SetProfileType, setStateBoolean } from "@dataType/khusus";
import { useEffect } from "react";

const ModalsLayout = (
    {
        children,
        isVisible,
        setIsVisible,
        saveChange,
        setLoading,
        setNewProfile,
        profile,
        isLoading
    }: {
        children: React.ReactNode,
        isVisible: boolean,
        setIsVisible: setStateBoolean,
        setLoading: setStateBoolean,
        saveChange: SaveProfileType,
        setNewProfile: SetProfileType
        profile: DataOutUser | null,
        isLoading: boolean
    }
) => {
    useEffect(() => {
        setIsVisible(true)
    }, []);
    return (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 w-full flex justify-end items-right">
            <div
                className={`bg-white  min-w-[50%] p-6 py-12 rounded-lg rounded-tr-[0] rounded-br-[0] max-w-md transform transition-transform duration-300 
                    ${isVisible ? "translate-x-0" : "translate-x-full"}`
                }
            >
                <form onSubmit={(e) => {
                    e.preventDefault()
                    setLoading(true)
                    saveChange(profile, setNewProfile).finally(() => setLoading(false))
                }}
                >

                    {children}
                    <SaveComponent
                        isLoading={isLoading}
                    />

                </form>
            </div>
        </div>
    )
}
export default ModalsLayout