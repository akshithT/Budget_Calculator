import React,{useState,useEffect} from 'react'
import "./index.css"

export default function OutlineBox ({id}) {
  const[paidBy,setPaidBy] = useState();
  useEffect( () => {
    async function fetchData() {
    //  let paidby= await fetch(`https://splitwise-apiv1.herokuapp.com/user/${id}`,{
    //   method:'GET',
    //   headers:{
    //       "Content-Type":"application/json",
    //       "Accept":"application/json",
    //   },});
    //   paidby = await paidby.json();
    const paidbyArr = {
      id:1,
      userFirstName:"Akshith"
    }
      setPaidBy(paidbyArr);
      console.log(paidbyArr);
    }
    fetchData()
  },[]);
   return (
     
    <div className="outlinebox">
        <p className='box-text'>{paidBy?.userFirstName}</p>
    </div>
     
  )
}
