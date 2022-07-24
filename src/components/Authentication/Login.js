import React, { useState, useEffect } from 'react'
import { baseUrl, headers } from '../../Globals'
import { useNavigate } from 'react-router-dom'
import { Container, Form, FormContent, FormWrap, Icon, FormH1, FormLabel, FormButton, FormInput, Text, IconWrap, CloseIcon } from './LoginElements'
import ScrollToTop from '../ScrollToTop'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../actions/sessions'

export default function Login({}) {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const errors = useSelector(state => state.errors)
    const loggedIn = useSelector(state => state.sessions.loggedIn)

    //REDUX
    const dispatch = useDispatch()

    //React-Router-Dom
    const navigate = useNavigate()

    useEffect(()=> {
        if (loggedIn){
            navigate("/dashboard")
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
        const username = userData.username
        const password = userData.password
        
        const strongParams = {
            username,
            password
        }

        dispatch(login(strongParams, navigate))


        setUserData({
            username: "",
            password: ""
        })
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
                        <FormH1>Sign in to your account:</FormH1>
                        <FormLabel htmlFor='for'>Username</FormLabel>
                        <FormInput  required type="text"  value={userData.username} name="username" id="username" onChange={handleUserData}/>
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type="password" value={userData.password} name="password" id="password" onChange={handleUserData} required/>
                        <FormButton type="submit">Login</FormButton>
                        <Text>Forgot password</Text>
                    </Form>
                    {errors.length > 0 && (
                        <div style={{ color: "red" }} key={errors}> {errors}</div>
                    )}
                </FormContent>
                
            </FormWrap>
            
        </Container>
        </>
        
  )
}