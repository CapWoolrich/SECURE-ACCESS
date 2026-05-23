# Secure Access

Plataforma PWA para gestión segura, privada y auditable de accesos a FBOs, hangares y zonas aeroportuarias.

## Objetivo

Reemplazar solicitudes por grupos de WhatsApp y hojas físicas por un sistema digital privado, trazable y confiable para accesos aeroportuarios.

## Principios del sistema

- Privacidad por diseño.
- Accesos por evento para pasajeros VIP.
- Identificación completa para proveedores y visitantes operativos.
- Validación mediante QR o código corto.
- Ventanas horarias limitadas.
- Auditoría completa de solicitudes, aprobaciones y validaciones.
- Operación en caseta mediante PWA.

## Tipos de acceso

### VIP / Pasajeros

No requiere capturar nombres, placas ni datos personales del pasajero o chofer.
El sistema autoriza un evento, una ventana horaria, un destino y un cupo máximo.

### Proveedores

Requiere nombre, empresa, motivo, vehículo, placa, zona de acceso y responsable interno.

## Stack propuesto

- React
- Vite
- TypeScript
- Supabase
- Tailwind CSS
- PWA

## Módulos MVP

1. Solicitud de acceso VIP privado.
2. Solicitud de acceso para proveedores identificados.
3. Panel de aprobación de seguridad.
4. Validación en caseta por QR o código corto.
5. Bitácora de auditoría.

## Nota de seguridad

Esta repo debe permanecer privada. El proyecto está relacionado con procesos de acceso aeroportuario y no debe exponer información operativa sensible.
