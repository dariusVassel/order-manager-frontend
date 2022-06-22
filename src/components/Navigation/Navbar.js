import React, {useEffect, useState} from 'react'
import {FaBars} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import {Link} from 'react-router-dom';
import { NavbarContainer, NavLogo, Nav, MobileIcon, NavMenu, NavItem, NavLinks, NavLinks2, NavBtn, NavBtnLink } from './NavbarElements';
import {animateScroll as scroll} from 'react-scroll'

export default function Navbar({loggedIn, logOutUser, currentUser, handleGetProducts, handleGetContacts, toggleSideBar}) {
  const [scrollNav, setScrollNav] = useState(false)

  function changeNav(){
    if(window.scrollY >= 200){
      setScrollNav(true);
    }else{
      setScrollNav(false);
      }
    };
  

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, []);
  

  function handleLogout(e){
    e.preventDefault()
    logOutUser()
  } 

  function handleClick(e){
    handleGetProducts(e)
  }

  function handleContactClick(e){
    handleGetContacts(e)
  }

  function handleClick2(){
    console.log('hey')
    toggleSideBar()
  }

  function toggleHome(){
    scroll.scrollToTop()
  }

  return (
    
      <IconContext.Provider value={{color: '#fff'}}>
        <Nav scrollNav={scrollNav} >
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>withthe<b>tide</b></NavLogo>
            <MobileIcon onClick={handleClick2}>
              <FaBars/>
            </MobileIcon >
            {!loggedIn?(
            <>
            <NavMenu>
              <NavItem>
                <NavLinks to="about" smooth={true} duration={500} spy={true} exact='true' offset={-80}>About</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="discover" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Discover</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="services" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Services</NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to="signup" smooth={true} duration={500} spy={true} exact='true' offset={-80}>Sign Up</NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to='/login'>Login</NavBtnLink>
            </NavBtn>
            </>
             ) : (
            <>
            <NavMenu>
              <NavItem>
                <NavLinks2 to=""  duration={500} exact='true' offset={-80}>Dashboard</NavLinks2>
              </NavItem>
              <NavItem>
                <NavLinks2 to="/orders"  duration={500}  exact='true' offset={-80}>Orders</NavLinks2>
              </NavItem>
              <NavItem>
                <NavLinks2 to="/contacts" onClick={handleContactClick}  duration={500}  exact='true' offset={-80}>Contacts</NavLinks2>
              </NavItem>
              <NavItem>
                <NavLinks2 to="/products" onClick={handleClick}  duration={500}  exact='true' offset={-80}>Products</NavLinks2>
              </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to='/' onClick={handleLogout}>Logout</NavBtnLink>
            </NavBtn>
            </>
             )
             }
          </NavbarContainer>
        </Nav>
        </IconContext.Provider>

  )
}