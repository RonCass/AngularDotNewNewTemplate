import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../shared/services/toastr.service';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
    
  theFileModel; // Ng Model is bound to this in the controle
  theFileModel2;
  theFileModel3;
  isBusy = false;;
  newDocument: DocumentsUploaded = new DocumentsUploaded();

  myOneFileToUpload: FileList; // This will hold the file they select to upload from their local machine
  myMultipleFilesToUpload: FileList;
  MyField1;
  MyField2;

  constructor(private toastrService: ToastrService, private dataService: DataService) { }

  ngOnInit() {
  }

  submitOneFileToUpload() {
    this.isBusy = true;    

    // Validate they chose a file to upload
    if (this.myOneFileToUpload == null || !(this.myOneFileToUpload.length > 0)) {
      this.toastrService.error('Please choose a file to upload.');
      this.isBusy = false;
      return;
    }       
   
    // Get File from the FileList Object
    const file: File = this.myOneFileToUpload[0];

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
       
    this.dataService.UploadOneFileOnly(formData)
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

  submitUploadOneFileAndOtherModelData() {
    this.isBusy = true;

    // Validate they chose a file to upload
    if (this.myOneFileToUpload == null || !(this.myOneFileToUpload.length > 0)) {
      this.toastrService.error('Please choose a file to upload.');
      this.isBusy = false;
      return;
    }

    // Get File from the FileList Object
    const file: File = this.myOneFileToUpload[0];

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    formData.append('MyField1', this.MyField1);
    formData.append('MyField2', this.MyField2);

    this.dataService.UploadOneFileAndOtherModelData(formData)
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

  submitMultipleFilesToUpload() {
    this.isBusy = true;

    // Validate they chose a file to upload
    if (this.myMultipleFilesToUpload == null || !(this.myMultipleFilesToUpload.length > 0)) {
      this.toastrService.error('Please choose a file to upload.');
      this.isBusy = false;
      return;
    }

    let formData: FormData = new FormData();

    //Loop through files and add them to the formData
    for (var i = 0; i < this.myMultipleFilesToUpload.length; i++) {
      // Get File from the FileList Object
      const file: File = this.myMultipleFilesToUpload.item(i);      
      formData.append('file', file, file.name);
    }    

    this.dataService.UploadMultipleFiles(formData)
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

  onOneFileSelected(event) {
    // Adds the file to this FileList object
    this.myOneFileToUpload = event.target.files;
  }

  onMultipleFilesSelected(event) {
    // Adds the file to this FileList object
    this.myMultipleFilesToUpload = event.target.files;
  }

}

export class DocumentsUploaded {
  Id: number;  
  Description
  FileName: string;  
  UploadedDate: Date;
  file: string;
}

export class MyModelWithOneFile {
  MyField1: string;
  MyField2: string;
  file: string;
}
