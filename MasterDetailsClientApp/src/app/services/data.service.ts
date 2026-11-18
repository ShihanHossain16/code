import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill';
import { CandidateSkill } from '../models/candidate-skill';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getSkillList():Observable<Skill[]>{
    return this.http.get<Skill[]>("http://localhost:5224/api/Candidates/GetSkills");
  }

  postCandidateSkill(data:FormData):Observable<CandidateSkill>{
    return this.http.post<CandidateSkill>("http://localhost:5224/api/Candidates",data);
  }

  getCandidateSkill():Observable<CandidateSkill[]>{
    return this.http.get<CandidateSkill[]>("http://localhost:5224/api/Candidates");
  }

  getCandidateSkillById(id:number):Observable<CandidateSkill>{
    return this.http.get<CandidateSkill>("http://localhost:5224/api/Candidates/"+id);
  }

  updateCandidateSkill(data:FormData):Observable<CandidateSkill>{
    return this.http.post<CandidateSkill>("http://localhost:5224/api/Candidates/Update",data)
  }

  deleteCandidateSkill(id:number):Observable<CandidateSkill>{
    return this.http.post<CandidateSkill>("http://localhost:5224/api/Candidates/Delete/"+id,null);
  }
}
