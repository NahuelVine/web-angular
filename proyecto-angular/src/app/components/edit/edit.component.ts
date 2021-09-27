import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router , ActivatedRoute , Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create-projects/create-projects.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService,UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public error_name: string;
  public error_description: string;
  public error_category: string;
  public error_langs: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public save_project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.title = "Editar proyecto";
    this.error_name = "*El nombre es obligatorio";
    this.error_description = "*La descricion es obligatoria";
    this.error_category = "*La categoria es obligatoria";
    this.error_langs = "*Los lenguajes son obligatorios"
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      let id = params.id;

      this.getProject(id);
    });
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      response=>{
        this.project = response.project;
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    this._projectService.updateProject(this.project).subscribe(
      response=>{
        if(response.project){
          //GUARDAR IMAGEN
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(this.url+"upload-image/"+response.project._id, this.filesToUpload, "Image")
            .then((result:any)=>{
              this.status = "success";
              this.save_project = result.project;
              window.scrollTo(0,0);
            }); 
          }else{
            this.status = "success";
            this.save_project = response.project;
            window.scrollTo(0,0);
          }
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
