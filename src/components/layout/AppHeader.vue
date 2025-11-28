<template>
  <header class="app-header">
    <div class="search-bar">
      <input type="text" placeholder="🔍 Buscar por Cliente" />
    </div>
    
    <div class="user-profile">
      <span>Bienvenida <strong>Fabiola S.</strong></span>
      </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: transparent; /* Se funde con el fondo gris */
}

.search-bar input {
  padding: 10px 15px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  background-color: white;
}

.user-profile {
  font-size: 1rem;
  color: #333;
}
</style>