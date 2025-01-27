import { JWTType } from "@dataType/basic";
import { DataOutUser } from "@dataType/fetch";
import { RoleType, useStateObjectAnyType } from "@dataType/khusus";

const isEqualAndSame = (data1: any, data2: any) => data1 === data2
const handleChangeFormObject = (e: React.ChangeEvent<HTMLInputElement>,
    setFormData: useStateObjectAnyType
) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};

const capitalizeFirstLetter = (str: string) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
const handleChangeProfile = (
    key: 'employer' | 'jobseeker',
    setState: React.Dispatch<React.SetStateAction<DataOutUser>>,
    nestedKey: string,
    value: any
) => {
    setState((prevUser) => ({
        ...prevUser,
        [key]: {
            ...prevUser[key],
            [nestedKey]: value,
        },
    }));
};

const refreshPage = () => window.location.reload()

const getToken = (): JWTType | null => localStorage.getItem('access_token')

const isEmployer = (role: RoleType) => isEqualAndSame(role, RoleType.employer)
const isJobSeeker = (role: RoleType) => isEqualAndSame(role, RoleType.employer)
const isAdmin = (role: RoleType) => isEqualAndSame(role, RoleType.admin)

const functionSets = {
    handleChangeFormObject,
    handleChangeProfile,
    capitalizeFirstLetter,
    isEmployer,
    isJobSeeker,
    isAdmin,
    getToken,
    refreshPage
};
export default functionSets;