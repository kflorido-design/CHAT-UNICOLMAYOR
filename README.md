<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LegalBot Colombia - Generador Inteligente de Contratos</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
  <div class="container">
    <header>
      <div class="header-content">
        <h1><i class="fas fa-balance-scale"></i> LEGALBOT AI</h1>
        <p>Estructurador Avanzado de Contratos Tecnológicos Internacionales</p>
        <p class="subtitle">Análisis de riesgos y redacción automatizada en tiempo real</p>
      </div>
    </header>

    <main class="main-content">
      <section class="chat-section">
        <h2><i class="fas fa-comments"></i> Asistente de IA Legal</h2>
        <div class="chat-container">
          <div id="chat" class="chat-messages"></div>
          <div class="input-area">
            <input
              type="text"
              id="respuesta"
              placeholder="Escribe tu respuesta aquí..."
              autocomplete="off">
            <button onclick="enviar()" class="send-btn" title="Enviar respuesta">
              <i class="fas fa-paper-plane"></i> Enviar
            </button>
          </div>
        </div>
      </section>

      <section class="contract-section">
        <div class="contract-header">
          <h2><i class="fas fa-file-signature"></i> Contrato Internacional Inteligente</h2>
          <div class="contract-actions">
            <button onclick="descargarContrato()" class="btn btn-download" title="Descargar minuta en .txt">
              <i class="fas fa-download"></i> Descargar
            </button>
            <button onclick="copiarContrato()" class="btn btn-copy" title="Copiar al portapapeles">
              <i class="fas fa-copy"></i> Copiar
            </button>
            <button onclick="limpiarContrato()" class="btn btn-clear" title="Reiniciar sesión">
              <i class="fas fa-trash-alt"></i> Limpiar
            </button>
          </div>
        </div>
        <div id="contrato" class="contract-content"></div>
      </section>
    </main>

    <footer>
      <p>&copy; 2026 LegalBot Colombia. Desarrollado con estándares de Compliance Tecnológico.</p>
      <p class="disclaimer">Esta herramienta interactiva provee un borrador auxiliar y automatizado. No sustituye la consultoría ni el dictamen de un abogado matriculado.</p>
    </footer>
  </div>

  <script src="script.js"></script>
</body>

</html>
