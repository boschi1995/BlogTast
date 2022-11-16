import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DB from "../Data/DataBase";
import "../GUI/GuiStyle.css";

function ForumPage() 
{
    var hook = Number(useLocation().pathname.substring(7));
    if(useLocation().pathname == 0) { hook = 0; }
    var [updata,updata_] = useState(0);
    var look = [];
    
    if(DB.PostList.length == 0 ) { return(<div>게시글이 없습니다.</div>); } 

    for(var i= hook*5; i < (hook * 5) + 5; i++)
    {
        if(i >= DB.PostList.length) { break; }
        look.push(i);
    }

    function updataFuc()
    { 
        if(updata < 10) { updata_(updata +1); } else {updata_(0);} 
    }

    function postDelete(num,e)
    {
        e.preventDefault();
        DB.PostList.splice(num,1);
        updataFuc(); 
    }

    const setLook = look.map((item,index) => 
        <div key={index}>
            <Link to = {`/${DB.PageList[2][0]}/${hook}/${item}` } style={ { textDecoration: "none", color: "black" }}> 
                <div className="postList_Line">
                    <button className="postList_Button" onClick={(e)=> {postDelete(item,e)}}>삭제</button>
                    <button className="postList_Button"> 따봉</button>

                    :: {`${DB.PostList[item].Day}`}
                    :: {`${DB.PostList[item].Title}`}
                </div>
            </Link>
        </div>
    );

    return(
        <div style={{ marginLeft: 3 }}>

            <div className="postList_OptionBox">
                
                <select className="postList_Select" tyle = {{ width: "10px"   }}>
                    <option value="Tilte">카테고리</option>
                    <option value="Day">랜덤</option>
                </select>

                <input className="postList_Button" placeholder= "미구현" style = {{ height: "19px", width: "30%" } } />
                <select className="postList_Button">
                    <option value="Tilte">제목</option>
                    <option value="Day">날짜</option>
                </select>

            </div>

            <div className="postList_Box">{setLook}</div>

            <div className="postList_OptionBox">

                { 
                    hook-1 < 0 ?( <button className="postList_Button">이전</button> ) 
                    :(  
                        <Link to={`${hook-1}`}>
                            <button className="postList_Button">이전</button>
                        </Link>
                    )    
                }

                <input className="postList_Button" placeholder={hook} style = {{ height: "19px", textAlign: "center"} } />

                {
                    ((hook+1)*5) >= DB.PostList.length?( <button className="postList_Button">이후</button> ) 
                    :(  
                        <Link to={`${hook+1}`}>
                            <button className="postList_Button">이후</button>
                        </Link>
                    )    
                }

            </div>

        </div>
    );
}

export default ForumPage;