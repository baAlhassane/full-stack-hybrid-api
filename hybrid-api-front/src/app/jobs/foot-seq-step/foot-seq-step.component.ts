import {Component, input, model, output, signal} from '@angular/core';
import {Step} from "../Step.model.";
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-foot-seq-step',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FaIconComponent
  ],
  templateUrl: './foot-seq-step.component.html',
  styleUrl: './foot-seq-step.component.css'
})
export class FootSeqStepComponent {
  // car on veut des valeur fournies par le parent
  currentStep = input.required<Step>(); // model.required<Step>();
  isAllStepValid=  input<boolean>(false); //model.required<boolean>();
  labelFinishBtn=input<string>("Finish");//model.required<string>();
  loading= input<boolean>(false) ;//model.required<boolean>();

  // car on veut que l'enfant modifi le parrent
  previous= output<boolean>() ;
  next=  output<boolean>() ;
  finish=  output<boolean>() ;


  constructor(library: FaIconLibrary) {
    // On ajoute l'icône à la bibliothèque du composant
    library.addIcons(faCircleNotch);
  }

onNext(){
    this.next.emit(true);
}

  onPrevious(){
    this.previous.emit(true);
  }
onFinish(){
    this.finish.emit(true);
}


}
