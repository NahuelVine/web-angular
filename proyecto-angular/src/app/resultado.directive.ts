import { Directive , ElementRef } from '@angular/core';

@Directive({
  selector: '[appResultado]'
})
export class ResultadoDirective {

  constructor(public el:ElementRef){
    
  }

  ngOnInit(){
    var element = this.el.nativeElement;
    element.style.background = "rgb(200,200,200)";
    element.style.padding = "20px";
    element.style.marginRight = "20px";
    element.style.color = "black";
  }

}
