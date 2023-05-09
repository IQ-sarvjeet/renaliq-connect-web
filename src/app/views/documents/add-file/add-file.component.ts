import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService, PracticeService } from 'src/app/api-client';
import { environment } from 'src/environments/environment';

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
    practiceIds: [[]],
    tags: [''],
    description: [''],
    file: [null, Validators.required],
    fileSource: [null, Validators.required],
  })
  selectedFile: File | null = null;
  practiceList: any = [];
  exceedFileSize: boolean = false;
  constructor(private fb: FormBuilder,
    private practiceService: PracticeService,
    private documentService: DocumentService,
    private httpClient: HttpClient) { }
  ngOnInit() {
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
    console.log('file value:', this.addFileForm.value.file)
    formData.append('File', this.addFileForm.value.file);
    console.log('formData:', formData)
    let data = this.addFileForm.value;
    data = {
      ...data,
      file: formData
    }
    console.log('data:', data);
    delete data.fileSource;
    const formData1 = new FormData();
    formData1.append('Id', '45');
    formData1.append('File', this.addFileForm.value.file);
    formData1.append('FileName', this.addFileForm.value.fileName);
    formData1.append('DownloadURL', '');
    formData1.append('Description', this.addFileForm.value.description);
    formData1.append('Title', this.addFileForm.value.title);
    formData1.append('Folder', this.addFileForm.value.folder);
    formData1.append('IsGlobal', this.addFileForm.value.isGlobal);
    formData1.append('IsDeleted', 'false');
    this.addFileForm.value.practiceIds.forEach((item: any) => {
      formData1.append('PracticeIds', item);
    })
    this.addFileForm.value.tags.split(',').forEach((item: any) => {
      formData1.append('Tags', item);
    })
    // formData1.append('PracticeIds', '23');
    // formData1.append('PracticeIds', '28');
    // formData1.append('Tags', 'aaa');
    // formData1.append('Tags', 'bbb');

    this.httpClient.post(`${environment.baseApiUrl}/api/Document/document`, formData1, { headers: { 'Content-Type': 'multipart/form-data' } }).subscribe({
      next: (response: any) => {

      }
    })
    // this.documentService.apiDocumentDocumentPostForm(34, data.file, data.fileName).subscribe({

    // });
  }
  onFileChange(event: any) {
    console.log('event.target', event.target.files[0]);
    const selectedFile = event.target as HTMLInputElement;
    if (selectedFile && selectedFile.files && selectedFile.files.length > 0) {
      const file = selectedFile.files[0];
      const fileName = file.name;
      // const fileExt = fileName.split('.')[0];
      const fileSize = file.size;
      this.exceedFileSize = (fileSize / 1024 / 1024) > 10 ? true : false;
      if (this.exceedFileSize) {
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
