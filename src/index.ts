import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import getRepo from './Service/IssueRepoProvider';
import cors from "cors";
//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());
const IssueRepo= getRepo("memory")
app.use(express.json());
app.get('/issues', (req: Request, res: Response) => {
  const issues=IssueRepo?.getList()
  res.json(issues);
});

app.delete('/issue',(req:Request,res:Response)=>{
  IssueRepo?.delete(req.body.id)
  res.status(200)
})

app.put('/issue',(req:Request,res:Response)=>{
  console.log(req)
  IssueRepo?.create(req.body.dto)
  res.status(200)
  res.send("ok")
})

app.patch('/issue',(req:Request,res:Response)=>{
  IssueRepo?.update(req.body.id,req.body.dto)
 res.status(200)
})

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});