<template>
  <div class="opciones-container">
    <div class="header-section">
      <h2>Mi Cuenta</h2>
      <p>Gestión de perfil y sistema</p>
    </div>

    <div class="content-wrapper">
      
      <div class="card profile-card">
        <div class="profile-header">
          <div class="avatar-large">{{ userInitial }}</div>
          <div class="profile-info">
            <h3>{{ user.first_name || user.username || 'Cargando...' }}</h3>
            <span class="role-badge">{{ userRoleName }}</span>
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-item">
            <span class="label">Usuario</span>
            <span class="value">@{{ user.username }}</span>
          </div>
          <div class="detail-item">
            <span class="label">Correo</span>
            <span class="value">{{ user.email || 'Sin correo' }}</span>
          </div>
        </div>
      </div>

      <div v-if="isAdmin" class="card admin-zone">
        <h3>Panel de Administración</h3>
        <p class="description">Gestión de personal y accesos.</p>
        <div class="admin-actions">
          <button class="btn-admin register" @click="showModalRegistro = true">
            <span>👤+</span> Registrar Nuevo Usuario
          </button>
          <button class="btn-admin manage" @click="showModalGestion = true">
            <span>⚙️</span> Administrar Usuarios
          </button>
        </div>
      </div>

      <div class="card actions-card">
        <button class="btn-logout" @click="handleLogout">🚪 Cerrar Sesión</button>
      </div>

    </div>

    <RegistrarUsuarioModal v-if="showModalRegistro" @close="showModalRegistro = false" />
    <AdministrarUsuariosModal v-if="showModalGestion" @close="showModalGestion = false" />

  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
// CORRECCIÓN: Importamos desde './' porque están en la misma carpeta
import RegistrarUsuarioModal from './RegistrarUsuarioModal.vue';
import AdministrarUsuariosModal from './AdministrarUsuariosModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const showModalRegistro = ref(false);
const showModalGestion = ref(false);

const user = computed(() => authStore.user || {});

// Lógica de Rol: Busca 'rol_nombre' que enviaremos desde el backend
const userRoleName = computed(() => user.value.rol_nombre || 'Encargado');

const isAdmin = computed(() => {
  return userRoleName.value === 'Administrador';
});

const userInitial = computed(() => {
  const name = user.value.first_name || user.value.username || 'U';
  return name.charAt(0).toUpperCase();
});

const handleLogout = () => {
  if(confirm("¿Cerrar sesión?")) {
    authStore.logout();
    router.push('/login');
  }
};
</script>

<style scoped>
/* (Mantén los mismos estilos CSS que te di en la respuesta anterior, son correctos) */
.opciones-container { padding: 40px 20px; max-width: 600px; margin: 0 auto; }
.header-section { margin-bottom: 30px; text-align: center; }
.header-section h2 { color: #333; font-size: 1.8rem; }
.header-section p { color: #666; }
.content-wrapper { display: flex; flex-direction: column; gap: 20px; }
.card { background: white; border-radius: 15px; padding: 25px; box-shadow: 0 5px 20px rgba(0,0,0,0.03); }
.profile-header { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; border-bottom: 1px solid #f0f0f0; padding-bottom: 20px; }
.avatar-large { width: 70px; height: 70px; background: #7C5CFF; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; font-weight: bold; }
.profile-info h3 { margin: 0; color: #333; }
.role-badge { background: #E0E7FF; color: #7C5CFF; padding: 4px 10px; border-radius: 15px; font-size: 0.8rem; font-weight: bold; display: inline-block; margin-top: 5px; }
.detail-item { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; }
.detail-item .label { color: #888; }
.detail-item .value { font-weight: 600; color: #333; }
.admin-zone { border: 1px solid #E0E7FF; background: #FAFBFF; }
.admin-zone h3 { margin-top: 0; color: #333; font-size: 1.1rem; }
.description { font-size: 0.9rem; color: #666; margin-bottom: 15px; }
.admin-actions { display: flex; flex-direction: column; gap: 10px; }
.btn-admin { padding: 12px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; text-align: left; display: flex; align-items: center; gap: 10px; transition: transform 0.2s; }
.btn-admin span { font-size: 1.2rem; }
.btn-admin.register { background: white; border: 1px solid #7C5CFF; color: #7C5CFF; }
.btn-admin.manage { background: #7C5CFF; color: white; }
.btn-admin:hover { transform: translateX(5px); }
.btn-logout { width: 100%; background: #FFEBEE; color: #D32F2F; border: none; padding: 12px; border-radius: 8px; font-weight: bold; cursor: pointer; }
.btn-logout:hover { background: #FFCDD2; }
</style>