// ==========================================================================
// LEGALBOT AI - MOTOR DE INTELIGENCIA JURÍDICA INTERACTIVA EXPERTA
// ==========================================================================

const state = {
  messages: [],
  contrato: '',
  contractData: {},
  preguntaActual: 1 // Iniciamos estrictamente en la Pregunta 1 del PDF
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

// FUNCIÓN DE ENVÍO GLOBAL (Visible perfectamente para el onclick="enviar()" de tu HTML)
window.enviar = function() {
  const input = document.getElementById('respuesta');
  if (!input) return;

  const mensaje = input.value.trim();
  if (mensaje === '') return;

  // 1. Mostrar de inmediato la burbuja del usuario en el chat
  agregarMensajeUsuario(mensaje);
  
  // 2. Vaciar el campo de texto para que quede listo
  input.value = '';

  // 3. Procesar la respuesta de manera inmediata
  procesarMensaje(mensaje);
};

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

function procesarMensaje(mensaje) {
  const limpio = mensaje.toLowerCase().trim();

  // Validación robusta para la primera pregunta
  if (state.preguntaActual === 1) {
    if (limpio.includes('si') || limpio.includes('sí') || limpio.includes('acepto') || limpio === 's') {
      state.contractData[`pregunta_1`] = mensaje;
      state.preguntaActual = 2;
      agregarMensajeBot(`🧠 <b>IA Analizadora:</b> Consentimiento registrado. Iniciando fase de identificación corporativa.\n\n<b>Pregunta 2 de 29:</b> ${preguntas[2]}`);
    } else {
      agregarMensajeBot('⚠️ <b>ERROR DE PROTOCOLO:</b> Es obligatorio aceptar los términos del aviso legal para poder estructurar la minuta de forma segura. Escribe "Sí" para avanzar.');
    }
    return;
  }

  // Guardar datos validados en las siguientes preguntas
  state.contractData[`pregunta_${state.preguntaActual}`] = mensaje;
  state.preguntaActual++;

  // Ruteo y avance del Chatbot
  if (preguntas[state.preguntaActual]) {
    agregarMensajeBot(`<b>Pregunta ${state.preguntaActual} de 29:</b> ${preguntas[state.preguntaActual]}`);
  } else {
    generarContratoIA();
  }
}

// MOTOR DE REDACCIÓN ACORDE AL MODELO DE SOFTWARE (.DOCX)
function generarContratoIA() {
  const d = state.contractData;

  let clausulaCloud = "";
  if ((d.pregunta_12 && d.pregunta_12.toLowerCase().includes("si")) || (d.pregunta_14 && d.pregunta_14.toLowerCase().includes("si"))) {
    clausulaCloud = `REFORZADA TRANSFRONTERIZA. Las partes reconocen expresamente el carácter multinacional y la distribución en la nube de la infraestructura tecnológica. El almacenamiento de bases de datos se ejecutará bajo estrictas normativas internacionales de seguridad, gobernanza cloud y cifrado asimétrico de datos.`;
  } else {
    clausulaCloud = `LOCALIZADA CENTRALIZADA. Las operaciones e infraestructura tecnológica se centralizarán primando el despliegue de servidores e infraestructura física dentro del territorio de origen determinado por las partes contratantes.`;
  }

  let clausulaDisputas = "";
  if (d.pregunta_24 && d.pregunta_24.toLowerCase().includes("arbitraje")) {
    clausulaDisputas = `Toda disputa, controversia o reclamación que surja de este contrato, o en relación con él, incluyendo cualquier cuestión relativa a su existencia, validez o terminación, se resolverá definitivamente mediante Arbitraje Comercial. Los detalles fijados por los intervinientes para el tribunal dictan: ${d.pregunta_25 || 'N/A'}. El laudo arbitral emitido será definitivo, vinculante e inapelable para las partes.`;
  } else {
    clausulaDisputas = `Para cualquier controversia derivada del presente negocio jurídico, las partes renuncian expresamente a cualquier otro fuero que pudiera corresponderles y se someten de manera directa a la jurisdicción de los Tribunales Ordinarios competentes del país regulador de la presente minuta.`;
  }

  let doc = `CONTRATO DE DESARROLLO DE SOFTWARE Y COLABORACIÓN TECNOLÓGICA INTERNAVIONAL\n`;
  doc += `------------------------------------------------------------------------\n\n`;
  doc += `En la ciudad de Bogotá, D.C., de mutuo acuerdo y con plena capacidad legal civil y comercial comparecen:\n\n`;
  doc += `COMPARECEN:\n\n`;
  doc += `De una parte, como PROPONENTE DE LA INFRAESTRUCTURA: ${d.pregunta_3 || '___________'}\n\n`;
  doc += `De otra parte, como DESARROLLADOR E INTEGRADOR TECNOLÓGICO: ${d.pregunta_4 || '___________'}\n\n`;
  
  if (d.pregunta_5 && d.pregunta_5.toLowerCase() !== 'n/a' && d.pregunta_5.toLowerCase() !== 'ninguna') {
    doc += `Y de otra parte interviniente, en calidad de TERCERO CO-DESARROLLADOR: ${d.pregunta_5}\n\n`;
  }
  
  doc += `Reconociéndose mutuamente la capacidad legal suficiente para obligarse mediante el presente documento, las partes libremente:\n\n`;
  doc += `MANIFIESTAN:\n\n`;
  doc += `I.- Que las entidades intervinientes, conformando un total consolidado de (${d.pregunta_2 || '2'}) partes, ostentan objetivos comunes en el sector de la ingeniería y economía digital.\n`;
  doc += `II.- Que las partes están interesadas en suscribir el presente contrato para la ejecución coordinada de actividades del proyecto de software que se detalla en las siguientes:\n\n`;
  
  doc += `CLÁUSULAS\n\n`;
  
  doc += `PRIMERA.- OBJETO DEL CONTRATO\n`;
  doc += `El objeto del presente contrato es el establecimiento de un marco jurídico para regular el diseño, desarrollo, licenciamiento y despliegue del software y plataforma tecnológica denominada:\n"${d.pregunta_6 || '___________'}"\n\n`;
  
  doc += `SEGUNDA.- CRONOGRAMA, HITOS Y FASES DE EJECUCIÓN\n`;
  doc += `El desarrollo de los trabajos de ingeniería de software comenzará de forma oficial en la fecha: ${d.pregunta_7 || '___________'}. La ejecución del plan de trabajo se estructurará rigurosamente bajo los siguientes plazos estimados:\n`;
  doc += `- Fase Inicial de Desarrollo de Componentes: ${d.pregunta_8 || '___________'}\n`;
  doc += `- Fase de Pruebas Técnicas de Sistema y QA: ${d.pregunta_9 || '___________'}\n`;
  doc += `- Fase de Modificaciones, Ajustes y Refactorización: ${d.pregunta_10 || '___________'}\n`;
  doc += `La duración total y obligatoria de la vigencia del presente contrato se fija en: ${d.pregunta_11 || '___________'}\n\n`;
  
  doc += `TERCERA.- ÁMBITO TRANSFRONTERIZO Y ARQUITECTURA CLOUD\n`;
  doc += `De conformidad con el análisis del entorno del ecosistema, el tratamiento de datos se clasifica como: ${clausulaCloud}\n`;
  doc += `- ¿Ejecución multijurisdiccional desde múltiples países?: ${d.pregunta_12 || 'No'}\n`;
  doc += `- ¿Distribución y usuarios finales internacionales?: ${d.pregunta_13 || 'No'}\n`;
  doc += `- ¿Alojamiento de servidores fuera del territorio de origen?: ${d.pregunta_14 || 'No'}\n\n`;
  
  doc += `CUARTA.- CONDICIONES ECONÓMICAS, PRESUPUESTO Y LIQUIDACIÓN\n`;
  doc += `El presupuesto total estimado asignado para la correcta ejecución del presente desarrollo tecnológico asciende a la cuantía de: ${d.pregunta_15 || '___________'}.\n`;
  doc += `Todas las compensaciones y transacciones económicas internacionales se liquidarán mediante el método/divisa de cobertura: ${d.pregunta_16 || '___________'}.\n`;
  doc += `El alcance regulatorio pactado sobre el ecosistema de activos digitales, tokens o smart contracts se regirá por: ${d.pregunta_17 || '___________'}.\n\n`;
  
  doc += `QUINTA.- PROPIEDAD INTELECTUAL Y CONFIDENCIALIDAD\n`;
  doc += `- PROPIEDAD INTELECTUAL: Los derechos patrimoniales sobre el software resultante, patentes y el control total de los repositorios del código fuente corresponderán en exclusiva a: ${d.pregunta_19 || '___________'}.\n`;
  doc += `- CONFIDENCIALIDAD: Toda la información intercambiada con ocasión de este contrato tiene naturaleza confidencial. El deber de secreto industrial subsistirá tras la terminación del contrato por un plazo de: ${d.pregunta_18 || '___________'}.\n\n`;
  
  doc += `SEXTA.- LIMITACIÓN DE RESPONSABILIDAD Y SEGURIDAD INFORMÁTICA\n`;
  doc += `Las partes acuerdan que el modelo adoptado para la limitación de responsabilidad por daños o perjuicios operativos será: ${d.pregunta_20 || '___________'}.\n`;
  doc += `El integrador tecnológico se obliga a cumplir estrictamente con los estándares de ciberseguridad fijados en: ${d.pregunta_21 || '___________'}.\n`;
  doc += `En materia de comercio electrónico y cumplimiento digital internacional, se incorpora expresamente: ${d.pregunta_26 || '___________'}.\n\n`;
  
  doc += `SÉPTIMA.- TRATAMIENTO DE DATOS PERSONALES (HABEAS DATA)\n`;
  doc += `Las partes asumen total responsabilidad en materia de protección de datos, políticas de privacidad y transferencia transfronteriza, aplicando: ${d.pregunta_27 || 'Estándar legal aplicable'}.\n\n`;
  
  doc += `OCTAVA.- CLÁUSULAS ADICIONALES Y ANEXOS TÉCNICOS\n`;
  doc += `- Pactos y estipulaciones específicas adicionales añadidas (SLA, KPIs, penalidades): ${d.pregunta_28 || 'Ninguna registrada'}\n`;
  doc += `- ¿Inclusión formal y vinculante de Anexos Técnicos de Ingeniería de Software?: ${d.pregunta_29 || 'No'}\n\n`;
  
  doc += `NOVENA.- IDIOMA, LEY APLICABLE Y JURISDICCIÓN COMPETENTE\n`;
  doc += `- Idioma: El idioma oficial prevalente para la interpretación jurídica es el: ${d.pregunta_22 || 'Español'}.\n`;
  doc += `- Ley Aplicable: El presente contrato se rige en su integridad por las normativas sustantivas de: ${d.pregunta_23 || 'Colombia'}.\n`;
  doc += `- Resolución de Conflictos: ${clausulaDisputas}\n\n`;
  
  doc += `Y en prueba de conformidad de cuanto antecede, las partes firman por duplicado el presente contrato en el lugar y fecha indicado.\n\n\n`;
  doc += `____________________________________        ____________________________________\n`;
  doc += `     REPRESENTANTE PARTE ALFA                     REPRESENTANTE PARTE BETA\n`;

  if (d.pregunta_29 && d.pregunta_29.toLowerCase().includes("si")) {
    doc += `\n\n========================================================================\n`;
    doc += `                             ANEXO TÉCNICO                              \n`;
    doc += `========================================================================\n`;
    doc += `1.- DESCRIPCIÓN DETALLADA DEL TRABAJO: Especificaciones del software "${d.pregunta_6}".\n`;
    doc += `2.- PRESUPUESTO ASIGNADO TOTAL: ${d.pregunta_15}.\n`;
    doc += `3.- HITOS DE INGENIERÍA: Desarrollo (${d.pregunta_8}), Pruebas (${d.pregunta_9}) y Ajustes (${d.pregunta_10}).\n`;
  }

  state.contrato = doc;

  const contPanel = document.getElementById('contrato');
  if (contPanel) {
    contPanel.innerHTML = `
      <div class="contract-title">📄 CONTRATO PROFESIONAL GENERADO POR IA LEGAL</div>
      <div style="white-space: pre-wrap; font-size:0.85rem; line-height:1.7; font-family:'Courier New', monospace;">${doc}</div>
    `;
  }

  agregarMensajeBot(
    `🎉 <b>¡PROCESO FINALIZADO CON ÉXITO!</b>\n\n` +
    `He compilado tus respuestas y adaptado la redacción al formato oficial del modelo de software. El documento final ya está plasmado a la derecha.`
  );
}

// Vincular el evento Enter de forma segura al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  const inputElement = document.getElementById('respuesta');
  if (inputElement) {
    inputElement.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { 
        e.preventDefault();
        window.enviar(); 
      }
    });
  }

  // Despliegue del protocolo inicial en pantalla automático
  agregarMensajeBot(
    `🤖 <b>SISTEMA DE INTELIGENCIA JURÍDICA LEGALBOT AI ACTIVADO</b>\n\n` +
    `He inicializado el módulo de analítica contractual basado en tu modelo de desarrollo de software.\n\n` +
    `<b>Pregunta 1 de 29:</b> ${preguntas[1]}`
  );
});

// Funciones globales de los botones de Acción del Contrato
window.descargarContrato = function() {
  if (!state.contrato) return alert('No se registra ningún contrato compilado en este momento.');
  const a = document.createElement('a');
  const archivo = new Blob([state.contrato], { type: 'text/plain;charset=utf-8' });
  a.setAttribute('href', URL.createObjectURL(archivo));
  a.setAttribute('download', `contrato_desarrollo_software_AI.txt`);
  a.click();
};

window.copiarContrato = function() {
  if (!state.contrato) return alert('No hay texto legal generado para copiar.');
  navigator.clipboard.writeText(state.contrato).then(() => {
    alert('¡Contrato copiado con éxito al portapapeles!');
  });
};

window.limpiarContrato = function() {
  location.reload(); 
};
