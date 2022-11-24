import './App.css';
import React from 'react';
import DB from "./Data/DataBase.json";
import TopMenu from "./GUI/TopMenu";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//#region PageList
  import ForumPage from './Page/ForumPage';
  import PostPage from './Page/PostPage'
//#endregion

function App() 
{
  return(
    <div>
      <BrowserRouter>
        <div className= 'zone' style={ { zIndex : "100" }} ><TopMenu /> </div>
        <div className= 'zone' style={ { zIndex : "50" } }>
            <Routes>
              <Route path= {`/`} element={<ForumPage/>} />
              <Route path= {`/${DB.PageList[0][0]}/*`} element={<ForumPage/>} />
              <Route path= {`/${DB.PageList[2][0]}/*`} element={<PostPage/>} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;