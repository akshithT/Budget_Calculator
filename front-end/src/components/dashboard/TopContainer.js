import React,{useState,useEffect} from 'react'
import "./index.css"
import Organizations from "./Organizations"

export default function TopContainer() {
  let user = JSON.parse(localStorage.getItem('user_data'));
  console.log("user details in Organisation.js" +JSON.stringify(user));
  
  const[group,setGroup] = useState([]);
  useEffect( () => {
    async function fetchData() {
      let groups= await fetch(`http://localhost:5000/www/userGroups.php?userID=${user.userId}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        },});
        groups = await groups.json();
        localStorage.setItem('groups',JSON.stringify(groups));
        setGroup(JSON.parse(localStorage.getItem('groups')));
    }
    fetchData()
  },[]);
 
  
  return (
    <div className='organizations'>
      {
        group?.map(post=>{
          return(
            <>
              <Organizations name={post.groupName} id={post.id}/>
            </>
          )
        })
      }
    </div>
  )
}
