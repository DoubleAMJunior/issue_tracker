import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import getRepo from './Service/IssueRepoProvider';
import cors from "cors";
import path from 'path';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());
const IssueRepo= getRepo("sql")
app.use(express.json());
app.get('/issues', async (req: Request, res: Response) => {
  const issues= await IssueRepo?.getList()
  res.json(issues);
});

app.delete('/issue',(req:Request,res:Response)=>{
  IssueRepo?.delete(req.body.id)
  res.status(200).json({ success: true, message: "ok" });

})

app.put('/issue',async(req:Request,res:Response)=>{
  const issue =await IssueRepo?.create(req.body.dto)
  res.status(200).json(issue);
})

app.patch('/issue',(req:Request,res:Response)=>{
  IssueRepo?.update(req.body.id,req.body.dto)
  res.status(200).json({ success: true, message: "ok" });
})
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});