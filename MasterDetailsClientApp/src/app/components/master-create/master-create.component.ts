import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Skill } from 'src/app/models/skill';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-master-create',
  templateUrl: './master-create.component.html',
  styleUrls: ['./master-create.component.css']
})
export class MasterCreateComponent {
  skillList:Skill[]=[];
  candidatePicture:File=null!;


  constructor(
    private dataSvc:DataService,
    private notifySvc:NotifyService,
    private router:Router
  ){}

  candidateForm:FormGroup=new FormGroup({
    candidateId:new FormControl(undefined,Validators.required),
    candidateName:new FormControl(undefined,Validators.required),
    birthDate:new FormControl(undefined),
    phoneNo:new FormControl(undefined,Validators.required),
    fresher:new FormControl(undefined,Validators.required),
    skillList:new FormArray([])
  });

  get skillListArray(){
    return this.candidateForm.controls["skillList"] as FormArray;
  }

  addSkill(){
    this.skillListArray.push(new FormGroup({
      skillId:new FormControl(undefined,Validators.required)
    }));
  }

  removeSkillList(index:number){
    if(this.skillListArray.controls.length>0){
      this.skillListArray.removeAt(index);
    }
  }

  onFileSelected(event:any){
    this.candidatePicture=event.target.files[0];
  }

  ngOnInit(){
    this.dataSvc.getSkillList().subscribe((result)=>{
      this.skillList=result;
    });
    this.addSkill();
  }

  insertCandidate(){
    var formData=new FormData();

    formData.append("skillsStringify",JSON.stringify(this.candidateForm.get("skillList")?.value));
    formData.append("candidateName",this.candidateForm.get("candidateName")?.value);
    formData.append("birthDate",this.candidateForm.get("birthDate")?.value);
    formData.append("phoneNo",this.candidateForm.get("phoneNo")?.value);
    formData.append("fresher",this.candidateForm.get("fresher")?.value);
    formData.append("pictureFile",this.candidatePicture,this.candidatePicture.name);

    this.dataSvc.postCandidateSkill(formData).subscribe({
      next:r=>{
        console.log(r);
        this.notifySvc.message("Data inserted successfully!!!",'DISMISS');
        this.router.navigate(['/masterView']);
      },
      error:err=>{
        console.log(err);
      }
    })

  }

}
