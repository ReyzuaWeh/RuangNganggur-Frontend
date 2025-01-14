import { ErrorValidation } from "@dataType/fetch";
import { ValidRequireMSG, ValidValueError } from "@dataType/khusus";

const ValidationComponents = ({ errorValid }: { errorValid: ErrorValidation | null }) => {
    // console.log(errorValid)
    return (
        <div className="pl-10 pr-5 text-justify border border-red-500 text-blue-800 bg-red-100 rounded-xl py-3 mb-2 text-sm">
            <ul className="list-disc w-full">
                {
                    Array.isArray(errorValid?.detail) ?
                        errorValid.detail.map((item, index) => (
                            <li key={index}>
                                {
                                    (item.msg === ValidRequireMSG) ?
                                        item.msg.replace(ValidRequireMSG, item.loc[1]) :
                                        item.msg.split(ValidValueError)
                                }
                            </li>
                        )) : (errorValid?.detail)
                }
            </ul>
        </div>
    )
}
export default ValidationComponents;