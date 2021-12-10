import React, { useContext } from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { CanvasContext } from "../../context/CanvasProvider";
import { BoothContext } from "../../context/BoothProvider";
import { VendorContext } from "../../context/VendorProvider";

const CardContainer = styled.div`
  width: 311px;
  height: fit-content;
  margin: auto;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Header = styled.h1`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 24px;
  color: #545454;
`;
const Subheader = styled.h3`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #545454;
`;
const Breadcrumbs = styled.h2`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`;
const Logo = styled.img`
  height: 60px;
  width: auto;
`;
const Paragraph = styled.p`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`;
const HeaderWrapper = styled.div`
  padding: 20px 0;
`;
const Hr = styled.hr`
  margin: auto;
  margin-top: ${(props) => (props.top ? props.top : "8px")};
  margin-bottom: ${(props) => (props.bottom ? props.botton : "8px")};
  background-color: #f4f4f4;
  width: 90%;
`;
const BoothCard = (props) => {
  const {
    currentVendor,
    updateCurrentVendor,
    addPrimaryBoothToCart,
    addSecondaryBoothToCart,
    primaryMode,
    setPrimaryMode,
  } = useContext(VendorContext);
  const { reserveBooth, holdBooth, booths } = useContext(BoothContext);
  const {
    data,
    setCurrentBooth,
    states,
    changeState,
    setModalOptions,
    statusCodes,
  } = props;
  const {
    id,
    vendor,
    section,
    hasElectricity,
    row,
    restriction,
    status,
    neighbors,
  } = data;

  const handleClose = () => {
    setCurrentBooth(null);
  };

  // this needs lots of refactoring 
  const handleSelectBooth = (_id, secondary=false) => {
    if (secondary) {
      addSecondaryBoothToCart(_id);
    }
    else{
      addPrimaryBoothToCart(_id);
    }
    holdBooth(
      {
        organization: currentVendor.organization,
        description: currentVendor.description,
        logo: currentVendor.logo,
      },
      _id
    );
    handleClose()
    checkNeighbors();
  };
  
  const handlePrimaryClick = (e) => {
    e.preventDefault();
    if (isAllowed()) {
      handleSelectBooth(id);
    } else {
      const updatedVendor = {
        ...currentVendor,
      };
      updatedVendor.sponsorship.interested = true;
      updateCurrentVendor(updatedVendor);
      changeState(states.SPONSOR);
    }
  };
  const checkNeighbors = () => {
    const options = booths.reduce((response, b) => {
      if (neighbors.includes(b.id) && (b.status === 0 || b.status === "open")) {
        response.push(b.id);
      }
      return response;
    }, []);
    if (options.length > 0) {
      setModalOptions((prev)=>({...prev,
        visible: true,
        isOpen: true,
        options: options,
        handleSelectBooth: handleSelectBooth,
        }))}}

  const isAllowed = () => {
    if(vendor) return false
    if (restriction === 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CardContainer>
      <HeaderWrapper>
        <Header>{`Booth ${id}`}</Header>
        <Paragraph>Info & availability</Paragraph>
      </HeaderWrapper>
      <HeaderWrapper>
        <Subheader>{`Section: ${section} | Row: ${row}`}</Subheader>
        {hasElectricity ? <Paragraph>Powered</Paragraph> : null}
      </HeaderWrapper>
      <HeaderWrapper>
        {vendor && vendor !== null ? (
          <>
            <Subheader>{vendor.organization}</Subheader>
            <Paragraph> {vendor.description} </Paragraph>
          </>
        ) : (
          <>
            <Subheader>Open</Subheader>
            <Paragraph>
              {" "}
              This boothspace is available.
              {isAllowed()
                ? null
                : `This section is reserved for ${
                    restriction == 2
                      ? "Paladin and Abrams "
                      : "Stryker and Bradley "
                  } level sponsors.`}{" "}
            </Paragraph>
          </>
        )}
      </HeaderWrapper>
      <ButtonWrapper>
        {vendor && vendor === null ? (
          <Button
            buttonStyle="primary"
            buttonText="Close"
            onClicks={handleClose}
          />
        ) : (
          <>
            {" "}
            <Button
              buttonStyle="primary"
              buttonText={isAllowed() ? "Select booth" : "View sponsorships"}
              onClick={handlePrimaryClick}
            />{" "}
            <Button
              buttonStyle="secondary"
              buttonText="Cancel"
              onClick={handleClose}
            />{" "}
          </>
        )}
      </ButtonWrapper>
    </CardContainer>
  );
};
export default BoothCard;
