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
const DateToString = (date: string | Date) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const parsedDate = typeof date === "string" ? new Date(date) : date
    const year = parsedDate.getFullYear();
    const month = months[parsedDate.getMonth()];
    const day = parsedDate.getDate().toString().padStart(2, "0");

    return `${day} ${month} ${year}`;
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
const handleProfileNotSub = (
    key: string,
    value: any,
    setState: React.Dispatch<React.SetStateAction<DataOutUser | null>>
) => {
    setState(prev => {
        if (prev) {
            return {
                ...prev,
                [key]: value
            }
        }
        return null
    })
}
const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            }
        };
        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
    });
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
    refreshPage,
    getBase64,
    handleProfileNotSub,
    DateToString
};
export default functionSets;