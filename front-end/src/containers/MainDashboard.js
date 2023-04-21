import React,{useState,useEffect} from 'react'
import "./index.css"
import TextField from '@mui/material/TextField';
import TopContainer from '../components/dashboard/TopContainer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function MainDashboard() {
  const[users,setUsers] = useState();
  useEffect( () => {
    async function fetchData() {
     let paidby= await fetch(`http://localhost:5000/www/login.php`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
      },});
      paidby = await paidby.json();
      console.log({paidby});
      setUsers(paidby);
      localStorage.setItem('all-users',JSON.Stringify(paidby));
      
      
    }
    fetchData();
  },[]);

 
  const [personName, setPersonName] = useState([]);
  const currUser = JSON.parse(localStorage.getItem('user-info'))
  const handleChange = (event) => {
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value,
    );
  };
  const [open, setOpen] = useState(false);
  const [grpName,setGrpName] = useState();
  const [grpType,setGrpType] = useState();
  const [grpBudget,setGrpBudget] = useState();
  const grpUser = [];

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
  };
  async function creategroup(){
    setOpen(false);
    //credentials
    for(var i=0;i<personName.length;i++){
      grpUser.push({"id":personName[i]})
    }
    console.log("GroupUser is" +grpUser)
    let item = {
      "grpName":grpName,
      "grpType":grpType,
      "grpBudget":grpBudget,
      "grpUser":grpUser
    }
    console.log("group item is" + JSON.stringify(item));
    
    try{
      let result= await fetch('http://localhost:5000/www/groups.php',{
      method:'POST',
      headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify(item)
      });
      result = await result.json();
      console.log("Group result is" + JSON.stringify(result));
      if(result != null || !result.error)
      {
        localStorage.setItem('groups',JSON.stringify(result));
        setOpen(false);
        
      }
      else{
        return;
      }
    }
    catch(e){
    console.log(e);
    }
    let totalgroups= await fetch(`http://localhost:5000/www/userGroups.php?userID=${currUser.id}`,{
      method:'GET',
      headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
      },});
      totalgroups = await totalgroups.json();
      console.log("User groups" +JSON.stringify(totalgroups));
      localStorage.setItem('groups',JSON.stringify(totalgroups));
    
      window.location.reload();
  }

  console.log("Main", users);
  return (
    <div className='maindashboard-main'>
        <div className='top-container'>
            <TextField label="Search" className='searchbar'/>
            <div className='top-object' onClick={()=>{setOpen(true)}}>
                <p className='top-text'>Add Group</p>
            </div>
        </div>
        <TopContainer/>
        <Modal
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Add Group</p>
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'10px'}}>
          <TextField label="Name" onChange={(e)=>{setGrpName(e.target.value)}}/>
          <TextField label="Budget" onChange={(e)=>{setGrpBudget(e.target.value)}}/>
          <TextField label="Type" onChange={(e)=>{setGrpType(e.target.value)}} style={{width:'100%'}}/>
          <FormControl style={{width:'100%'}}>
          <InputLabel>Members</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
           
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput placeholder='Members' />}
            style={{width:'100%'}}
          >
          {users?.map((name) => (
            <MenuItem
              key={name.userId}
              value={name.userId}
              
            >
              {name.username}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
          </div>
          <div style={{textAlign:'center',backgroundColor:'#674fa3',borderRadius:'0.5vw',padding:'2px',marginTop:'10px',cursor:'pointer'}}  onClick={()=>{creategroup()}}>
            <p style={{color:'white'}}>Create Group</p>
            </div>
        </Box>
      </Modal>
    </div>
  )
}
