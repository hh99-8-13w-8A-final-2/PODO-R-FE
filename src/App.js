import './App.css';
import Router from './router/Router';
import GlobalStyle from './assets/style/GlobalStyle'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import styled from 'styled-components';

const queryClient = new QueryClient()
localStorage.setItem('modal',true)

function App() {
  return (
    <StDiv>
      <QueryClientProvider client={queryClient}>
        <Router />
        <GlobalStyle />
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
