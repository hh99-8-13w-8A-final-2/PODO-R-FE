import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const ModifyCheckboxSelect = ({ data, setBlock1, block1, setOperaGlass1, operaGlass1 }) => {
    
    // checked={operaGlass1 === true}
    useEffect(() => {
        setOperaGlass1(data?.data.operaGlass)
        setBlock1(data?.data.block)
    },[])

    const operaGlassChange = e => {
        if(operaGlass1 === 'on'){
            setOperaGlass1(null)
        }else{
            setOperaGlass1(e.target.value)
        }
    }

    const blockChange = e => {
        if(block1 === true){
            setBlock1(e.target.value)
        }
        if(block1 === 'on'){
            setBlock1(null)
        }else{
            setBlock1(e.target.value)
        }
    }
    return (
        <StCheckbox>
            <h4>추가선택</h4>
            <input type="checkbox" id='block1' name='block1' checked={block1} onChange={blockChange}/>
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