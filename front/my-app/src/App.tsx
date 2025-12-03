import { useEffect, useState } from 'react';
import './App.css';
import IssueTracker from './Components/IssueTracker';
import { useIssueStore } from './stores';

function App() {
  const fetchIssues = useIssueStore((state) => state.fetchIssues);
  const [hasLoaded,setHasLoaded]=useState(false)
  useEffect(() => {
  fetchIssues((success, message) => {
    if (!success) alert("Error fetching issues: " + message);
    setHasLoaded(true)
  });
}, [fetchIssues]);
  return (<>
     {!hasLoaded? <h1 style={{ textAlign: "center" }}>Loading</h1>:(
      <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Issue Tracker</h2>
      <IssueTracker/>
    </div>)}
    </>
  );
}

export default App;
