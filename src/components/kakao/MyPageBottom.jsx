import React from "react";
import styled from "styled-components";
import Layout from "../common/Layout";

const MyPageBottom = () => {
  return (
    <StMyPageBottom>
      <Layout>
        <StMyPageBottomCont>
          <span>마이페이지</span>
        </StMyPageBottomCont>
      </Layout>
    </StMyPageBottom>
  );
};

const StMyPageBottom = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--maincolor-1);
`;

const StMyPageBottomCont = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  color: var(--white);
  padding: 20px;
  span {
    margin: 0 10px;
    font-size: 30px;
  }
`;

export default MyPageBottom;
