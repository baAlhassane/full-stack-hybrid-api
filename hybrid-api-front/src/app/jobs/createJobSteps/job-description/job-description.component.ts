import {Component, input, model, output, ViewChild} from '@angular/core';
import {Form, FormsModule, NgForm} from '@angular/forms';
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [
    FormsModule,
    InputTextareaModule
  ],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css'
})
export class JobDescriptionComponent {

title=model.required<string>();
description=model.required<string>();
stepValidityChange=output<boolean>();
@ViewChild("formDescription")// ici on utilise
formDescription: NgForm | undefined ;

  constructor() {

  }

  private validateForm():boolean  {
    if(this.formDescription){
      return <boolean> this.formDescription?.valid;
    }

    return false;
  }

onTitleChange(title: string) {
this.title.set(title);
this.stepValidityChange.emit(this.validateForm());

}

  onDescriptionChange(title: string) {
    this.description.set(title);
    this.stepValidityChange.emit(this.validateForm());
    console.log(" onDescriptionchange() in DescriptionComponent for emitting title and descriptrion  and stestepValidityChange : ",this.validateForm());


  }
}
