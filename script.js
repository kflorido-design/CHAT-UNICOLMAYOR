// ==========================================================================
// LEGALBOT AI - MOTOR DE INTELIGENCIA JURÍDICA INTERACTIVA EXPERTA
// ==========================================================================

const state = {
  messages: [],
  contrato: '',
  contractData: {},
  preguntaActual: 1 // Iniciamos estrictamente en la Pregunta 1 del PDF
};

// Las 29 preguntas del PDF oficial pulidas y adaptadas al modelo contractual real
const preguntas = {
  1: "¿Comprende y acepta estos términos legales y el aviso de responsabilidad para continuar? (Escriba: Sí / No)",
  2: "¿Cuántas partes intervienen en la negociación? (Ej: 2 partes, 3 partes)",
  3: "Datos de la Primera Parte (Proponente/Entidad): Razón social, NIT/Identificación, Domicilio, Correo de notificaciones, Nombre y cargo del Representante Legal.",
  4: "Datos de la Segunda Parte (Desarrollador/Empresa): Razón social, Registro societario, País de constitución, Domicilio principal, Correo y Representante Legal.",
  5: "Datos de la Tercera Parte (Si aplica. De lo contrario, escriba: N/A o Ninguna):",
  6: "¿Cuál es el objeto principal de la colaboración tecnológica? (Describa el software o plataforma brevemente, ej: 'Diseño, desarrollo y operación de la plataforma PAYBRIDGE 360'):",
  7: "Indique la fecha estimada de inicio para la ejecución del proyecto (Ej: DD/MM/AAAA o De inmediato):",
  8: "Indique el plazo de duración estimado para la Fase Inicial de Desarrollo:",
  9: "Indique el plazo de duración estimado para la Fase de Pruebas Técnicas:",
  10: "Indique el plazo de duración estimado para la Fase de Modificaciones y Ajustes:",
  11: "¿Cuál será la duración o vigencia total del contrato una vez finalizadas las fases operativas?",
  12: "¿Las obligaciones contractuales se ejecutarán desde varios países de forma multijurisdiccional? (Sí / No)",
  13: "¿La plataforma tecnológica tendrá usuarios finales en más de una jurisdicción internacional? (Sí / No)",
  14: "¿La plataforma almacenará información o bases de datos en la nube fuera del país de origen? (Sí / No)",
  15: "¿Cuál es el valor económico, presupuesto o cuantía estimada asignada al proyecto?",
  16: "¿Qué método de pago, pasarela o moneda se utilizará para las transacciones internacionales?",
  17: "¿Cuál será el alcance regulatorio sobre el uso de activos digitales, tokens o smart contracts en el ecosistema?",
  18: "¿Cuánto tiempo subsistirá la obligación de confidencialidad y secreto comercial tras la terminación del contrato?",
  19: "Indique quién tendrá la titularidad exclusiva de los derechos patrimoniales del software y el control del código fuente:",
  20: "¿Qué modelo de limitación de responsabilidad contractual por daños o perjuicios prefieren adoptar?",
  21: "¿Qué nivel y estándares de ciberseguridad se exigen implementar en la infraestructura tecnológica?",
  22: "¿Qué idioma será el oficial, vinculante y ejecutable para la interpretación de este contrato?",
  23: "¿Bajo las leyes y normativas de qué país se regirá y ejecutará este acuerdo legal?",
  24: "¿Qué mecanismo prefieren para la resolución de controversias? (Escriba: Arbitraje Comercial o Tribunales Ordinarios)",
  25: "Si eligieron Arbitraje, especifique la Sede del Tribunal y el idioma oficial del proceso (Si no aplica, escriba: N/A):",
  26: "¿Qué nivel de regulación digital o cumplimiento internacional de e-commerce desean incorporar expresamente?",
  27: "¿Cómo desean regular el tratamiento de datos personales, políticas de privacidad y transferencia transfronteriza?",
  28: "¿Desean incorporar alguna cláusula específica adicional? (Ej: SLAs operativos, KPIs, penalidades. Si no, escriba: No)",
  29: "¿Desean que el documento final incluya la incorporación formal de Anexos Técnicos de ingeniería? (Sí / No)"
};

// Inicializar la aplicación al cargar la página
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
    `He inicializado el módulo de analítica contractual basado en el modelo estructurado de desarrollo de software corporativo.\n\n` +
    `<i>Cargando parámetros normativos de comercio electrónico internacional...</i>\n\n` +
    `<b>Pregunta 1 de 29:</b> ${preguntas[1]}`
  );
});

function enviar() {
  const input = document.getElementById('respuesta');
  if (!input) return;

  const mensaje = input.value.trim();
  if (mensaje === '') return;

  agregarMensajeUsuario(mensaje);
  input.value = '';

  setTimeout(() => { procesarMensaje(mensaje); }, 400);
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

// Lógica de Validación y Ruteo
function procesarMensaje(mensaje) {
  const limpio = mensaje.toLowerCase().trim();

  // Validación de la Pregunta 1
  if (state.preguntaActual === 1) {
    if (limpio.includes('si') || limpio.includes('sí') || limpio.includes('acepto')) {
      state.contractData[`pregunta_1`] = mensaje;
      state.preguntaActual = 2;
      agregarMensajeBot(`🧠 <b>IA Analizadora:</b> Consentimiento registrado. Iniciando fase de identificación corporativa.\n\n<b>Pregunta 2 de 29:</b> ${preguntas[2]}`);
    } else {
      agregarMensajeBot('⚠️ <b>ERROR DE PROTOCOLO:</b> Es obligatorio aceptar los términos del aviso legal para poder estructurar la minuta de forma segura.');
    }
    return;
  }

  // Validación de longitud mínima de seguridad
  if (mensaje.length < 2 && !limpio.includes('n/a') && !limpio.includes('no')) {
    agregarMensajeBot(`❌ <b>RESPUESTA INSUFICIENTE:</b> La información provista es muy corta para blindar la cláusula jurídica. Por favor, escriba una respuesta más detallada.\n\n<b>Por favor responde de nuevo:</b>\n${preguntas[state.preguntaActual]}`);
    return;
  }

  // Guardar datos validados
  state.contractData[`pregunta_${state.preguntaActual}`] = mensaje;
  state.preguntaActual++;

  // Si quedan preguntas por realizar
  if (preguntas[state.preguntaActual]) {
    agregarMensajeBot(`<b>Pregunta ${state.preguntaActual} de 29:</b> ${preguntas[state.preguntaActual]}`);
  } else {
