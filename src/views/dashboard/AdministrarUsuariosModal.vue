<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card wide">
      <div class="modal-header">
        <h3>Administrar Personal</h3>
        <button class="close-x" @click="$emit('close')">×</button>
      </div>

      <div class="modal-body">
        <table class="user-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u.id">
              <td><strong>{{ u.username }}</strong></td>
              <td>{{ u.first_name || '---' }}</td>
              <td>
                <span class="role-tag">{{ getRolName(u.rol) }}</span>
              </td>
              <td>
                <button class="btn-action edit" @click="editar(u)">✏️</button>
                <button class="btn-action delete" @click="eliminar(u)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="editUser" class="edit-overlay">
        <div class="edit-card">
          <h4>Editar Usuario: {{ editUser.username }}</h4>
          
          <div class="form-group">
            <label>Nombre Completo:</label>
            <input v-model="editForm.first_name" class="input-field" />
          </div>
          
          <div class="form-group">
            <label>Rol:</label>
            <select v-model="editForm.rol" class="input-field">
              <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.nombre }}</option>
            </select>
          </div>

          <div class="edit-actions">
            <button class="btn-save" @click="guardarCambios">Guardar</button>
            <button class="btn-cancel" @click="editUser = null">Cancelar</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import usuarioService from '@/services/usuarioService';

const usuarios = ref([]);
const roles = ref([]);
const editUser = ref(null);
const editForm = reactive({ first_name: '', rol: '' });

// Cargar datos
const cargarDatos = async () => {
  try {
    const [resUsers, resRoles] = await Promise.all([
      usuarioService.getUsuarios(),
      usuarioService.getRoles()
    ]);
    usuarios.value = resUsers.results || resUsers;
    roles.value = resRoles.results || resRoles;
  } catch (error) {
    console.error(error);
  }
};

onMounted(cargarDatos);

// Helpers
const getRolName = (rolId) => {
  const r = roles.value.find(role => role.id === rolId);
  return r ? r.nombre : 'Rol ' + rolId;
};

// Acciones
const eliminar = async (usuario) => {
  if (confirm(`¿Eliminar a ${usuario.username}? Esta acción no se puede deshacer.`)) {
    try {
      await usuarioService.deleteUsuario(usuario.id);
      await cargarDatos();
    } catch (e) { alert("Error al eliminar"); }
  }
};

const editar = (usuario) => {
  editUser.value = usuario;
  editForm.first_name = usuario.first_name;
  editForm.rol = usuario.rol;
};

const guardarCambios = async () => {
  try {
    await usuarioService.updateUsuario(editUser.value.id, editForm);
    alert("Usuario actualizado");
    editUser.value = null;
    await cargarDatos();
  } catch (e) {
    alert("Error al actualizar");
  }
};
</script>

<style scoped>
.modal-card.wide { width: 700px; max-width: 95%; }
.user-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.user-table th, .user-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }
.role-tag { background: #E0E7FF; color: #7C5CFF; padding: 4px 8px; border-radius: 10px; font-size: 0.8rem; font-weight: bold; }
.btn-action { background: none; border: none; cursor: pointer; font-size: 1.2rem; margin-right: 10px; }
.edit-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.9); display: flex; justify-content: center; align-items: center; border-radius: 15px; }
.edit-card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); width: 400px; border: 1px solid #eee; }
.close-x { background: none; border: none; font-size: 1.5rem; cursor: pointer; float: right; }
/* Reutilizar estilos de botones del paso anterior */
.btn-save { background: #7C5CFF; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.btn-cancel { background: #ccc; color: #333; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.edit-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px; }
.input-field { width: 100%; padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px; }
.form-group { margin-bottom: 15px; }
</style>