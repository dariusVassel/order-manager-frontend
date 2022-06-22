import React from 'react'
import { SidebarContainer, CloseIcon, Icon, SideBtnWrap, SidebarLink, SidebarRoutes, SidebarWrapper, SidebarMenu} from './SidebarElements'

export default function Sidebar({toggleSideBar, isOpen, loggedIn, logOutUser, currentUser}) {
    function handleLogout(e){
        e.preventDefault()
        logOutUser()
      } 
  
    return (
    <SidebarContainer isOpen= {isOpen} onClick ={toggleSideBar}>
        <Icon isOpen= {isOpen}  onClick={toggleSideBar}>
            <CloseIcon/>
        </Icon>
        {!loggedIn?(
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="about" onClick ={toggleSideBar}>About</SidebarLink>
                <SidebarLink to="discover" onClick ={toggleSideBar}>Discover</SidebarLink>
                <SidebarLink to="services" onClick ={toggleSideBar}>Services</SidebarLink>
                <SidebarLink to="signup" onClick ={toggleSideBar}>Sign Up</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoutes to="/login">Login</SidebarRoutes>
            </SideBtnWrap>
        </SidebarWrapper>
        ) : (
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="" onClick ={toggleSideBar}>Welcome </SidebarLink>
                <SidebarLink to="/orders" onClick ={toggleSideBar}>Orders</SidebarLink>
                <SidebarLink to="/contacts" onClick ={toggleSideBar}>Contacts</SidebarLink>
                <SidebarLink to="/products" onClick ={toggleSideBar}>Products</SidebarLink>  
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoutes to="/" onClick={handleLogout}>Logout</SidebarRoutes>
            </SideBtnWrap>
        </SidebarWrapper>
        )
         }
    </SidebarContainer>
  )
}