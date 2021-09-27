import { Component, OnInit , ViewChild } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {
  public widthSlider: number;
  public anchoToSlider: number;
  public etiquetaSlider: boolean;
  public autorCon: any;
  @ViewChild('textos') textos;

  constructor() { 
    this.etiquetaSlider = true;
    console.log(this.textos);
  }

  ngOnInit(){
    
  }
  
  cargarSlider(){
    this.anchoToSlider = this.widthSlider;
  }

  resetSlider(){
    this.anchoToSlider = null;
  }

  mostrarCaption(){
    if(this.etiquetaSlider == true){
      this.etiquetaSlider = false;
    }else{
      this.etiquetaSlider = true;
    }
  }

  conseguirAutor(event){
    this.autorCon = event;
  }

}
