import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@mobiscroll/angular/dist/js/angular/form-control';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent {
  addFileForm: FormGroup = this.fb.group({
    fileName: ['', Validators.required],
    folderName: ['', Validators.required],
    documentScope: ['Practice', Validators.required],
    practiceIds: [''],
    tags: ['', Validators.required],
    description: ['']
  })
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder) {}
  submit() {
    console.log('addFileForm:', this.addFileForm.value);
  }
  onSelect(event: Event) {
    const selectedFile: any = event.target as HTMLInputElement;
    if (!selectedFile) return;
    this.selectedFile = selectedFile.files[0];
    // const reader: any = new FileReader();
    // reader.onload = () => {
    //   const fileValue: any = reader.result.toString();
    // };
    // reader.readAsDataURL(file);
  }
  
}
