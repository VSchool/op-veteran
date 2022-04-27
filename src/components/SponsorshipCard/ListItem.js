import React from 'react';
import styled from 'styled-components';
import checkmarkIcon from '../../assets/icons/card-checkmark-icon.svg';
import uncheckmarkIcon from '../../assets/icons/card-uncheckmark-icon.svg';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
  padding: 2px;
`;
const Name = styled.p`
  height: 24px;
  margin: 0px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 20px;
  color: #545454;
`;

const Checkmark = styled.img`
  box-sizing: border-box;
  height: 24px;
`;

export default function ListItem(props) {
  const { className, wording, valid } = props;

  return (
    <ItemContainer style={{ opacity: valid ? 1 : 0.4 }}>
      <Name>{wording}</Name>
      {valid ? <Checkmark src={checkmarkIcon} alt={'Checkmark icon'} /> : null}
    </ItemContainer>
  );
}
