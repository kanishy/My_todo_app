let label=document.querySelectorAll("label"),input=document.querySelectorAll("input"),container=document.querySelectorAll(".container"),eyes=document.querySelectorAll("i.fa-eye-slash"),passInput=document.querySelectorAll("input[type='password']");document.addEventListener("DOMContentLoaded",()=>{input[0].focus()});for(let e=0;e<input.length;e++)input[e].addEventListener("focus",()=>{label[e].style.zIndex=2,container[e].style.backgroundColor="#fff78a63",container[e].style.borderColor="#EE7214",label[e].style.backgroundColor="#EE7214",label[e].style.color="white",label[e].style.top="-23%"}),input[e].addEventListener("blur",()=>{""==input[e].value&&(label[e].style.zIndex=-1,label[e].style.top="29%",label[e].style.color="black",label[e].style.background="transparent",container[e].style.borderColor="gray",container[e].style.background="transparent")});for(let e=0;e<eyes.length;e++)eyes[e].addEventListener("click",()=>{eyes[e].classList.contains("fa-eye-slash")?(eyes[e].classList.remove("fa-eye-slash"),eyes[e].classList.add("fa-eye"),passInput[e].type="text"):(eyes[e].classList.remove("fa-eye"),eyes[e].classList.add("fa-eye-slash"),passInput[e].type="password")});