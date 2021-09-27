import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {

  @Input() ancho: number;
  @Input() etiqueta: boolean;
  @Output() getAutor = new EventEmitter();

  public autor: any;

  constructor(){
    this.autor={
      nombre: "Nahuel Iovine",
      mail: "nahuel.iovine.99@gmail.com",
      edad: 21
    }
  }

  ngOnInit(): void {
    $('.galery').bxSlider({
      mode: 'fade',
      captions: this.etiqueta,
      slideWidth: this.ancho,
      auto: true,
      autoControls: true,
      stopAutoOnClick: true,
      pager: true,
    });

    this.getAutor.emit(this.autor);
  }

  lanzar(event){
    console.log(event);
    this.getAutor.emit(this.autor);
  }

}
