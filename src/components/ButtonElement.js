import styled from 'styled-components'
import {Link} from 'react-scroll'


 export const Button = styled(Link)`
 border-radius: 50px;
 background: ${({primary}) => (primary ? 'white' : '#026BFB')};

 white-space: nowrap;
 padding: ${({big})=> (big ? '14px 48px': '12px 30px')};
 color: ${({dark}) => (dark? 'black' : '#010606')};
 font-size: ${({big})=> (big ? '20px': '16px')};
 outline: none;
 cursor: pointer;
 border: none;
 display: flex;
 justify-content: center;
 align-items:center;
 transition: all 0.2s ease-in-out;

 &:hover{
    transition: all 0.2s ease-in-out;
    background: ${({primary}) => (primary ?  '#026BFB' : '#fff' )}; 
 }
 `
