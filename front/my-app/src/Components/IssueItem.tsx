import React, { useState } from "react";
import { useIssueStore } from "../stores";
import { Issue } from "../stores/Issues";

export default function IssueItem({ issue }: { issue: Issue }) {
  const updateIssueStore = useIssueStore((state) => state.updateIssue);
  const deleteIssueStore = useIssueStore((state) => state.deleteIssue);

  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(issue.title);
  const [editDescription, setEditDescription] = useState(issue.description ?? "");
  const [editStatus, setEditStatus] = useState(issue.status);

  const saveEdit = () => {
    updateIssueStore(
      issue.id!,
      { title: editTitle, description: editDescription, status: editStatus },
      (success, message) => {
        if (!success) alert("Error updating issue: " + message);
        else setEditing(false);
      }
    );
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditTitle(issue.title);
    setEditDescription(issue.description ?? "");
    setEditStatus(issue.status);
  };

  const deleteIssue = () => {
    deleteIssueStore(issue.id!, (success, message) => {
      if (!success) alert("Error deleting issue: " + message);
    });
  };

  const toggleStatus = () => {
    updateIssueStore(
      issue.id!,
      { status: !editStatus },
      (success, message) => {
        if (!success) alert("Error updating status: " + message);
        else setEditStatus(!editStatus);
      }
    );
  };

  return (
    <li
      style={{
        border: "1px solid #ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        cursor: "pointer",
      }}
      onClick={() => !editing && setEditing(true)} // click to edit
    >
      {editing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: "100%", marginBottom: 5 }}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            style={{ width: "100%", marginBottom: 5 }}
          />
          <label style={{ marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={editStatus}
              onChange={(e) => setEditStatus(e.target.checked)}
            />
            {" "}Completed
          </label>
          <div>
            <button onClick={saveEdit}>Save</button>
            <button onClick={cancelEdit} style={{ marginLeft: 5 }}>
              Cancel
            </button>
            <button onClick={deleteIssue} style={{ marginLeft: 5 }}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 style={{ textDecoration: editStatus ? "line-through" : "none" }}>
            {editTitle}
          </h3>
          <p>{editDescription}</p>
          <label>
            <input
              type="checkbox"
              checked={editStatus}
              onChange={(e) => {
                e.stopPropagation(); // prevent entering edit mode
                toggleStatus();
              }}
            />
            {" "}Completed
          </label>
        </>
      )}
    </li>
  );
}
