import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: rgb(217, 217, 217);
  bottom: 0;
  width: 100%;
  height: 70px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  color: rgb(35, 35, 35);
`
const StyledIcon = styled.i`
  font-size: 24px;
`
const StyledLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  padding: 10px;
`

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <StyledLink href='https://www.opveteran.org/pages/o-p-vetfest'>
          {' '}
          About Us{' '}
        </StyledLink>
        <StyledLink href='mailto:denny.katona@opveteran.org'>
          {' '}
          Contact{' '}
        </StyledLink>
      </div>

      <p> © 2022, O.P. Veteran Powered by Shopify </p>
      <span>
        <StyledLink href='https://www.facebook.com/opveteran' target='_blank'>
          {' '}
          <StyledIcon className='bi bi-facebook'> </StyledIcon>{' '}
        </StyledLink>
        <StyledLink
          href='https://www.instagram.com/o.p.veteran'
          target='_blank'
        >
          {' '}
          <StyledIcon className='bi bi-instagram' />{' '}
        </StyledLink>
      </span>
    </FooterContainer>
  )
}

export default Footer
