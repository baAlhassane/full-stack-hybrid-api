import {Component, model, output} from '@angular/core';
import {JobPictureDTO} from "../../job.model";
import {FaIconComponent, FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-job-picure',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './job-picure.component.html',
  styleUrl: './job-picure.component.css'
})
export class JobPicureComponent {


  jobPictures=model.required<Array<JobPictureDTO>>();

  stepValidityChange=output<boolean>();
  iconTrash: IconProp=faTrashCan;

  extractFileFromTarget(target: EventTarget | null) {

    const inputTarget=target as HTMLInputElement;
    if(target === null || inputTarget.files === null) {
      return null;
    }
    return inputTarget.files;

  }

  onUploadNewPicture(target: EventTarget | null) {
    const pictureFileList= this.extractFileFromTarget(target);
    if(pictureFileList!==null) {
      for(let i=0; i<pictureFileList.length; i++) {
        const pictureFile = pictureFileList.item(i);// .item return nul si le file n'existe pas

        if(pictureFile !==null){
          const displayPicture: JobPictureDTO={
            file:pictureFile,
            urlDisplay: URL.createObjectURL(pictureFile),
          }
          this.jobPictures().push( displayPicture);
        }

        this.validatedPicture();

      }
    }
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(faTrashCan); // Disponible partout maintenant via icon="trash-can"
  }
  private validatedPicture() {
    if(this.jobPictures().length >=3){
      this.stepValidityChange.emit(true);

    }
    else {
      this.stepValidityChange.emit(false);
    }
  }

  onTrashPicture(pictureToDelete: JobPictureDTO) {
    const indexDelete = this.jobPictures().findIndex(picture => picture.file.name == pictureToDelete.file.name);
    this.jobPictures().splice(indexDelete, 1);
    this.validatedPicture();
  }

}
