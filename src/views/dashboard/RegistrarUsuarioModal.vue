<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Registrar Nuevo Usuario</h3>
      </div>
      
      <form @submit.prevent="handleRegistro" class="modal-body form-grid">
        
        <div class="form-group">
          <label>Nombre de Usuario (Login):</label>
          <input type="text" v-model="form.username" required class="input-field" placeholder="ej. juanperez" />
        </div>

        <div class="form-group">
          <label>Contraseña:</label>
          <input type="password" v-model="form.password" required class="input-field" placeholder="******" />
        </div>

        <div class="form-group">
          <label>Nombre Completo:</label>
          <input type="text" v-model="form.first_name" class="input-field" placeholder="Juan Perez" />
        </div>

        <div class="form-group">
          <label>Correo Electrónico:</label>
          <input type="email" v-model="form.email" class="input-field" placeholder="juan@connos.com" />
        </div>

        <div class="form-group full-width">
          <label>Rol de Usuario:</label>
          <select v-model="form.rol" required class="input-field">
            <option value="" disabled>Seleccionar Rol</option>
            <option v-for="rol in roles" :key="rol.id" :value="rol.id">
              {{ rol.nombre }}
            </option>
          </select>
        </div>

        <div class="modal-footer full-width">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancelar</button>
          <button type="submit" class="btn-save" :disabled="loading">
            {{ loading ? 'Registrando...' : 'Registrar Usuario' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import usuarioService from '@/services/usuarioService';

const emit = defineEmits(['close', 'success']);
const loading = ref(false);
const roles = ref([]);

const form = reactive({
  username: '',
  password: '',
  first_name: '',
  email: '',
  rol: '' // ID del rol
});

onMounted(async () => {
  try {
    const res = await usuarioService.getRoles();
    roles.value = res.results || res;
  } catch (error) {
    console.error("Error cargando roles", error);
  }
});

const handleRegistro = async () => {
  loading.value = true;
  try {
    await usuarioService.createUsuario(form);
    alert("Usuario registrado correctamente");
    emit('success');
    emit('close');
  } catch (error) {
    console.error(error);
    alert("Error al registrar: " + (error.response?.data?.detail || "Verifica los datos"));
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Estilos consistentes con tus otros modales */
.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 2000; }
.modal-card { background: white; border-radius: 15px; padding: 25px; width: 500px; max-width: 95%; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
.modal-header h3 { text-align: center; margin-bottom: 20px; color: #333; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.full-width { grid-column: span 2; }
.input-field { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px; background: #F5F6FA; }
.modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn-save { background: #7C5CFF; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
.btn-cancel { background: #ddd; color: #333; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
</style>