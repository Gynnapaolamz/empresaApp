import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../interface/models';
import { EmpleadoService } from '../../services/empleado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styles: ``
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[] = [];
  nuevoEmpleado: Empleado = { id: 0, nombre: '', cargo: '', empresaId: 0 };
  empleadoSeleccionado: Empleado | null = null;

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.loadEmpleados();
  }

  loadEmpleados(): void {
    this.empleadoService.getEmpleados().subscribe(empleados => {
      this.empleados = empleados;
    });
  }

  addEmpleado(): void {
    this.empleadoService.addEmpleado(this.nuevoEmpleado).subscribe((empleado) => {
      this.empleados.push(empleado);
      this.nuevoEmpleado = { id: 0, nombre: '', cargo: '', empresaId: 0 };
    });
  }

  selectEmpleado(empleado: Empleado): void {
    this.empleadoSeleccionado = { ...empleado };
  }

  updateEmpleado(): void {
    if (this.empleadoSeleccionado && this.empleadoSeleccionado.id) {
      this.empleadoService.updateEmpleado(this.empleadoSeleccionado.id, this.empleadoSeleccionado).subscribe(() => {
        this.loadEmpleados();
        this.empleadoSeleccionado = null;
      });
    } else {
      console.error("Empleado seleccionado no tiene un ID válido.");
    }
  }

  deleteEmpleado(id: number): void {
    if (id) {
      this.empleadoService.deleteEmpleado(id).subscribe(() => {
        this.loadEmpleados();
      });
    } else {
      console.error("ID de empleado no válido.");
    }
  }
}
