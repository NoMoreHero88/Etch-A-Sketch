const container = document.querySelector('#container');
let newDiv;
let width = 16;
const gridSizeBtn = document.querySelector('#gridSize');
const clearBtn = document.querySelector('#clear');
const rainbowBtn = document.querySelector('#rainbow');
let paintColor = 'black';
const eraserBtn = document.querySelector('#eraser');
const buttons = document.querySelectorAll('.toggleBtn');
const gradientBtn = document.querySelector('#gradient');

function createDivs(width){
    removeAllChildNodes(container);
    container.style.gridTemplateColumns = (`repeat(${width}, 1fr`);
    container.style.gridTemplateRows = (`repeat(${width}, 1fr`);
    for(let i=0; i<(width*width); i++){
        newDiv = document.createElement('div');
        newDiv.setAttribute('id','block');
        let dimension=(100/width)+"%"
        newDiv.style.flexBasis=dimension;
        container.appendChild(newDiv);
    }
}

container.addEventListener('mousedown', paintClick);

container.addEventListener('mouseover', (e) => {
    if(e.buttons>0){
        paintClick(e);
    }
});

function paintClick(e){
    if(paintColor == 'rainbow'){
        let randomColor=Math.floor(Math.random()*16777215).toString(16);
        e.target.style.backgroundColor = "#"+randomColor;
        e.target.style.opacity = 1;
    } else if(paintColor == 'blank'){
        e.target.style.backgroundColor = '';
    } else if(paintColor == 'gradient'){
        if(e.target.style.backgroundColor !== 'black'){
            e.target.style.backgroundColor = 'black';
            e.target.style.opacity = .1;
        }else {        
            let currentOpacity = e.target.style.opacity;
            e.target.style.opacity = parseFloat(currentOpacity) + .1;
        }
    }else {
        e.target.style.backgroundColor = 'black';
        e.target.style.opacity = 1;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    createDivs(width);
});

clearBtn.addEventListener('click', () => {
    createDivs(width);
}); 

rainbowBtn.addEventListener('click', ()=> {
    btnBackgroundOff()
    if(paintColor !== 'rainbow'){
        rainbowBtn.style.backgroundColor = 'skyblue';
        paintColor = 'rainbow';
    } else {
        paintColor = 'black';
    }
});

eraserBtn.addEventListener('click', () => {
    btnBackgroundOff();
    if (paintColor !== 'blank'){
        eraserBtn.style.backgroundColor = 'skyblue';
        paintColor = 'blank';
    } else {
        paintColor = 'black';
    }
})

gradientBtn.addEventListener('click', () => {
    btnBackgroundOff();
    if (paintColor !== 'gradient'){
        gradientBtn.style.backgroundColor = 'skyblue';
        paintColor = 'gradient';
    } else {
        paintColor = 'black';
    }
})

function btnBackgroundOff (){
    for(let i =0; i<buttons.length; i++){
        buttons[i].style.backgroundColor = '';
    }
}

gridSizeBtn.addEventListener('click', () => {
    removeAllChildNodes(container);
    width=prompt("Enter grid size (between 1-100)");
        while(width>100){
            width=prompt("Enter grid size (between 1-100)");
        }
    createDivs(width); 
});

function removeAllChildNodes(parent){
    while (parent.firstChild){
        parent.removeChild(parent.lastChild);
    }
}