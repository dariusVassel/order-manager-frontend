import React, { useState, useEffect } from 'react'
import { baseUrl, headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FormContent, FormWrap, Icon, FormH1, FormLabel, FormButton, FormInput, Text, IconWrap, CloseIcon } from './LoginElements'
import ScrollToTop from '../ScrollToTop'
import {useDispatch, useSelector} from 'react-redux'
import { signup } from '../../actions/sessions'


export default function Signup({loggedIn, handleGetOrders}) {
    const [signupInfo, setSignupInfo] = useState(false)
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        role: "employee", 
        organization_id: 1
    })
    const dispatch = useDispatch() 
    const requesting = useSelector(state=>state.requesting)
    const errors = useSelector(state => state.errors)


    
    const navigate = useNavigate()

    useEffect(()=> {
        if (loggedIn){
            navigate("/")
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
                role: userData.role, 
                organization_id: userData.organization_id
            }
        }
        //console.log(strongParams)
        // fetch(baseUrl + '/users',{
        //     method: "POST",
        //     headers,
        //     body: JSON.stringify(strongParams)
        // })
        // .then(resp => {
        //     if (resp.ok) {
        //         resp.json().then(data => {
        //             loginUser(data.user)
        //             localStorage.setItem('jwt', data.token)
        //             handleGetOrders(e)
        //             navigate('/dashboard')
        //     })
        //     } else {
        //         resp.json().then(e=> {
        //             for (const [key, value] of Object.entries(e)) {
        //                 setErrors(`${key}: ${value}`);
        //               }
        //         })
        //     }
        // })
        dispatch(signup(strongParams, navigate))



        setUserData({
            username: "",
            password: "",
            role: "employee", 
            organization_id: 1
        })
    }

    

    function toggleForm() {
        setSignupInfo(!signupInfo);
    } 

    // function capitalize(word) {
    //     return word[0].toUpperCase() + word.slice(1).toLowerCase();
    //   }



                    
                    
    // console.log(Object.entries(e).flat())
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
                                <FormLabel htmlFor='username'>Email</FormLabel>
                                <FormInput  required type="text"  value={userData.username} name="username" id="username" onChange={handleUserData}/>

                                <FormLabel htmlFor='password'>Password</FormLabel>
                                <FormInput  required type="password"  value={userData.password} name="password" id="password" onChange={handleUserData}/>
                            <FormButton type="submit">Sign Up</FormButton>
                        </Form>
                        {errors.length > 0 ? (<p style={{ color: "red" }}>{(errors)}</p>) : (null)}
                    </FormContent>
                </FormWrap>
            </Container>
        </>
  )
}


// {for (const [key, value] of Object.entries(errors)) {
//     <h1 style={{ color: "red" }}>{(`${key}: ${value}`)}</h1> 
//  }
// }