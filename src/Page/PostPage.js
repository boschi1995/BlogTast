import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DB  from "../Data/DataBase.json"
import * as Func from '../Function';


function PostPage() 
{
    var adrres = Func.StringSub("/",useLocation().pathname);
    adrres[3] = Number(adrres[3]);
    
    return(
        <div>
            <div>제목::{DB.PostList[adrres[3]].Title}</div>
            <div className="postingText">{DB.PostList[adrres[3]].Post}</div>
            <div>
                <Link to={`/${DB.PageList[0][0]}/${adrres[2]}`}>
                    <button>돌아가기</button>
                </Link>

                { 
                    adrres[3]-1 < 0 ?( <button>이전 글</button> ) 
                    :(  
                        <Link to={`/${adrres[1]}/${adrres[2]}/${adrres[3]-1}`}>
                            <button>이전 글</button>
                        </Link>
                    )    
                }

                { 
                    adrres[3]+1 >= DB.PostList.length ?( <button>다음 글</button> ) 
                    :(  
                        <Link to={`/${adrres[1]}/${adrres[2]}/${adrres[3]+1}`}>
                            <button>다음 글</button>
                        </Link>
                    )
                }
            </div>
        </div>
    );  
}

export default PostPage;