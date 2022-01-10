import styled from 'styled-components';


export const Footer = () => {
    const FooterContainer = styled.footer`
    box-shadow: inset
    0 0em 3em rgb(184, 184, 184),
    0 0  0 2px rgba(190, 190, 190),
    0.3em 0.3em 1em rgba(0,0,0,0.4);
    background-color: rgb(217, 217, 217);
    bottom: 0;
    width: 100%;
    margin: auto;
    display: grid;
    justify-content: space-evenly;
    grid-template-columns: auto auto;
    grid-template-rows: 7vh 7vh;
    padding: 15px;
    color: rgb(35, 35, 35);
    padding-top: 45px
    `
    const StyledIcon = styled.i`
    font-size: 24px;
    padding: 2vh;
    `
    const StyledLink = styled.a`
    text-decoration: none;
    color: inherit;
    font-weight: bold
    `

    return(
        <FooterContainer>
            <StyledLink href='https://www.opveteran.org/pages/o-p-vetfest'> About Us </StyledLink>
            <StyledLink href='mailto:denny.katona@opveteran.org'> Contact </StyledLink>
            <p> © 2022, O.P. Veteran Powered by Shopify </p>
            <span>
                <StyledLink href='https://www.facebook.com/opveteran' target='_blank'> <StyledIcon className="bi bi-facebook">  </StyledIcon> </StyledLink>
                <StyledLink href='https://www.instagram.com/o.p.veteran' target='_blank'> <StyledIcon className="bi bi-instagram"/> </StyledLink>
            </span>
        </FooterContainer>
    )
}