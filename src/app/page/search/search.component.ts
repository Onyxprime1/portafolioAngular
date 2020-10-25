import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, public productos: ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['termino']);
      this.productos.buscarProducto(params['termino']);
    })
  }

}