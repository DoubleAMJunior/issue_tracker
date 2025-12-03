import { IssueRepository } from "../interfaces/Issue";
import InMemoryIssueRepo from "./InMemoryIssueRepo";

export default function getRepo(type:string):IssueRepository|undefined{
    if(type !== "sql")  return  new InMemoryIssueRepo;
    return undefined; 
}