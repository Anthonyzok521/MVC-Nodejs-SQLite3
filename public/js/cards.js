const notes = document.querySelector('#note');
const news = document.querySelector('#new');
const cancel = document.querySelector('#btn_cancel');
const add = document.querySelector('.add');
let id;
let title;
let description;

notes.addEventListener('click', (e)=>{
    if(e.target && e.target.tagName === 'IMG'){
        if(e.target.alt == 'Edit'){
            title = e.target.parentElement.parentElement.children[0].value;            
            description = e.target.parentElement.parentElement.parentElement.children[1].value;
            e.target.parentElement.parentElement.children[3].style.display = "flex";
            e.target.parentElement.parentElement.children[1].style.display = "none";
            e.target.parentElement.parentElement.children[2].style.display = "none";
            e.target.parentElement.parentElement.children[0].removeAttribute('readonly');            
            e.target.parentElement.parentElement.parentElement.children[1].removeAttribute('readonly');
        }else if(typeof parseInt(e.target.alt) == 'number'){
            console.log("SIIIIIIIIIIIII", e.target, )
            title = '';
            description = '';
            id = e.target.alt;
            notes.action += `?id=${id}`;
            e.target.parentElement.parentElement.children[0].setAttribute('name', 'title');
            e.target.parentElement.parentElement.parentElement.children[1].setAttribute('name', 'description');
            e.target.parentElement.children[0].click();
        }
        else if(e.target.alt == 'Cancel'){
            e.target.parentElement.parentElement.children[0].value = title;
            e.target.parentElement.parentElement.parentElement.children[1].value = description;
            e.target.parentElement.parentElement.children[3].style.display = "none";
            e.target.parentElement.parentElement.children[1].style.display = "none";
            e.target.parentElement.parentElement.children[2].style.display = "none";
            e.target.parentElement.parentElement.children[0].setAttribute('readonly', '');
            e.target.parentElement.parentElement.parentElement.children[1].setAttribute('readonly', '');
        }
    }

    
    else if(e.target && e.target.tagName === 'TEXTAREA'){
        if(e.target.parentElement.children[0].children[1].style.display != "flex"){
            e.target.parentElement.children[0].children[1].style.display = "flex";
            e.target.parentElement.children[0].children[2].style.display = "flex";   
        }        
    }
});

notes.addEventListener('click', (e)=>{
    if(e.target){
        if(e.target.tagName === 'TEXTAREA'){
            if(e.target.parentElement.children[0].children[1].style.display != "flex"){
                e.target.parentElement.children[0].children[1].style.display = "flex";
                e.target.parentElement.children[0].children[2].style.display = "flex";   
            }
        
        }if(e.target.tagName === 'INPUT'){
            if(e.target.parentElement.children[1].style.display != "flex"){
                e.target.parentElement.children[1].style.display = "flex";
                e.target.parentElement.children[2].style.display = "flex";    
            }
            
        }
    }
});

add.addEventListener('click', ()=>{
    
    if(news.style.display == '' || news.style.display == 'none'){
        console.log("SIII");
        news.style.display = 'flex';
        add.style.display = 'none';
    }
});

cancel.addEventListener('click', ()=>{
    if(news.style.display == 'flex'){
        console.log("VACIO")
        news.style.display = 'none';
        add.style.display = 'flex';
    }
});