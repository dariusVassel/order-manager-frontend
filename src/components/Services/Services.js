import React from 'react'
import { ServicesContainer, ServicesH1, ServicesWrapper, ServicesCard, ServicesIcon, ServicesH2, ServicesP } from './ServicesElements'
import Icon1 from '../../svgs/img-1.svg'
import Icon2 from '../../svgs/img-2.svg'
import Icon3 from '../../svgs/img-3.svg'

export default function Services() {
  return (
    <ServicesContainer id="services">
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
            <ServicesCard>
                <ServicesIcon src={Icon1}/>
                <ServicesH2>Seafood Marketplace</ServicesH2>
                <ServicesP>We help connect you with verified buyers and sellers.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon2}/>
                <ServicesH2>Manage logistics</ServicesH2>
                <ServicesP>We help reduce expenses and increase your revenue.</ServicesP>
            </ServicesCard>
            <ServicesCard>
                <ServicesIcon src={Icon3}/>
                <ServicesH2>Track Orders</ServicesH2>
                <ServicesP>Receive live status updates on your orders.</ServicesP>
            </ServicesCard>   
        </ServicesWrapper>
    </ServicesContainer>
  )
}