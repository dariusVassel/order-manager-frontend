import React, {useEffect, useState} from 'react'
import {FaBars} from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import {Link} from 'react-router-dom';
import { NavbarContainer, NavLogo, Nav, MobileIcon, NavMenu, NavItem, NavLinks, NavLinks2, NavBtn, NavBtnLink, NavSearch, Subtitle, ImgWrap, Img, Dashboard } from './NavbarElements';
import {animateScroll as scroll} from 'react-scroll'
import Stack from '@mui/material/Stack';
import AvatarImg from '../../images/Avatar.png'
import SearchIcon from '@mui/icons-material/Search';

import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../../actions/sessions';

import { Toolbar } from '@mui/material';


export default function Navbar({ handleGetProducts, handleGetContacts, toggleSideBar}) {
  
  //REDUX
  const loggedIn = useSelector(state => state.sessions.loggedIn)
  const dispatch = useDispatch()
  
  //Landing Page Scroll
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
    dispatch(logout())
    // logOutUser()
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
            {!loggedIn? (
              <NavLogo to="/" onClick={toggleHome}>
                withthe<b>tide</b>
              </NavLogo>
            ):(
              <NavLogo to="/dashboard" onClick={toggleHome}>withthe<b>tidee</b></NavLogo>
            )}
            
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
              <Stack direction="row" spacing={1}>
                <NavBtnLink to='/signup' >Sign Up</NavBtnLink>
                <NavBtnLink to='/login'>Login</NavBtnLink>
              </Stack>
            </NavBtn>
            </>
             ) : (
            <>     
              {/* <NavMenu>
                <NavItem>
                  <NavSearch duration={500}  exact='true' offset={-80} type="search" placeholder="Search withthetide"/>
                </NavItem> 
              </NavMenu> */}
        
              <Toolbar disableGutters sx={{ minHeight: 64, left: 0, px: 2 }} >
                <ImgWrap to='/profile'>
                  <Img  src={AvatarImg} alt="logo" />
                </ImgWrap>
                <NavBtn>
                  <Stack direction="row" spacing={1}>
                    {/* <NavBtnLink to='/inquiries'>Dashboard</NavBtnLink> */}
                    <NavBtnLink to='/' onClick={handleLogout}>Logout</NavBtnLink>
                  </Stack>
                </NavBtn>
              </Toolbar>
            </>
             )
             }
          </NavbarContainer>
          </Nav>
        </IconContext.Provider>


  )
}