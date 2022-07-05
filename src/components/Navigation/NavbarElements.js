import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Link as LinkS} from 'react-scroll'
import DashboardIcon from '@mui/icons-material/Dashboard';


export const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? '#000' : '#000')};
    height: 65px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0; 
    z-index: 10;

    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
`  

export const NavbarContainer  = styled.div`
    display: flex;
    justify-content: space-between;
    height: 65px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`

export const NavLogo = styled(Link)`
 color: #FFF;
 justify-self: flex-start;
 cursor: pointer;
 font-size: 1.5rem;
 display: flex;
 align-items: center;
 margin-left: 24px;
 font-weight: regular;
 text-decoration: none;

 &:hover {
    transition: all 0.2s ease-in-out;
    background: black;
    color: #fff;
    
}
`

export const MobileIcon = styled.div`
display: none;

@media screen and (max-width: 768px){
    display:block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff
}
`

export const NavMenu = styled.ul`
display: flex;
align-items: center;
list-style:  none;
text-align: center;
margin-right: -22px;

@media screen and (max-width: 768px){
    display: none;
}
`

export const NavItem = styled.li`
height: 80px;
`

export const NavLinks = styled(LinkS)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&.active{
    border-bottom: 3px solid #026BFB
}

&:hover{
    color: #026BFB;
    transition: 0.2s ease-in-out;
}
 `

 export const NavLinks2 = styled(Link)`
 color: #fff;
 display: flex;
 align-items: center;
 text-decoration: none;
 padding: 0 1rem;
 height: 100%;
 cursor: pointer;
 
 &.active{
     border-bottom: 3px solid #026BFB
 }
 
 &:hover{
     color: #026BFB;
     transition: 0.2s ease-in-out;
 }
  `

export const NavBtn = styled.nav`
display: flex;
align-items: center;

@media screen and (max-width: 768px){
    display: none;
}
`

export const NavBtnLink= styled(Link)`
border-radius: 50px;
background: #026BFB;
white-space: nowrap;
padding: 10px 22px;
color: #010606;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
}
`

export const NavSearch= styled.input`
display: flex;
border-radius: 50px;
margin-top: 20px;
background: #fff;
white-space: nowrap;
padding: 10px 22px;
width: 400px;
color: #010606;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
    width: 405px;

    
}
`

export const Subtitle = styled.p`
max-width: 440px;
margin-bottom: 35px;
font-size: 18px;
line-height: 24px;
color: ${({darkText}) => (darkText  ? '#010606': '#fff')};

&:hover {
    transition: all 0.2s ease-in-out;
    background: #026BFB;
    color: #026BFB;
}
`

export const Dashboard = styled(DashboardIcon)`
max-width: 440px;
margin-bottom: 35px;
font-size: 18px;
line-height: 24px;
color: ${({darkText}) => (darkText  ? '#010606': '#fff')};
`


export const ImgWrap = styled.div`
border-radius: 50px;
max-width:555px;
height: 100%;
padding: 0px 22px;


`

export const Img = styled.img`
width: 40px;
height: 40px;

border-radius: 50px;
width: 100%;
margin-top 12px;

padding-right: 0; 
`
