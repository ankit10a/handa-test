import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { userInstance } from '../config/axiosconfig';


class Login extends Component  {
    constructor(){
        super()
        this.state={
            email:"",
            password:""
        }
    }
    
    handleChange = name => e => {
        this.setState({ [name]: e.target.value });
      };
    handleSubmit=async(e)=>{
        e.preventDefault();
        const payload = {
            email:this.state.email,
            password:this.state.password
        }
        const res = await userInstance.post('/login',payload);
        console.log("res",res);
        if(res.data.code===200){
            localStorage.setItem("token",res.data.token)
            window.location.href='/';
        }
    }

    render(){
        return (
            <MDBContainer className="align-items-center" >
            <MDBRow className=" justify-content-center mt-4">
                <MDBCol md="4" className="border rounded">
                <form>
                    <p className="h5 text-center mb-4 mt-3">Login</p>
                    <div className="grey-text">
                    <MDBInput label="Type your email" icon="envelope" group type="email" validate error="wrong"
                        onChange={this.handleChange('email')} value={this.state.email} name="email"
                        success="right" />
                    <MDBInput label="Type your password" icon="lock" group type="password" validate 
                        onChange={this.handleChange("password")} value={this.state.password}
                        name="password"/>
                    </div>
                    <div className="text-center">
                    <MDBBtn onClick={(e)=>this.handleSubmit(e)}>Login</MDBBtn>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
            </MDBContainer>
        )
    }

}

export default Login;



  
