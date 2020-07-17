import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { userInstance } from '../config/axiosconfig';
import { NotificationManager} from 'react-notifications';
import {checkIfEmpty} from '../functions/function';

const Signup = () => {
const[userData,setUserData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    dob:""
})
const handlechange=(e)=>{
    setUserData({
        ...userData, [e.target.name]:e.target.value
    })
}
const handleSubmit=async(e)=>{
  e.preventDefault();
  const {isValid,err}= checkIfEmpty(userData);
  
  if(isValid){
      if(userData.password===userData.confirmPassword){
      const {name,email,password}= userData;
      const res = await userInstance.post('/signup',userData);
      const {code,msg} =res.data;
      console.log(res,msg);
    
      if( code===200){
        NotificationManager.success(msg,"Message",1000);
            setUserData({
              name:"",
              email:"",
              password:"",
              confirmPassword:"",
              dob:""
          });
        setTimeout(()=>{
          window.location.href="/login";
        },2000);
      }else{
        NotificationManager.error(msg,"Message",1000);
      }   
    }
    else{
      NotificationManager.error("password doesn't match" ,"Message",1000);
    }
  }else{
     NotificationManager.error("Some fields are Empty","Message",1000);
  }
  
}

return (
<MDBContainer >
  <MDBRow className="align-items-center justify-content-center mt-4">
    <MDBCol md="4" className="border rounded sm" >
      <form>
        <p className="h5 text-center mb-4 mt-3">Sign up</p>
        <div className="grey-text">
          <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
           onChange={handlechange}   name="name" value={userData.name}
            success="right" />
          <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
            onChange={handlechange} value={userData.email} name="email"
            success="right" />
          <MDBInput label="Your Password" icon="lock" group type="password" validate
            onChange={handlechange} value={userData.password} name="password"
            error="wrong" success="right" />
          <MDBInput label="Your confirm password" icon="lock" group type="password" validate
          onChange={handlechange} value={userData.confirmPassword} name="confirmPassword"
          />
        </div>
        <div className="text-center">
          <MDBBtn color="primary" onClick={(e)=>handleSubmit(e)}>Register</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};
export default Signup;

