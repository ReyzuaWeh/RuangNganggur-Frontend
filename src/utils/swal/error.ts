import Swal from "sweetalert2";
const swalError = (errorStat: number, errorMessage?: string, confirmButton?: string) => {
    if (errorStat === 500 || !errorStat) {
        return Swal.fire({
            icon: 'error',
            title: 'Server Error',
            text: 'Internal Server Error! Contact the Administrator',
        })
    }
    return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage || 'Something went wrong!',
        confirmButtonText: confirmButton || "Okay"
    })
}
export default swalError;
