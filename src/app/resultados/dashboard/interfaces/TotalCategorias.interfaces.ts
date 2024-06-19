export interface Emisiones {
  combustionEstacionaria: number;
  emisionesFugitivas: number;
  emisionesDeProcesos: number;
  combustionMovil: number;
  carlorVaporRefrigeracion: number;
  electricidadComprada: number;
  perdidasPorTransmision: number;
  bienesYServicios: number;
  residuosGenerados: number;
  transporteAguasArriba: number;
  transporteAguasAbajo: number;
  usoDeProductos: number;
  desplazamientoDeEmpleados: number;
  viajeDeNegocios: number;
}

export interface TotalCategorias {
  alcanceUno: Emisiones;
  alcanceDos: Emisiones;
  alcanceTres: Emisiones;
}
