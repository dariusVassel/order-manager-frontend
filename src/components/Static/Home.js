import React from 'react'
import InfoSection from '../InfoSection/InfoSection'
import LandingSection from '../LandingSection/LandingSection'
import Services from '../Services/Services'
import { homeObjOne, homeObjTwo, homeObjFour } from '../InfoSection/Data';
import Footer from '../Footer/Footer';



export default function Home() {


  return (
    <div>
        <LandingSection/>
        <InfoSection {...homeObjOne }/>
        <InfoSection {...homeObjTwo }/>
        <Services/>
        <InfoSection {...homeObjFour }/>
        <Footer/>
    </div>
  )
}