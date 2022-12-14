import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PostContextProvider from './components/contexts/PostContext';
import AuthContextProvider from './components/contexts/UserAuth';
import CommentContextProvider from './components/contexts/CommentContext';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { fetchPosts } from './features/post/postSlice';
store.dispatch(fetchPosts());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ChakraProvider>
      <AuthContextProvider>
        <PostContextProvider>
          <CommentContextProvider>
            <App />
          </CommentContextProvider>
        </PostContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
