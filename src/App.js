import './App.css';
import React from 'react';
import DB from "./Data/DataBase.json";
import ForumPage from './Page/ForumPage';
import PostingPage from './Page/PostingPage';
import PostPage from './Page/PostPage'
import TopMenu from "./GUI/TopMenu";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() 
{
  return(
    <div>
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path= {`/`} element={<ForumPage/>} />
          <Route path= {`/${DB.PageList[0][0]}/*`} element={<ForumPage/>} />
          <Route path= {`/${DB.PageList[1][0]}`} element={<PostingPage/>} />
          <Route path= {`/${DB.PageList[2][0]}/*`} element={<PostPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;