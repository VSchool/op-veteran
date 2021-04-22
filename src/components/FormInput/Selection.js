import React, {useState} from 'react'
import styled from 'styled-components'

const Select = styled.select`

`

const Option = styled.option`

`
const Selector = (props)=>{
    const [value, setValue] = useState("")
    const handleChange = (e)=>{
        setValue(e.target.value)
    }
    const {options, className, ...selectorProps} = props
    const optionObjects = options.map(o=><Option key={o} value={o}>{o}</Option>)
    return ( 
        <Select onChange={handleChange} value={value}>
            {optionObjects}
        </Select>
    )
}

export default Selector
