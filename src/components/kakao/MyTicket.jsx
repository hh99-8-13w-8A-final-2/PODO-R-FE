import React, { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useRecoilState } from "recoil";
import mypageMusicalId from "../../atoms/mypageMusicalId";


const MyTicket = ({ data }) => {
  const swiperRef = useRef(null)
  const [eachMusicalId, setEachMusicalId] = useRecoilState(mypageMusicalId);
  console.log(data)

  return (
    <StMyTicket>
      <div
        onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
      >
        <Swiper
          ref={swiperRef}
          slidesPerView={2}
          spaceBetween={10}
          modules={[Pagination, Navigation]}
          breakpoints={{
            763: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          
          className="mySwiper"
        >
          <SwiperSlide onClick={() => setEachMusicalId('')}>
            <StDiv className="all">
              <input type="radio" name="musicalBox" id='all' />
              <div className="label">
                <StLabel htmlFor='all'>
                  <StH3>뮤지컬 전체 보기</StH3>
                </StLabel>
              </div>
            </StDiv>
          </SwiperSlide>
      {data?.content.map((ticket) => (
        <SwiperSlide
          key={ticket.musicalId}
          onClick={() => setEachMusicalId(ticket.musicalId)}
        >
          <StDiv>
            <input type="radio" name="musicalBox" id={ticket.musicalId} />
            <div className="label">
              <StLabel imgUrl={ticket.musicalPoster} htmlFor={ticket.musicalId}>
                <StH3>{ticket.musicalName}</StH3>
                <StDiv1>{ticket.musicalRegion}</StDiv1>
                <StDiv2>
                  {ticket.openDate} ~ {ticket.closeDate}
                </StDiv2>
              </StLabel>
            </div>
          </StDiv>
        </SwiperSlide>
      ))}
      </Swiper>
      </div>
    </StMyTicket>
  );
};

export default MyTicket;

const StMyTicket = styled.div`
  width: 100%;
  .swiper-pagination-bullet {
    background-color: var(--gray-2);
  }
  .all .label>label{
      justify-content: center;
      h3{
        text-align: center;
        line-height: 1.8em;
      }
    }
  margin-bottom: 70px;
  @media (max-width: 763px) {
    margin-bottom: 30px;
  }
`;

const StDiv = styled.div`
  box-sizing: border-box;
  width: 190px;
  height: 190px;
  input {
    display: none;
  }
  input[type="radio"]:checked + div label{
    box-sizing: border-box;
    border: 3px solid var(--maincolor-1);
  }

`;

const StLabel = styled.label`
  width: 190px;
  height: 190px;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 100%
    ),
    ${(props) => `url(${props.imgUrl})`};
  background-size: cover;
  background-color: var(--gray-3);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-position: center;
  border-radius: 8px;
  line-height: 20px;
  cursor: pointer;
`;

const StH3 = styled.h3`
  font-size: 17px;
  color: var(--white);
  width: 180px;
  line-height: 1;
  height: 1.8em;
  display: inline-block;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StDiv1 = styled.div`
  font-size: 14px;
  width: 180px;
  color: var(--gray-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StDiv2 = styled.div`
  font-size: 14px;
  width: 180px;
  color: var(--gray-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
