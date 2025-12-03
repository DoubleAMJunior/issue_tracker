import { Issue, IssueDTO, IssueRepository } from "../interfaces/Issue";

export default class InMemoryIssueRepo implements IssueRepository{
    issues:Issue[];
    constructor(){
        this.issues=[]
    }
    update(id: number,issueDTO:IssueDTO)
    {
        this.issues.filter(e=>e.id!== id);
        this.issues.push(<Issue>{id:id,title:issueDTO.title,description:issueDTO.description,status:issueDTO.status})
    };
    create(issue:IssueDTO){
        this.issues.push(<Issue>{id:Math.random(),title:issue.title,description:issue.description,status:issue.status})};
    getList(){return this.issues};
    delete(id:number){       
          this.issues=this.issues.filter(e=>e.id!== id);
        };

}