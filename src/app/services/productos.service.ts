import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosI } from '../interfaces/productos.interface';
import { resolve } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  prod: ProductosI[] = [];
  productoFiltrado: ProductosI[] = [];
  // bandera para ver si carga
  cargando = false;

  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise(  ( resolve, reject ) => {
      this.http.get('https://theguyplataform.firebaseio.com/productos_idx.json')
      .subscribe((resp: ProductosI[]) => {
        this.prod = resp;
        this.cargando = true;
        resolve();
      });

    });
  }

  public getProducto( id: string) {
    return this.http.get(`https://theguyplataform.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termimo: string){

    if(this.prod.length == 0){
      // cargar los productos
      this.cargarProductos().then( () =>{
        //ejecutar despues de ejecutar el producto
        this.filtrarProductos(termimo);
      });
    }else{
      // aplicar el filtro
      this.filtrarProductos(termimo);
    }
  }

  private filtrarProductos(termino: string){
    console.log(this.prod);

    this.productoFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.prod.forEach(producto => {

      const tituloLower = producto.titulo.toLocaleLowerCase();

      if(producto.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productoFiltrado.push( producto);
      }
    })
  }
}
