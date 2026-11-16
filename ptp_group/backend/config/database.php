<?php

// Función para conectar a MySQL
function conectar() {
  return new mysqli("localhost", "root", "", "ptp_group");
}