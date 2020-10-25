import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  // parametros para los textos usando json
  info: InfoPagina = {};
  cargarda = false;
  // parametro para la base de datos en firebase 
  equipo: any[] = [];

  constructor(private http: HttpClient) {
    console.log('informacion de pagina');

    // leer el archivo JSON
    this.cargarInfo();
    this.realTime();

   }

  private cargarInfo() {
      this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargarda = true;
        this.info = resp;
        console.log(resp);
    });
   }

   private realTime(){
     this.http.get('https://theguyplataform.firebaseio.com/equipo.json')
     .subscribe( (resp: any[]) =>{
      this.equipo = resp;
      console.log(resp);
     });
   }
}
