import Swal from 'sweetalert2';

export const showSuccessSwal = ({ title = 'Your work has been saved', timer = 1500 }) => {
    Swal.fire(
        {
            position: 'top-end',
            icon: 'success',
            title,
            timer,
            showConfirmButton: false,
        }
    )

}
