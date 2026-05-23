const eventos = [
  '08:00 · REQ-901 aprobada por seguridad',
  '08:22 · ACC-448 validado en Puerta Norte',
  '09:10 · REQ-902 enviada a revisión',
];

export const AuditLogPage = () => (
  <section className="card">
    <h1>Bitácora de Auditoría</h1>
    <ul>
      {eventos.map((evento) => (
        <li key={evento}>{evento}</li>
      ))}
    </ul>
  </section>
);
