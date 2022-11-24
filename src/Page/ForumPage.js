import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DB from "../Data/DataBase";
import "../GUI/GuiStyle.css";

// sidepops 따로 state <= Mode의 뷰가 안바뀜 ( Like to 가 바뀌지 state 가 바뀌지 않아서. ) <= 그럼 전체의 state 를 바꾸어야함 흐음 
// 해결방법.. state를 따로 떼온다..? 

const Tag = [ "all", "tag1", "tag2", "tag3" ];

function ForumPage() { return( <div> { Page() } </div> ); }

const Page = () => {
    const [mode, setMode] = useState("forum");
    return(
        <div>
        { 
            {
                forum: <div style={{ display: "inline-flex" }}> { SidePops(setMode) } { ForumMode(setMode) } </div>,
                posting: <div style={{ display: "inline-flex" }}> { SidePops(setMode) } { PostingMode(setMode) } </div>,
                viwer: <div style={{ display: "inline-flex" }}> { SidePops(setMode) } { ViwerMode(setMode) } </div>,
            } [mode]
        }</div>
    )
}

function SidePops(setMode){
    return(
        <div className="sidePops_Main">
            <ul className="sidePops_Head">게시판 
                <Link className="link" to = {`all`} onClick={()=>setMode("forum")}>
                    <li className="sidePops_Pops">전체 게시판</li>
                </Link>
            </ul>
        </div>
    );
}

const ForumMode = (setMode) =>{

    var [viwe, setViwe ] = useState(0);
    var [tag, setTag] = useState(Tag[0]);
    var tagList = [];
    var viewList = [];

    for(var i = viwe; i < DB.PostFull.length; i++)
    { 
        if(tag == Tag[0]) { tagList.push(i); }
        else if(DB.PostFull[i].tag == tag) { tagList.push(i);}
    }

    var temp = 0;
    for(var i = viwe; i < viwe+15; i++)
    {
        if(temp >= tagList.length) { break; }
        viewList.push(tagList[temp]);
        temp ++;
    }

    function Viwer(index)
    {
        DB.PostFull[index].views += 1;
        setMode("viwer"); 
    }

    function TagChanger(value) { setViwe(0); setTag(value); }

    const forumViwe = viewList.map((index,key)=> { 
        var base = DB.PostFull[index];
        return(
        <Link key={key} className="forumBox" style={{ display: "inline-flex", }} to={`all/${index}`} onClick={()=>Viwer(index)}> 
            <div className="tast" style={{ textAlign: "left", marginLeft: "5px" }}>
                { `[${base.tag}] :: ${base.tilte}` }
            </div>
            <div className="tast" style={{ width: "8.5vh" }}>{base.date}</div>
            <div className="tast" style={{ width: "8.5vh" }}>{base.views}</div>
            <div className="tast" style={{ width: "8.5vh" }}>{base.recommend}</div>
        </Link>
    )});

    const btnChanger = (type) => {
        
        if(type == "L") 
        { 
            if(viwe-1 < 0) { type += "_false" } else { type += "_true" } 
        }
        else
        { 
            if(viwe+15 >= tagList.length) { type += "_false" } else { type += "_true" } 
        }

        return(
        <div style={{ display: "inline-flex" }}> 
        {
            {
                "L_false": <button> 이전 </button>,
                "L_true" : <button onClick={()=> setViwe(viwe-15) }> 이전 </button>,
                "R_false": <button> 이후 </button>,
                "R_true" : <button onClick={()=> setViwe(viwe+15) }> 이후 </button>
            }[type]
        }</div>
    )}

    function ViweIput(number)
    {
        console.log(number);
    }

    return(
        <div style={{ marginLeft : "13px", marginTop: "10px" }}>

            <div style={{ display: "inline-flex" }}> 

                <select style={{ width: "100px" }} onChange= {(e)=> TagChanger(e.target.value)} >
                    { Tag.map((index,key) => 
                        { return( <option key={key} value={index}> {index}</option> ); }
                    )}
                </select>

                <button style={{ marginLeft: "445px" }} onClick={()=> setMode("posting") } >글쓰기</button> 
            </div>

            <div className="forumBorder"> 
                <div style={{ display: "inline-flex", marginLeft: "1.3vh" }}> 
                    <div className="forumBox_Menu" style={ { width: "39.2vh"} }> 제목 </div>
                    <div className="forumBox_Menu"> 날짜 </div>
                    <div className="forumBox_Menu"> 조회수 </div>
                    <div className="forumBox_Menu"> 추천 </div>
                </div>
                { forumViwe } 
            </div>

            <div style={{ display: "inline-flex", marginTop: "5px" }}> 

                <input placeholder = "검색(미구현)" style = {{ height: "19px", width: "100px" }} />
                <select style={{ width: "75px" }}> </select>

                <div style={{ marginLeft: "297px" }}>
                    {btnChanger('L')}
                    <input placeholder = {(viwe/15)+1} style = {{ height: "19px", width: "30px", textAlign: "center"}} onKeyDown={(e)=>ViweIput(e.target.value)} />
                    {btnChanger('R')}
                </div>
            </div>
        </div>  
    );
}

const PostingMode = (setMode) => {

    var tag = Tag[1];
    var tilte, post, date;
    tilte = post = date = '';
    
    function btnFuc()
    {
        var timer = new Date();
        date = `${timer.getMonth()+1}-${timer.getDay()}`;

        DB.PostFull.push(
            { tag: tag, tilte: tilte, post: post, date: date, views: 0, recommend : 0 }
        );
        setMode("forum");
    }

    return(
        <div style={{ marginLeft : "13px", marginTop: "10px" }}>
            <div className="forumBorder">
                <div style={{ display: "inline-flex", margin: "10px" }}> 

                    <div style={{ paddingRight:"10px" }}> 제목 </div>

                    <select style={{ width: "75px", paddingRight:"10px"}} onChange= {(e)=> tag = e.target.value }>
                        { Tag.map((index,key) =>
                            { if(index != "all" ) { return( <option key={key} value={index}> {index}</option> ); } }
                        )}
                    </select>

                    <input 
                        style={{ width: "440px" }} 
                        onChange = {(e)=> tilte = e.target.value }   
                    />
                </div>
                
                <div style={{ marginLeft: "10px",marginBottom: "4px" }}> 
                    <textarea 
                        style={{ width: "570px", height: "530px" }} 
                        onChange = {(e)=> post = e.target.value }    
                    />
                </div>

                <button style={{ marginLeft: "528px" }} onClick={()=>btnFuc()}>글 작성</button> 
            </div>
        </div>
    );
}

const ViwerMode = (setMode) => {
    return(
        <div>
            <button onClick={()=>setMode("forum")}>돌아가기 (미구현) </button>
        </div>
    )
}

export default ForumPage;