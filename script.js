// ==========================================================================
// LEGALBOT AI - MOTOR DE INTELIGENCIA JURÍDICA INTERACTIVA EXPERTA
// ==========================================================================

const state = {
  messages: [],
  contrato: '',
  contractData: {},
  preguntaActual: 0
};

// Las 30 preguntas estructuradas del PDF oficial
const preguntas = [
  "¿Comprende y acepta estos términos legales para continuar? (Escriba: Sí / No)", // 0
  "¿Cuántas partes intervienen en esta transacción comercial? (Ej: 2 partes, 3 partes)", // 1
  "Datos de la Primera Parte (Obligatorio): Razón social, NIT, Domicilio, Correo de notificaciones y Representante Legal.", // 2
  "Datos de la Segunda Parte (Obligatorio): Razón social, Registro societario, País de constitución, Domicilio, Correo y Representante Legal.", // 3
  "Datos de la Tercera Parte (Si no aplica, escriba: N/A o Ninguna):", // 4
  "¿Cuál es el objeto principal de la colaboración tecnológica? (Describa el software, plataforma o proyecto brevemente):", // 5
  "Indique la fecha estimada de inicio para la ejecución del proyecto (Ej: DD/MM/AAAA o De inmediato):", // 6
  "Indique el plazo de duración estimado para la Fase Inicial de Desarrollo:", // 7
  "Indique el plazo de duración estimado para la Fase de Pruebas Técnicas:", // 8
  "Indique el plazo de duración estimado para la Fase de Modificaciones y Ajustes:", // 9
  "¿Cuál será la duración o vigencia total del contrato una vez finalizadas las fases?", // 10
  "¿Las obligaciones contractuales se ejecutarán desde varios países de forma multijurisdiccional? (Sí / No)", // 11
  "¿La plataforma tecnológica tendrá usuarios finales en más de una jurisdicción internacional? (Sí / No)", // 12
  "¿La plataforma almacenará información o bases de datos en la nube fuera del país de origen? (Sí / No)", // 13
  "¿Cuál es el valor económico, presupuesto o cuantía estimada del proyecto?", // 14
  "¿Qué método de pago, pasarela o moneda se utilizará para las transacciones internacionales?", // 15
  "¿Cuál será el alcance regulatorio sobre el uso de activos digitales, tokens o smart contracts en el ecosistema?", // 16
  "¿Cuánto tiempo subsistirá la obligación de confidencialidad y secreto comercial tras la terminación del contrato?", // 17
  "¿Quién tendrá la titularidad exclusiva de los derechos patrimoniales del software y el control del código fuente?", // 18
  "¿Qué modelo de limitación de responsabilidad contractual por daños o perjuicios prefieren adoptar?", // 19
  "¿Qué nivel y estándares de ciberseguridad se exigen implementar en la infraestructura tecnológica?", // 20
  "¿Qué idioma será el oficial, vinculante y ejecutable para la interpretación de este contrato?", // 21
  "¿Bajo las leyes y normativas de qué país se regirá y ejecutará este acuerdo legal?", // 22
  "¿Qué mecanismo prefieren para la resolución de controversias? (Escriba: Arbitraje Comercial o Tribunales Ordinarios)", // 23
  "Si eligieron Arbitraje, especifique la Sede del Tribunal Arbitral (Si no aplica, escriba: N/A):", // 24
  "Especifique el idioma oficial bajo el cual se conducirá el proceso arbitral (Si no aplica, escriba: N/A):", // 25
  "¿Qué nivel de regulación digital o cumplimiento internacional de e-commerce desean incorporar expresamente?", // 26
  "¿Cómo desean regular el tratamiento de datos personales, políticas de privacidad y transferencia transfronteriza (Habeas Data)?", // 27
  "¿Desean incorporar alguna cláusula específica adicional? (Ej: SLAs operativos, KPIs, penalidades. Si no, escriba: No)", // 28
  "¿Desean que el documento final incluya la incorporación de Anexos Técnicos de ingeniería? (Sí / No)", // 29
  "¿Someterán este instrumento a una auditoría o revisión legal por un abogado titulado antes de firmar? (Sí / No)" // 30
];

// Inicializar la Inteligencia Artificial al cargar la aplicación web
document.addEventListener('DOMContentLoaded', function () {
  const inputElement = document.getElementById('respuesta');
  if (inputElement) {
    inputElement.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') { enviar(); }
    });
  }

  // Despliegue del protocolo de bienvenida de la IA
  agregarMensajeBot(
    `🤖 <b>SISTEMA DE INTELIGENCIA JURÍDICA LEGALBOT AI ACTIVADO</b>\n\n` +
    `He inicializado el módulo de analítica contractual para la creación de un <b>Contrato Internacional de Colaboración Tecnológica de Alta Gama</b>.\n\n` +
    `<i>Procesando parámetros normativos vigentes (2026) y estándares de comercio electrónico internacional...</i>\n\n` +
    `<b>¿Comprende las advertencias legales y acepta los términos para iniciar la sesión de estructuración? (Sí / No)</b>`
  );
});

function enviar() {
  const input = document.getElementById('respuesta');
  if (!input) return;

  const mensaje = input.value.trim();
  if (mensaje === '') return;

  agregarMensajeUsuario(mensaje);
  input.value = '';

  // Efecto de delay para simular el procesamiento cognitivo de la IA
  setTimeout(() => { procesarMensaje(mensaje); }, 450);
}

function agregarMensajeUsuario(texto) {
  const chatDiv = document.getElementById('chat');
  if (!chatDiv) return;

  const msgElement = document.createElement('div');
  msgElement.className = 'message user';
  msgElement.innerHTML = `<div class="message-content">${escaparHTML(texto)}</div>`;
  chatDiv.appendChild(msgElement);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function agregarMensajeBot(texto) {
  const chatDiv = document.getElementById('chat');
  if (!chatDiv) return;

  const msgElement = document.createElement('div');
  msgElement.className = 'message bot';
  msgElement.innerHTML = `<div class="message-content">${texto}</div>`;
  chatDiv.appendChild(msgElement);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function escaparHTML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Lógica de Inteligencia Artificial para Validación y Ruteo de Flujo
function procesarMensaje(mensaje) {
  const limpio = mensaje.toLowerCase().trim();

  // Validación obligatoria de Términos de Uso (Pregunta 0)
  if (state.preguntaActual === 0) {
    if (limpio.includes('si') || limpio.includes('sí') || limpio.includes('acepto')) {
      state.contractData[`pregunta_0`] = mensaje;
      state.preguntaActual = 1;
      agregarMensajeBot(`🧠 <b>IA Analizadora:</b> Consentimiento registrado. Iniciando fase de identificación.\n\n<b>Pregunta 1 de 30:</b> ${preguntas[1]}`);
    } else {
      agregarMensajeBot('⚠️ <b>ERROR DE PROTOCOLO:</b> El sistema requiere la aceptación explícita de los términos de la plataforma para mitigar riesgos legales. Por favor escriba "Sí" para continuar.');
    }
    return;
  }

  // CONTROL DE CALIDAD JURÍDICA: Evita que el usuario salte campos obligatorios con respuestas inútiles
  if (mensaje.length < 2 && !limpio.includes('n/a') && !limpio.includes('no')) {
    agregarMensajeBot(`❌ <b>ANÁLISIS DE IA - RESPUESTA RECHAZADA:</b> La información provista es insuficiente para blindar la cláusula jurídica de forma segura. Por favor, amplíe su respuesta.\n\n<b>Reiteración de pregunta actual:</b>\n${preguntas[state.preguntaActual]}`);
    return;
  }

  // Almacenar el dato validado
  state.contractData[`pregunta_${state.preguntaActual}`] = mensaje;
  state.preguntaActual++;

  // Continuar el cuestionario si quedan preguntas pendientes
  if (state.preguntaActual < preguntas.length) {
    agregarMensajeBot(`<b>Pregunta ${state.preguntaActual} de 30:</b> ${preguntas[state.preguntaActual]}`);
  } else {
    // Si se completaron los 30 ítems del PDF, la IA compila el documento estructurado
    generarContratoIA();
  }
}

// MOTOR DE REDACCIÓN DE INTELIGENCIA JURÍDICA (Simulación Avanzada de IA)
function generarContratoIA() {
  // Extracción y normalización de variables recolectadas
  const p1 = state.contractData.pregunta_1 || 'Dos partes';
  const p2 = state.contractData.pregunta_2 || '___________';
  const p3 = state.contractData.pregunta_3 || '___________';
  const p4 = state.contractData.pregunta_4 || 'N/A';
  const p5 = state.contractData.pregunta_5 || '___________';
  const p6 = state.contractData.pregunta_6 || '___________';
  const p7 = state.contractData.pregunta_7 || '___________';
  const p8 = state.contractData.pregunta_8 || '___________';
  const p9 = state.contractData.pregunta_9 || '___________';
  const p10 = state.contractData.pregunta_10 || '___________';
  const p11 = state.contractData.pregunta_11 || 'No';
  const p12 = state.contractData.pregunta_12 || 'No';
  const p13 = state.contractData.
