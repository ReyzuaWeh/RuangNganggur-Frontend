import { DataLogsRegister } from "@dataType/fetch";
import fetchLog from "@utils/fetch/logs";
import functionSets from "@utils/function";
import { useEffect, useState } from "react";

const DataLogRegister = () => {
    const [logs, setLogs] = useState<DataLogsRegister[]>([]);
    useEffect(() => {
        fetchLog.getLogsRegister(100).then(data => setLogs(data)).catch(err => console.log(err))
    }, [])
    return (
        <div className="shadow-lg rounded-lg p-6 border bg-white mt-5">
            <h3 className="text-lg font-bold">Log Register</h3>
            <ul className="text-sm list-decimal py-1 bg-gray-200 rounded min-h-20 text-[#4f6566] overflow-auto font-extrabold max-h-60 pl-5 mt-4">
                {logs.map((log, index: number) => (
                    <li className="border-b-2 py-1 border-[#949494] mx-3" key={index}>
                        {log.action} | {log.users.username}
                        <span className="font-normal">, has been registered at{" "}</span>
                        {functionSets.formatDatetoString(log.timestamp)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default DataLogRegister
