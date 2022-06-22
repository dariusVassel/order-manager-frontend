import React, {useState} from 'react'
import { LandingContainer, LandingBg, ImageBg, LandingH1, LandingP, LandingContent, LandingBtnWrapper, ArrowForward, ArrowRight  } from './LandingSectionElements'
import Video from '../../images/video.mp4'
import { Button } from '../ButtonElement'
import logo from '../../svgs/FinalLogo.png'

export default function  () {
    const [hover, setHover] = useState(false)

    function onHover(){
        setHover(!hover)
    }
    return (
    <LandingContainer id ="home"> 
        <LandingBg>
            <ImageBg autoPlay loop muted type= "video/mp4" src={Video}/>
        </LandingBg>
        <LandingContent>
            <img src={logo} alt="logo" width="460" height="300"/>
            <LandingH1>Simplifying Seafood Trade</LandingH1>
            <LandingP>Sign up today! Find new products. Track your orders. Manage your supply chain.</LandingP>
            <LandingBtnWrapper>
                <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark ="true">
                    Get started {hover ? <ArrowForward/> : <ArrowRight/>}
                </Button>
            </LandingBtnWrapper>
        </LandingContent>
    </LandingContainer>
  )
}