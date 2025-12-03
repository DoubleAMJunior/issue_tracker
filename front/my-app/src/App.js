import { useEffect, useState } from 'react';
import './App.css';
import { getIssues } from './stores';
function App() {
  console.log("test")
    const [hasLoaded,setHasLoaded]=useState(false)
    const [issues,setIssues]=useState([]);
    useEffect(()=>{
      console.log("get issues")
      getIssues((payload)=>{
        setIssues(payload)
        console.log(payload)
        setHasLoaded(true)
      },()=>{})
    },[])
  return (
    <div className="App">
      {!hasLoaded?<>loading</>
      :<> {issues.map(issue=>{
        return (
          <div key={issue.id}>
            <div>
              {issue.title}
            </div>
            <div>{issue.description}</div>
            </div>
          )
      })}
      </>
      }
     </div>
  );
}

export default App;
