import { Skill } from "./skill";

export class CandidateSkill {
    constructor(
        public candidateId?:number,
        public candidateName?:string,
        public birthDate?:Date,
        public phoneNo?:string,
        public picture?:string,
        public fresher?:boolean,
        public pictureFile?:File,
        public skillList?:Skill[]
    ){}
}
