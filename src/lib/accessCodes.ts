const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export const generarCodigoCorto = (longitud = 6): string => {
  return Array.from({ length: longitud }, () => ALFABETO[Math.floor(Math.random() * ALFABETO.length)]).join('');
};
