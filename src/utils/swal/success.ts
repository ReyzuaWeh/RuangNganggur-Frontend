import Swal from "sweetalert2";
const swalSuccess = ({ title, message }: { title: string, message: string }) => {
    return Swal.fire({
        icon: "success",
        title: title,
        text: message,
    });
}
export default swalSuccess