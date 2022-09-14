import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const ModifyCheckboxSelect = ({ data, setBlock, setOperaGlass }) => {
    const [operaGlass1, setOperaGlass1] = useState();
    const [block1, setBlock1] = useState();
    // checked={operaGlass1 === true}
    useEffect(() => {
        setOperaGlass1(data.data.operaGlass)
        setBlock1(data.data.block)
        if(data.data.operaGlass === 'ture'){
            setOperaGlass('on')
        }
    },[])

    const operaGlassChange = e => {
        setOperaGlass1(current => !current);
        setOperaGlass(e.target.value)
        console.log(e.target.value)
    }

    const blockChange = e => {
        setBlock1(current => !current);
        setBlock(e.target.value)
    }

    return (
        <StCheckbox>
            <h4>추가선택</h4>
            <input type="checkbox" id='block1' name='block1' onChange={blockChange}  />
            <label htmlFor="block1">#시야방해있음</label>
            <input type="checkbox" id='operaGlass1' name='operaGlass1' checked={operaGlass1} onChange={operaGlassChange}/>
            <label htmlFor="operaGlass1">#오페라글라스필수</label>
        </StCheckbox>
    );
};

export default ModifyCheckboxSelect;

const StCheckbox =styled.div`
margin-bottom: 40px;
text-align: left;
h4{
    margin-bottom: 30px;
}
label {
    margin-right: 20px;
    padding: 8px 15px;
    border-radius:20px;
    box-sizing: border-box;
}
    input[type="checkbox"] {
        display:none;
    }
    input[type="checkbox"] + label{
        color: var(--gray-);
        border: 1px solid var(--gray-1);
        transition: all .3s;
    }
    input[type="checkbox"]:checked + label{
        color: var(--white);
        background-color: var(--maincolor-1);
        border: 1px solid var(--maincolor-1);
    }
`
