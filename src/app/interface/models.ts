export interface Empresa {
  id: number;
  nombre: string;
  rubro: string;
  ubicacion: string;
}

export interface Empleado {
  id: number;
  nombre: string;
  cargo: string;
  empresaId: number
}
