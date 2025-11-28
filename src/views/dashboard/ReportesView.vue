<template>
  <div class="reportes-container">
    <h2>Reportes</h2>

    <div class="card chart-card">
      <div class="card-header">
        <h3>Ingresos del mes</h3>
        <span class="card-id">D-1</span>
      </div>
      <div class="chart-wrapper">
        <div class="bar-group" v-for="(mes, index) in ingresosData" :key="index">
          <span class="bar-value">{{ mes.monto }}</span>
          <div class="bar" :style="{ 'height': mes.height, 'background': mes.color }"></div>
          <span class="bar-label">{{ mes.nombre }}</span>
        </div>
      </div>
    </div>

    <div class="card calendar-card">
      <div class="card-header">
        <h3>Selecciona el Periodo del Reporte</h3>
      </div>

      <div class="calendar-layout">
        
        <div class="action-side">
          <div class="selected-dates">
            <p><strong>Desde:</strong> {{ range.start ? formatDate(range.start) : '---' }}</p>
            <p><strong>Hasta:</strong> {{ range.end ? formatDate(range.end) : '---' }}</p>
          </div>
          
          <span class="card-id-center">D-2</span>

          <button 
            class="btn-generar" 
            @click="generarPDF" 
            :disabled="!range.start || !range.end || loading"
          >
            <span v-if="!loading">+ Generar Reporte</span>
            <span v-else>Generando... ⏳</span>
          </button>
        </div>

        <div class="calendar-wrapper">
          <div class="calendar-header-nav">
            <button @click="changeMonth(-1)">&lt;</button>
            <span class="card-id-top">D-3</span>
            <button @click="changeMonth(1)">&gt;</button>
          </div>

          <div class="dual-calendar">
            <div class="month-grid">
              <h4 class="month-title">{{ currentMonthName }} {{ currentYear }}</h4>
              <div class="weekdays">
                <span v-for="d in diasSemana" :key="d">{{ d }}</span>
              </div>
              <div class="days">
                <span v-for="blank in blankDays1" :key="'b1-'+blank" class="day empty"></span>
                <span 
                  v-for="day in daysInMonth1" 
                  :key="'m1-'+day" 
                  class="day"
                  :class="getDayClass(day, 0)"
                  @click="selectDate(day, 0)"
                >
                  {{ day }}
                </span>
              </div>
            </div>

            <div class="month-grid desktop-only">
              <h4 class="month-title">{{ nextMonthName }} {{ nextMonthYear }}</h4>
              <div class="weekdays">
                <span v-for="d in diasSemana" :key="d">{{ d }}</span>
              </div>
              <div class="days">
                <span v-for="blank in blankDays2" :key="'b2-'+blank" class="day empty"></span>
                <span 
                  v-for="day in daysInMonth2" 
                  :key="'m2-'+day" 
                  class="day"
                  :class="getDayClass(day, 1)"
                  @click="selectDate(day, 1)"
                >
                  {{ day }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// --- LÓGICA DE LA GRÁFICA ---
const ingresosData = ref([
  { nombre: 'Enero', monto: '10,000', height: '40%', color: '#5D9BFF' },
  { nombre: 'Febrero', monto: '12,000', height: '55%', color: '#E052FF' },
  { nombre: 'Marzo', monto: '20,000', height: '85%', color: '#7C5CFF' },
  { nombre: 'Abril', monto: '11,000', height: '45%', color: '#FF4081' },
  { nombre: 'Mayo', monto: '13,000', height: '60%', color: '#4CAF50' },
  { nombre: 'Junio', monto: '15,000', height: '70%', color: '#FF8A65' },
]);

// --- LÓGICA DEL CALENDARIO ---
const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
const currentDate = ref(new Date()); 
const range = ref({ start: null, end: null });
const loading = ref(false);

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());
const currentMonthName = computed(() => currentDate.value.toLocaleString('es-ES', { month: 'long' }));
const daysInMonth1 = computed(() => getDaysInMonth(currentYear.value, currentMonth.value));
const blankDays1 = computed(() => getFirstDayOfMonth(currentYear.value, currentMonth.value));

const nextDate = computed(() => new Date(currentYear.value, currentMonth.value + 1, 1));
const nextMonthYear = computed(() => nextDate.value.getFullYear());
const nextMonth = computed(() => nextDate.value.getMonth());
const nextMonthName = computed(() => nextDate.value.toLocaleString('es-ES', { month: 'long' }));
const daysInMonth2 = computed(() => getDaysInMonth(nextMonthYear.value, nextMonth.value));
const blankDays2 = computed(() => getFirstDayOfMonth(nextMonthYear.value, nextMonth.value));

const changeMonth = (delta) => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + delta, 1);
};

const selectDate = (day, monthOffset) => {
  const year = monthOffset === 0 ? currentYear.value : nextMonthYear.value;
  const month = monthOffset === 0 ? currentMonth.value : nextMonth.value;
  const selectedDate = new Date(year, month, day);

  if (!range.value.start || (range.value.start && range.value.end)) {
    range.value.start = selectedDate;
    range.value.end = null;
  } else {
    if (selectedDate < range.value.start) {
      range.value.end = range.value.start;
      range.value.start = selectedDate;
    } else {
      range.value.end = selectedDate;
    }
  }
};

const getDayClass = (day, monthOffset) => {
  const year = monthOffset === 0 ? currentYear.value : nextMonthYear.value;
  const month = monthOffset === 0 ? currentMonth.value : nextMonth.value;
  const date = new Date(year, month, day);
  const time = date.getTime();

  const start = range.value.start ? range.value.start.getTime() : null;
  const end = range.value.end ? range.value.end.getTime() : null;

  if (time === start || time === end) return 'selected'; 
  if (start && end && time > start && time < end) return 'in-range'; 
  return '';
};

const formatDate = (date) => {
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
};

const generarPDF = () => {
  loading.value = true;
  console.log("Generando reporte...");
  setTimeout(() => {
    loading.value = false;
    alert("✅ Reporte generado exitosamente (Simulación)");
  }, 1500);
};
</script>

<style scoped>
.reportes-container { padding: 20px; }
h2 { font-size: 2rem; color: #333; margin-bottom: 30px; font-weight: 500; }

.card {
  background: white; border-radius: 20px; padding: 30px; 
  box-shadow: 0 4px 20px rgba(0,0,0,0.03); margin-bottom: 30px;
  position: relative;
}
.card-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
.card-header h3 { font-size: 1.3rem; color: #333; margin: 0; font-weight: 600; }
.card-id { font-size: 1.5rem; color: #000; font-weight: 500; }

/* --- GRÁFICA DE BARRAS --- */
.chart-wrapper { 
  display: flex; 
  justify-content: space-around; 
  align-items: flex-end; 
  height: 300px; /* Altura fija importante */
  padding: 20px 0; 
  width: 100%;
}
.bar-group { 
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  width: 100%; 
  height: 100%; /* Ocupa todo el alto */
  justify-content: flex-end; /* Alinea las barras al fondo */
}
.bar-value { font-size: 0.8rem; color: #999; margin-bottom: 5px; }

/* ESTILO DE LA BARRA CORREGIDO */
.bar { 
  width: 50px; 
  border-radius: 8px 8px 0 0; 
  transition: height 0.5s ease;
  min-height: 10px; /* Asegura visibilidad mínima */
}

.bar-label { font-size: 0.9rem; color: #666; margin-top: 15px; }

/* --- CALENDARIO --- */
.calendar-layout { display: flex; gap: 40px; align-items: center; justify-content: space-between; flex-wrap: wrap; }
.action-side { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; min-width: 250px; }
.selected-dates { background: #F5F6FA; padding: 15px; border-radius: 10px; width: 100%; text-align: center; }
.card-id-center { font-size: 1.5rem; font-weight: 500; }
.btn-generar { background-color: #6236FF; color: white; border: none; padding: 15px 40px; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: background 0.3s; width: 100%; font-weight: bold; }
.btn-generar:disabled { background-color: #ccc; cursor: not-allowed; }
.btn-generar:hover:not(:disabled) { background-color: #5025d1; }

.calendar-wrapper { flex: 2; border: 1px solid #eee; border-radius: 15px; padding: 20px; min-width: 300px; }
.calendar-header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.calendar-header-nav button { background: none; border: 1px solid #ddd; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; font-weight: bold; }
.card-id-top { font-size: 1.2rem; font-weight: bold; }

.dual-calendar { display: flex; gap: 30px; }
.month-grid { flex: 1; }
.month-title { text-align: center; text-transform: capitalize; margin-bottom: 15px; color: #333; font-weight: 600; }
.weekdays { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.8rem; color: #999; margin-bottom: 10px; font-weight: bold; }
.days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; }
.day { height: 35px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; cursor: pointer; border-radius: 50%; transition: all 0.2s; }
.day:hover { background-color: #f0f0f0; }
.day.selected { background-color: #6236FF; color: white; font-weight: bold; }
.day.in-range { background-color: #E0E7FF; color: #6236FF; border-radius: 0; }

@media (max-width: 900px) {
  .calendar-layout { flex-direction: column-reverse; }
  .dual-calendar { flex-direction: column; }
  .desktop-only { display: none; }
}
</style>