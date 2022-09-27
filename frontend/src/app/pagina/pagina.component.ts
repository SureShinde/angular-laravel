import { Component, OnInit } from '@angular/core';

import { catchError } from 'rxjs/operators';

import { ApiService } from '../services/api.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import {Texto} from './texto';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {
  textoSetado: string ='';
  public apiGreeting = '';
  public dataHora : any;

  constructor(
    private apiService: ApiService
  ) { }
  

  ngOnInit(): void {
    
    this.apiService.getHello().pipe(
      catchError((err) => {
        this.apiGreeting = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.apiGreeting = response.mensagem;
      }
    });

    this.apiService.getDataHora().pipe(
      catchError((err) => {
        this.dataHora = 'Falha na comunicação com o servidor.';
        return [];
      })
    ).subscribe((response) => {
      if (response) {
        this.dataHora = response.dataHora;
      }
    });

  }
  enviarTexto(texto: string){
    let data = {  
      inputTexto: texto
    }
    this.apiService.postTexto(data).subscribe((response) => {
      if (response) {
        console.log(response);
        this.textoSetado = response.texto;
      }
    });
  }
  

}
