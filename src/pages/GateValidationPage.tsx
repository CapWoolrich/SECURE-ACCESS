export const GateValidationPage = () => (
  <section className="card card--narrow">
    <h1>Validación en Puerta</h1>
    <p className="muted">Ingrese código corto o escanee QR para validar acceso activo.</p>
    <div className="form-grid">
      <input type="text" placeholder="Código de acceso" />
      <button type="button">Validar</button>
    </div>
    <small className="muted">Modo demo: validación local con datos simulados.</small>
  </section>
);
