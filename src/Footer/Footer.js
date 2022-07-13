import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { FooterContainer, FooterWrapper, FooterLinksContainer, FooterLinksWrapper, FooterLinkItems, FooterLinkTitle, FooterLink, SocialMedia, SocialMediaWrap, SocialLogo, SocialIconsLink, SocialIcons, WebsiteRights  } from './FooterElements'
import {animateScroll as scroll} from 'react-scroll'

export default function Footer() {

    function toggleHome(){
        scroll.scrollToTop()
      }
  return (
    <FooterContainer>
        <FooterWrapper>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>About Us </FooterLinkTitle>
                            <FooterLink to="/login">How it works</FooterLink>
                            <FooterLink to="/login">Testimonials</FooterLink>
                            <FooterLink to="/login">Careers</FooterLink>
                            <FooterLink to="/login">Investors</FooterLink>
                            <FooterLink to="/login">Terms of Service</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>Contact Us </FooterLinkTitle>
                            <FooterLink to="/login">Contact</FooterLink>
                            <FooterLink to="/login">Support</FooterLink>
                            <FooterLink to="/login">Destinations</FooterLink>
                            <FooterLink to="/login">Sponsorship</FooterLink>
                    </FooterLinkItems>                    
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    <FooterLinkItems>
                        <FooterLinkTitle>Videos</FooterLinkTitle>
                            <FooterLink to="/login">Submit Video</FooterLink>
                            <FooterLink to="/login">Ambassador</FooterLink>
                            <FooterLink to="/login">Agency</FooterLink>
                            <FooterLink to="/login">Influencer</FooterLink>
                    </FooterLinkItems>
                    <FooterLinkItems>
                        <FooterLinkTitle>Social Media</FooterLinkTitle>
                            <FooterLink to="/login">Instagram</FooterLink>
                            <FooterLink to="/login">Facebooks</FooterLink>
                            <FooterLink to="/login">Youtube</FooterLink>
                            <FooterLink to="/login">Investors</FooterLink>
                            <FooterLink to="/login">Twitter</FooterLink>
                    </FooterLinkItems>                    
                </FooterLinksWrapper>
            </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrap>
                    <SocialLogo to ="/" onClick={toggleHome}>
                        withthe<b>tide</b>
                    </SocialLogo>
                    <WebsiteRights>withthetide © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                    <SocialIcons>
                        <SocialIconsLink href="//www.facebook.com" target="_blank" aria-label="Facebook">
                            <FaFacebook/>
                        </SocialIconsLink>
                        <SocialIconsLink href="//www.instagram.com" target="_blank" aria-label="Instagram">
                            <FaInstagram/>
                        </SocialIconsLink>
                        <SocialIconsLink href="//www.youtube.com" target="_blank" aria-label="Youtube">
                            <FaYoutube/>
                        </SocialIconsLink>
                        <SocialIconsLink href="//www.twitter.com" target="_blank" aria-label="Twitter">
                            <FaTwitter/>
                        </SocialIconsLink>
                        <SocialIconsLink href="//www.linkedin.com" target="_blank" aria-label="LinkedIn">
                            <FaLinkedin/>
                        </SocialIconsLink>
                    </SocialIcons>
                </SocialMediaWrap>
            </SocialMedia>
        </FooterWrapper>
    </FooterContainer>
  )
}
