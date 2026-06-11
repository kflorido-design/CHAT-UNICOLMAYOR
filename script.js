// ==========================================================================
// LEGALBOT AI - MOTOR DE INTELIGENCIA JURÍDICA INTERACTIVA EXPERTA
// ==========================================================================

const state = {
  messages: [],
  contrato: '',
  contractData: {},
  preguntaActual: 1
};

// Las 29 preguntas extraídas con precisión matemática de tu PDF oficial
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

// ARRANQUE SEGURO: Asegura que el HTML cargue primero antes de disparar la IA
window.onload = function() {
  const inputElement = document.getElementById('respuesta');
  if (inputElement) {
    inputElement.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') { 
        e.preventDefault();
        enviar(); 
      }
    });
  }

  // Despliegue del protocolo inicial en pantalla
  agregarMensajeBot(
    `🤖 <b>SISTEMA DE INTELIGENCIA JURÍDICA LEGALBOT AI ACTIVADO</b>\n\n` +
    `He inicializado el módulo de analítica contractual basado en tu modelo estructurado de desarrollo de software.\n\n` +
    `<i>Cargando parámetros normativos de comercio electrónico internacional...</i>\n\n` +
    `<b>Pregunta 1 de 29:</b> ${preguntas[1]}`
  );
};

function enviar() {
  const input = document.getElementById('respuesta');
  if (!input) return;

  const mensaje = input.value.trim();
  if (mensaje === '') return;

  // Añadir al chat visual e inmediatamente procesar
  agregarMensajeUsuario(mensaje);
  input.value = '';

  setTimeout(() => { procesarMensaje(mensaje); }, 250);
}

function agregarMensajeUsuario(texto) {
  const chatDiv = document.getElementById('chat');
  if (!chatDiv) return;

  const msgElement = document.createElement('div');
  msgElement.className = 'message user';
  msgElement.innerHTML =
