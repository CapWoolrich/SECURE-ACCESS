export const LoginPage = () => {
  return (
    <section className="card card--narrow">
      <h1>Secure Access</h1>
      <p className="muted">Ingreso de personal autorizado</p>
      <form className="form-grid">
        <label>
          Usuario
          <input type="text" placeholder="usuario.seguridad" />
        </label>
        <label>
          Contraseña
          <input type="password" placeholder="••••••••" />
        </label>
        <button type="button">Iniciar sesión</button>
      </form>
      <small className="muted">Ambiente MVP con autenticación simulada.</small>
    </section>
  );
};
