export interface Categoria {
  combustionEstacionaria: string;
  emisionesFugitivas: string;
  emisionesDeProcesos: string;
  combustionMovil: string;
  carlorVaporRefrigeracion: string;
  electricidadComprada: string;
  perdidasPorTransmision: string;
  bienesYServicios: string;
  residuosGenerados: string;
  transporteAguasArriba: string;
  transporteAguasAbajo: string;
  usoDeProductos: string;
  desplazamientoDeEmpleados: string;
  viajeDeNegocios: string;
}

export interface CategoryMap {
  [key: string]: keyof Categoria;
}
