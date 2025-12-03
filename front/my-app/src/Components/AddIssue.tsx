import React, { useState } from "react";
import { useIssueStore } from "../stores";

export default function AddIssue() {
  const addIssueStore = useIssueStore((state) => state.addIssue);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const addIssue = () => {
    if (!newTitle.trim()) return;

    addIssueStore(
      { title: newTitle, description: newDescription, status: false },
      (success, message) => {
        if (success) {
          setNewTitle("");
          setNewDescription("");
        } else {
          alert("Error adding issue: " + message);
        }
      }
    );
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 5 }}
      />
      <textarea
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        style={{ width: "100%", marginBottom: 5 }}
      />
      <button onClick={addIssue}>Add Issue</button>
    </div>
  );
}
