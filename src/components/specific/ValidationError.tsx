import { ErrorValidation } from "@dataType/fetch";
import functionSets from "@utils/function";

const ValidationComponents = ({ errorValid }: { errorValid: ErrorValidation | null }) => {
    return (
        <div className="pl-10 pr-5 text-justify border border-red-500 text-blue-800 bg-red-100 rounded-xl py-3 mb-2 text-sm">
            <ul className="list-disc w-full">
                {
                    Array.isArray(errorValid?.detail) ?
                        errorValid.detail.map((item, index) => (
                            <li key={index}>
                                {
                                    item.msg
                                        .replace("Field",
                                            `${functionSets.capitalizeFirstLetter(item.loc[1].replace("_", " "))} 
                                            ${functionSets.capitalizeFirstLetter((item.loc[2] && item.loc[2].replace("_", " ")) || "")}`
                                        )
                                        .replace("Input",
                                            `${functionSets.capitalizeFirstLetter(item.loc[1].replace("_", " "))} 
                                            ${functionSets.capitalizeFirstLetter((item.loc[2] && item.loc[2].replace("_", " ")) || "")}`
                                        )
                                        .replace("value",
                                            `${functionSets.capitalizeFirstLetter(item.loc[1].replace("_", " "))} 
                                            ${functionSets.capitalizeFirstLetter((item.loc[2] && item.loc[2].replace("_", " ")) || "")}`
                                        )
                                        .replace("Value",
                                            `${functionSets.capitalizeFirstLetter(item.loc[1].replace("_", " "))} 
                                            ${functionSets.capitalizeFirstLetter((item.loc[2] && item.loc[2].replace("_", " ")) || "")}`
                                        )
                                }
                            </li>
                        )) :
                        <li>
                            {errorValid?.detail}
                        </li>
                }
            </ul>
        </div>
    )
}
export default ValidationComponents;