<template>
    <div class="w-full p-4 ">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="showAlert">
         Aleerta
        </button>
    </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    showAlert() {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Esto es una alerta de SweetAlert2',
        icon: 'success',
        // showCancelButton: true,
        // confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        // confirmButtonText: '¡Sí, bórralo!',
        // customClass: {
        //     container: 'bg-gray-50',
        //     popup: 'border border-gray-300 rounded-md shadow-lg',
        //     header: 'bg-gray-200 rounded-t-md',
        //     title: 'text-gray-900 font-bold',
        //     content: 'text-gray-600',
        //     closeButton: '...',
        //     confirmButton: 'px-4 py-2 border rounded-md bg-blue-500 text-white',
        //     cancelButton: 'px-4 py-2 border rounded-md bg-red-500 text-white'
        // }
      });
    }
  }
}
</script>