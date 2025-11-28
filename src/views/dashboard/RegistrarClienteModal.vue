<template>
  <div class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Registrar Cliente</h3>
      </div>
      
      <form @submit.prevent="handleRegistrar" class="modal-body form-grid">
        <div class="form-group full-width">
          <label>Nombre completo:</label>
          <input type="text" v-model="form.nombre" placeholder="Nombre Apellido" class="input-field" required />
        </div>

        <div class="form-group">
          <label>Teléfono:</label>
          <input type="tel" v-model="form.telefono" placeholder="55 1234 5678" class="input-field" required />
        </div>

        <div class="form-group full-width">
          <label>Dirección:</label>
          <input type="text" v-model="form.direccion" placeholder="Calle, Número, Colonia..." class="input-field" required />
        </div>

        <div class="form-group full-width">
          <label>Correo electrónico:</label>
          <input type="email" v-model="form.correo" placeholder="ejemplo@correo.com" class="input-field" required />
        </div>

        <div class="form-group">
          <label>Cajón asignado:</label>
          <select v-model="form.cajon" class="input-field" required>
            <option value="" disabled selected>Selecciona...</option>
            <option value="10">Cajón 10</option>
            <option value="20">Cajón 20</option>
            <option value="40">Cajón 40</option>
          </select>
        </div>

        <div class="form-group">
          <label>Fecha de inicio contrato:</label>
          <input type="date" v-model="form.fechaInicio" class="input-field" required />
        </div>

        <div class="form-group full-width">
          <label>Esquema de pago:</label>
          <select v-model="form.esquema" class="input-field" required>
            <option value="Mensual">Mensual ($500)</option>
            <option value="Quincenal">Quincenal ($300)</option>
          </select>
        </div>

        <div class="modal-footer full-width">
          <button type="button" class="btn-cancelar" @click="$emit('close')">Cancelar</button>
          <button type="submit" class="btn-registrar-modal">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const emit = defineEmits(['close', 'registrar']);

const form = reactive({
  nombre: '',
  telefono: '',
  direccion: '',
  correo: '',
  cajon: '',
  fechaInicio: '',
  esquema: 'Mensual'
});

const handleRegistrar = () => {
  // Aquí validamos y emitimos los datos al padre
  const nuevoCliente = {
    id: Date.now(), // ID temporal
    ...form,
    contratoId: `C-${Math.floor(Math.random() * 1000)}`, // Contrato ID simulado
    activo: true
  };
  emit('registrar', nuevoCliente);
  emit('close'); // Cerramos el modal
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 2000;
}
.modal-card {
  background: white; border-radius: 15px; padding: 25px; width: 600px; max-width: 95%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.modal-header h3 { text-align: center; margin: 0 0 25px 0; color: #333; font-size: 1.5rem; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.full-width { grid-column: span 2; }
.form-group label { display: block; font-weight: bold; font-size: 0.9rem; margin-bottom: 5px; color: #333; }
.input-field {
  width: 100%; padding: 12px; background-color: #F5F6FA; border: 1px solid #E0E0E0;
  border-radius: 8px; box-sizing: border-box; font-size: 1rem;
}
.modal-footer { display: flex; justify-content: flex-end; gap: 15px; margin-top: 20px; }
.btn-cancelar { background: transparent; color: #666; border: 1px solid #ccc; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold; }
.btn-registrar-modal { background: #7C5CFF; color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: bold; }
</style>