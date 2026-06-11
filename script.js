// ========================================
// LEGALBOT - INTELLIGENT CONTRACT GENERATOR
// ========================================

// State Management
const state = {
  messages: [],
  contrato: '',
  conversationHistory: [],
  contractData: {}
};
state.preguntaActual = 0;

const preguntas = [
"¿Comprende y acepta estos términos para continuar?",
"¿Cuántas partes intervienen en la negociación?",
"Datos de la Primera Parte: Razón social, NIT, domicilio, correo y representante legal.",
"Datos de la Segunda Parte: Razón social, registro societario, país de constitución, domicilio, correo y representante legal.",
"¿Cuál es el objeto principal de la colaboración tecnológica?",
"Fecha estimada de inicio del proyecto.",
"Duración de la Fase Inicial.",
"Duración de la Fase de Pruebas.",
"Duración de la Fase de Modificaciones y Ajustes.",
"¿Cuál será la duración total del contrato?",
"¿Las obligaciones se ejecutarán desde varios países?",
"¿La plataforma tendrá usuarios en más de una jurisdicción?",
"¿La plataforma almacenará información fuera del país?",
"¿Cuál es el valor económico estimado del proyecto?",
"¿Qué método o moneda se utilizará para pagos internacionales?",
"¿Cuál será el alcance del uso de activos digitales?",
"¿Cuánto tiempo subsistirá la confidencialidad?",
"¿Quién tendrá la titularidad del software y código fuente?",
"¿Qué modelo de responsabilidad prefieren?",
"¿Qué nivel de ciberseguridad desean?",
"¿Qué idioma será el oficial del contrato?",
"¿Qué ley regirá el contrato?",
"¿Qué mecanismo de solución de controversias desean?",
"Si hay arbitraje, indique la sede.",
"Si hay arbitraje, indique el idioma.",
"¿Qué nivel de regulación digital desean incorporar?",
"¿Cómo desean regular los datos personales?",
"¿Desean cláusulas adicionales?",
"¿Desean anexos técnicos?",
"¿Desean revisión legal previa?"
];
// Initialize
document.addEventListener('DOMContentLoaded', function () {
  console.log('LegalBot iniciado');
  agregarMensajeBot(`
Bienvenido al Asistente Jurídico para la creación de Contratos Internacionales de Colaboración Tecnológica.

Este chatbot ofrece una guía automatizada y una minuta básica. No sustituye el asesoramiento de un abogado.

¿Comprende y acepta estos términos para continuar?
(Sí / No)
`);
  // Enter key support
  document.getElementById('respuesta').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      enviar();
    }
  });
});

// ========================================
// CHAT FUNCTIONS
// ========================================

function enviar() {
  const input = document.getElementById('respuesta');
  const mensaje = input.value.trim();

  if (mensaje === '') return;

  // Add user message
  agregarMensajeUsuario(mensaje);
  state.conversationHistory.push({ role: 'user', content: mensaje });
  input.value = '';

  // Process and respond
  procesarMensaje(mensaje);
}

function agregarMensajeUsuario(mensaje) {
  const chatDiv = document.getElementById('chat');
  const messageElement = document.createElement('div');
  messageElement.className = 'message user';
  messageElement.innerHTML = `<div class="message-content">${escaparHTML(mensaje)}</div>`;
  chatDiv.appendChild(messageElement);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  state.messages.push({ role: 'user', content: mensaje });
}

function agregarMensajeBot(mensaje) {
  const chatDiv = document.getElementById('chat');
  const messageElement = document.createElement('div');
  messageElement.className = 'message bot';
  messageElement.innerHTML = `<div class="message-content">${mensaje}</div>`;
  chatDiv.appendChild(messageElement);
  chatDiv.scrollTop = chatDiv.scrollHeight;
  state.messages.push({ role: 'bot', content: mensaje });
  state.conversationHistory.push({ role: 'assistant', content: mensaje });
}

function escaparHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// MESSAGE PROCESSING & CONTRACT GENERATION
// ========================================

function procesarMensaje(mensaje){

    if(state.preguntaActual === 0){

        if(
            mensaje.toLowerCase().includes("si")
        ){

            agregarMensajeBot(preguntas[1]);
            state.preguntaActual = 1;

        }else{

            agregarMensajeBot(
             "Gracias. El proceso ha finalizado."
            );

        }

        return;
    }

    state.contractData[
      "respuesta_" + state.preguntaActual
    ] = mensaje;

    state.preguntaActual++;

    if(
      state.preguntaActual < preguntas.length
    ){

       agregarMensajeBot(
         preguntas[state.preguntaActual]
       );

    }else{

       agregarMensajeBot(
       "✅ Información completa. Escribe GENERAR CONTRATO."
       );

    }
}
  const mensajeLower = mensaje.toLowerCase();

  // Detect contract type
  let tipoContrato = '';
  let respuestaBot = '';

  if (mensajeLower.includes('arrendamiento') || mensajeLower.includes('alquiler')) {
    tipoContrato = 'arrendamiento';
    respuestaBot = '✓ Entendido. Generaré un contrato de arrendamiento. Para completarlo, necesito información sobre:\n\n• Arrendador (nombre, cédula)\n• Arrendatario (nombre, cédula)\n• Descripción del inmueble\n• Valor del arriendo\n• Fecha de inicio\n• Duración\n• Condiciones especiales\n\n¿Puedes proporcionar estos datos?';
    state.contractData.tipo = 'CONTRATO DE ARRENDAMIENTO';
  } else if (mensajeLower.includes('servicios') || mensajeLower.includes('prestación')) {
    tipoContrato = 'servicios';
    respuestaBot = '✓ Perfecto. Crearé un contrato de prestación de servicios. Necesito:\n\n• Nombre del prestador de servicios\n• Nombre del cliente\n• Descripción detallada de los servicios\n• Valor total o tarifa\n• Fecha de inicio y duración\n• Condiciones de pago\n• Cláusulas especiales\n\n¿Cuál es la información?';
    state.contractData.tipo = 'CONTRATO DE PRESTACIÓN DE SERVICIOS';
  } else if (mensajeLower.includes('confidencialidad') || mensajeLower.includes('nda') || mensajeLower.includes('secreto')) {
    tipoContrato = 'confidencialidad';
    respuestaBot = '✓ Voy a crear un acuerdo de confidencialidad. Requiero:\n\n• Nombre de la parte reveladora\n• Nombre de la parte receptora\n• Duración de la confidencialidad\n• Excepciones (si las hay)\n• Sanciones por incumplimiento\n• Ley aplicable\n\nProporciona los detalles.';
    state.contractData.tipo = 'ACUERDO DE CONFIDENCIALIDAD';
  } else if (mensajeLower.includes('compra') || mensajeLower.includes('venta')) {
    tipoContrato = 'compraventa';
    respuestaBot = '✓ Generaré un contrato de compra-venta. Necesito:\n\n• Vendedor (nombre, cédula)\n• Comprador (nombre, cédula)\n• Descripción del bien\n• Precio acordado\n• Forma de pago\n• Condiciones de entrega\n• Garantías\n\nComparte esta información.';
    state.contractData.tipo = 'CONTRATO DE COMPRA-VENTA';
  } else if (mensajeLower.includes('empleado') || mensajeLower.includes('trabajo') || mensajeLower.includes('laboral')) {
    tipoContrato = 'laboral';
    respuestaBot = '✓ Crearé un contrato de trabajo. Requiero:\n\n• Nombre del empleador\n• Nombre del empleado\n• Cargo\n• Salario mensual\n• Jornada laboral\n• Beneficios\n• Duración del contrato\n• Términos de terminación\n\n¿Cuál es la información?';
    state.contractData.tipo = 'CONTRATO DE TRABAJO';
  } else if (mensajeLower.includes('generar') || mensajeLower.includes('crear') || mensajeLower.includes('listo')) {
    // If user asks to generate and we have data
    if (Object.keys(state.contractData).length > 0) {
      generarContrato();
      return;
    } else {
      respuestaBot = 'Necesito saber primero qué tipo de contrato deseas crear. Las opciones incluyen:\n\n• Contrato de arrendamiento\n• Contrato de servicios\n• Acuerdo de confidencialidad\n• Contrato de compra-venta\n• Contrato de trabajo\n\n¿Cuál prefieres?';
    }
  } else if (tipoContrato === '') {
    respuestaBot = 'He detectado la siguiente información:\n\n' + mensaje + '\n\nVoy a usar esto para personalizar el contrato. Proporciona todos los detalles necesarios o dime que genere el contrato si ya tengo la información suficiente.';
    
    // Extract and store information
    extraerDatos(mensaje);
  }

  // Add response with delay for better UX
  setTimeout(() => {
    agregarMensajeBot(respuestaBot);
  }, 500);
}

function extraerDatos(mensaje) {
  // Simple pattern matching to extract key information
  const patterns = {
    nombre: /(?:mi nombre es|me llamo|soy)\s+([A-Za-záéíóúñ\s]+)/i,
    cedula: /(?:cédula|cedula|cc)\s*:?\s*(\d+)/i,
    valor: /(?:valor|precio|costo|monto)\s*:?\s*\$?\s*([\d.,]+)/i,
    fecha: /(\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/,
  };

  Object.keys(patterns).forEach(key => {
    const match = mensaje.match(patterns[key]);
    if (match) {
      state.contractData[key] = match[1];
    }
  });
}

// ========================================
// CONTRACT GENERATION
// ========================================

function generarContrato() {
  const tipo = state.contractData.tipo || 'CONTRATO GENERAL';
  let contenido = '';

  // Generate based on type
  if (tipo.includes('ARRENDAMIENTO')) {
    contenido = generarArrendamiento();
  } else if (tipo.includes('SERVICIOS')) {
    contenido = generarServicios();
  } else if (tipo.includes('CONFIDENCIALIDAD')) {
    contenido = generarConfidencialidad();
  } else if (tipo.includes('COMPRA-VENTA')) {
    contenido = generarCompraventa();
  } else if (tipo.includes('TRABAJO')) {
    contenido = generarTrabajo();
  } else {
    contenido = generarGeneral();
  }

  // Display contract
  state.contrato = contenido;
  const contratoDiv = document.getElementById('contrato');
  contratoDiv.innerHTML = `<div class="contract-title">${tipo}</div><div class="contract-text">${contenido}</div>`;

  // Show success message
  agregarMensajeBot('✅ Contrato generado exitosamente. Puedes descargarlo, copiarlo o hacer ajustes. Recuerda siempre consultar con un abogado profesional para validar.');
}

function generarArrendamiento() {
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
CONTRATO DE ARRENDAMIENTO DE INMUEBLE

Celebrado en ${hoy}

PARTES:

ARRENDADOR:
${state.contractData.nombre_arrendador || '[Nombre del Arrendador]'}
Cédula: ${state.contractData.cedula_arrendador || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_arrendador || '[Domicilio]'}

ARRENDATARIO:
${state.contractData.nombre_arrendatario || '[Nombre del Arrendatario]'}
Cédula: ${state.contractData.cedula_arrendatario || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_arrendatario || '[Domicilio]'}

OBJETO:
Por este acto, el ARRENDADOR da en arrendamiento y el ARRENDATARIO recibe en iguales términos el inmueble ubicado en:
${state.contractData.inmueble || '[Descripción del inmueble]'}

CANON DE ARRENDAMIENTO:
El ARRENDATARIO pagará al ARRENDADOR la suma de $${state.contractData.valor || '[Valor mensual]'} mensuales, pagaderos dentro de los primeros cinco (5) días de cada mes.

TÉRMINO:
El presente contrato tendrá una duración de ${state.contractData.duracion || '12'} meses, contados a partir del ${state.contractData.fecha_inicio || 'día de la firma del presente contrato'}.

SERVICIOS COMPLEMENTARIOS:
El ARRENDATARIO será responsable del pago de servicios públicos (agua, energía, gas, teléfono, internet) de conformidad con los términos establecidos entre él y los respectivos prestadores de servicios.

OBLIGACIONES DEL ARRENDADOR:
• Mantener el inmueble en condiciones de habitabilidad
• Realizar las reparaciones necesarias que no sean de responsabilidad del arrendatario
• Garantizar el uso pacífico del inmueble

OBLIGACIONES DEL ARRENDATARIO:
• Pagar el canon puntualmente
• Mantener el inmueble en buen estado
• No hacer modificaciones sin consentimiento
• Permitir inspecciones del inmueble

GARANTÍA:
El ARRENDATARIO constituye como garantía del presente contrato:
${state.contractData.garantia || '• Depósito equivalente a un mes de arriendo'}

CAUSALES DE TERMINACIÓN:
1. Vencimiento del plazo pactado
2. Incumplimiento en el pago de dos (2) meses consecutivos
3. Violación de las obligaciones establecidas

PROCEDIMIENTO DE DESAHUCIO:
En caso de incumplimiento, el ARRENDADOR podrá iniciar proceso de desahucio conforme a la ley.

LEY APLICABLE:
El presente contrato se regirá por las leyes de la República de Colombia.

En constancia de lo anterior, firman los comparecientes en la fecha arriba indicada.

_____________________________          _____________________________
ARRENDADOR                           ARRENDATARIO
C.C.                                 C.C.

Testigos:

_____________________________
Testigo 1
C.C.

_____________________________
Testigo 2
C.C.
`;
}

function generarServicios() {
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
CONTRATO DE PRESTACIÓN DE SERVICIOS

Celebrado en ${hoy}

PARTES:

PRESTADOR DE SERVICIOS:
${state.contractData.nombre_prestador || '[Nombre del Prestador]'}
Cédula: ${state.contractData.cedula_prestador || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_prestador || '[Domicilio]'}

CLIENTE:
${state.contractData.nombre_cliente || '[Nombre del Cliente]'}
Cédula: ${state.contractData.cedula_cliente || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_cliente || '[Domicilio]'}

OBJETO DEL CONTRATO:
El PRESTADOR se compromete a prestar los siguientes servicios:
${state.contractData.descripcion_servicios || '[Descripción detallada de los servicios]'}

VALOR Y FORMA DE PAGO:
El CLIENTE pagará al PRESTADOR la suma de $${state.contractData.valor || '[Valor total]'}
Forma de pago: ${state.contractData.forma_pago || 'Por consignación bancaria'}

TÉRMINO DE EJECUCIÓN:
${state.contractData.duracion || 'Será ejecutado conforme a lo acordado entre las partes'}.

CONDICIONES GENERALES:
1. El PRESTADOR ejecutará los servicios de conformidad con las normas de calidad acordadas
2. El CLIENTE proporcionará la información necesaria y acceso a las instalaciones requeridas
3. Cualquier cambio en el alcance requiere acuerdo escrito

RESPONSABILIDADES:
• El PRESTADOR es responsable de la calidad de los servicios
• El CLIENTE es responsable del pago puntual
• Ambas partes colaborarán para el cumplimiento exitoso

CONFIDENCIALIDAD:
Ambas partes se comprometen a mantener confidencial la información intercambiada durante la ejecución de este contrato.

TERMINACIÓN:
El contrato puede terminarse por:
• Cumplimiento del objeto
• Mutuo acuerdo
• Incumplimiento grave de cualquiera de las partes

LEY APLICABLE:
Este contrato se regirá conforme a las leyes de la República de Colombia.

En constancia, firman en la fecha arriba indicada.

_____________________________          _____________________________
PRESTADOR DE SERVICIOS               CLIENTE
C.C.                                 C.C.

Testigos:

_____________________________
Testigo 1
C.C.

_____________________________
Testigo 2
C.C.
`;
}

function generarConfidencialidad() {
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
ACUERDO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN

Celebrado en ${hoy}

PARTES:

PARTE REVELADORA:
${state.contractData.nombre_revelador || '[Nombre de la Parte Reveladora]'}
Cédula: ${state.contractData.cedula_revelador || '[Cédula]'}

PARTE RECEPTORA:
${state.contractData.nombre_receptor || '[Nombre de la Parte Receptora]'}
Cédula: ${state.contractData.cedula_receptor || '[Cédula]'}

CONSIDERANDOS:

Las partes desean establecer un acuerdo de confidencialidad para proteger la información sensible y confidencial que será compartida en relación con:
${state.contractData.proposito || '[Propósito del acuerdo]'}

DEFINICIONES:

INFORMACIÓN CONFIDENCIAL: Toda información técnica, comercial, financiera o de otro tipo que sea revelada por una parte a la otra, ya sea en forma oral, escrita, electrónica o de cualquier otra forma.

OBLIGACIONES:

1. La PARTE RECEPTORA se compromete a:
   • Mantener en secreto toda la información confidencial
   • No divulgar a terceros sin autorización escrita
   • Usar la información solo para el propósito acordado
   • Implementar medidas de seguridad adecuadas

2. La PARTE REVELADORA proporcionará la información de manera clara y completa.

EXCEPCIONES:

No se consideran confidenciales:
• Información de dominio público
• Información conocida previamente
• Información recibida de terceros sin obligación de confidencialidad
• Información requerida por ley

DURACIÓN:

El presente acuerdo tendrá vigencia por un período de ${state.contractData.duracion || 'cinco (5) años'} a partir de su firma.

SANCIONES:

El incumplimiento del presente acuerdo acarreará:
• Acciones legales civiles y penales
• Indemnización por daños y perjuicios
• Obtención de medidas cautelares

LEY APLICABLE:

Este acuerdo se regirá por las leyes de la República de Colombia.

En constancia, firman las partes en la fecha indicada.

_____________________________          _____________________________
PARTE REVELADORA                     PARTE RECEPTORA
C.C.                                 C.C.

Testigos:

_____________________________
Testigo 1
C.C.
`;
}

function generarCompraventa() {
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
CONTRATO DE COMPRA-VENTA

Celebrado en ${hoy}

PARTES:

VENDEDOR:
${state.contractData.nombre_vendedor || '[Nombre del Vendedor]'}
Cédula: ${state.contractData.cedula_vendedor || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_vendedor || '[Domicilio]'}

COMPRADOR:
${state.contractData.nombre_comprador || '[Nombre del Comprador]'}
Cédula: ${state.contractData.cedula_comprador || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_comprador || '[Domicilio]'}

OBJETO:
El VENDEDOR vende y el COMPRADOR compra el siguiente bien:
${state.contractData.descripcion_bien || '[Descripción del bien]'}

Especificaciones:
${state.contractData.especificaciones || '[Especificaciones técnicas]'}

PRECIO Y FORMA DE PAGO:
Precio total: $${state.contractData.valor || '[Valor total]'}
Forma de pago: ${state.contractData.forma_pago || 'En efectivo'}

Desglose de pagos (si aplica):
${state.contractData.desglose_pagos || '• Pago total al momento de la firma'}

CONDICIONES DE ENTREGA:
• Fecha de entrega: ${state.contractData.fecha_entrega || '[Fecha convenida]'}
• Lugar de entrega: ${state.contractData.lugar_entrega || '[Lugar convenido]'}
• El bien será entregado en condiciones de uso normal

ESTADO DEL BIEN:
El VENDEDOR declara que el bien:
• Es de su legítima propiedad
• Se encuentra libre de gravámenes
• Se entrega en el estado indicado

GARANTÍA:
${state.contractData.garantia || '• El VENDEDOR garantiza el buen funcionamiento del bien por treinta (30) días'}

RESPONSABILIDAD:
• El VENDEDOR es responsable del bien hasta el momento de la entrega
• El COMPRADOR asume riesgos después de la entrega

RESOLUCIÓN:
En caso de incumplimiento de pagos, el VENDEDOR podrá resolver el contrato y recuperar el bien.

LEY APLICABLE:
Este contrato se regirá por las leyes de la República de Colombia, particularmente el Código de Comercio.

En constancia, firman en la fecha indicada.

_____________________________          _____________________________
VENDEDOR                             COMPRADOR
C.C.                                 C.C.

Testigos:

_____________________________
Testigo 1
C.C.

_____________________________
Testigo 2
C.C.
`;
}

function generarTrabajo() {
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
CONTRATO INDIVIDUAL DE TRABAJO

Celebrado en ${hoy}

PARTES:

EMPLEADOR:
${state.contractData.nombre_empleador || '[Nombre de la Empresa/Empleador]'}
Cédula/NIT: ${state.contractData.nit_empleador || '[NIT]'}
Domicilio: ${state.contractData.domicilio_empleador || '[Domicilio]'}

EMPLEADO:
${state.contractData.nombre_empleado || '[Nombre del Empleado]'}
Cédula: ${state.contractData.cedula_empleado || '[Cédula]'}
Domicilio: ${state.contractData.domicilio_empleado || '[Domicilio]'}

OBJETO DEL CONTRATO:
Por este contrato, el EMPLEADOR contrata los servicios del EMPLEADO como:
Cargo: ${state.contractData.cargo || '[Cargo a desempeñar]'}

SALARIO Y PRESTACIONES:
• Salario mensual: $${state.contractData.salario || '[Valor mensual]'}
• Forma de pago: ${state.contractData.forma_pago || 'Mensual'}
• Beneficios: ${state.contractData.beneficios || 'Conforme a la ley (ARL, Pensión, Salud)'}

JORNADA LABORAL:
• Horario: ${state.contractData.horario || 'Lunes a viernes, 8:00 a.m. a 5:00 p.m., una (1) hora de descanso'}}
• Horas de trabajo: ${state.contractData.horas || '40'}} horas semanales

PERÍODO DE PRUEBA:
${state.contractData.periodo_prueba || 'Será de dos (2) meses a partir de la firma del contrato'}.

DERECHOS DEL EMPLEADO:
• Vacaciones anuales remuneradas
• Prima de servicios
• Auxilio de cesantía
• Afiliación a seguridad social
• Respeto a dignidad e intimidad

OBLIGACIONES DEL EMPLEADO:
• Cumplir funciones con diligencia
• Acatar órdenes del empleador
• Guardar confidencialidad
• Respetar normas de la empresa
• Preservar bienes de la empresa

OBLIGACIONES DEL EMPLEADOR:
• Pagar oportunamente el salario
• Aportar a seguridad social
• Proporcionar condiciones seguras de trabajo
• Respetar derechos del trabajador
• Mantener confidencialidad

CAUSALES DE TERMINACIÓN:
Por justa causa:
• Incumplimiento grave de obligaciones
• Conducta inmoral o deshonesta
• Inasistencia unjustificada

Sin justa causa:
• Por deseo de cualquiera de las partes con aviso previo

AVISO PREVIO:
• 30 días para empleador
• 15 días para empleado

INDEMNIZACIÓN:
En caso de terminación sin justa causa, se pagará conforme al Código Sustantivo del Trabajo.

LEY APLICABLE:
Este contrato se regirá por el Código Sustantivo del Trabajo y demás normas laborales vigentes en Colombia.

En constancia, firman en la fecha indicada.

_____________________________          _____________________________
EMPLEADOR / REPRESENTANTE             EMPLEADO
C.C./NIT                             C.C.

Testigos:

_____________________________
Testigo 1
C.C.
`;
}

function generarGeneral() {
  const hoy = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  
  return `
CONTRATO GENERAL

Celebrado en ${hoy}

PARTES:

PARTE 1:
${state.contractData.nombre_parte1 || '[Nombre de la Parte 1]'}
Cédula: ${state.contractData.cedula_parte1 || '[Cédula]'}

PARTE 2:
${state.contractData.nombre_parte2 || '[Nombre de la Parte 2]'}
Cédula: ${state.contractData.cedula_parte2 || '[Cédula]'}

CONSIDERANDOS:

Las partes manifiestan su voluntad de celebrar el presente contrato bajo los siguientes términos y condiciones:

OBJETO:
${state.contractData.objeto || '[Descripción del objeto del contrato]'}

VALOR:
Las partes acuerdan un valor de $${state.contractData.valor || '[Valor]'}}

DURACIÓN:
${state.contractData.duracion || 'El presente contrato tendrá vigencia desde su firma hasta el cumplimiento de su objeto'}.

CONDICIONES:
${state.contractData.condiciones || '• Las partes se comprometen a cumplir fielmente lo pactado\n• Cualquier modificación requiere acuerdo escrito de ambas partes'}}

LEY APLICABLE:
Este contrato se regirá por las leyes de la República de Colombia.

En constancia, firman en la fecha indicada.

_____________________________          _____________________________
PARTE 1                              PARTE 2
C.C.                                 C.C.
`;
}

// ========================================
// CONTRACT ACTIONS
// ========================================

function descargarContrato() {
  if (!state.contrato) {
    alert('No hay contrato generado para descargar');
    return;
  }

  const elemento = document.createElement('a');
  const contenido = new Blob([state.contrato], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(contenido);
  
  elemento.setAttribute('href', url);
  elemento.setAttribute('download', `contrato_${new Date().getTime()}.txt`);
  elemento.style.display = 'none';
  
  document.body.appendChild(elemento);
  elemento.click();
  document.body.removeChild(elemento);
  
  agregarMensajeBot('✅ Contrato descargado exitosamente. Recuerda revisarlo cuidadosamente antes de firmar.');
}

function copiarContrato() {
  if (!state.contrato) {
    alert('No hay contrato generado para copiar');
    return;
  }

  navigator.clipboard.writeText(state.contrato).then(() => {
    agregarMensajeBot('✅ Contrato copiado al portapapeles. Puedes pegarlo en cualquier editor de texto.');
  }).catch(() => {
    alert('Error al copiar. Intenta de nuevo.');
  });
}

function limpiarContrato() {
  document.getElementById('contrato').innerHTML = '';
  state.contrato = '';
  state.contractData = {};
  agregarMensajeBot('Contrato eliminado. ¿Deseas crear un nuevo contrato? Cuéntame qué tipo de contrato necesitas.');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatearFecha(fecha) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-ES', options);
}
function validarRespuesta(indicePregunta, respuesta){

    switch(indicePregunta){

        case 0:
            return respuesta.toLowerCase() === "si" ||
                   respuesta.toLowerCase() === "sí" ||
                   respuesta.toLowerCase() === "no";

        case 2:
            return respuesta === "2" ||
                   respuesta.toLowerCase().includes("3");

        case 7:
            return !isNaN(Date.parse(respuesta));

        case 13:
            return !isNaN(
                respuesta.replace(/\./g,"")
                         .replace(/,/g,"")
            );

        default:
            return respuesta.trim().length > 2;
    }
}
if(
   !validarRespuesta(
      state.preguntaActual,
      mensaje
   )
){

   agregarMensajeBot(
      "❌ La información ingresada no tiene un formato válido. Por favor revise e intente nuevamente."
   );

   return;
}
function validarCorreo(correo){

   const regex =
   /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   return regex.test(correo);
}
function validarNIT(nit){

   return /^[0-9\-]+$/.test(nit);

}
function validarFecha(fecha){

   return !isNaN(Date.parse(fecha));

}
function validarMonto(valor){

   return /^\d+([.,]\d+)?$/.test(valor);

}
function revisarCampos(){

   let faltantes = [];

   if(!state.contractData.pregunta_3)
      faltantes.push(
      "Razón social Primera Parte"
      );

   if(!state.contractData.pregunta_4)
      faltantes.push(
      "NIT Primera Parte"
      );

   if(!state.contractData.pregunta_15)
      faltantes.push(
      "Objeto del contrato"
      );

   return faltantes;
}
const faltantes =
revisarCampos();

if(faltantes.length > 0){

   agregarMensajeBot(
   "❌ No puedo generar el contrato.\n\nFalta:\n\n• "
   + faltantes.join("\n• ")
   );

   return;
}
/* ==========================================================================
   LEGALBOT COLOMBIA - HOJA DE ESTILOS (style.css)
   ========================================================================== */

:root {
    --primary-color: #1e3a8a;       /* Azul marino legal */
    --primary-hover: #1d4ed8;       /* Azul más brillante al pasar el cursor */
    --secondary-color: #0f172a;     /* Gris oscuro elegante para texto */
    --bg-color: #f1f5f9;            /* Fondo suave de la aplicación */
    --card-bg: #ffffff;             /* Fondo blanco para los paneles */
    --user-msg: #dbeafe;            /* Azul claro para burbujas de usuario */
    --bot-msg: #f8fafc;             /* Gris claro para burbujas de LegalBot */
    --border-color: #e2e8f0;        /* Gris para bordes y separadores */
    --text-muted: #64748b;          /* Gris para descripciones y notas */
    
    /* Colores para botones de acción */
    --btn-download: #16a34a;        /* Verde */
    --btn-copy: #2563eb;            /* Azul */
    --btn-clear: #dc2626;           /* Rojo */
}

/* Reinicio de márgenes y caja general */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--bg-color);
    color: var(--secondary-color);
    line-height: 1.5;
}

/* Contenedor Principal centrado */
.container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 24px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

/* --- HEADER --- */
header {
    background-color: var(--primary-color);
    color: white;
    padding: 32px 24px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.header-content p {
    font-size: 1.1rem;
    font-weight: 300;
    opacity: 0.9;
}

.header-content .subtitle {
    font-size: 0.85rem;
    opacity: 0.7;
    margin-top: 4px;
    font-style: italic;
}

/* --- MAIN CONTENT (Estructura de dos columnas) --- */
.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    flex: 1;
}

/* Adaptación para pantallas de celulares o tablets en vertical */
@media (max-width: 900px) {
    .main-content {
        grid-template-columns: 1fr;
    }
}

/* Estilo base común para las secciones (Chat y Contrato) */
.chat-section, .contract-section {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    height: 600px; /* Mantiene ambos paneles simétricos y del mismo tamaño */
}

.chat-section h2, .contract-header h2 {
    font-size: 1.4rem;
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 16px;
}

/* --- SECCIÓN DEL CHAT INTERACTIVO --- */
.chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden; /* Evita que el contenedor se rompa */
}

/* Historial de mensajes con scroll */
.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--border-color);
}

/* Burbujas de chat generales */
.message {
    max-width: 80%;
    display: flex;
    flex-direction: column;
}

.message-content {
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 0.95rem;
    white-space: pre-line; /* Respeta los saltos de línea enviados por el código */
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

/* Mensajes enviados por el Bot (Izquierda) */
.message.bot {
    align-self: flex-start;
}

.message.bot .message-content {
    background-color: var(--bot-msg);
    color: var(--secondary-color);
    border-top-left-radius: 2px;
    border: 1px solid var(--border-color);
}

/* Mensajes enviados por el Usuario (Derecha) */
.message.user {
    align-self: flex-end;
}

.message.user .message-content {
    background-color: var(--primary-color);
    color: white;
    border-top-right-radius: 2px;
}

/* Área inferior de escritura */
.input-area {
    display: flex;
    gap: 12px;
}

.input-area input {
    flex: 1;
    padding: 14px 16px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.input-area input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.15);
}

/* Botón de Enviar */
.send-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0 24px;
    border-