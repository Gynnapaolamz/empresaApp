import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../interface/models';
import { EmpresaService } from '../../services/empresa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empresas.component.html',
  styles: ``
})
export class EmpresasComponent implements OnInit{
  empresas: Empresa[] = [];
  nuevaEmpresa: Empresa = { id: 0, nombre: '', rubro: '', ubicacion: '' };
  empresaSeleccionada: Empresa | null = null;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas(): void {
    this.empresaService.getEmpresas().subscribe(empresas => {
      this.empresas = empresas;
    });
  }

  addEmpresa(): void {
    this.empresaService.addEmpresa(this.nuevaEmpresa).subscribe((empresa) => {
      this.empresas.push(empresa);
      this.nuevaEmpresa = { id: 0, nombre: '', rubro: '', ubicacion: '' };
    });
  }

  selectEmpresa(empresa: Empresa): void {
    this.empresaSeleccionada = { ...empresa };
  }

  updateEmpresa(): void {
    if (this.empresaSeleccionada && this.empresaSeleccionada.id) {
      this.empresaService.updateEmpresa(this.empresaSeleccionada.id, this.empresaSeleccionada).subscribe(() => {
        this.loadEmpresas();
        this.empresaSeleccionada = null;
      });
    } else {
      console.error("Empresa seleccionada no tiene un ID válido.");
    }
  }

  deleteEmpresa(id: number): void {
    if (id) {
      this.empresaService.deleteEmpresa(id).subscribe(() => {
        this.loadEmpresas();
      });
    } else {
      console.error("ID de empresa no válido.");
    }
  }
}
