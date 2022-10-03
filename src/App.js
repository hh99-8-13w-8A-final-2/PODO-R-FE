import './App.css';
import Router from './router/Router';
import GlobalStyle from './assets/style/GlobalStyle'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components';
import { Suspense } from 'react';

const queryClient = new QueryClient()
localStorage.setItem('modal',true)

function App() {
  return (
    <StDiv>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<StLoadingDiv>Loading...</StLoadingDiv>}>
          <Router />
          <GlobalStyle />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
      </QueryClientProvider>
    </StDiv>
  );
}
export default App;

const StDiv = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
`

const StLoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
`
