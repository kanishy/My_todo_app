let arrow=document.querySelector("#arrow"),ul=document.querySelector(".list"),li=document.querySelectorAll(".list li"),createTaskForm=document.querySelector('form[id="add-task"]'),updateForm=document.querySelector('form[id="update-task"]'),input=document.querySelector('input[type="text"]'),des_input=document.querySelector('textarea[name="description"]'),task=document.querySelectorAll(".task"),nav=document.querySelector("body nav"),deg=0,main="#EE7214",task_container=document.querySelector("#task-container"),curr_id=(taskcount=0,"\n            \n                \n                        \n                "==task_container.innerHTML&&(task_container.style.backgroundImage="url(../images/taskbackground.png)"),null);function showOrHideDropdown(){deg=(deg+180)%360,arrow.style.transform=`rotateZ(${deg}deg)`,ul.classList.toggle("active")}let edit_link_handler=e=>{e.preventDefault(),$("#update-task").slideToggle(300),$("#add-task").slideUp(300),curr_id=$(e.target).parent().data("id"),console.log(curr_id);e=new Date(document.querySelector(`#task-${curr_id} p.date`).innerText),console.log(e),e=e.toISOString().substring(0,10);console.log(e),$("#update-task").find("textarea[name=description]").val(document.querySelector(`#task-${curr_id} p.task-description`).innerText),$("#update-task").find("input[name=category]").val(document.querySelector(`#task-${curr_id} p.label`).innerText),$("#update-task").find("input[name=date]").val(e)},create_form_toggle=()=>{$("#add-task").slideToggle(300)},update_form_toggle=()=>{$("#update-task").slideToggle(300)};arrow.addEventListener("click",showOrHideDropdown),input.addEventListener("click",()=>{input.blur(),showOrHideDropdown()}),$("#arrow2").click(()=>{$("#update-list").slideToggle(400)}),$("#update-list li").click(e=>{"Other"==$(e.target).text()?($("#update-task input[name=category]").val(""),$("#update-task input[name=category]").attr("placeholder","Enter other category.."),$("#update-task input[name=category]").focus()):$("#update-task input[name=category]").val($(e.target).text()),$("#update-list").slideToggle(400)});for(let e=0;e<li.length;e++)li[e].addEventListener("click",()=>{"Other"==li[e].innerText?(input.value="",input.placeholder="Enter other category..",input.focus()):input.value=li[e].innerText,showOrHideDropdown()});$("#sidebar>button").click(()=>{$("body nav").toggle(300)}),$(".delete-link").click(function(e){e.preventDefault(),$.ajax({url:$(this).prop("href"),type:"get",success:function(e){new Noty({theme:"relax",timeout:2e3,type:"success",layout:"topCenter",text:e.message}).show(),$("#task-"+e.data.task_id).remove(),(taskcount-=1)<=0?task_container.style.backgroundImage="url(../images/taskbackground.png)":task_container.style.backgroundImage="none"},error:function(e){new Noty({theme:"relax",timeout:2e3,type:"error",layout:"topCenter",text:e.responseJSON.message}).show(),console.log(e.responceText)}})});let delete_task=t=>{$(t).click(function(e){e.preventDefault(),$.ajax({url:$(t).prop("href"),type:"get",success:function(e){new Noty({theme:"relax",timeout:2e3,type:"success",layout:"topCenter",text:e.message}).show(),console.log(e),$("#task-"+e.data.task_id).remove(),taskcount-=1,console.log(taskcount,"hello"),taskcount<=0?task_container.style.backgroundImage="url(../images/taskbackground.png)":task_container.style.backgroundImage="none"},error:function(e){new Noty({theme:"relax",timeout:2e3,type:"error",layout:"topCenter",text:e.responseJSON.message}).show(),console.log(e.responceText)}})})},create_task=()=>{let t=$("#add-task");t.submit(e=>{e.preventDefault(),$.ajax({url:"/task/create",type:"POST",data:t.serialize(),success:function(e){new Noty({theme:"relax",timeout:2e3,type:"success",layout:"topCenter",text:e.message}).show();e=newTask(e.data.task);$("#task-container").prepend(e),delete_task($(" .delete-link",e)),$(".edit-link").parent().click(edit_link_handler),createTaskForm.reset(),create_form_toggle(),taskcount+=1,task_container.style.backgroundImage="none"},error:function(e){new Noty({theme:"relax",timeout:2e3,type:"error",layout:"topCenter",text:e.responseJSON.message}).show(),console.log(e.responceText)}})})},newTask=e=>$(`<div id="task-${e._id}" class="task">
                        <a class="delete-link" href="/task/delete/${e._id}">
                            <i class="fa-solid fa-trash-can"></i>
                        </a>
                        <div>
                            <div class="description">
                                <p class="task-description">
                                    ${e.description}
                                </p>
                                <span>
                                    <a class="edit-link" href="" data-id="${e._id}">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                </span>
                            </div>
                            <div>
                                <i class="fa-solid fa-calendar-days"></i>
                                <p class="date">
                                    ${new Date(e.date)}
                                </p>
                            </div>
                        </div>
                        <p class="label">
                            ${e.category}
                        </p>
                    </div>`);create_task(),$("#new-task-button").click(()=>{create_form_toggle(),$("#update-task").slideUp(300),setTimeout(()=>{des_input.focus()},300)}),$("#add-task button.cancel").click(create_form_toggle),$("#add-task button.reset").click(()=>{createTaskForm.reset()}),$("#update-task button.cancel").click(update_form_toggle),$("#update-task button.reset").click(()=>{updateForm.reset()}),$(".edit-link").click(edit_link_handler),$("#update-task").submit(function(e){e.preventDefault();var e=new FormData(this),e=Object.fromEntries(e),t=$("#update-task").serialize();console.log(t.category),$.ajax({url:"/task/update",type:"post",data:{form_data:e,id:curr_id},success:function(e){new Noty({theme:"relax",timeout:2e3,type:"success",layout:"topCenter",text:e.message}).show(),console.log(document.querySelector(`#task-${e.data.task._id} p.task-description`)),document.querySelector(`#task-${e.data.task._id} p.task-description`).innerText=e.data.task.description,document.querySelector(`#task-${e.data.task._id} p.label`).innerText=e.data.task.category,document.querySelector(`#task-${e.data.task._id} p.date`).innerText=new Date(e.data.task.date),updateForm.reset(),update_form_toggle()},error:function(e){new Noty({theme:"relax",timeout:2e3,type:"error",layout:"topCenter",text:e.responseJSON.message}).show(),console.log(e.responceText)}})});