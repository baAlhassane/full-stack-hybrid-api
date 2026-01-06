import {Component, model, output, ViewChild, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-provider-infos',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './provider-infos.component.html',
  styleUrl: './provider-infos.component.css'
})
export class ProviderInfosComponent {


  firstname=model.required<string>();
  lastname=model.required<string>();
  stepValidityChange=output<boolean>();
  @ViewChild("formProviderInfo")
  formProviderInfo:NgForm | undefined;

  onFirstname(firstname:string) {
    this.firstname.set(firstname);
    this.stepValidityChange.emit(this.validateForm());
  }

  onLastname(lastname:string){
    this.lastname.set(lastname);
    this.stepValidityChange.emit(this.validateForm());
  }

  private validateForm():boolean  {
    if(this.formProviderInfo){
      return <boolean> this.formProviderInfo?.valid;
    }

    return false;
  }

}
