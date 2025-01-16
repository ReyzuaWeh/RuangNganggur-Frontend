import { JobSeekerFormInterface } from "@dataType/form"
import { handleChangeObjectType, useStateJobSeekerForm, useStateObjectAnyType } from "@dataType/khusus"

const RegisterJobSeeker = (
    { handleChange, formData, setFormData }: {
        handleChange: handleChangeObjectType, formData: JobSeekerFormInterface,
        setFormData: useStateJobSeekerForm
    }
) => {
    return (
        <>
            <div className="flex flex-col">
                <label htmlFor="nis" className="font-semibold text-xs">
                    NIS <span className="text-red-600">*</span>
                </label>
                <input
                    name="nis"
                    id="nis"
                    placeholder="Enter NIS"
                    type="text"
                    className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                    value={formData.nis}
                    onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="first_name"
                    className="font-semibold text-xs"
                >
                    First Name <span className="text-red-600">*</span>
                </label>
                <input
                    name="first_name"
                    id="first_name"
                    placeholder="Enter First Name"
                    type="text"
                    className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                    value={formData.first_name}
                    onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="last_name"
                    className="font-semibold text-xs"
                >
                    Last Name
                </label>
                <input
                    name="last_name"
                    id="last_name"
                    placeholder="Enter Last Name"
                    type="text"
                    className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                    value={formData.last_name as string || ""}
                    onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
                />
            </div>
        </>
    )
}

export default RegisterJobSeeker