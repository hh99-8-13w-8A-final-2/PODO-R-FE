import React from 'react';
import styled from 'styled-components';
const CheckboxSelect = () => {
    return (
        <StCheckbox>
                <h4>추가선택</h4>
                <input type="checkbox" id='block' name='block' />
                <label htmlFor="block">#시야방해있음</label>
                <input type="checkbox" id='operaGlass' name='operaGlass'/>
                <label htmlFor="operaGlass">#오페라글라스필수</label>
        </StCheckbox>
    );
};

export default CheckboxSelect;


const StCheckbox =styled.div`
margin-bottom: 40px;
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
        color: var(--gray-2);
        border: 1px solid var(--gray-2);
        transition: all .3s;
    }
    input[type="checkbox"]:checked + label{
        color: var(--white);
        background-color: var(--maincolor-1);
        border: 1px solid var(--maincolor-1);
    }
`
