<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-card">
      <div class="modal-header">
        <h2>Detalles del Cliente</h2>
      </div>

      <div class="modal-content">
        <div class="top-section">
          <div class="info-box">
            <h4>Información Personal</h4>
            <div class="client-details">
              <div class="avatar-placeholder">👤</div>
              <div class="text-details">
                <p class="client-name">{{ cliente.nombre }}</p>
                <p><strong>Tel:</strong> {{ cliente.telefono }}</p>
                <p class="small">{{ cliente.direccion }}</p>
                <p class="small truncate">{{ cliente.correo }}</p>
              </div>
            </div>
          </div>

          <div class="contract-box">
            <div class="contract-header">
              <p>Inicio contrato: <strong>{{ cliente.fechaInicio }}</strong></p>
              <span class="contract-id">{{ cliente.contratoId }}</span>
            </div>
            <div class="toggle-group">
              <span>Estado del Contrato</span>
              <div class="toggle" :class="{ active: cliente.activo }"></div>
            </div>
            <p class="esquema-label">Esquema: {{ cliente.esquema }}</p>
          </div>
        </div>

        <div class="bottom-section">
          <div class="lugar-row">
             <div class="car-icon-box">🚘</div>
             <div class="cajon-info">
               <h3>Cajón Asignado</h3>
               <h1 class="cajon-number">{{ cliente.cajon }}</h1>
             </div>
             <div class="status-box">
                <span>Estado del lugar</span>
                <div class="toggle active"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['cliente']);
</script>

<style scoped>
/* Reutilizamos estilos base para consistencia */
.modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-card { background: #F5F6FA; width: 800px; max-width: 95%; border-radius: 20px; padding: 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.modal-header h2 { text-align: center; color: #333; margin-bottom: 20px; }

.top-section { display: grid; grid-template-columns: 1.5fr 1fr; gap: 20px; margin-bottom: 20px; }
.info-box, .contract-box, .bottom-section { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }

.client-details { display: flex; gap: 15px; margin-top: 15px; align-items: center; }
.avatar-placeholder { width: 70px; height: 70px; background: #E0E7FF; color: #7C5CFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
.client-name { font-size: 1.3rem; font-weight: bold; margin-bottom: 5px; }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 200px; }

.contract-box { display: flex; flex-direction: column; justify-content: space-between; }
.contract-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.contract-id { font-weight: bold; color: #7C5CFF; }
.esquema-label { margin-top: 15px; font-weight: 500; text-align: right; }

.lugar-row { display: flex; align-items: center; justify-content: space-between; }
.car-icon-box { font-size: 3rem; background: #F3F0FF; padding: 10px; border-radius: 15px; }
.cajon-number { font-size: 2.5rem; margin: 0; color: #333; }

/* Toggles visuales */
.toggle-group { display: flex; align-items: center; justify-content: flex-end; gap: 10px; }
.toggle { width: 50px; height: 26px; background: #ccc; border-radius: 20px; position: relative; }
.toggle.active { background: #7C5CFF; }
.toggle::after { content: ''; position: absolute; left: 3px; top: 3px; width: 20px; height: 20px; background: white; border-radius: 50%; transition: transform 0.3s; }
.toggle.active::after { transform: translateX(24px); }
</style>