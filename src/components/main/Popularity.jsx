import apis from '../../apis/apis';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from "react-query"

const URI = {
    BASE: process.env.REACT_APP_BASE_URI
  };

  const fetchPopularMusical = () => {
    //return axios.get(`${URI.BASE}/api/musicals/popular`)
    return apis.getPopularMusical()
  }

const Popularity = () => {
    const { status, data, error } = useQuery('/PopularMusical', fetchPopularMusical,
        {
            staleTime: 1000,
            refetchOnWindowFocus: false,
        }
    )
    if(status === 'loading'){return <div className='popularBox'></div>}
    if(status === 'error'){return <div className='popularBox'><p>Error:{error.message}</p></div>}
    return (
        <StDiv>
            <div>
                <h3>인기 공연</h3>
            </div>
            <div className='popularBoxList'>
               {data?.data.map(musical => (
                    <Link to={`musicals/${musical.musicalId}/reviews`} key={musical.musicalId}>
                        <StImgBoxDiv className='popularBox' imgUrl={musical.musicalPosterWide}>
                            <h4>{musical.musicalName}</h4>
                            <div>{musical.musicalTheater}</div>
                            <div>{musical.openDate.substr(2,8)} ~ {musical.closeDate.substr(2,8)}</div>
                        </StImgBoxDiv>
                    </Link>
               ))}
                
            </div>
        </StDiv>
    );
};

export default Popularity;

const StDiv = styled.div`
    margin-bottom: 70px;
        h3{
            font-size: 18px;
            color: var(--white);
            padding: 20px 10px;
        }
        .popularBoxList{
            display: flex;
            justify-content: space-between;
            div.popularBox{
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                color: var(--white);
                width: 684px;
                height: 280px;
                padding: 30px;
                box-sizing: border-box;
                border-radius: 20px;
                h4{
                    margin-bottom: 20px;
                }
                >div:first-of-type{
                    margin-bottom: 5px;
                }
            }
        }
        @media (max-width: 763px){
            margin-bottom: 50px;
            .popularBoxList{
                display: flex;
                width: 100%;
                height: 220px;
                overflow-x: scroll;
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
                &.popularBoxList::-webkit-scrollbar{
                    display: none; //크롬
                }
                div.popularBox{
                    margin-right: 25px;
                    width: 370px;
                    height: 220px;
                }
            }
        }
`
const StImgBoxDiv = styled.div`
    background:linear-gradient( 0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 100% ), ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`