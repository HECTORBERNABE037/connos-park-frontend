<template>
  <div class="operaciones-container">
    <h2>Operaciones y Control</h2>
    
    <div class="table-card">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="col-cajon">Cajón</th>
            <th class="col-estado">Estado</th>
            <th class="col-asignacion">Asignación</th>
            <th class="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cajon in cajones" :key="cajon.id">
            <td class="cajon-id">{{ cajon.id }}</td>
            <td>
              <span :class="['status-badge', cajon.estadoClass]">
                {{ cajon.estado }}
              </span>
            </td>
            <td class="asignacion">{{ cajon.asignacion }}</td>
            <td>
              <button class="btn-action" @click="abrirAcciones(cajon)">🔧</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AccionesModal 
      v-if="showAcciones" 
      :data="cajonSeleccionado"
      @close="showAcciones = false"
      @guardar="actualizarCajon"
      @open-payment="abrirPago"
    />

    <PagoModal v-if="showPago" @close="showPago = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AccionesModal from './AccionesModal.vue';
import PagoModal from './PagoModal.vue';

// Datos iniciales (Simulación de BD)
const cajones = ref([
  { id: 10, estado: 'Ocupado', estadoClass: 'ocupado', asignacion: 'Juan Perez Rodriguez', contratoActivo: true, esFuncional: true },
  { id: 20, estado: 'Ocupado', estadoClass: 'ocupado', asignacion: 'Maria Lopez Salgado', contratoActivo: true, esFuncional: true },
  { id: 40, estado: 'Libre', estadoClass: 'libre', asignacion: '', contratoActivo: false, esFuncional: true },
  { id: 50, estado: 'Mantenimiento', estadoClass: 'mantenimiento', asignacion: '', contratoActivo: false, esFuncional: false },
]);

const showAcciones = ref(false);
const showPago = ref(false);
const cajonSeleccionado = ref(null);

// Preparamos los datos para el modal
const abrirAcciones = (cajon) => {
  cajonSeleccionado.value = {
    id: cajon.id, // ID interno para buscarlo después
    cajonId: cajon.id, // Para mostrar el número
    cliente: cajon.asignacion || 'Sin Asignar',
    contratoActivo: cajon.contratoActivo,
    esFuncional: cajon.esFuncional
  };
  showAcciones.value = true;
};

const abrirPago = () => {
  showPago.value = true;
};

// LÓGICA PRINCIPAL: Recibir cambios del modal y actualizar la tabla
const actualizarCajon = (datosNuevos) => {
  // 1. Encontramos el cajón en la lista
  const index = cajones.value.findIndex(c => c.id === datosNuevos.id);
  
  if (index !== -1) {
    const cajon = cajones.value[index];

    // 2. Actualizamos sus propiedades internas
    cajon.contratoActivo = datosNuevos.contratoActivo;
    cajon.esFuncional = datosNuevos.esFuncional;
    
    // 3. Lógica de Estados (Determina el color y texto de la etiqueta)
    if (!cajon.esFuncional) {
      // Si el toggle de abajo está apagado -> Mantenimiento (Rojo Intenso)
      cajon.estado = 'Mantenimiento';
      cajon.estadoClass = 'mantenimiento';
      cajon.asignacion = ''; // Se limpia asignación
    } else if (cajon.contratoActivo) {
      // Si funcional y contrato activo -> Ocupado (Verde)
      cajon.estado = 'Ocupado';
      cajon.estadoClass = 'ocupado';
      // Aquí idealmente actualizarías el nombre si lo cambiaron en el select
      cajon.asignacion = datosNuevos.cliente; 
    } else {
      // Si funcional pero contrato inactivo -> Libre (Rojo/Rosa)
      cajon.estado = 'Libre';
      cajon.estadoClass = 'libre';
      cajon.asignacion = '';
    }
  }

  // 4. Cerramos el modal
  showAcciones.value = false;
};
</script>

<style scoped>
/* ... Mismo CSS de la respuesta anterior ... */
.operaciones-container { padding: 20px; }
h2 { font-size: 2rem; color: #333; margin-bottom: 30px; }
.table-card { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.custom-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.custom-table th { text-align: left; padding: 15px; color: #666; font-weight: 600; border-bottom: 2px solid #f0f0f0; font-size: 1.1rem; }
.col-cajon { width: 10%; text-align: center; }
.col-estado { width: 20%; text-align: center; }
.col-asignacion { width: 50%; }
.col-acciones { width: 20%; text-align: center; }
.custom-table td { padding: 20px 15px; border-bottom: 1px solid #f9f9f9; color: #333; font-size: 1.2rem; vertical-align: middle; }
.custom-table td:first-child { text-align: center; font-size: 1.5rem; color: #444; }
.custom-table td:last-child { text-align: center; }
.status-badge { display: inline-block; padding: 8px 20px; border-radius: 20px; color: white; font-size: 0.9rem; font-weight: bold; min-width: 100px; text-align: center; }
.status-badge.ocupado { background-color: #4CAF50; }
.status-badge.libre { background-color: #FF4081; }
.status-badge.mantenimiento { background-color: #FF5252; }
.btn-action { background: none; border: none; cursor: pointer; font-size: 1.5rem; transition: transform 0.2s; }
.btn-action:hover { transform: scale(1.2); }
</style>