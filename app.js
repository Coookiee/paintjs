const canvas = document.getElementById('jsCanvas');     //  canvas부분
const ctx = canvas.getContext('2d');        //  canvas 부분 가져올때는 getContext('2d') 해야함
const colors = document.getElementsByClassName('jsColor');      
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const eraseBtn = document.getElementById('jsErase');

//////////////////  고정 전역 변수들     ////////////////
const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 600;
const INITIAL_LINE_WITH = 2.5;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_LINE_WITH;

/////////////////       가변 전역 변수들     ///////////////////////
let painting = false;
let filling = false;

let erase = false;
let beforeColor = 'white';        //지울때 사용할 색

///////////////////  함수 선언 부분   ////////////////////


function stopPainting(){
    painting = false;
}
function startPainting(){
    painting = true;
}


function stopErasing(){
    erasing = false;
}

function startErasing(){
    erasing = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    //  path라는 것을 활용
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    if(!erase){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}   
function onMouseDown(event){
    painting = true;
    startPainting();
}
function onMouseUp(event){
    stopPainting();    
}
function onMouseLeave(event){
    painting = false;
}



function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}
function handleModeClick(){
    if(filling===true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle=ctx.strokeStyle;
        beforeColor = ctx.fillStyle;
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

//  지우기 버튼을 누르면 현재 배경색을 펜 색깔로 설정해줌
function handleEraseClick(){
    ctx.strokeStyle = beforeColor;
}


/////////////   동작부분    ///////////////////


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",onMouseDown);
    canvas.addEventListener("mouseup",onMouseUp);
    canvas.addEventListener('mouseleave',onMouseLeave);
    canvas.addEventListener('click',handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
//  colors 버튼들에 클릭 이벤트 걸어줌
if(colors){
    Array.from(colors).forEach(color => 
        color.addEventListener('click',handleColorClick)
    );
}

if(range){
    range.addEventListener('input',handleRangeChange);
}

if(mode){
    mode.addEventListener('click',handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}
if(eraseBtn){
    eraseBtn.addEventListener('click',handleRangeChange);
    eraseBtn.addEventListener('click',handleEraseClick);
}

