import React, { useEffect, useState } from 'react'
import { userInstance } from '../config/axiosconfig'
import { MDBContainer } from 'mdbreact';
import { MDBBtn, MDBInput,MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from
'mdbreact';

const Profile = () => {
    const [userData,setUserData]= useState({
        name:"",email:'',dob:""
    });
    useEffect(()=>{
        getProfile();
    },[])
    const getProfile=async()=>{
        const res = await userInstance.get('/getprofile');
        const {code,profile_data} = res.data;
        if(code===200){
            setUserData({
                ...userData,
                name:profile_data.name, email:profile_data.email,dob:profile_data.dob
            })
        }
    }
    const handlechange=(e)=>{
        console.log(e.target.value)
        setUserData({
            ...userData,[e.target.name]:e.target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res = await userInstance.post('/updateProfile',userData);
        const {code} = res.data;
        if(code===200){
            getProfile();
        }
    }
    const DateConvert=(dob)=>{
        var d = new Date(dob),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }
    return (
        <MDBContainer className="align-items-center">
         <MDBRow>
         <MDBCol col='4' className=" justify-content-center mt-4" md="4">
            <MDBCard narrow >
            <MDBCardImage
                className='view view-cascade gradient-card-header purple-gradient text-center'
                cascade
                tag='div'    
            >
                <h2 className='h2-responsive mt-4'>Profile Details</h2>
            </MDBCardImage>
            <MDBCardBody cascade >
                <MDBCardText>
                <div> <span>Name</span> :{userData.name}</div>
                <div><span>Email</span>:{userData.email}</div> 
                <div><span>Date of Birth</span>:{DateConvert(userData.dob)}</div> 
                </MDBCardText>
            </MDBCardBody>
            </MDBCard>
         </MDBCol>
         <MDBCol col='8' className=" justify-content-center mt-4" md="8">
            <MDBCard narrow >
            <MDBCardImage
                className='text-center mt-4'
                cascade
                tag='div'  
            >
                <h2 className='h2-responsive'>Update Details</h2>
            </MDBCardImage>
            <MDBCardBody cascade className=''>
                <MDBCardText>
                <form>
                    <div className="grey-text">
                    <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
                    onChange={handlechange}   name="name" value={userData.name}
                        success="right" />
                    <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong"
                        onChange={handlechange} value={userData.email} name="email"
                        success="right" />
                    <MDBInput label="Your Dob" icon="Date" group type="date" validate
                    onChange={handlechange} value={DateConvert(userData.dob)} name="dob" 
                    />
                    </div>
                    <div className="text-center">
                    <MDBBtn color="primary" onClick={(e)=>handleSubmit(e)}>Update</MDBBtn>
                    </div>
                </form>
                </MDBCardText>
            </MDBCardBody>
            </MDBCard>
         </MDBCol>
         </MDBRow>
        </MDBContainer>
    )
}

export default Profile
