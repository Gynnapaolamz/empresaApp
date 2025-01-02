import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../interface/models';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:3000/empresas';

  constructor(private http: HttpClient) { }


    getEmpresas(): Observable<Empresa[]> {
      return this.http.get<Empresa[]>(this.apiUrl);
    }
    addEmpresa(empresa: Empresa): Observable<Empresa> {
      return this.http.post<Empresa>(this.apiUrl, empresa);
    }

    updateEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
      return this.http.put<Empresa>(`${this.apiUrl}/${id}`, empresa);
    }

    deleteEmpresa(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }
