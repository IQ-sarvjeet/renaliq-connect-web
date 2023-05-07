import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@mobiscroll/angular/dist/js/angular/form-control';
import { PracticeService } from 'src/app/api-client';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent {
  addFileForm: FormGroup = this.fb.group({
    fileName: ['', Validators.required],
    title: ['', Validators.required],
    // fileSize: ['', Validators.required],
    // fileExt: ['', Validators.required],
    // fileType: ['', Validators.required],
    folderName: ['', Validators.required],
    isGlobal: [false, Validators.required],
    practiceIds: [''],
    tags: ['', Validators.required],
    description: [''],
    file: [null, Validators.required],
    fileSource: [null, Validators.required],
  })
  selectedFile: File | null = null;
  practiceList: any = [];
  constructor(private fb: FormBuilder, private practiceService: PracticeService) {}
  ngOnInit(){
    this.practiceService.apiPracticeListGet().subscribe({
      next: (response: any) => {
        this.practiceList = response;
      },
      error: (error: any) => {
      }
    })
  }
  submit() {
    console.log('addFileForm:', this.addFileForm.value);
    const formData = new FormData();
    formData.append('file', this.addFileForm.get('file')?.value);
  }
  onFileChange(event: Event) {
    const selectedFile = event.target as HTMLInputElement;
    if (selectedFile && selectedFile.files && selectedFile.files.length > 0) {
      const file = selectedFile.files[0];
      const fileName = file.name;
      // const fileExt = fileName.split('.')[0];
      const fileSize = file.size;
      // const fileType = file.type.split('/')[1];
      console.log('file:::', file);
      this.addFileForm.patchValue({
        file: file,
        fileName,
        // fileSize,
        // fileType,
        // fileExt
      });
    }
    // const selectedFile: any = event.target as HTMLInputElement;
    // if (!selectedFile) return;
    // this.selectedFile = selectedFile.files[0];
    // const reader: any = new FileReader();
    // reader.onload = () => {
    //   const fileValue: any = reader.result.toString();
    // };
    // reader.readAsDataURL(file);
  }
  
}
