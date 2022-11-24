import DB  from "../Data/DataBase.json"
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./GuiStyle.css"

function TopMenu() 
{
    return(
        <div className="topMenu_Main">  
            <div className="topMenu_Text"> Blog </div>
            <ul style={{ display: "inline-flex", marginTop:"-25px" }}> 
                <Link className="link" to = {`/Main`}>
                    <ul className="topMenu_PopsHead" style={{ width: "150px", marginLeft: "-40px" }}>메인화면</ul> 
                </Link>
                { PostTogle() }
            </ul>
        </div>
    );
}

const PostTogle = () =>
{
    const [togle, setTogle] = useState(0);

    return(
        <ul className="topMenu_PopsHead" onClick={()=>{ setTogle(!togle) } }> 게시판  
            {
                togle === true &&
                (
                    <Link className="link" to = {`/${DB.PageList[0][0]}/all`} >
                        <li className="topMenu_Pops"> 전체 </li>
                    </Link>
                )
            }
        </ul>
    );
}

export default TopMenu;