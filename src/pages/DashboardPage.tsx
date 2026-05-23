const tarjetas = [
  ['Accesos activos', '12'],
  ['Pendientes seguridad', '4'],
  ['Validaciones en puerta', '7'],
  ['Alertas operativas', '1'],
];

export const DashboardPage = () => (
  <section className="stack">
    <header>
      <h1>Panel Operativo</h1>
      <p className="muted">Visión general de accesos y validaciones del evento.</p>
    </header>
    <div className="grid-cards">
      {tarjetas.map(([titulo, valor]) => (
        <article className="card" key={titulo}>
          <p className="muted">{titulo}</p>
          <strong className="metric">{valor}</strong>
        </article>
      ))}
    </div>
  </section>
);
