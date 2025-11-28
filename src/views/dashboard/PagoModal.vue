<template>
  <div class="modal-backdrop">
    <div class="modal-card">
      <div class="modal-header">
        <h3>Realizar Pago</h3>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label>B2-1 Monto del pago:</label>
          <div class="input-wrapper">
            <span class="prefix">$</span>
            <input type="number" value="500.00" class="input-field" />
          </div>
        </div>

        <div class="form-group">
          <label>B2-2 Fecha de pago:</label>
          <input type="date" class="input-field" />
        </div>

        <div class="form-group">
          <label>B2-3 Periodo cubierto:</label>
          <input type="text" placeholder="Ingresa el mes corres..." class="input-field" />
        </div>

        <div class="form-group">
          <label>B2-4</label>
          <textarea placeholder="Agrega un comentario..." rows="3" class="input-field"></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-guardar" @click="$emit('close')">Guardar</button> <button class="btn-cancelar" @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Fondo oscuro semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000; /* Z-index alto para estar encima del otro modal */
}

.modal-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal-header h3 {
  text-align: center;
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 10px;
  background-color: #E8E8E8;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background-color: #E8E8E8;
  border-radius: 5px;
  padding-left: 10px;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.btn-guardar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.btn-cancelar {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>