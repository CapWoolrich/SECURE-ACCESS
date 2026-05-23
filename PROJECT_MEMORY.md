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

## Pendientes criticos

- Cambiar la repo a privada.
- Crear estructura src.
- Implementar MVP visual.
- Definir esquema inicial de Supabase.
- Definir RLS por roles.
- Crear generador real de QR y codigo corto.
- Crear auditoria real.
- Definir modo contingencia para caseta.

## Formato para futuras decisiones

### YYYY-MM-DD - Titulo

Decision:
Motivo:
Impacto:
Archivos afectados:
