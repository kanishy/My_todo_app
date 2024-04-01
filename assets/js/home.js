let arrow = document.querySelector("#arrow");
let ul = document.querySelector(".list");
let li = document.querySelectorAll(".list li");
let input = document.querySelector("#inp1");
let tick = document.querySelectorAll(".tick");
let task = document.querySelectorAll(".task");
let deg = 0;
let main = '#EE7214'

function showOrHideDropdown(){
    deg = (deg+180)%360;
    arrow.style.transform = `rotateZ(${deg}deg)`;
    ul.classList.toggle('active');
}

arrow.addEventListener('click', showOrHideDropdown);
input.addEventListener('click', showOrHideDropdown);
for(let i = 0; i < li.length; i++)
{
    li[i].addEventListener("click", ()=>{
        if(li[i].innerText == 'Other')
        {
            console.log("hello");
            input.placeholder = 'Enter other category..'
            input.focus();
        }
        else
        {
            input.value = li[i].innerText;
        }
        showOrHideDropdown();
    } )
}

for(let i = 0; i < task.length; i++)
{
    task[i].addEventListener("mouseover", ()=>{
        tick[i].style.display = 'block';
    })
    task[i].addEventListener("mouseout", ()=>{
        tick[i].style.display = 'none';
    })
    tick[i].addEventListener('click', ()=>{
        if(tick[i].checked)
        {
            task[i].style.border = '2px solid '+ main;
        }
        else{
            task[i].style.border = 'none';
        }
    })
}