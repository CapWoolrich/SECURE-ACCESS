export type AccessType = 'vip' | 'proveedor';

export interface VipAccessRequest {
  id: string;
  tipo: 'vip';
  empresa: string;
  referenciaAeronave: string;
  destino: string;
  fecha: string;
  ventanaInicio: string;
  ventanaFin: string;
  maxPersonas: number;
  maxVehiculos: number;
  responsable: string;
  escoltaRequerida: boolean;
  codigoQR: string;
  codigoCorto: string;
  estado: 'borrador' | 'aprobada' | 'activa' | 'cerrada';
}

export interface ProviderAccessRequest {
  id: string;
  tipo: 'proveedor';
  nombreCompleto: string;
  empresa: string;
  motivo: string;
  areaDestino: string;
  detalleVehiculo: string;
  placa: string;
  herramientasEquipo: string;
  responsable: string;
  escoltaRequerida: boolean;
  estado: 'pendiente' | 'aprobada' | 'rechazada' | 'en_curso';
}

export type AccessRequest = VipAccessRequest | ProviderAccessRequest;
