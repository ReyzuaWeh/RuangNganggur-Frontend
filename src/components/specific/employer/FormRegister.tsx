import { EmployerFormInterface } from "@dataType/form"
import { handleChangeObjectType, useStateEmployerForm, useStateObjectAnyType } from "@dataType/khusus"

const RegisterEmployer = (
    { handleChange, formData, setFormData }: {
        handleChange: handleChangeObjectType, formData: EmployerFormInterface,
        setFormData: useStateEmployerForm
    }
) => {
    return (<>
        <div className="flex flex-col">
            <label htmlFor="company_name" className="font-semibold text-xs">
                Company Name <span className="text-red-600">*</span>
            </label>
            <input
                name="company_name"
                id="company_name"
                placeholder="Enter Company Name"
                type="text"
                className="text-sm w-full border outline-none rounded-md px-4 py-2 mt-2"
                value={formData.company_name}
                onChange={(e) => handleChange(e, setFormData as useStateObjectAnyType)}
            />
        </div>
    </>)
}

export default RegisterEmployer;