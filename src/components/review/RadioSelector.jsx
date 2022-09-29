import React from 'react';
import gap from '../../assets/img/gap.svg'
import view from '../../assets/img/view.svg'
import sound from '../../assets/img/sound.svg'
import light from '../../assets/img/light.svg'
import up_small from '../../assets/img/up_small.svg'
import styled from 'styled-components';

const RadioSelector = ({handleEvalCheck, isEvalCheck, isOrderCheck, handleOrderCheck}) => {
     
   
    
    return (
        <StCheckBoxDiv>
          <div>
                <input type="checkbox" id='gap' alt='0' data-query='단차좋음' name='gap' onChange={(e) => handleEvalCheck(e)} defaultChecked={isEvalCheck[0]}/>
                <label htmlFor="gap"> <img src={gap} alt="" /> 단차좋음</label>
                <input type="checkbox" id='sight' alt='1' data-query='시야좋음' name='sight' onChange={(e) => handleEvalCheck(e)} defaultChecked={isEvalCheck[1]}/>
                <label htmlFor="sight"> <img src={view} alt="" /> 시야좋음</label>
                <input type="checkbox" id='sound' alt='2' data-query='음향좋음' name='sound' onChange={(e) => handleEvalCheck(e)} defaultChecked={isEvalCheck[2]}/>
                <label htmlFor="sound"> <img src={sound} alt="" /> 음향좋음</label>
                <input type="checkbox" id='light' alt='3' data-query='조명좋음' name='light' onChange={(e) => handleEvalCheck(e)} defaultChecked={isEvalCheck[3]}/>
                <label htmlFor="light"> <img src={light} alt="" /> 조명좋음</label>
            </div>
            <div>
                <input type="checkbox" id='rank' alt='0' data-query='score,desc' onChange={(e) => handleOrderCheck(e)} defaultChecked={isOrderCheck[0]}/>
                <label htmlFor="rank"> <img src={up_small} alt="" className='up_small'/>평점좋은순</label>
                <input type="checkbox" id='new' alt='1' data-query='createdAt,desc' onChange={(e) => handleOrderCheck(e)} defaultChecked={isOrderCheck[1]}/>
                <label htmlFor="new"> <img src={up_small} alt=""  className='up_small' />최신순</label>
            </div>  
        </StCheckBoxDiv>
    );
};

const StCheckBoxDiv = styled.div`
    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        div {
            font-size: 20px;
            width: 280px;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-left: 0px;
            label {
                margin-bottom: 10px;
            }
        }
    }
`

export default RadioSelector;