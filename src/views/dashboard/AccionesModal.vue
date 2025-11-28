<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2>Acciones</h2>
      </div>

      <div class="modal-content">
        <div class="top-section">
          <div class="info-box">
            <h4>Información del Cliente <span>B1-8</span></h4>
            <div class="client-details">
              <div class="avatar-placeholder">👤</div>
              <div class="text-details">
                <p><strong>Nombre:</strong> {{ localData.cliente }}</p>
                <p><strong>Teléfono:</strong> +52 55 1234 5678</p>
                <p class="small">Dirección: Calle Jacarandas 124...</p>
              </div>
            </div>
          </div>

          <div class="contract-box">
            <div class="contract-info">
              <p>Fecha Inicio contrato</p>
              <h3>24/10/2024</h3>
              
              <div class="toggle-group">
                <span>Contrato ({{ localData.contratoActivo ? 'Activo' : 'Inactivo' }})</span>
                <div 
                  class="toggle" 
                  :class="{ active: localData.contratoActivo }"
                  @click="toggleContrato"
                ></div>
              </div>
            </div>
            
            <button class="btn-pago" @click="$emit('open-payment')">
              Realizar Pago
            </button>
          </div>
        </div>

        <div class="bottom-section">
          <div class="lugar-info">
            <h4>Información del Lugar</h4>
            <div class="lugar-row">
              <h1 class="cajon-number">{{ localData.cajonId }}</h1>
              
              <div class="status-control">
                <span>Estado ({{ localData.esFuncional ? 'Funcional' : 'Mantenimiento' }})</span>
                <div 
                  class="toggle" 
                  :class="{ active: localData.esFuncional }"
                  @click="toggleEstado"
                ></div>
              </div>

              <div class="assign-control">
                <label>Cliente Asignado</label>
                <select class="input-field" v-model="localData.cliente" :disabled="!localData.contratoActivo">
                  <option :value="localData.cliente">{{ localData.cliente }}</option>
                  <option value="">Sin Asignar</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-guardar" @click="guardarCambios">Guardar</button>
        <button class="btn-cancelar" @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['data']);
const emit = defineEmits(['close', 'open-payment', 'guardar']);

// Creamos una copia local de los datos para poder modificarlos en el modal
const localData = ref({
  id: null,
  cajonId: null,
  cliente: '',
  contratoActivo: true, // Controla el toggle de arriba
  esFuncional: true     // Controla el toggle de abajo
});

// Al abrir el modal, cargamos los datos que vienen de la tabla
onMounted(() => {
  if (props.data) {
    localData.value = { ...props.data }; 
  }
});

// Funciones para mover los toggles
const toggleContrato = () => {
  localData.value.contratoActivo = !localData.value.contratoActivo;
  // Si desactivas el contrato, podrías querer limpiar el cliente visualmente
  if (!localData.value.contratoActivo) {
    // Opcional: lógica extra aquí
  }
};

const toggleEstado = () => {
  localData.value.esFuncional = !localData.value.esFuncional;
};

// Emitir el evento guardar con los nuevos datos
const guardarCambios = () => {
  emit('guardar', localData.value);
};
</script>

<style scoped>
/* ... Estilos anteriores se mantienen igual, solo actualizamos el .toggle ... */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-card { background: #F5F6FA; width: 800px; max-width: 95%; border-radius: 20px; padding: 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.modal-header h2 { text-align: center; color: #333; margin-bottom: 20px; }
.top-section { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 20px; }
.info-box, .contract-box, .bottom-section { background: #EAEAEA; padding: 15px; border-radius: 12px; }
.client-details { display: flex; gap: 15px; margin-top: 10px; }
.avatar-placeholder { width: 60px; height: 60px; background: #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
.contract-box { display: flex; flex-direction: column; justify-content: space-between; text-align: right; }
.btn-pago { background-color: #7C5CFF; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px; }
.lugar-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 0; }
.cajon-number { font-size: 3rem; margin: 0; color: #333; }
.input-field { padding: 8px; border-radius: 5px; border: 1px solid #ccc; width: 200px; }
.modal-footer { display: flex; justify-content: center; gap: 20px; margin-top: 20px; }
.btn-guardar { background: #28a745; color: white; padding: 10px 30px; border: none; border-radius: 5px; cursor: pointer; }
.btn-cancelar { background: #dc3545; color: white; padding: 10px 30px; border: none; border-radius: 5px; cursor: pointer; }

/* --- ESTILOS DE LOS TOGGLES (Lo importante para tu imagen) --- */
.toggle-group, .status-control {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

.toggle {
  width: 50px;
  height: 26px;
  background: #ccc; /* Gris cuando está apagado */
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition: background 0.3s;
}

/* Cuando tiene la clase .active se pone morado */
.toggle.active {
  background: #7C5CFF; 
}

/* El círculo blanco */
.toggle::after {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

/* Mover el círculo a la derecha cuando está activo */
.toggle.active::after {
  transform: translateX(24px);
}
</style>