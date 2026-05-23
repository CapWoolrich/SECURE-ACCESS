# Secure Access - Arquitectura MVP

## Propósito

Secure Access es una PWA para administrar accesos seguros a hangares, FBOs y zonas aeroportuarias, reemplazando solicitudes por WhatsApp y hojas físicas.

## Principio central

El sistema separa dos modelos de acceso:

1. Acceso VIP por evento.
2. Acceso identificado para proveedores.

## Acceso VIP por evento

Para pasajeros, dueños de aeronave y choferes de pasajeros.

No debe pedir:

- Nombre del pasajero.
- Nombre del chofer.
- Placa.
- Teléfono.
- Identificación.

Debe pedir:

- Empresa solicitante.
- Aeronave o referencia operativa.
- Hangar o FBO destino.
- Fecha.
- Ventana horaria.
- Máximo de personas.
- Máximo de vehículos.
- Responsable interno.
- Si requiere escolta.

Debe generar:

- Folio.
- Código corto.
- QR temporal.
- Estado de autorización.

## Acceso identificado para proveedores

Para mantenimiento, catering, limpieza, contratistas, técnicos, proveedores y visitantes operativos.

Debe pedir:

- Nombre completo.
- Empresa.
- Motivo.
- Área destino.
- Vehículo.
- Placa.
- Herramientas o equipo.
- Responsable interno.
- Escolta requerida.

## Roles

- super_admin
- security_admin
- security_operator
- gate_guard
- operator_admin
- operator_user
- auditor

## Estados

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

## Módulos MVP

1. Portal del operador.
2. Formulario de acceso VIP.
3. Formulario de proveedor identificado.
4. Panel de aprobación de seguridad.
5. Validación en caseta por QR o código.
6. Bitácora de auditoría.
7. Reporte básico de accesos.

## Seguridad y privacidad

- Privacidad por diseño.
- Visibilidad por necesidad de saber.
- Operadores solo ven sus solicitudes.
- Seguridad ve todas las solicitudes.
- Guardia solo ve accesos aprobados/activos relevantes.
- Cada acción debe generar audit log.
- WhatsApp no debe ser la fuente de verdad.

## Stack

- React + Vite + TypeScript.
- Supabase Auth.
- Supabase Postgres.
- Tailwind CSS.
- Vercel.
- PWA instalable para caseta.
