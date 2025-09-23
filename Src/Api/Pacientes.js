// src/api/pacientes.js
const API_URL = "http://10.2.232.32:8000/api"; // ⚠️ cambia la IP a la de tu PC

export async function getPacientes() {
  const res = await fetch(`${API_URL}/pacientes`);
  return await res.json();
}

export async function addPaciente(paciente) {
  const res = await fetch(`${API_URL}/pacientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paciente),
  });
  return await res.json();
}
