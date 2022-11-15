import { useState } from "react";
import DB from "../Data/DataBase";
import "../GUI/GuiStyle.css"

function PostingPage() 
{
    var check = [true,true];
    var [tilte,tilte_] = useState("");
    var [post,post_] = useState("");

    function changer(type,string,e)
    {
        switch(type)
        {
            case 0: { tilte_(string); }break;
            case 1: { post_(string); }break;
        }
    }
    
    function result(e)
    {
        e.preventDefault();

        for(var i=0; i <check.length; i++) 
        { 
            if(check[i].length == 0) { return; }  
        }

        let timer = new Date();
        DB.PostList.push(
            { 
                Title: tilte, Post: post, 
                Day: `${timer.getFullYear()}-${timer.getMonth()+1}-${timer.getDay()}`
            }
        );
    }
    
    return(
        <div>
            <div>
                제목:: <input className="postingTilte" onChange={(e)=> {changer(0,e.target.value,e)}} />
            </div>

            <textarea className="postingText" onChange={(e)=> {changer(1,e.target.value,e)}} />

            <div>
                <button className="postingButton" onClick={result}>작성</button>
            </div>

        </div>
    );
}

export default PostingPage;