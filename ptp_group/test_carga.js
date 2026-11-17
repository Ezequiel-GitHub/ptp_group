import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 500 },
    { duration: '30s', target: 500 },
    { duration: '15s', target: 0 },
  ],
};

export default function () {
  // 1. Ajustamos la URL base según la ruta de tu servidor local
  const BASE_URL = 'http://localhost/ptp_group/backend/index.php';

  // 2. Guardamos la respuesta de la consulta en 'res'
  const res = http.get(`${BASE_URL}?action=datos_admin`);

  // 3. Verifica que el servidor responda 200 OK y que el JSON tenga éxito
  check(res, {
    'estado es 200': (r) => r.status === 200,
    'respuesta válida': (r) => r.body && r.body.includes('"success":true'),
  });

  // 4. Pausa de 1 segundo simulando comportamiento humano
  sleep(1);
}