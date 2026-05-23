const pendientes = [
  { id: 'REQ-901', tipo: 'VIP', empresa: 'AeroConecta', responsable: 'Coord. Plataforma' },
  { id: 'REQ-902', tipo: 'Proveedor', empresa: 'ServiFuel', responsable: 'Jefe Operaciones' },
];

export const SecurityApprovalPage = () => (
  <section className="stack">
    <h1>Aprobación de Seguridad</h1>
    {pendientes.map((item) => (
      <article key={item.id} className="card row-between">
        <div>
          <strong>{item.id}</strong>
          <p>{item.tipo} · {item.empresa}</p>
          <p className="muted">Responsable: {item.responsable}</p>
        </div>
        <div className="row">
          <button type="button">Aprobar</button>
          <button type="button" className="btn-ghost">Rechazar</button>
        </div>
      </article>
    ))}
  </section>
);
