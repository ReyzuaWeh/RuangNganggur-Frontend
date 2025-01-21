import fetchUser from "@/utils/fetch/users"
import React from "react"
import { DataOutUser } from "./fetch"
import { EmployerFormInterface, JobSeekerFormInterface } from "./form"

enum RoleType {
    admin = "admin",
    employer = "employer",
    jobseeker = "jobseeker"
}
enum JobType {
    full_time = "full_time",
    part_time = "part_time",
    internship = "internship",
    contract = "contract"
}
enum GenderType {
    male = "male",
    female = "female",
}
enum StatusAplicantType {
    process = "process",
    hold = "hold",
    accepted = "accepted",
    rejected = "rejected"
}

type handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void
type handleChangeObjectType = (e: React.ChangeEvent<HTMLInputElement>, setFormData: useStateObjectAnyType) => void
type modalFunctionType = (e: React.SetStateAction<boolean>) => void
type modalFunctionClose = () => void

type useStateObjectAnyType = React.Dispatch<React.SetStateAction<object>>
type useStateJobSeekerForm = React.Dispatch<React.SetStateAction<JobSeekerFormInterface>>
type useStateEmployerForm = React.Dispatch<React.SetStateAction<EmployerFormInterface>>
type setStateProfileType = React.Dispatch<React.SetStateAction<DataOutUser | null>>
type setStateBoolean = (value: React.SetStateAction<boolean>) => void

type SaveProfileType = typeof fetchUser.saveChange
type SetProfileType = React.Dispatch<React.SetStateAction<DataOutUser | null>>
type UpdateSubProfile = typeof fetchUser.updateSubProfile
type UpdateSubProfileParams = Parameters<UpdateSubProfile>

interface ModalsProfileParams {
    onClose?: modalFunctionClose,
    updateSub: UpdateSubProfile,
    saveChange: SaveProfileType,
    setNewProfile: SetProfileType,
}

const ValidRequireMSG = "Field required"
const ValidValueError = "Value error, "

export {
    GenderType,
    JobType,
    RoleType,
    StatusAplicantType,
    ValidRequireMSG,
    ValidValueError
}
export type {
    handleChangeObjectType,
    handleChangeType,
    modalFunctionClose,
    modalFunctionType,
    ModalsProfileParams,
    SaveProfileType,
    SetProfileType,
    setStateBoolean,
    setStateProfileType,
    UpdateSubProfile,
    UpdateSubProfileParams,
    useStateEmployerForm,
    useStateJobSeekerForm,
    useStateObjectAnyType
}

