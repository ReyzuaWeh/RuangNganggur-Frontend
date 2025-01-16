import { DataOutEmployer, DataOutJobseeker, DataOutUser } from "@dataType/fetch";
import { RoleType, UpdateSubProfile } from "@dataType/khusus";
import React from "react";

const JobseekerComponent = (
    { dataJobSeeker, updateSub, setProfile }: {
        dataJobSeeker: DataOutJobseeker | null | undefined,
        updateSub: UpdateSubProfile,
        setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>
    }
) => (
    <div className="py-2 flex items-center gap-x-2">
        <div>
            <label htmlFor="first_name" className="font-medium">
                First Name
            </label>
            <input
                id="first_name"
                value={dataJobSeeker?.first_name}
                onChange={e => updateSub(
                    {
                        value: e.target.value,
                        role: RoleType.jobseeker,
                        key: "first_name",
                        setProfile: setProfile
                    }
                )}
                type="text"
                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
            />
        </div>
        <div>
            <label htmlFor="last_name" className="font-medium">
                Last Name
            </label>
            <input
                id="last_name"
                value={dataJobSeeker?.last_name || ""}
                onChange={e => {
                    updateSub(
                        {
                            value: e.target.value,
                            role: RoleType.jobseeker,
                            key: "last_name",
                            setProfile: setProfile
                        }
                    )
                }}
                type="text"
                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
            />
        </div>
    </div>
);

const EmployerComponent = (
    { dataEmployer, updateSub, setProfile }: {
        dataEmployer: DataOutEmployer | null | undefined,
        updateSub: UpdateSubProfile,
        setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>
    }
) => (
    <div className="py-2 flex items-center gap-x-2">
        <div>
            <label htmlFor="company_name" className="font-medium">
                Company Name
            </label>
            <input
                id="company_name"
                value={dataEmployer?.company_name}
                onChange={e => updateSub(
                    {
                        value: e.target.value,
                        role: RoleType.employer,
                        key: "company_name",
                        setProfile: setProfile
                    }
                )}
                type="text"
                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
            />
        </div>
        <div>
            <label htmlFor="company_address" className="font-medium">
                Company Address
            </label>
            <input
                id="company_address"
                value={dataEmployer?.company_address || ""}
                onChange={e => updateSub(
                    {
                        value: e.target.value,
                        role: RoleType.employer,
                        key: "company_address",
                        setProfile: setProfile
                    }
                )}
                type="text"
                className="py-1 px-2 text-sm border-2 border-gray-400 rounded-md"
            />
        </div>
    </div>
);

export const EditProfileExtra = (
    { dataJobSeeker, dataEmployer, updateSub, setProfile, role }: {
        dataJobSeeker: DataOutJobseeker | null | undefined,
        dataEmployer: DataOutEmployer | null | undefined,
        updateSub: ({ value, role, key, setProfile }: {
            value: any;
            role: RoleType.employer | RoleType.jobseeker;
            key: string;
            setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>
        }) => void,
        setProfile: React.Dispatch<React.SetStateAction<DataOutUser | null>>,
        role: RoleType
    }
) => {
    switch (role) {
        case RoleType.jobseeker:
            return <JobseekerComponent dataJobSeeker={dataJobSeeker} updateSub={updateSub} setProfile={setProfile} />;
        case RoleType.employer:
            return <EmployerComponent dataEmployer={dataEmployer} updateSub={updateSub} setProfile={setProfile} />;
        default:
            return <></>;
    }
};
