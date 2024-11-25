import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <About>
          <CompanyName>JUDY Music Store</CompanyName>
          <Description>내힘들다</Description>
        </About>

        <Links>
          <Link href="#privacy-policy">Privacy Policy</Link>
          <Link href="#terms-of-service">Terms of Service</Link>
        </Links>

        <Contact>
          <ContactItem>Email: ljh.social@ewhain.net</ContactItem>
          <ContactItem>Phone: +82 10-1886-1886</ContactItem>
        </Contact>

      </ContentWrapper>
      <Copyright>© 2024 JUDY Music Store. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;

// Styled Components
const FooterContainer = styled.footer`
  background-color: rgb(0, 70, 42);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const About = styled.div`
  max-width: 300px;
`;

const CompanyName = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 0.5rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Link = styled.a`
  font-size: 0.875rem;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

const SocialMedia = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #cce7d0;
  }
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  text-align: center;
  margin: 0;
`;
