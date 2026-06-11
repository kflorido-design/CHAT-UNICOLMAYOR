// ==========================================================================
// LEGALBOT AI - MOTOR DE INTELIGENCIA JURÍDICA INTERACTIVA EXPERTA
// ==========================================================================

const state = {
  contrato: '',
  contractData: {},
  preguntaActual: 1
};

// Las 29 preguntas oficiales del PDF unificadas sin saltos extraños
const preguntas = {
  1: "¿Comprende y acepta estos términos legales y el aviso de responsabilidad para continuar? (Escriba: Sí / No)",
  2: "¿Cuántas partes intervienen en la negociación? (Ej: 2 partes, 3 partes o más)",
  3: "Datos de la Primera Parte (obligatorios): Razón social, NIT/Identificación, Domicilio, Correo de notificaciones, Nombre y cargo del Representante Legal.",
  4: "Datos de la Segunda Parte (obligatorios): Razón social, Número de registro societario, País de constitución, Domicilio principal, Correo de notificaciones, Nombre y cargo del Representante Legal.",
  5: "(Si aplica) Datos de la Tercera Parte: Razón social, Número de registro, País de constitución, Domicilio principal, Correo de notificaciones, Nombre y cargo del Representante Legal. (Si no aplica escriba: N/A)",
  6: "¿Cuál es el objeto principal de la colaboración tecnológica? (Ej.: diseño, desarrollo, licenciamiento y operación de la plataforma PAYBRIDGE 360 - describir brevemente):",
  7: "Fecha estimada de inicio del proyecto (Ej: DD/MM/AAAA o De inmediato):",
  8: "El desarrollo se dividirá en fases. Indique el plazo o duración de la Fase Inicial de Desarrollo:",
  9: "Indique el plazo de duración estimado para la Fase de Pruebas Técnicas (QA):",
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
  27: "¿Cómo desean regular el tratamiento de datos personales, biométricos y bancarios?",
  28: "¿Desean incorporar cláusulas específicas adicionales? (p. ej. SLA operativos, mantenimiento, KPIs, penalidades. Si no, escriba: No)",
  29: "¿Desean que el documento final incluya la incorporación formal de Anexos Técnicos (especificaciones, arquitectura, cronograma)? (Sí / No)"
};

// EXPORTACIÓN DE LA FUNCIÓN AL ENTORNO GLOBAL (Inmune a problemas de orden de carga)
window.enviar = function() {
  const input = document.getElementById('respuesta');
  if (!input) return;

  const mensaje = input.value.trim();
  if (mensaje === '') return;

  // 1. Mostrar instantáneamente el texto en la burbuja del chat
  const chatDiv = document.getElementById('chat');
  if (chatDiv) {
    const msgElement = document.createElement('div');
    msgElement.className = 'message user';
    msgElement.innerHTML = `<div class="message-content">${mensaje}</div>`;
    chatDiv.appendChild(msgElement);
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  // 2. Limpiar el input para dejarlo listo
  input.value = '';

  // 3. Procesamiento lógico inmediato
  const limpio = mensaje.toLowerCase().trim();

  if (state.preguntaActual === 1) {
    if (limpio.includes('si') || limpio.includes('sí') || limpio.includes('acepto') || limpio === 's') {
      state.contractData['pregunta_1'] = mensaje;
      state.preguntaActual = 2;
      agregarBot(`🧠 <b>IA Analizadora:</b> Consentimiento registrado de conformidad con las directrices regulatorias.\n\n<b>Pregunta 2 de 29:</b> ${preguntas[2]}`);
    } else {
      targetBot('⚠️ <b>ERROR DE PROTOCOLO:</b> Es mandatorio aceptar los términos de uso legales para estructurar la minuta de software de forma segura. Escribe "Sí" para avanzar.');
    }
    return;
  }

  // Guardar respuestas de flujo intermedio
  state.contractData[`pregunta_${state.preguntaActual}`] = mensaje;
  state.preguntaActual++;

  if (preguntas[state.preguntaActual]) {
    agregarBot(`<b>Pregunta ${state.preguntaActual} de 29:</b> ${preguntas[state.preguntaActual]}`);
  } else {
    generarContratoIA();
  }
};

function agregarBot(texto) {
  const chatDiv = document.getElementById('chat');
  if (!chatDiv) return;
  const msgElement = document.createElement('div');
  msgElement.className = 'message bot';
  msgElement.innerHTML = `<div class="message-content">${texto}</div>`;
  chatDiv.appendChild(msgElement);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Inicialización automática al abrir la pantalla
document.addEventListener('DOMContentLoaded', function() {
  agregarBot(
    `🤖 <b>SISTEMA DE INTELIGENCIA JURÍDICA LEGALBOT AI ACTIVADO</b>\n\n` +
    `Módulo automatizado de análisis transfronterizo estructurado bajo las directrices del modelo corporativo de software.\n\n` +
    `<b>Pregunta 1 de 29:</b> ${preguntas[1]}`
  );
});

// MOTOR REDACTOR: MAQUETACIÓN FIEL AL MODELO-3 .DOCX APORTADO
function generarContratoIA() {
  const d = state.contractData;

  let doc = `CONTRATO DE DESARROLLO DE SOFTWARE Y COLABORACIÓN TECNOLÓGICA INTERNACIONAL\n`;
  doc += `------------------------------------------------------------------------\n\n`;
  doc += `En la ciudad de Bogotá, D.C., de mutuo acuerdo y con plena capacidad legal civil y comercial comparecen:\n\n`;
  
  doc += `COMPARECEN:\n\n`;
  doc += `De una parte, la entidad promotora en calidad de PROPONENTE: ${d.pregunta_3 || '___________'}\n\n`;
  doc += `De otra parte, en calidad de DESARROLLADOR E INTEGRADOR TECNOLÓGICO: ${d.pregunta_4 || '___________'}\n\n`;
  
  if (d.pregunta_5 && d.pregunta_5.toLowerCase() !== 'n/a' && d.pregunta_5.toLowerCase() !== 'ninguna') {
    doc += `Y de otra parte interviniente, en calidad de TERCERO CO-DESARROLLADOR: ${d.pregunta_5}\n\n`;
  }
  
  doc += `Reconociéndose mutuamente la aptitud legal suficiente para el presente negocio jurídico, las partes libremente:\n\n`;
  doc += `MANIFIESTAN:\n\n`;
  doc += `I.- Que los intervinientes, conformando un bloque consolidado de (${d.pregunta_2 || '2'}) partes, ostentan objetivos estratégicos comunes en materia de ingeniería de sistemas.\n`;
  doc += `II.- Que han acordado suscribir el presente instrumento para regular de mutuo acuerdo el proyecto de software que se estipula bajo las siguientes:\n\n`;
  
  doc += `CLÁUSULAS\n\n`;
  
  doc += `PRIMERA.- OBJETO DEL CONTRATO\n`;
  doc += `El objeto es regular el diseño, desarrollo, licenciamiento y despliegue operativo de la plataforma tecnológica denominada comercialmente como:\n"${d.pregunta_6 || '___________'}"\n\n`;
  
  doc += `SEGUNDA.- CRONOGRAMA, HITOS Y FASES DE ENTREGA\n`;
  doc += `Los trabajos de programación darán inicio en la fecha: ${d.pregunta_7 || '___________'}. El desarrollo se ejecutará bajo los siguientes términos temporales de ingeniería:\n`;
  doc += `- Fase Inicial de Desarrollo de Componentes: ${d.pregunta_8 || '___________'}\n`;
  doc += `- Fase de Pruebas Técnicas de Sistema y QA: ${d.pregunta_9 || '___________'}\n`;
  doc += `- Fase de Modificaciones y Ajustes Críticos: ${d.pregunta_10 || '___________'}\n`;
  doc += `La vigencia total y definitiva del clausulado contractual se fija en: ${d.pregunta_11 || '___________'}\n\n`;
  
  doc += `TERCERA.- ENTORNO JURÍDICO TRANSFRONTERIZO Y DISTRIBUCIÓN CLOUD\n`;
  doc += `De acuerdo al análisis de entorno del ecosistema digital, se catalogan los siguientes parámetros operativos:\n`;
  doc += `- ¿Ejecución multijurisdiccional entre múltiples países?: ${d.pregunta_12 || 'No'}\n`;
  doc += `- ¿Mercado internacional y usuarios fuera de origen?: ${d.pregunta_13 || 'No'}\n`;
  doc += `- ¿Alojamiento de bases de datos e infraestructura en la nube fuera del territorio?: ${d.pregunta_14 || 'No'}\n\n`;
  
  doc += `CUARTA.- RÉGIMEN ECONÓMICO Y UNIDAD MONETARIA\n`;
  doc += `El presupuesto integral asignado por el proponente para financiar el desarrollo tecnológico es de: ${d.pregunta_15 || '___________'}.\n`;
  doc += `Las compensaciones económicas internacionales se liquidarán mediante el canal/divisa: ${d.pregunta_16 || '___________'}.\n`;
  doc += `El alcance regulatorio fijado para la operatividad de Smart Contracts o activos digitales será: ${d.pregunta_17 || '___________'}.\n\n`;
  
  doc += `QUINTA.- PROPIEDAD INTELECTUAL Y CLÁUSULA DE NO DIVULGACIÓN\n`;
  doc += `- PROPIEDAD INTELECTUAL: Los derechos patrimoniales sobre el software resultante, propiedad industrial y el control de código fuente serán de titularidad exclusiva de: ${d.pregunta_19 || '___________'}.\n`;
  doc += `- CONFIDENCIALIDAD: Toda la información compartida tiene carácter confidencial. El secreto comercial e industrial subsistirá post-terminación durante: ${d.pregunta_18 || '___________'}.\n\n`;
  
  doc += `SEXTA.- LIMITACIÓN DE RESPONSABILIDAD Y SEGURIDAD INFORMÁTICA\n`;
  doc += `El marco regulatorio seleccionado para mitigar daños contractuales es: ${d.pregunta_20 || '___________'}.\n`;
  doc += `El integrador tecnológico se compromete a estructurar el software bajo las siguientes normativas de ciberseguridad: ${d.pregunta_21 || '___________'}.\n`;
  doc += `En materia de comercio electrónico internacional se implementará la regulación de: ${d.pregunta_26 || '___________'}.\n\n`;
  
  doc += `SÉPTIMA.- CUSTODIA DE DATOS PERSONALES (HABEAS DATA)\n`;
  doc += `El tratamiento de bases de datos bancarias, sensibles o biométricas se regulará bajo el siguiente esquema: ${d.pregunta_27 || 'Protección estándar legal aplicable'}.\n\n`;
  
  doc += `OCTAVA.- COMPLEMENTOS Y REVISIONES ESPECÍFICAS\n`;
  doc += `- Cláusulas específicas adicionales incorporadas (SLAs, KPIs o penalidades): ${d.pregunta_28 || 'Ninguna registrada'}\n`;
  doc += `- ¿Inclusión vinculante de Anexos Técnicos de Ingeniería de Sistemas?: ${d.pregunta_29 || 'No'}\n\n`;
  
  doc += `NOVENA.- IDIOMA, LEY REGULADORA Y JURISDICCIÓN COMPETENTE\n`;
  doc += `- Idioma: El idioma oficial vinculante de la presente minuta es el: ${d.pregunta_22 || 'Español'}.\n`;
  doc += `- Ley Aplicable: El contrato se interpretará conforme a las leyes sustantivas de: ${d.pregunta_23 || 'Colombia'}.\n`;
  doc += `- Resolución de Conflictos: Se fija el mecanismo de: ${d.pregunta_24 || 'Tribunales Ordinarios'} (Detalles/Sede del Tribunal: ${d.pregunta_25 || 'N/A'}).\n\n`;
  
  doc += `Y en prueba de conformidad de todo lo pactado, las partes firman electrónicamente el presente contrato por duplicado.\n\n\n`;
  doc += `____________________________________        ____________________________________\n`;
  doc += `     REPRESENTANTE PARTE ALFA                     REPRESENTANTE PARTE BETA\n`;

  if (d.pregunta_29 && d.pregunta_29.toLowerCase().includes("si")) {
    doc += `\n\n========================================================================\n`;
    doc += `                     ANEXO TÉCNICO DE INGENIERÍA                        \n`;
    doc += `========================================================================\n`;
    doc += `1.- DESCRIPCIÓN DEL SOFTWARE: Detalle de arquitectura para "${d.pregunta_6}".\n`;
    doc += `2.- PARTIDAS PRESUPUESTALES: Liquidación asignada sobre la base de ${d.pregunta_15}.\n`;
    doc += `3.- HITOS CRONOLÓGICOS: Desarrollo (${d.pregunta_8}), QA (${d.pregunta_9}) y Ajustes (${d.pregunta_10}).\n`;
  }

  state.contrato = doc;

  const contPanel = document.getElementById('contrato');
  if (contPanel) {
    contPanel.innerHTML = `
      <div class="contract-title">📄 CONTRATO PROFESIONAL GENERADO POR IA LEGAL</div>
      <div style="white-space: pre-wrap; font-size:0.85rem; line-height:1.7; font-family:'Courier New', monospace;">${doc}</div>
    `;
  }

  agregarBot(`🎉 <b>¡PROCESO FINALIZADO CON ÉXITO!</b>\n\nEl contrato formal adaptado a tu modelo DOCX con estructura de 9 cláusulas y anexos técnicos ya fue inyectado en el panel derecho.`);
}

// FUNCIONES DE CONTROL PARA LOS BOTONES DE ACCIÓN
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
