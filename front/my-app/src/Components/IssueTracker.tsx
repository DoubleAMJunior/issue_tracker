import React from "react";
import { useIssueStore } from "../stores";
import IssueItem from "./IssueItem";
import AddIssue from "./AddIssue";

export default function IssueTracker() {
  const issues = useIssueStore((state) => state.issues);

  return (
    <>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </ul>

      <AddIssue />
    </>
  );
}
