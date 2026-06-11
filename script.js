// ==========================================================================
// LEGALBOT AI - MOTOR DE INTELIGENCIA JURÍDICA INTERACTIVA EXPERTA DE LA UNICOLMAYOR
// ==========================================================================

const state = {
  messages: [],
  contrato: '',
  contractData: {},
  preguntaActual: 1 // Iniciamos estrictamente en la Pregunta 1 del PDF
};

// Las 29 preguntas extraídas con precisión matemática de tu PDF oficial
const preguntas = {
  1: "¿Comprende y acepta estos términos legales para continuar? (Escriba: Sí / No)",
  2: "¿Cuántas partes intervienen en la negociación? (Ej: 2 partes, 3 partes)",
  3: "Datos de la Primera Parte (Obligatorio): Razón social, NIT, Domicilio, Correo de notificaciones, Nombre y cargo del Representante Legal.",
  4: "Datos de la Segunda Parte (Obligatorio): Razón social, Registro societario, País de constitución, Domicilio, Correo y Representante Legal.",
  5: "Datos de la Tercera Parte (Si no aplica o son solo 2 partes, escriba: N/A o Ninguna):",
  6: "¿Cuál es el objeto principal de la colaboración tecnológica? (Describa el software o proyecto brevemente):",
  7: "Indique la fecha estimada de inicio del proyecto (Ej: DD/MM/AAAA o De inmediato):",
  8: "Indique el plazo de duración estimado para la Fase Inicial de Desarrollo:",
  9: "Indique el plazo de duración estimado para la Fase de Pruebas Técnicas:",
  10: "Indique el plazo de duración estimado para la Fase de Modificaciones y Ajustes:",
  11: "¿Cuál será la duración o vigencia total del contrato una vez finalizadas las fases?",
  12: "¿Las obligaciones contractuales se ejecutarán desde varios países de forma multijurisdiccional? (Sí / No)",
  13: "¿La plataforma tecnológica tendrá usuarios finales en más de una jurisdicción internacional? (Sí / No)",
  14: "¿La plataforma almacenará información o bases de datos en la nube fuera del país de origen? (Sí / No)",
  15: "¿Cuál es el valor económico, presupuesto o cuantía estimada del proyecto?",
  16: "¿Qué método de pago, pasarela o moneda se utilizará para las transacciones internacionales?",
  17: "¿Cuál será el alcance regulatorio sobre el uso de activos digitales, tokens o smart contracts en el ecosistema?",
  18: "¿Cuánto tiempo subsistirá la obligación de confidencialidad y secreto comercial tras la terminación del contrato?",
  19: "Indique quién tendrá la titularidad exclusiva de los derechos patrimoniales del software y el control del código fuente:",
  20: "¿Qué modelo de limitación de responsabilidad contractual por damages o perjuicios prefieren adoptar?",
  21: "¿Qué nivel y estándares de ciberseguridad se exigen implementar en la infraestructura tecnológica?",
  22: "¿Qué idioma será el oficial, vinculante y ejecutable para la interpretación de este contrato?",
  23: "¿Bajo las leyes y normativas de qué país se regirá y ejecutará este acuerdo legal?",
  24: "¿Qué mecanismo prefieren para la resolución de controversias? (Escriba: Arbitraje Comercial o Tribunales Ordinarios)",
  25: "Si eligieron Arbitraje, especifique la Sede del Tribunal y el idioma oficial (Si no aplica, escriba: N/A):",
  26: "¿Qué nivel de regulación digital o cumplimiento internacional de e-commerce desean incorporar expresamente?",
  27: "¿Cómo desean regular el tratamiento de datos personales, políticas de privacidad y transferencia transfronteriza?",
  28: "¿Desean incorporar alguna cláusula específica adicional? (Ej: SLAs operativos, KPIs, penalidades. Si no, escriba: No)",
  29: "¿Desean que el documento final incluya la incorporación de Anexos Técnicos de ingeniería? (Sí / No)"
};

// Inicializar la aplicación al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  const inputElement = document.getElementById('respuesta');
  if (inputElement) {
    inputElement.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') { enviar(); }
    });
  }

  // Despliegue del protocolo de bienvenida
  agregarMensajeBot(
    `🤖 <b>SISTEMA DE INTELIGENCIA JURÍDICA LEGALBOT AI ACTIVADO</b>\n\n` +
    `He inicializado el módulo de analítica para la creación de tu <b>Contrato Internacional de Colaboración Tecnológica</b>.\n\n` +
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

// Lógica de Validación y Avanzado de Preguntas
function procesarMensaje(mensaje) {
  const limpio = mensaje.toLowerCase().trim();

  // Validación de la Pregunta 1 (Aceptación de términos)
  if (state.preguntaActual === 1) {
    if (limpio.includes('si') || limpio.includes('sí') || limpio.includes('acepto')) {
      state.contractData[`pregunta_1`] = mensaje;
      state.preguntaActual = 2;
      agregarMensajeBot(`🧠 <b>IA Analizadora:</b> Consentimiento registrado. Iniciando fase de identificación.\n\n<b>Pregunta 2 de 29:</b> ${preguntas[2]}`);
    } else {
      agregarMensajeBot('⚠️ <b>ERROR DE PROTOCOLO:</b> Es obligatorio aceptar los términos escribiendo "Sí" para mitigar riesgos legales y continuar.');
    }
    return;
  }

  // VALIDACIÓN DE SEGURIDAD: Evita respuestas vacías
  if (mensaje.length < 2 && !limpio.includes('n/a') && !limpio.includes('no')) {
    agregarMensajeBot(`❌ <b>RESPUESTA INSUFICIENTE:</b> La información provista es muy corta para blindar la cláusula jurídica. Por favor, escriba una respuesta más detallada.\n\n<b>Por favor responde de nuevo:</b>\n${preguntas[state.preguntaActual]}`);
    return;
  }

  // Guardar datos validados
  state.contractData[`pregunta_${state.preguntaActual}`] = mensaje;
  state.preguntaActual++;

  // Si quedan preguntas en el objeto de preguntas (hasta la 29)
  if (preguntas[state.preguntaActual]) {
    agregarMensajeBot(`<b>Pregunta ${state.preguntaActual} de 29:</b> ${preguntas[state.preguntaActual]}`);
  } else {
    // Al responder la pregunta 29, compila inmediatamente el documento
    generarContratoIA();
  }
}

// MOTOR DE REDACCIÓN JURÍDICA AUTOMÁTICA
function generarContratoIA() {
  const d = state.contractData;

  // Lógica contextual adaptada para almacenamiento Cloud
  let clausulaCloud = "";
  if ((d.pregunta_12 && d.pregunta_12.toLowerCase().includes("si")) || (d.pregunta_14 && d.pregunta_14.toLowerCase().includes("si"))) {
    clausulaCloud = `REFORZADA TRANSFRONTERIZA. Las partes reconocen el carácter multinacional y la distribución en la nube de la infraestructura tecnológica. El almacenamiento de bases de datos se ejecutará bajo estrictas normativas internacionales de seguridad y cifrado asimétrico.`;
  } else {
    clausulaCloud = `LOCALIZADA CENTRALIZADA. Las operaciones e infraestructura tecnológica se centralizarán primando el despliegue de servidores dentro del territorio de origen determinado por las partes.`;
  }

  // Lógica contextual para Resolución de Disputas
  let clausulaDisputas = "";
  if (d.pregunta_24 && d.pregunta_24.toLowerCase().includes("arbitraje")) {
    clausulaDisputas = `CLÁUSULA COMPROMISORIA (ARBITRAJE INTERNACIONAL). Toda disputa o reclamación derivada de este contrato se resolverá mediante Arbitraje Comercial. Los detalles fijados por los intervinientes para el tribunal dictan: ${d.pregunta_25 || 'N/A'}. El laudo arbitral emitido será definitivo, vinculante e inapelable para las partes.`;
  } else {
    clausulaDisputas = `SOMETIMIENTO JURISDICCIONAL. Para cualquier controversia, las partes renuncian a cualquier otro fuero y se someten de manera directa a los Tribunales Ordinarios competentes del país principal del contrato.`;
  }

  // Redacción del Documento Final
  let doc = `========================================================================\n`;
  doc += `     INSTRUMENTO JURÍDICO INTERNACIONAL DE COLABORACIÓN TECNOLÓGICA\n`;
  doc += `========================================================================\n\n`;
  
  doc += `CONSTE por el presente documento privado, el CONTRATO DE COLABORACIÓN Y DESARROLLO TECNOLÓGICO que celebran de mutuo acuerdo las partes comparecientes, redactado de conformidad con las siguientes declaraciones y cláusulas:\n\n`;
  
  doc += `I. IDENTIFICACIÓN DE LOS COMPARECIENTES:\n`;
  doc += `• PARTE ALFA (Primera Parte): ${d.pregunta_3 || '___________'}\n`;
  doc += `• PARTE BETA (Segunda Parte): ${d.pregunta_4 || '___________'}\n`;
  if (d.pregunta_5 && d.pregunta_5.toLowerCase() !== 'n/a' && d.pregunta_5.toLowerCase() !== 'ninguna') {
    doc += `• PARTE GAMMA (Tercera Parte): ${d.pregunta_5}\n`;
  }
  doc += `Declaración General: Las partes representan un total consolidado de (${d.pregunta_2 || '2'}) intervinientes con plena capacidad jurídica.\n\n`;
  
  doc += `II. CLÁUSULAS CONSTITUTIVAS Y BLINDAJE CORPORATIVO:\n\n`;
  doc += `PRIMERA: OBJETO DEL ACUERDO. El propósito central que une a las organizaciones consiste expresamente en el desarrollo y despliegue del proyecto tecnológico denominado:\n"${d.pregunta_6 || '___________'}"\n\n`;
  
  doc += `SEGUNDA: CRONOGRAMA, FASES E HITOS TÉCNICOS.\n`;
  doc += `- Fecha formal de Inicio de Operaciones: ${d.pregunta_7 || '___________'}\n`;
  doc += `- Plazo asignado a la Fase Inicial de Desarrollo: ${d.pregunta_8 || '___________'}\n`;
  doc += `- Plazo para la Fase de Pruebas Técnicas: ${d.pregunta_9 || '___________'}\n`;
  doc += `- Ventana de tiempo para Modificaciones y Ajustes: ${d.pregunta_10 || '___________'}\n`;
  doc += `- Vigencia Total e Ininterrumpida del Contrato: ${d.pregunta_11 || '___________'}\n\n`;
  
  doc += `TERCERA: ÁMBITO OPERATIVO Y ARQUITECTURA CLOUD.\n`;
  doc += `Bajo el dictamen del análisis de IA, la naturaleza del ecosistema se clasifica como: ${clausulaCloud}\n`;
  doc += `• ¿Operación multijurisdiccional?: ${d.pregunta_12 || 'No'}\n`;
  doc += `• ¿Usuarios internacionales en múltiples mercados?: ${d.pregunta_13 || 'No'}\n`;
  doc += `• ¿Almacenamiento en servidores externos?: ${d.pregunta_14 || 'No'}\n\n`;
  
  doc += `CUARTA: RÉGIMEN FINANCIERO Y ACTIVOS DIGITALES.\n`;
  doc += `- Presupuesto integral asignado para la ejecución: ${d.pregunta_15 || '___________'}\n`;
  doc += `- Divisa de cobertura y canalización de transacciones: ${d.pregunta_16 || '___________'}\n`;
  doc += `- Lineamiento sobre el uso de activos digitales / tokens: ${d.pregunta_17 || '___________'}\n\n`;
  
  doc += `QUINTA: CONFIDENCIALIDAD Y PROPIEDAD INTELECTUAL.\n`;
  doc += `- PROPIEDAD INTELECTUAL: La titularidad de los derechos patrimoniales sobre el software resultante y la custodia del código fuente corresponderá legalmente a: ${d.pregunta_19 || '___________'}.\n`;
  doc += `- SECRETO COMERCIAL: La obligación estricta de confidencialidad subsistirá tras la extinción del contrato por un término de: ${d.pregunta_18 || '___________'}.\n\n`;
  
  doc += `SEXTA: CIBERSEGURIDAD EXIGIDA.\n`;
  doc += `- Marco adoptado para la limitación de responsabilidad por daños: ${d.pregunta_20 || '___________'}\n`;
  doc += `- Estándares de seguridad exigidos para la infraestructura tecnológica: ${d.pregunta_21 || '___________'}\n`;
  doc += `- Regulación digital y directrices de e-commerce incorporadas: ${d.pregunta_26 || '___________'}\n\n`;
  
  doc += `SÉPTIMA: PROTECCIÓN DE DATOS PERSONALES (HABEAS DATA).\n`;
  doc += `Las partes se comprometen a implementar las siguientes directrices para la protección de datos privados, biométricos y financieros: ${d.pregunta_27 || 'Legislación de Protección de Datos aplicable'}.\n\n`;
  
  doc += `OCTAVA: CLÁUSULAS ADICIONALES Y REVISIÓN.\n`;
  doc += `- Estipulaciones particulares añadidas (SLAs, KPIs, penalidades): ${d.pregunta_28 || 'Ninguna registrada'}\n`;
  doc += `- ¿Inclusión formal de Anexos Técnicos de ingeniería?: ${d.pregunta_29 || 'No'}\n\n`;
  
  doc += `NOVENA: MARCO LEGAL, IDIOMA Y SOLUCIÓN DE CONTROVERSIAS.\n`;
  doc += `- Idioma oficial prevalente para la interpretación jurídica: ${d.pregunta_22 || 'Español'}\n`;
  doc += `- Ley aplicable que rige el negocio jurídico: Normativas de ${d.pregunta_23 || 'Colombia'}\n`;
  doc += `- Cláusula de Resolución de Conflictos: ${clausulaDisputas}\n\n`;
  
  doc += `Las partes firman el presente instrumento en señal de aceptación absoluta de todo lo redactado por el motor inteligente.\n\n\n`;
  doc += `____________________________________        ____________________________________\n`;
  doc += `     REPRESENTANTE PARTE ALFA                     REPRESENTANTE PARTE BETA\n`;

  state.contrato = doc;

  // Inyectar el texto en el panel derecho (id="contrato")
  const contPanel = document.getElementById('contrato');
  if (contPanel) {
    contPanel.innerHTML = `
      <div class="contract-title">📄 MINUTA INTERNACIONAL COMPILADA POR IA LEGAL</div>
      <div style="white-space: pre-wrap; font-size:0.85rem; line-height:1.7;">${doc}</div>
    `;
  }

  agregarMensajeBot(
    `🎉 <b>¡PROCESO FINALIZADO EXITOSAMENTE!</b>\n\n` +
    `He recopilado tus respuestas y redactado el contrato con un lenguaje corporativo blindado de 9 Cláusulas. ` +
    `Ya puedes visualizarlo a la derecha y utilizar los botones de **Copiar** o **Descargar**.`
  );
}

function descargarContrato() {
  if (!state.contrato) return alert('No se registra ningún contrato compilado en este momento.');
  const a = document.createElement('a');
  const archivo = new Blob([state.contrato], { type: 'text/plain;charset=utf-8' });
  a.setAttribute('href', URL.createObjectURL(archivo));
  a.setAttribute('download', `minuta_colaboracion_tecnologica.txt`);
  a.click();
}

function copiarContrato() {
  if (!state.contrato) return alert('No hay texto legal generado para copiar.');
  navigator.clipboard.writeText(state.contrato).then(() => {
    alert('¡Minuta copiada con éxito al portapapeles!');
  });
}

function limpiarContrato() {
  const contPanel = document.getElementById('contrato');
  const chatPanel = document.getElementById('chat');
  
  if (contPanel) contPanel.innerHTML = '';
  if (chatPanel) chatPanel.innerHTML = '';
  
  state.contrato = '';
  state.contractData = {};
  state.preguntaActual = 1;
  
  agregarMensajeBot('🔄 Memorias temporales borradas. ¿Desea iniciar una nueva estructuración contractual? (Sí / No)');
}
