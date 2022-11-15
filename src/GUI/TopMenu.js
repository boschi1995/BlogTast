import DB  from "../Data/DataBase.json"
import { BrowserRouter, Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import * as Func from '../Function';
import "./GuiStyle.css"

function TopMenu() 
{
    var page =  Func.StringSub("/",useLocation().pathname)[1];

    return(
        <div>
            <div className="topMenu"> Blog </div>

            <div className="topButtonOut">

                <Link to = {`${DB.PageList[0][0]}/0`}>
                    <div className="topButton"> {`${DB.PageList[0][1]}`} </div>
                </Link>

                <Link to = {`${DB.PageList[1][0]}`}>
                    <div className="topButton"> {`${DB.PageList[1][1]}`} </div>
                </Link>

            </div>
        </div>
    );  
}

export default TopMenu;