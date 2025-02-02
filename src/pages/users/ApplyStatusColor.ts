import { StatusAplicantType } from "@dataType/khusus";

const getStatusColor = (status: StatusAplicantType) => {
    switch (status) {
        case StatusAplicantType.accepted:
            return "bg-green-200 text-green-700";
        case StatusAplicantType.rejected:
            return "bg-red-100 text-red-700";
        case StatusAplicantType.process:
            return "bg-yellow-200 text-yellow-700";
        case StatusAplicantType.hold:
            return "bg-orange-300 text-yellow-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};
export { getStatusColor };
