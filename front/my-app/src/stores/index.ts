import {create} from "zustand"
import { CreateIssueStore, IssueStore } from "./Issues"
export const  useIssueStore=create<IssueStore>(CreateIssueStore)