import React, { useState, useEffect } from 'react'
import { baseUrl, headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FormContent, FormWrap, Icon, FormH1, FormLabel, FormButton, FormInput, Text, IconWrap, CloseIcon } from './LoginElements'
import ScrollToTop from '../ScrollToTop'


export default function Signup({loginUser, loggedIn, handleGetOrders}) {
    const [signupInfo, setSignupInfo] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        bio: "",
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        country: "",
        image_url: ""
    })

    const navigate = useNavigate()

    useEffect(()=> {
        if (loggedIn){
            navigate("/orders")
        }
      }, [loggedIn])

    function handleUserData(e){
        const name = e.target.name
        const value = e.target.value

        setUserData({
            ...userData,
            [name] : value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const strongParams = {
            user: {
                username: userData.username,
                password: userData.password,
                bio: userData.bio,
                first_name: userData.first_name,
                last_name: userData.last_name,
                phone: userData.phone,
                email: userData.email,
                country: userData.country,
                image_url: userData.image_url
            }
        }

        fetch(baseUrl + '/users',{
            method: "POST",
            headers,
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then(data => {
            loginUser(data.user)
            localStorage.setItem('jwt', data.token)
            handleGetOrders(e)
            navigate('/orders')
        })

        setUserData({
            username: "",
            password: "",
            bio: "",
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            country: "",
            image_url: ""
        })
    }

    function toggleForm() {
        setSignupInfo(!signupInfo);
    } 

    return (
        <>
            <ScrollToTop/>
            <Container>
                <IconWrap to="/">
                    <CloseIcon/>
                </IconWrap>
                <FormWrap>
                <FormContent>
                    <Form onSubmit = {handleSubmit}>
                        <FormH1>
                            Create Account:
                        </FormH1>
                        <>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <FormInput  required type="text"  value={userData.username} name="username" id="username" onChange={handleUserData}/>

                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <FormInput  required type="password"  value={userData.password} name="password" id="password" onChange={handleUserData}/>
                        </>
                        {/* {!signupInfo ?
                        <>
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <FormInput  required type="text"  value={userData.username} name="username" id="username" onChange={handleUserData}/>

                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <FormInput  required type="password"  value={userData.password} name="password" id="password" onChange={handleUserData}/>
                        </>
                        : 
                        <div>
                        
                            <FormLabel htmlFor='first_name' >First Name: </FormLabel>
                            <FormInput type="text" value={userData.first_name} name="first_name" id="first_name" onChange={handleUserData}></FormInput>

                            <FormLabel htmlFor='last_name' >Last Name: </FormLabel>
                            <FormInput type="text" value={userData.last_name} name="last_name" id="last_name" onChange={handleUserData}></FormInput>
                        
                            <FormLabel htmlFor='bio'>Bio: </FormLabel>
                            <FormInput type="text" value={userData.bio} name="bio" id="bio" onChange={handleUserData}></FormInput>
                        
                            <FormLabel htmlFor='phone'>Phone Number: </FormLabel>
                            <FormInput type="text" value={userData.phone} name="phone" id="phone" onChange={handleUserData}></FormInput>
                        
                            <FormLabel htmlFor='email'>Email: </FormLabel>
                            <FormInput type="text" value={userData.email} name="email" id="email" onChange={handleUserData}></FormInput>
                        
                            <FormLabel htmlFor='country'>Country: </FormLabel>
                            <FormInput type="text" value={userData.country} name="country" id="country" onChange={handleUserData}></FormInput>
                        
                            <FormLabel htmlFor='image_url'>Profile Picture: </FormLabel>
                            <FormInput type="text" value={userData.country} name="image_url" id="image_url" onChange={handleUserData}></FormInput>
                        
                            <FormButton type="submit" value="Create Account" ></FormButton> 
                        </div> 
                        } */}
                        {/* {!signupInfo?<FormButton onClick ={toggleForm}>Continue</FormButton>:<FormButton onClick ={toggleForm}>Back</FormButton>} */}

                        <FormButton type="submit">Sign Up</FormButton>

                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
  )
}
