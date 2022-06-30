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

    const client_Id = "474331682024-o3r26crc6o28662hptig08ks31b3slpa.apps.googleusercontent.com"

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
                            <FormH1>Create Account:</FormH1>
                                <FormLabel htmlFor='username'>Username</FormLabel>
                                <FormInput  required type="text"  value={userData.username} name="username" id="username" onChange={handleUserData}/>

                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <FormInput  required type="password"  value={userData.password} name="password" id="password" onChange={handleUserData}/>
                            <FormButton type="submit">Sign Up</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
  )
}
