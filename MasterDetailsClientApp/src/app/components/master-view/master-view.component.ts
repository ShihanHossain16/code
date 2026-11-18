import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CandidateSkill } from 'src/app/models/candidate-skill';
import { Skill } from 'src/app/models/skill';
import { DataService } from 'src/app/services/data.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.css']
})
export class MasterViewComponent {
  skillList:Skill[]=[];
  candidateList:CandidateSkill[]=[];

  constructor(
    private dataSvc:DataService,
    private notifySvc:NotifyService,
    private matDialog:MatDialog
  ){}

  ngOnInit():void{
    this.dataSvc.getSkillList().subscribe(x=>{
      this.skillList=x;
    });
    
    this.dataSvc.getCandidateSkill().subscribe(x=>{
      this.candidateList=x;
    })
  }

  getSkillName(id:any){
    let data=this.skillList.find(x=>x.skillId==id);
    return data?data.skillName:'';
  }

  OnDelete(item:CandidateSkill):void{
    this.matDialog.open(ConfirmDialogComponent,{
      width:'450px',
      enterAnimationDuration:'500ms'
    }).afterClosed().subscribe(result=>{
      if(result){
        if(item.candidateId){
          this.dataSvc.deleteCandidateSkill(item.candidateId).subscribe(x=>{
            this.candidateList=this.candidateList.filter(x=>x.candidateId!=item.candidateId);
            this.notifySvc.message("Data deleted successfully!!!","DISMISS");
          },error=>{
            this.notifySvc.message("There is something wrong!!!","DISMISS");
          })
        }
      }
    })
  }
}
