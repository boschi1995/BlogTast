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
            <button onClick={(e)=> {postDelete(item,e)}}>삭제</button>
            <Link to = {`/${DB.PageList[2][0]}/${hook}/${item}` }> 
                :: {`${DB.PostList[item].Day}`}
                :: {`${DB.PostList[item].Title}`}
            </Link>
        </div>
    );

    return(
        <div>
            {setLook}
            
            <div>

            { 
                hook-1 < 0 ?( <button>이전</button> ) 
                :(  
                    <Link to={`${hook-1}`}>
                        <button>이전</button>
                    </Link>
                )    
            }

            <input className="forumInput" placeholder={hook} />
            {
                ((hook+1)*5) >= DB.PostList.length?( <button>이후</button> ) 
                :(  
                    <Link to={`${hook+1}`}>
                        <button>이후</button>
                    </Link>
                )    
            }

            </div>
        </div>
    );
}

export default ForumPage;