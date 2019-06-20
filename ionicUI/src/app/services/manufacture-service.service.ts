import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManufactureServiceService {
  private _create_po="http://52.224.67.101:5000/api/manufacture/po_by_manufacture";
  constructor(
    private http: HttpClient,
  ) { }
}
