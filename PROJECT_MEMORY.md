# PROJECT MEMORY - Secure Access

Este archivo es la memoria viva del proyecto.

Debe actualizarse cada vez que se acepte una decision importante, cambio de arquitectura, regla de privacidad, criterio operativo o cambio tecnico relevante.

## Regla principal

Ningun cambio importante debe quedar solamente en el chat.

Cuando se acepte una decision relevante, debe registrarse aqui con fecha, motivo e impacto.

## Proyecto

Nombre: Secure Access
Repo: CapWoolrich/SECURE-ACCESS
Objetivo: PWA privada, auditable y trazable para gestion de accesos a FBOs, hangares y zonas operativas relacionadas con aviacion ejecutiva.

## Vision

Reemplazar procesos informales, chats grupales y registros en papel por una plataforma digital privada, confiable y facil de usar para operadores, seguridad y caseta.

## Principios no negociables

1. Privacidad por diseno.
2. Cada usuario solo ve lo necesario para su rol.
3. La plataforma es la fuente de verdad.
4. Toda solicitud debe tener responsable.
5. Toda aprobacion y validacion debe ser auditable.
6. El acceso VIP se maneja por evento.
7. El acceso de proveedores se maneja con identificacion completa.
8. El QR o codigo corto no debe exponer datos sensibles.
9. La app debe funcionar como PWA para caseta.
10. Los cambios importantes deben registrarse en este archivo.
11. Mientras la repo sea publica, no subir secretos, llaves, datos reales, informacion sensible ni detalles operativos no autorizados.

## Modelo de accesos aprobado

### Acceso VIP por evento

Aplica para duenos, pasajeros, invitados y choferes de pasajeros.

No debe capturar datos personales innecesarios.

Debe autorizar:

- Empresa solicitante.
- Aeronave o referencia operativa.
- Destino.
- Fecha.
- Ventana horaria.
- Cupo maximo de personas.
- Cupo maximo de vehiculos.
- Responsable interno.
- Escolta requerida, si aplica.
- QR o codigo corto.

Regla: para VIP se autoriza el evento, no se expone la identidad.

### Acceso identificado para proveedores

Aplica para proveedores, mantenimiento, catering, limpieza, contratistas, tecnicos y visitantes operativos.

Debe capturar los datos necesarios para identificar persona, empresa, motivo, vehiculo, zona y responsable interno.

Regla: para proveedores se autoriza persona, empresa, motivo, vehiculo y zona.

## Roles aprobados

- super_admin
- security_admin
- security_operator
- gate_guard
- operator_admin
- operator_user
- auditor

## Estados aprobados

- draft
- submitted
- approved
- rejected
- needs_correction
- active
- used
- expired
- cancelled
- revoked
- incident

## Modulos MVP

1. Portal del operador.
2. Solicitud VIP por evento.
3. Solicitud identificada para proveedores.
4. Panel de aprobacion.
5. Validacion en caseta por QR o codigo corto.
6. Bitacora de auditoria.
7. Reporte basico de accesos.

## Stack aprobado

- React
- Vite
- TypeScript
- Supabase
- React Router
- Tailwind CSS
- Vercel
- PWA

## Arquitectura de rutas (vigente)

- /login -> pagina de acceso premium institucional.
- /dashboard -> panel operativo principal (control center).
- /nueva-solicitud -> selector elegante entre VIP y proveedor.
- /solicitudes/vip -> formulario formal de acceso VIP por evento.
- /solicitudes/proveedor -> formulario formal de proveedor identificado.
- /aprobaciones -> panel de aprobaciones para seguridad.
- /puerta -> pantalla de validacion para caseta / guardia (optimizada para tablet).
- /bitacora -> bitacora / auditoria con timeline y filtros.

## Decision log

### 2026-05-23 - Inicio del proyecto

Decision: se crea Secure Access como PWA para gestion privada y auditable de accesos operativos.
Motivo: reemplazar procesos informales y reducir errores en validacion.
Impacto: se define arquitectura inicial, roles, estados, modulos MVP y stack base.

### 2026-05-23 - Modelo VIP por evento

Decision: los accesos VIP se manejaran por evento, cupo, ventana y responsable.
Motivo: proteger privacidad de pasajeros y duenos.
Impacto: el sistema no debe pedir datos personales innecesarios para este tipo de acceso.

### 2026-05-23 - Modelo proveedor identificado

Decision: proveedores y visitantes operativos si requieren identificacion completa.
Motivo: mantener control y trazabilidad en accesos operativos.
Impacto: se separan claramente los formularios VIP y proveedor.

### 2026-05-23 - Regla de memoria operativa

Decision: se crea PROJECT_MEMORY.md.
Motivo: evitar que decisiones importantes se pierdan en conversaciones.
Impacto: cada cambio relevante aceptado debe registrarse en este archivo.

### 2026-05-23 - Repo publica durante fase de trabajo

Decision: la repo permanecera publica temporalmente para facilitar trabajo con Codex y Claude hasta que el proyecto sea autorizado formalmente.
Motivo: acelerar colaboracion, prototipado e implementacion inicial.
Impacto: no se deben subir secretos, llaves API, variables reales, datos personales, datos reales de pasajeros, operadores, seguridad, vuelos, procedimientos internos no autorizados ni informacion sensible. Usar datos mock y placeholders.
Archivos afectados: PROJECT_MEMORY.md

### 2026-05-23 - Arquitectura visual premium y rutas del solicitante

Decision:
- Se define /nueva-solicitud como selector de tipo de solicitud (VIP o proveedor), sin formularios propios.
- Se define /solicitudes/vip como pagina formal para solicitar accesos de pasajeros/VIP.
- Se define /solicitudes/proveedor como pagina formal para proveedores identificados.
- Se aprueba rediseno premium institucional (paleta dark navy/slate/graphite con acentos cyan/green/amber/red, tipografia Inter + JetBrains Mono, layout tipo Operations Control Center).
- Se mantiene uso de mock data mientras la repo sea publica; no se conecta Supabase real, no hay WhatsApp, no hay biometria.
- Se confirma que accesos VIP no deben capturar nombres, placas, telefonos ni identificaciones.
- Se introduce sistema de diseno en CSS variables y componentes UI reutilizables (Card, Button, Badge, Input, Select, Textarea, Switch, StatusBadge, RequestTypeChip, RiskDot, RequestTypeCard, AccessSummaryCard, VipRequestForm, ProviderRequestForm, GateValidationPanel, Navbar, AppLayout).
- Se agrega PWA manifest basico (manifest.webmanifest + icon.svg) sin service worker complejo.
- Se hace tolerante el supabaseClient: si faltan variables de entorno, no rompe la app y opera en modo mock.
- El payload del QR queda restringido a { folio, code, type } - nunca a datos personales.

Motivo: el MVP previo se veia wireframe / generico; los flujos solicitante/aprobador/caseta no estaban diferenciados ni alineados a la regla central del producto.

Impacto:
- UI institucional con sensacion de centro de control aeroportuario.
- Separacion clara entre seleccionar tipo (/nueva-solicitud) y rellenar formulario (/solicitudes/vip o /solicitudes/proveedor).
- Bitacora con timeline filtrable.
- Aprobaciones con tabla premium, filtros por estado y tipo, y acciones aprobar / corregir / rechazar / revocar.
- Caseta con codigo corto grande, lista de vigentes y acciones registrar entrada / salida / incidente.

Archivos afectados:
- index.html
- src/app/App.tsx
- src/styles/globals.css
- src/types/access.ts
- src/data/mockAccessRequests.ts
- src/lib/accessCodes.ts
- src/lib/supabaseClient.ts
- src/lib/qr.ts
- src/components/layout/AppLayout.tsx
- src/components/layout/Navbar.tsx
- src/components/ui/* (Card, Button, Badge, Input, Select, Textarea, Switch)
- src/components/access/* (StatusBadge, RequestTypeChip, RiskDot, RequestTypeCard, AccessSummaryCard, VipRequestForm, ProviderRequestForm)
- src/components/gate/GateValidationPanel.tsx
- src/pages/* (LoginPage, DashboardPage, NewAccessRequestPage, VipRequestPage, ProviderRequestPage, SecurityApprovalPage, GateValidationPage, AuditLogPage)
- public/manifest.webmanifest
- public/icon.svg

## Pendientes criticos

- Cambiar la repo a privada cuando el proyecto sea autorizado o antes de subir informacion sensible.
- Definir esquema inicial de Supabase y RLS por roles.
- Conectar persistencia real para solicitudes, aprobaciones, validaciones y bitacora (actualmente todo es mock).
- Implementar generador real de QR y codigo corto con verificacion de unicidad.
- Implementar autenticacion real (sustituir login simulado).
- Definir modo contingencia para caseta sin conexion.
- Implementar control de roles efectivo en navegacion y acciones.
- Implementar reporte basico de accesos (exportable).
- Agregar service worker controlado cuando se cierre la lista de rutas finales (PWA offline-friendly).
- Sustituir mock data por seed verificado por seguridad.
- Anadir iconografia vectorial (lucide-react ya esta en deps - integrarlo en navbar, tarjetas, botones de caseta).

## Formato para futuras decisiones

### YYYY-MM-DD - Titulo

Decision:
Motivo:
Impacto:
Archivos afectados:
