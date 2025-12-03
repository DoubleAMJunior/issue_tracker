import { StateCreator } from "zustand";
const baseAddress="."
export interface Issue{
    id:number|undefined,
    title:string,
    description:string|null
    status:boolean
}

export interface IssueStore {
  issues: Issue[];

  fetchIssues: (callback?: (success: boolean, message?: string) => void) => Promise<void>;

  addIssue: (
    issue: Omit<Issue, "id">,
    callback?: (success: boolean, message?: string) => void
  ) => Promise<void>;

  updateIssue: (
    id: number,
    updated: Partial<Omit<Issue, "id">>,
    callback?: (success: boolean, message?: string) => void
  ) => Promise<void>;

  deleteIssue: (
    id: number,
    callback?: (success: boolean, message?: string) => void
  ) => Promise<void>;
}

export const CreateIssueStore : StateCreator<IssueStore>=((set, get) => ({
  issues: [],
  fetchIssues: async (callback?: (success: boolean, message?: string) => void) => {
    try {
      const res = await fetch(baseAddress+"/issues");
      if (!res.ok) throw new Error("Failed to fetch issues");
      const data: Issue[] = await res.json();
      set({ issues: data });
      callback?.(true, "Fetched issues successfully");
    } catch (err: any) {
      console.error(err);
      callback?.(false, err.message);
    }
  },

  addIssue: async (issue: Omit<Issue, "id">, callback?: (success: boolean, message?: string) => void) => {
    try {
      const res = await fetch(baseAddress+"/issue", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dto: issue }),
      });
      if (!res.ok) throw new Error("Failed to add issue");
      const newIssue: Issue = await res.json();
      set({ issues: [...get().issues, newIssue] });
      callback?.(true, "Issue added successfully");
    } catch (err: any) {
      console.error(err);
      callback?.(false, err.message);
    }
  },

  updateIssue: async (id: number, updated: Partial<Omit<Issue, "id">>, callback?: (success: boolean, message?: string) => void) => {
    try {
      const res = await fetch(baseAddress+"/issue", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, dto: updated }),
      });
      if (!res.ok) throw new Error("Failed to update issue");

      set({
        issues: get().issues.map((issue) =>
          issue.id === id ? { ...issue, ...updated } : issue
        ),
      });
      callback?.(true, "Issue updated successfully");
    } catch (err: any) {
      console.error(err);
      callback?.(false, err.message);
    }
  },

  deleteIssue: async (id: number, callback?: (success: boolean, message?: string) => void) => {
    try {
      const res = await fetch(baseAddress+"/issue", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete issue");

      set({ issues: get().issues.filter((issue) => issue.id !== id) });
      callback?.(true, "Issue deleted successfully");
    } catch (err: any) {
      console.error(err);
      callback?.(false, err.message);
    }
  },
}));
