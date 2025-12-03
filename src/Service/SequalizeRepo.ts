import { IssueModel, initDB } from "../data/sqlitedb";
import { Issue, IssueDTO, IssueRepository } from "../interfaces/Issue";

export default class SequelizeIssueRepo implements IssueRepository {

    constructor() {
        initDB();
    }

    async create(issueDTO: IssueDTO): Promise<Issue> {
        const item= await IssueModel.create({
            title: issueDTO.title,
            description: issueDTO.description,
            status: issueDTO.status
        });
        return <Issue>{id:item.id,
                title:item.title,
                description:item.description,
                status:item.status
            }
    }

    async update(id: number, issueDTO: IssueDTO): Promise<void> {
        const issue = await IssueModel.findByPk(id);
        if (!issue) throw new Error("Issue not found");
        await issue.update({
            title: issueDTO.title,
            description: issueDTO.description,
            status: issueDTO.status
        });
    }

    async delete(id: number): Promise<void> {
        const issue = await IssueModel.findByPk(id);
        if (!issue) throw new Error("Issue not found");
        await issue.destroy();
    }

    async getList(): Promise<Issue[]> {
        const issue = await IssueModel.findAll();
        const result:Issue[]=[];
        issue.forEach(item=>{
            result.push(<Issue>{id:item.id,
                title:item.title,
                description:item.description,
                status:item.status
            })
        })
        return result;
    }
}
