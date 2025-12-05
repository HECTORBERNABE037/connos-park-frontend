<template>
  <div class="clientes-container">
    <div class="header-section">
      <h2>Clientes</h2>
      <button class="btn-primary" @click="modalState.showRegistrarCliente = true">
        + Nuevo Cliente
      </button>
    </div>

    <div v-if="clientStore.error" class="error-alert">
      {{ clientStore.error }}
    </div>

    <div v-if="clientStore.isLoading" class="loading-state">
      Cargando clientes...
    </div>

    <div v-else class="table-card">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Estado</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cliente in clientStore.clients" :key="cliente.id">
            <td class="nombre-cell">
              <span class="avatar-mini">👤</span>
              {{ cliente.nombre }}
            </td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.correo }}</td>
            <td>
              <span :class="cliente.activo ? 'badge-active' : 'badge-inactive'">
                {{ cliente.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="text-center">
              <button class="btn-icon eye-btn" @click="verDetalles(cliente)">
                👁️
              </button>
            </td>
          </tr>
          
          <tr v-if="clientStore.clients.length === 0">
            <td colspan="5" class="text-center">No hay clientes registrados.</td>
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
      @registrar="handleRegistrarCliente"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useClientStore } from '@/stores/clientStore'; // 1. Importar Store
import { modalState } from '@/stores/modalState';
import DetalleClienteModal from './DetalleClienteModal.vue';
import RegistrarClienteModal from './RegistrarClienteModal.vue';

// 2. Inicializar Store
const clientStore = useClientStore();

// 3. Cargar datos al montar la vista
onMounted(() => {
  clientStore.fetchClients();
});

const showDetalleModal = ref(false);
const clienteSeleccionado = ref(null);

const verDetalles = (cliente) => {
  clienteSeleccionado.value = cliente;
  showDetalleModal.value = true;
};

// 4. Manejar el registro (Conectar con Backend)
const handleRegistrarCliente = async (nuevoClienteData) => {
  try {
    // Llamamos a la acción del store que contacta a la API
    await clientStore.createClient(nuevoClienteData);
    
    // Si todo sale bien, cerramos el modal y recargamos la lista
    modalState.showRegistrarCliente = false;
    await clientStore.fetchClients();
    alert("Cliente registrado exitosamente");
  } catch (error) {
    console.error(error);
    alert("Error al registrar: " + error);
  }
};
</script>

<style scoped>
/* Agrega estos estilos a los que ya tenías */
.header-section { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.btn-primary { background: #7C5CFF; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; }
.btn-primary:hover { background: #6a4be0; }
.error-alert { background: #fee2e2; color: #dc2626; padding: 10px; border-radius: 8px; margin-bottom: 20px; }
.loading-state { text-align: center; padding: 40px; color: #666; }
.badge-active { background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; }
.badge-inactive { background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600; }

/* ... (Mantén tus estilos anteriores de tabla) ... */
.clientes-container { padding: 20px; }
.table-card { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.custom-table { width: 100%; border-collapse: collapse; }
.custom-table th { text-align: left; padding: 15px; color: #666; font-weight: 600; border-bottom: 2px solid #f0f0f0; }
.custom-table td { padding: 15px; border-bottom: 1px solid #f9f9f9; color: #333; vertical-align: middle; }
.text-center { text-align: center; }
.nombre-cell { display: flex; align-items: center; font-weight: 500; }
.avatar-mini { margin-right: 10px; background: #E0E7FF; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.8rem; }
.btn-icon { background: none; border: none; cursor: pointer; font-size: 1.4rem; transition: transform 0.2s; }
.eye-btn:hover { transform: scale(1.2); }
</style>