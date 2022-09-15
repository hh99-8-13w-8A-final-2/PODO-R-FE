import React from 'react';
import styled from 'styled-components';

const Layout = (props) => {
    return (
        <StLayout>
            {props.children}
        </StLayout>
    );
};

export default Layout;

const StLayout = styled.div`
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    flex: 1;
    @media screen and (max-width: 768px){
        width: 90%;
    }
`