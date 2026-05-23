export const NewAccessRequestPage = () => {
  return (
    <section className="stack">
      <h1>Nueva Solicitud de Acceso</h1>
      <div className="grid-2">
        <article className="card">
          <h2>Acceso VIP (Evento)</h2>
          <p className="muted">Sin nombres de pasajeros, choferes, placas, teléfonos o identificaciones.</p>
          <ul>
            <li>Empresa</li><li>Aeronave / referencia</li><li>Destino</li><li>Fecha</li>
            <li>Ventana horaria</li><li>Máx. personas</li><li>Máx. vehículos</li>
            <li>Responsable</li><li>Escolta requerida</li><li>QR + código corto</li>
          </ul>
        </article>
        <article className="card">
          <h2>Acceso Proveedor</h2>
          <ul>
            <li>Nombre completo</li><li>Empresa</li><li>Motivo</li><li>Área destino</li>
            <li>Detalle de vehículo</li><li>Placa</li><li>Herramientas / equipo</li>
            <li>Responsable</li><li>Escolta requerida</li>
          </ul>
        </article>
      </div>
    </section>
  );
};
