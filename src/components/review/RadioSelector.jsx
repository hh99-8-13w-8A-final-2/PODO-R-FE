import React from 'react';
import gap from '../../assets/img/gap.svg'
import view from '../../assets/img/view.svg'
import sound from '../../assets/img/sound.svg'
import light from '../../assets/img/light.svg'
import up_small from '../../assets/img/up_small.svg'

const RadioSelector = ({query, navigate, params, handleCheck, createSearchParams}) => {
     
   
    const handleOrderCheck  = (e) =>{
        const {name, checked, value} = e.target;
        const param = createSearchParams({
            ...query,
            [name]:checked? `${value}` : null
        })
        navigate({pathname:"", search:`?${param}`})
    }
    
    return (
        <>
          <div>
                <input type="checkbox" id='gap' name='gap' defaultChecked={params.get("gap"==="1")} onChange={handleCheck}/>
                <label htmlFor="gap"> <img src={gap} alt="" /> 단차좋음</label>
                <input type="checkbox" id='sight' name='sight' defaultChecked={params.get("sight"==="1")} onChange={handleCheck} />
                <label htmlFor="sight"> <img src={view} alt="" /> 시야좋음</label>
                <input type="checkbox" id='sound' name='sound' defaultChecked={params.get("sound"==="1")} onChange={handleCheck}/>
                <label htmlFor="sound"> <img src={sound} alt="" /> 음향좋음</label>
                <input type="checkbox" id='light' name='light' defaultChecked={params.get("light"==="1")} onChange={handleCheck}/>
                <label htmlFor="light"> <img src={light} alt="" /> 조명좋음</label>
            </div>
            <div>
                <input type="radio" id='rank' name='order' value='SCORE' defaultChecked={params.get("order"==="SCORE")} onChange={handleOrderCheck}/>
                <label htmlFor="rank"> <img src={up_small} alt="" className='up_small'/> 평점좋은순 </label>
                <input type="radio" id='new' name='order' value='RECENT'  defaultChecked={params.get("order"==="RECENT")} onChange={handleOrderCheck} />
                <label htmlFor="new"> <img src={up_small} alt=""  className='up_small' /> 최신순 </label>
            </div>  
        </>
    );
};

export default RadioSelector;