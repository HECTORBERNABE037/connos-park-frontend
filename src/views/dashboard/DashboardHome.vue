<template>
  <div class="dashboard-grid">
    
    <div class="card card-ocupacion">
      <h3>Ocupación Actual</h3>
      <div class="chart-placeholder">
        <div class="donut-circle">70%</div>
      </div>
      <p class="card-footer-text">45 / 50 Cajones</p>
    </div>

    <div class="card card-ingresos">
      <div class="card-header">
        <h3>Ingresos del mes</h3>
        <span class="small-text">Ingresos de acuerdo al mes</span>
      </div>
      <div class="bars-placeholder">
        <div class="bar" style="height: 40%; background: #5D9BFF"></div>
        <div class="bar" style="height: 60%; background: #E052FF"></div>
        <div class="bar" style="height: 90%; background: #7C5CFF"></div>
        <div class="bar" style="height: 50%; background: #FF4081"></div>
        <div class="bar" style="height: 70%; background: #4CAF50"></div>
        <div class="bar" style="height: 80%; background: #FF8A65"></div>
      </div>
    </div>

    <div class="card card-disponibles">
      <h3>Lugares Disponibles</h3>
      <div class="icon-car-placeholder">
        🚘
      </div>
      <h2 class="big-number">5 Cajones</h2>
    </div>

    <div class="card card-vencimientos">
      <h3>Próximos Vencimientos</h3>
      <ul class="vencimientos-list">
        <li>
          <div class="avatar">👤</div>
          <div class="info">
            <span>Juan Pérez</span>
            <span class="date">28/10/2025</span>
          </div>
        </li>
        <li>
          <div class="avatar">👤</div>
          <div class="info">
            <span>Maria Pérez</span>
            <span class="date">28/10/2025</span>
          </div>
        </li>
        <li>
          <div class="avatar">👤</div>
          <div class="info">
            <span>Renata Ríos</span>
            <span class="date">28/10/2025</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr; /* Dos columnas, la derecha más ancha */
  grid-template-rows: 1fr 1fr; /* Dos filas */
  gap: 20px;
  height: 100%;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #333;
}

/* Estilos simulados para que se parezca a tu foto */
.donut-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 15px solid #5D9BFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-weight: bold;
  color: #5D9BFF;
}

.card-footer-text {
  text-align: right;
  font-weight: bold;
  font-size: 1.2rem;
}

.bars-placeholder {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 150px;
}

.bar {
  width: 30px;
  border-radius: 4px 4px 0 0;
}

.icon-car-placeholder {
  font-size: 4rem;
  text-align: center;
  background: #E0E7FF;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.big-number {
  text-align: center;
  font-size: 2rem;
  margin: 10px 0 0 0;
}

.vencimientos-list {
  list-style: none;
  padding: 0;
}

.vencimientos-list li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.avatar {
  background: #E0E7FF;
  padding: 10px;
  border-radius: 50%;
  margin-right: 15px;
}

.info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.date {
  font-weight: bold;
}
</style>