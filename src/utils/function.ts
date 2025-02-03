import { JWTType } from "@dataType/basic";
import { DataOutUser } from "@dataType/fetch";
import { RoleType, useStateObjectAnyType } from "@dataType/khusus";
import Swal from "sweetalert2";
import { deleteAccessToken } from "./localsave/getUser";
import swalSuccess from "./swal/success";

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
const truncateWord = (desc: string, maxLength: number): string => {
    return desc.length > maxLength ? desc.slice(0, maxLength) + '...' : desc;
}
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

const handleLogout = ({ setProfile, setIsLoggedIn }: {
    setProfile?: React.Dispatch<React.SetStateAction<DataOutUser | null>>,
    setIsLoggedIn?: React.Dispatch<React.SetStateAction<boolean> | null>
}
) => {
    Swal.fire({
        title: "Logout?",
        text: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
            title: "text-center font-bold text-2xl",
            actions: "w-full flex no-wrap",
            confirmButton: "my-0 mx-2 rounded-lg py-3 px-3.5",
            denyButton: "my-0 mx-2 rounded-lg p-1.5 py-3",
        },
    }).then((result) => {
        if (result.isConfirmed) {
            deleteAccessToken();
            if (setProfile) setProfile(null);
            if (setIsLoggedIn) setIsLoggedIn(false);
            swalSuccess({
                title: "Logout Success",
                message: "You have been logged out",
            });
            window.location.reload()
        }
    });
};


const formatNumbertoIDR = (num: number) => {
    return `Rp. ${num.toLocaleString("id-ID")}`;
};
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
    DateToString,
    formatNumbertoIDR,
    handleLogout,
    truncateWord
};
export default functionSets;