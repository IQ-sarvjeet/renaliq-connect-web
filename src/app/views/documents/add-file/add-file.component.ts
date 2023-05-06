import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@mobiscroll/angular/dist/js/angular/form-control';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent {
  addFileForm: FormGroup = this.fb.group({
    fileName: [''],
    folderName: [''],
    documentScope: [''],
    tags: [''],
    description: ['']
  })
  constructor(private fb: FormBuilder) {}
  submit() {
    
  }
  
}
