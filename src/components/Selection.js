import React, { useState } from 'react';
import styled from 'styled-components';

const Select = styled.select``;

const Option = styled.option``;
const Selector = (props) => {
  // const [value, setValue] = useState("")
  // const handleChange = (e)=>{
  //     setValue(e.target.value)
  // }
  const { options, value, handleChange, name } = props;
  const optionObjects = options.map((o) => (
    <Option key={o} value={o}>
      {o}
    </Option>
  ));
  return (
    <Select name={name} onChange={handleChange} value={value}>
      {optionObjects}
    </Select>
  );
};

export default Selector;
