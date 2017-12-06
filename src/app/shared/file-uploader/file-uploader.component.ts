
import { Ticket } from "./../../upload-file/ticket";
import { ToastyService, ToastOptions } from "ng2-toasty";
import { NgForm } from "@angular/forms";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import {
  HttpEventType,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { FileUploaderService } from "../../core/file-uploader.service";


@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.css"]
})
export class FileUploaderComponent implements OnInit {
  @Input() fileName: string;
  @Input() autoUpload:boolean=true;
  @Input() showProgress:boolean=true;
  @Output() fileNameChange = new EventEmitter();
  @ViewChild("screenshotInput") screenshotInput: ElementRef;



  queueProgress: number;
  isUploading: boolean;
  uploadTimeRemaining: number;
  uploadTimeElapsed: number;
  uploadSpeed: number;

  constructor(
    private uploadService: FileUploaderService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {

  }

  fileChange(event) {
    const filesList: FileList = event.target.files;
    if(this.autoUpload){
this.submitForm();
    }
    console.log("fileChange() -> filesList", filesList);
  }

  submitForm() {

    const fileInput: HTMLInputElement = this.screenshotInput.nativeElement;
    console.log("fileInput.files", fileInput.files);

    this.queueProgress = 0;
    this.isUploading = true;
    let startTime = Date.now();

    this.uploadService.sendFile(fileInput.files).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            startTime = Date.now();
            console.log("Request sent!");
            break;
          case HttpEventType.DownloadProgress:
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.queueProgress = Math.round(event.loaded / event.total * 100);

              const timeElapsed = Date.now() - startTime;
              const uploadSpeed = event.loaded / (timeElapsed / 1000);
              this.uploadTimeRemaining = Math.ceil(
                (event.total - event.loaded) / uploadSpeed
              );
              this.uploadTimeElapsed = Math.ceil(timeElapsed / 1000);
              this.uploadSpeed = uploadSpeed / 1024 / 1024;
            }
            break;
          case HttpEventType.Response:
            this.queueProgress = 100;
            this.isUploading = false;
            console.log("Done! ResponseBody:", event.body);
            this.fileName = event.body;
            this.fileNameChange.emit(this.fileName);
            this.toastyService.success(<ToastOptions>{
              title: "Success!",
              msg:
                "Your ticket has been submitted successfully and will be resolved shortly!",
              theme: "bootstrap",
              showClose: true,
              timeout: 15000
            });
            break;
        }
      },
      (error: HttpErrorResponse) => {
        this.isUploading = false;

        console.log(error);
        this.toastyService.error(<ToastOptions>{
          title: "Error!",
          msg: `${error.message}`,
          theme: "bootstrap",
          showClose: true,
          timeout: 15000
        });
      }
    );
  }
}
