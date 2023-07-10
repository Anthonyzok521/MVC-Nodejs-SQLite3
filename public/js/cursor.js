const cursor = document.querySelector('.cursor');
const form = document.querySelector('form');

document.addEventListener('mousemove', (e)=>{
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY + "px";
});

form.addEventListener('input', (e)=>{
    
    if(e.target && e.target.tagName){

        e.target.classList = (e.target.value != "") ? "value" : "novalue";

    } 
});