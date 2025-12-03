
export async function getIssues(sucess,fail){
   try{
    console.log("prefetch")
    const payload=await fetch('http://127.0.0.1:8000/issues')
    const res=await payload.json()
    sucess(res)
   }catch(e){
    fail()
    console.log(e)
   }
}