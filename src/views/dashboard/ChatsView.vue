<template>
  <div class="chats-container">
    <div class="card chat-card">
      <div class="card-header">
        <h3>Avisos Generales</h3>
      </div>

      <div class="chat-history" ref="historyContainer">
        
        <div v-for="(grupo, index) in historial" :key="index" class="message-group">
          
          <div class="date-badge-container">
            <span class="date-badge">{{ grupo.fecha }}</span>
          </div>

          <div v-for="msg in grupo.mensajes" :key="msg.id" class="message-bubble">
            <p class="message-text">{{ msg.texto }}</p>
            <span class="message-time">{{ msg.hora }}</span>
          </div>

        </div>

      </div>

      <div class="divider"></div>

      <div class="input-area">
        <input 
          type="text" 
          v-model="nuevoMensaje" 
          placeholder="Escribe un mensaje y presiona Enter..." 
          class="message-input"
          @keyup.enter="enviarMensaje"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const nuevoMensaje = ref('');
const historyContainer = ref(null);

// Datos simulados (Mock Data) idénticos a tu imagen
const historial = ref([
  {
    fecha: '26 de septiembre',
    mensajes: [
      { id: 1, texto: 'Hoy 27 de septiembre se cierra temprano, el horario sera de 7am a 10 pm. Saludos cordiales.', hora: '9:10 pm' }
    ]
  },
  {
    fecha: '30 de septiembre',
    mensajes: [
      { id: 2, texto: 'El dia de mañana por ser primero de mes no se abrira para que tomen sus precausiones. Saludos.', hora: '9:00 am' }
    ]
  }
]);

// Función para enviar mensaje
const enviarMensaje = () => {
  if (nuevoMensaje.value.trim() === '') return;

  const ahora = new Date();
  // Formato de hora simple (ej. 10:30 am)
  const horaActual = ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
  
  // Lógica simple para agregar al día de "Hoy" (simulado)
  // En un sistema real, verificarías si la última fecha es hoy
  const ultimoGrupo = historial.value[historial.value.length - 1];
  
  // Simulamos agregar al último grupo para el ejemplo visual
  ultimoGrupo.mensajes.push({
    id: Date.now(),
    texto: nuevoMensaje.value,
    hora: horaActual
  });

  nuevoMensaje.value = ''; // Limpiar input

  // Auto-scroll al final
  nextTick(() => {
    if (historyContainer.value) {
      historyContainer.value.scrollTop = historyContainer.value.scrollHeight;
    }
  });
};
</script>

<style scoped>
.chats-container {
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
}

/* Tarjeta Principal */
.chat-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  height: 85vh; /* Altura fija para que parezca una app de chat */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Para que el contenido no se salga de los bordes redondeados */
}

.card-header {
  padding: 25px;
  /* border-bottom: 1px solid #f0f0f0; Opcional si quieres línea arriba */
}

.card-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: #1F1F1F;
  font-weight: 500;
}

/* Área de Historial (Scrollable) */
.chat-history {
  flex-grow: 1; /* Ocupa todo el espacio disponible */
  padding: 20px 40px;
  overflow-y: auto; /* Scroll vertical */
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Etiquetas de Fecha (Gris Oscuro) */
.date-badge-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.date-badge {
  background-color: #757575; /* Gris oscuro según imagen */
  color: white;
  padding: 8px 25px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Burbujas de Mensaje (Gris Claro) */
.message-bubble {
  background-color: #D9D9D9; /* Gris claro según imagen */
  padding: 20px;
  border-radius: 20px;
  position: relative;
  margin-bottom: 15px;
  color: #1F1F1F;
  font-size: 1.1rem;
  line-height: 1.5;
  width: fit-content;
  max-width: 80%; /* Para que no se estire demasiado */
}

/* Alineación de mensajes */
.message-group {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrar fechas y burbujas como en el diseño */
}

/* Hora del mensaje */
.message-time {
  display: block;
  text-align: right;
  font-size: 0.85rem;
  color: #555;
  margin-top: 5px;
  font-weight: 500;
}

.message-text {
  margin: 0;
}

/* Línea divisoria antes del input */
.divider {
  height: 1px;
  background-color: #ccc;
  width: 100%;
}

/* Área de Input (Footer) */
.input-area {
  padding: 25px 40px;
  background-color: white;
}

.message-input {
  width: 100%;
  padding: 15px 25px;
  border-radius: 30px; /* Forma de píldora */
  border: none;
  background-color: #D9D9D9; /* Fondo gris del input */
  font-size: 1.1rem;
  color: #333;
  outline: none;
  transition: background 0.3s;
}

.message-input:focus {
  background-color: #e6e6e6; /* Ligeramente más claro al escribir */
}

.message-input::placeholder {
  color: #777;
}
</style>