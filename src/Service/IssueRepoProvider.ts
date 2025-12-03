import { IssueRepository } from "../interfaces/Issue";
import InMemoryIssueRepo from "./InMemoryIssueRepo";
import SequelizeIssueRepo from "./SequalizeRepo";

export default function getRepo(type:string):IssueRepository{
    if(type !== "sql")  return  new InMemoryIssueRepo;
    return new SequelizeIssueRepo; 
}