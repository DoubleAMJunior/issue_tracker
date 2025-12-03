export interface IssueRepository{
    update:(id:number,issue:IssueDTO)=>void
    create:(issue:IssueDTO)=>void
    getList:()=>Promise<Issue[]>
    delete:(id:number)=>void
}

export interface Issue{
    id:number|undefined,
    title:string,
    description:string|null
    status:boolean
}

export interface IssueDTO{
    title:string,
    description:string|null
    status:boolean
}