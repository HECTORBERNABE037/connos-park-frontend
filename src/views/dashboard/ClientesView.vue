<template>
  <div class="clientes-container">
    <h2>Clientes</h2>

    <div class="table-card">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contrato</th>
            <th>Esquema de pago</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientes" :key="cliente.id">
            <td class="nombre-cell">
              <span class="avatar-mini">👤</span>
              {{ cliente.nombre }}
            </td>
            <td>{{ cliente.contratoId }}</td>
            <td>
              <span class="esquema-badge">{{ cliente.esquema }}</span>
            </td>
            <td class="text-center">
              <button class="btn-icon eye-btn" @click="verDetalles(cliente)">
                👁️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <DetalleClienteModal
      v-if="showDetalleModal"
      :cliente="clienteSeleccionado"
      @close="showDetalleModal = false"
    />

    <RegistrarClienteModal
      v-if="modalState.showRegistrarCliente"
      @close="modalState.showRegistrarCliente = false"
      @registrar="agregarNuevoCliente"
    />

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
// Importamos el estado global para controlar el modal de registro desde el sidebar
import { modalState } from '@/stores/modalState';
import DetalleClienteModal from './DetalleClienteModal.vue';
import RegistrarClienteModal from './RegistrarClienteModal.vue';

// Datos simulados iniciales
const clientes = ref([
  { id: 1, nombre: 'Juan Pérez González', contratoId: 'C-1234', esquema: 'Mensual', telefono: '5511223344', direccion: 'Calle 10 #500', correo: 'juan@mail.com', cajon: '10', fechaInicio: '2024-01-15', activo: true },
  { id: 2, nombre: 'María López', contratoId: 'C-5678', esquema: 'Quincenal', telefono: '5599887766', direccion: 'Av. Central #12', correo: 'maria@mail.com', cajon: '20', fechaInicio: '2024-02-01', activo: true },
]);

const showDetalleModal = ref(false);
const clienteSeleccionado = ref(null);

// Función para abrir el modal de detalles
const verDetalles = (cliente) => {
  clienteSeleccionado.value = cliente;
  showDetalleModal.value = true;
};

// Función que recibe los datos del formulario de registro y los añade a la tabla
const agregarNuevoCliente = (nuevoClienteData) => {
  clientes.value.push(nuevoClienteData);
  // Opcional: Mostrar una alerta de éxito
  // alert('Cliente registrado con éxito');
};
</script>

<style scoped>
.clientes-container { padding: 20px; }
h2 { font-size: 2rem; color: #333; margin-bottom: 30px; }
.table-card { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.custom-table { width: 100%; border-collapse: collapse; }
.custom-table th { text-align: left; padding: 15px; color: #666; font-weight: 600; border-bottom: 2px solid #f0f0f0; }
.custom-table td { padding: 15px; border-bottom: 1px solid #f9f9f9; color: #333; vertical-align: middle; }
.text-center { text-align: center; }

.nombre-cell { display: flex; align-items: center; font-weight: 500; }
.avatar-mini { margin-right: 10px; background: #E0E7FF; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; }
.esquema-badge { background: #F3F0FF; color: #7C5CFF; padding: 5px 12px; border-radius: 15px; font-size: 0.9rem; font-weight: 600; }
.btn-icon { background: none; border: none; cursor: pointer; font-size: 1.4rem; transition: transform 0.2s; }
.eye-btn:hover { transform: scale(1.2); }
</style>