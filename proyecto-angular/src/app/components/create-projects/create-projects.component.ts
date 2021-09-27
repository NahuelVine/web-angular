import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create-projects',
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css'],
  providers: [ProjectService , UploadService]
})
export class CreateProjectsComponent implements OnInit {

  public title: string;
  public error_name: string;
  public error_description: string;
  public error_category: string;
  public error_langs: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  public save_project;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.error_name = "*El nombre es obligatorio";
    this.error_description = "*La descricion es obligatoria";
    this.error_category = "*La categoria es obligatoria";
    this.error_langs = "*Los lenguajes son obligatorios"
    this.project = new Project('','','','','',2020,'');
    this.url = Global.url;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    //GUARDAR DATOS BASICOS
    this._projectService.saveProject(this.project).subscribe(
      response=>{
        if(response.project){
          //GUARDAR IMAGEN
//          this._uploadService.makeFileRequest(this.url+"upload-image/"+response.project._id, this.filesToUpload, "Image")
//            .then((result:any)=>{
              this.status = "success";
//              this.save_project = response.project;
              form.reset();
              window.scrollTo(0,0);
//            });
        }else{
          this.status = "failed";
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(fileInput);
  }

}
