// Obtener elementos del DOM
const alarmHourInput = document.getElementById("alarm-hour");
const alarmMinuteInput = document.getElementById("alarm-minute");
const setAlarmButton = document.getElementById("set-alarm-button");
const currentTimeElement = document.getElementById("current-time");
const toggleAlarmButton = document.getElementById("toggle-alarm-button");
const alarmStatusElement = document.getElementById("alarm-status");

// Declarar la variable alarmInterval
let alarmInterval;

// Establecer evento de clic para configurar la alarma
setAlarmButton.addEventListener("click", () => {
  const alarmHour = parseInt(alarmHourInput.value);
  const alarmMinute = parseInt(alarmMinuteInput.value);

  if (isNaN(alarmHour) || isNaN(alarmMinute)) {
    alert("Ingresa una hora y minutos válidos.");
    return;
  }

  setAlarm(alarmHour, alarmMinute);
});

// Función para establecer la alarma
function setAlarm(hour, minute) {
  // Restablecer cualquier alarma existente
  clearInterval(alarmInterval);

  // Calcular la fecha actual y la hora de la alarma
  const now = new Date();
  const alarmDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute
  );

  // Calcular el tiempo restante hasta la alarma
  let timeRemaining = alarmDate - now;
  if (timeRemaining < 0) {
    timeRemaining += 24 * 60 * 60 * 1000; // Sumar un día si la alarma es para mañana
  }

  // Mostrar el tiempo actualizado cada segundo
  alarmInterval = setInterval(() => {
    timeRemaining -= 1000;

    // Actualizar el elemento de tiempo actual
    currentTimeElement.textContent = getCurrentTime();

    // Comprobar si es hora de activar la alarma
    if (timeRemaining <= 0) {
      activateAlarm();
    }
  }, 1000);

  // Mostrar la hora de la alarma y habilitar el botón de activar/desactivar alarma
  alarmStatusElement.textContent = `Alarma configurada a las ${formatTime(
    hour,
    minute
  )}`;
  toggleAlarmButton.disabled = false;
}

// Función para activar la alarma
function activateAlarm() {
  const alarmSound = new Audio("alarm.mp3");
  // Reproducir el sonido de la alarma
  alarmSound.play();

  // Restablecer cualquier alarma existente
  clearInterval(alarmInterval);

  // Mostrar el mensaje de estado de la alarma
  alarmStatusElement.textContent = "Alarma activada";
  toggleAlarmButton.textContent = "Desactivar Alarma";
}

// Establecer evento de clic para activar/desactivar la alarma
toggleAlarmButton.addEventListener("click", () => {
  if (toggleAlarmButton.textContent === "Activar Alarma") {
    activateAlarm();
  } else {
    resetAlarm();
  }
});

// Función para restablecer la alarma
// Función para restablecer la alarma
function resetAlarm() {
  // Restablecer cualquier alarma existente
  clearInterval(alarmInterval);

  // Detener el sonido de la alarma si está reproduciéndose
  alarmSound.pause();
  alarmSound.currentTime = 0;

  // Restablecer los valores de entrada de la alarma
  alarmHourInput.value = "";
  alarmMinuteInput.value = "";

  // Restablecer el estado y el texto del botón de activar/desactivar alarma
  alarmStatusElement.textContent = "";
  toggleAlarmButton.textContent = "Activar Alarma";
  toggleAlarmButton.disabled = true;
}

// Función para obtener la hora actual en formato HH:MM
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Función para formatear la hora en formato HH:MM
function formatTime(hour, minute) {
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
}

// Mostrar la hora actual al cargar la página
currentTimeElement.textContent = getCurrentTime();

// Desactivar el botón de activar/desactivar alarma al cargar la página
toggleAlarmButton.disabled = true;
