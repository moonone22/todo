import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import {ThemeProvider} from "styled-components";
import App from './App';
import { theme} from './theme';
//theme.ts 에서 설정한 값을 받는다 

<link  type="text/css" media="screen" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,600"/>;


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          
          <App />

        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
  
);


