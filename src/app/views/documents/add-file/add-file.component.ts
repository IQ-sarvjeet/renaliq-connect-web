import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService, PracticeService } from 'src/app/api-client';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent {
  addFileForm: FormGroup = this.fb.group({
    fileName: ['', Validators.required],
    title: ['', Validators.required],
    // fileSize: [0, Validators.required],
    // fileExt: ['', Validators.required],
    // fileType: ['', Validators.required],
    folder: [''],
    isGlobal: [false, Validators.required],
    practiceIds: [''],
    tags: [''],
    description: [''],
    file: [null, Validators.required],
    fileSource: [null, Validators.required],
  })
  selectedFile: File | null = null;
  practiceList: any = [];
  exceedFileSize: boolean = false;
  constructor(private fb: FormBuilder, private practiceService: PracticeService, private documentService: DocumentService) {}
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
    let data = this.addFileForm.value;
    data = {
      ...data,
      file: formData
    }
    console.log('data:', data);
    delete data.fileSource;
    this.documentService.apiDocumentDocumentPostForm(data).subscribe({

    });
  }
  onFileChange(event: Event) {
    const selectedFile = event.target as HTMLInputElement;
    if (selectedFile && selectedFile.files && selectedFile.files.length > 0) {
      const file = selectedFile.files[0];
      const fileName = file.name;
      // const fileExt = fileName.split('.')[0];
      const fileSize = file.size;
      this.exceedFileSize = (fileSize / 1024 / 1024) > 10 ? true: false;
      if(this.exceedFileSize) {
        this.addFileForm.patchValue({
          fileName,
        });
        return;
      } else {
        this.addFileForm.patchValue({
          file: file,
          fileName,
          // fileSize,
          // fileType,
          // fileExt
        });
      }
      console.log('file:::', file);
    }
  }
  
}
