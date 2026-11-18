import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateSkill } from 'src/app/models/candidate-skill';
import { Skill } from 'src/app/models/skill';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.css']
})
export class MasterEditComponent {
    skillList:Skill[]=[];
    candidatePicture:File=null!;
    candidateSkill:CandidateSkill={
      candidateId:undefined,
      candidateName:undefined,
      phoneNo:undefined,
      picture:undefined,
      fresher:undefined
    }
  
  
    constructor(
      private dataSvc:DataService,
      private notifySvc:NotifyService,
      private router:Router,
      private activatedRoute:ActivatedRoute
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
  
    addSkill(item?:Skill){
      if(item){
        this.skillListArray.push(new FormGroup({
          skillId:new FormControl(item.skillId,Validators.required)
        }));
      }
      else{
        this.skillListArray.push(new FormGroup({
          skillId:new FormControl(undefined,Validators.required)
        }))
      }
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
      const id=this.activatedRoute.snapshot.params['id'];

      this.dataSvc.getCandidateSkillById(id).subscribe(x=>{
        this.candidateSkill=x;

        this.candidateForm.patchValue(this.candidateSkill);

        if(x.birthDate){
          const birthDate=new Date(x.birthDate);
          const formattedBirthDate=birthDate.toISOString().substring(0,10);

          this.candidateForm.patchValue({
            birthDate:formattedBirthDate
          })
        }

        this.candidateSkill.skillList?.forEach(item=>{
          this.addSkill(item);
        });
      });

      this.dataSvc.getSkillList().subscribe((result)=>{
        this.skillList=result;
      });
    }

    updateCandidate(){
      var formData=new FormData();

    formData.append("skillsStringify",JSON.stringify(this.candidateForm.get("skillList")?.value));
    formData.append("candidateId",this.candidateForm.get("candidateId")?.value);
    formData.append("candidateName",this.candidateForm.get("candidateName")?.value);
    formData.append("birthDate",this.candidateForm.get("birthDate")?.value);
    formData.append("phoneNo",this.candidateForm.get("phoneNo")?.value);
    formData.append("fresher",this.candidateForm.get("fresher")?.value);

    if(this.candidatePicture){
      formData.append("pictureFile",this.candidatePicture,this.candidatePicture.name);
    }
    

    this.dataSvc.updateCandidateSkill(formData).subscribe({
      next:r=>{
        console.log(r);
        this.notifySvc.message("Data updated successfully!!!",'DISMISS');
        this.router.navigate(['/masterView']);
      },
      error:err=>{
        console.log(err);
      }
    })
    }

}
