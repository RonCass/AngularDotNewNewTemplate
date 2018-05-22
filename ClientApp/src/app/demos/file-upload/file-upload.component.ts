import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../core/services/toastr.service';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  myDocumentToUpload: FileList; // This will hold the file they select to upload from their local machine
  theFileModel; // Ng Model is bound to this in the controle
  isBusy = false;;
  newDocument: DocumentsUploaded = new DocumentsUploaded();

  constructor(private toastrService: ToastrService, private dataService: DataService) { }

  ngOnInit() {
  }

  submitForm() {
    this.isBusy = true;    

    // Validate they chose a file to upload
    if (this.myDocumentToUpload == null || !(this.myDocumentToUpload.length > 0)) {
      this.toastrService.error('Please choose a file to upload.');
      this.isBusy = false;
      return;
    }       
   
    // Get File from the FileList Object
    const file: File = this.myDocumentToUpload[0];

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
       
    this.dataService.UploadFile(formData)
      .subscribe(
      response => {
        this.toastrService.success('File Saved.')
        this.isBusy = false;
      },
      (err: any) => {
        this.toastrService.error(err)
        this.isBusy = false;
      },
        () => console.log('Error Uploading File')
    );
    
  }

  onFileSelected(event) {
    // Adds the file to this FileList object
    this.myDocumentToUpload = event.target.files;
  }
}

export class DocumentsUploaded {
  Id: number;  
  Description
  FileName: string;  
  UploadedDate: Date;
  file: string;
}
