<template>
  <div class="opciones-container">
    <div class="card">
      <h2>Opciones</h2>
      
      <div class="user-info">
        <h3 class="role">Administrador</h3>
        <h1 class="welcome-text">Bienvenida Fabiola S.</h1>
      </div>

      <div class="action-area">
        <button @click="handleLogout" class="btn-logout">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
  // 1. Limpiar tokens de seguridad
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  
  // 2. Redirigir al Login
  router.push('/login');
};
</script>

<style scoped>
.opciones-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.card {
  background: white;
  width: 100%;
  max-width: 800px; /* Ajusta el ancho máximo de la tarjeta */
  height: 80vh;     /* Altura grande como en tu diseño */
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
}

h2 {
  font-size: 1.8rem;
  color: #000;
  margin-bottom: 40px;
  font-weight: 500;
}

.user-info {
  text-align: center;
  margin-top: 20px;
}

.role {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 500;
}

.welcome-text {
  font-size: 2.2rem;
  color: #333;
  font-weight: 500;
  margin-bottom: 60px;
}

.action-area {
  display: flex;
  justify-content: center;
}

.btn-logout {
  background-color: #7C5CFF; /* Tu color morado */
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: 500;
  min-width: 200px;
}

.btn-logout:hover {
  background-color: #6a4be0;
}
</style>