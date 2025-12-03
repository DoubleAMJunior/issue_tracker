import { useEffect } from 'react';
import './App.css';
import IssueTracker from './Components/IssueTracker';
import { useIssueStore } from './stores';

function App() {
  const fetchIssues = useIssueStore((state) => state.fetchIssues);
  useEffect(() => {
  fetchIssues((success, message) => {
    if (!success) alert("Error fetching issues: " + message);
  });
}, [fetchIssues]);
  return (
     <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Issue Tracker</h2>
      <IssueTracker></IssueTracker>
    </div>
  );
}

export default App;
