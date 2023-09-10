const inputNewSection = document.querySelector("#input-new-section");
const addNewSection= document.querySelector(".add-new-section");
const sections= document.querySelector("#sections");
const clickIcon= document.querySelector(".add-category-icon");
const categoryDropdown =document.querySelector(".category-dropdown");
categoryDropdown.addEventListener("click", selectCategory);
const iconSearch= document.querySelector(".icon-search");
const inputSearch=document.querySelector('.input-search');
let todoData =[];
let sameInput = false
iconSearch.addEventListener("click",search)
clickIcon.addEventListener("click", newSection);
sections.addEventListener("click", addingTask);
sections.addEventListener("click",removeSection);
sections.addEventListener("click", removeTask);
sections.addEventListener("click", completedTask);

function newSection (event){
    sameInput=false
    if(inputNewSection.value.trim()){
        const categoryItems= document.getElementsByClassName("item")
        for (var i=0; i<categoryItems.length; i++){
            if(inputNewSection.value ===categoryItems[i].innerText){
                sameInput=true
                break
            }
        }
          
        if(!sameInput) {
        event.preventDefault();
        //add new category to select menu
        todoData.push([inputNewSection.value]);
        addToSelect(inputNewSection);
        const categorySection= document.createElement("div");
        sections.prepend(categorySection);
        categorySection.classList.add("category-section");
        const categoryContainer= document.createElement("div");
        categorySection.append(categoryContainer);
        categoryContainer.classList.add("flex","justify-between", "items-center", "pt-4", "px-4");
        categoryContainer.innerHTML='<i class="remove-section-icon fa-solid fa-trash cursor-pointer" style="color: #adb1b7;"></i>';
        const categoryName=document.createElement("p");
        categoryContainer.prepend(categoryName);
        categoryName.classList.add("category-name");
        categoryName.innerText=inputNewSection.value;
        const tasksContainer=document.createElement("div");
        categorySection.append(tasksContainer);
        tasksContainer.classList.add("tasks-con", "overflow-y-scroll", "h-full");
        const addTaskCon=document.createElement("div");
        categorySection.append(addTaskCon);
        const addTaskIcon = document.createElement("i");
        addTaskCon.classList.add("add-task-con");
        addTaskCon.prepend(addTaskIcon);
        addTaskIcon.classList.add("add-task-icon", "fa-solid", "fa-plus", "cursor-pointer");
        addTaskIcon.style.color="#d1d5db";
        const taskInput=document.createElement("input");
        addTaskCon.append(taskInput);
        taskInput.classList.add("task-input");
        taskInput.maxLength="38";
        taskInput.dir="auto";
        taskInput.placeholder="Add task";
        inputNewSection.value=''
        console.log(todoData)
        }   
      
    
    }
}
   

function addToSelect(event){
    const newCategory= document.createElement("a");
    categoryDropdown.append(newCategory);
    newCategory.classList.add("item")
    newCategory.href='#';
    newCategory.innerText=event.value;
}
function addingTask (event){
    if(event.target.classList.contains('add-task-icon')){
        const categorySection =event.target.closest(".category-section");
        const inputNewSection = categorySection.querySelector(".category-name");
        const tasksCon = categorySection.querySelector(".tasks-con")
        const taskInput = categorySection.querySelector(".task-input");
        if(taskInput.value.trim()){
        const taskCon= document.createElement("div");
        tasksCon.append(taskCon);
        taskCon.classList.add("task-con");
        const taskContent = document.createElement("p");
        taskCon.append(taskContent);
        taskContent.classList.add("task-content");
        taskContent.innerText=taskInput.value;
        todoData.forEach ((e) => {
            if(e[0]===inputNewSection.innerText){
                e.push(taskInput.value)
                
            }

        });
        taskInput.value= '';
        const taskEdit= document.createElement("div");
        taskCon.append(taskEdit);
        taskEdit.classList.add("task-edit");
        taskEdit.innerHTML=' <i class="check-icon fa-solid fa-check cursor-pointer" style="color: #adb1b7;"></i>\
        <i class="remove-task-icon fa-solid fa-trash cursor-pointer" style="color: #adb1b7;"></i>';   };
        }
        
        }
        

function removeSection(event){
    if(event.target.classList.contains('remove-section-icon')){
        const categorySection =event.target.closest(".category-section")
        const categoryName = categorySection.querySelector(".category-name")
        todoData.forEach((e) =>{
            if(e[0]===categoryName.innerText){
                const getIndex =todoData.indexOf(e);
                todoData.splice(getIndex, 1)
                categorySection.remove()
                const categoryItems= document.getElementsByClassName("item")
                for (var i=0; i<categoryItems.length; i++){
                    if(e[0] ===categoryItems[i].innerText){
                        categoryItems[i].remove()
            }
        }
            }}
        )
        
    }
}
function removeTask(event){
    if(event.target.classList.contains('remove-task-icon')){
        const taskCon =event.target.closest(".task-con")
        const taskContent = taskCon.querySelector(".task-content")
        todoData.forEach((e) =>{
            e.forEach( (i) =>{
                if(i===taskContent.innerText){
                    const getIndex =todoData.indexOf(i);
                    e.splice(getIndex,1)
                }
            })
        taskCon.remove();

    })
    console.log(todoData)
    }
}    
function completedTask(event){
    if(event.target.classList.contains('check-icon')){
        const taskCon= event.target.closest(".task-con");
        taskCon.querySelector(".task-content").classList.toggle("line-through");
        taskCon.classList.toggle("bg-gray-300");
    }
}
function selectCategory (event){
    const addNewSection = document.querySelector('.add-new-section')
    const item =event.target.classList.contains("item")
    const itemContent= event.target
    const categoryNames = document.querySelectorAll(".category-name")
    const categorySections = document.querySelectorAll(".category-section")
    Array.from(categorySections).forEach((i) =>{
            i.classList.remove("hidden")
            addNewSection.classList.remove('hidden');
    });
    const taskCons = document.querySelectorAll('.task-con')
    Array.from(taskCons).forEach((i) =>
                    i.classList.remove('hidden')
                )
    
    Array.from(categoryNames).forEach((i) =>{
        i.classList.remove('bg-yellow-400')
    })
    if(document.querySelector('.task-con')){
        const taskContent =document.querySelectorAll('.task-content')
        taskContent.forEach((i) =>{
                i.classList.remove('bg-yellow-400')
            
        })
    }            
    if(item){
             Array.from(categoryNames).forEach((i) =>{      
            if(i.innerText!==itemContent.innerText && itemContent.innerText !=="All"){
                const categorySection = i.closest(".category-section")
                categorySection.classList.add("hidden")
                addNewSection.classList.add('hidden');
            }
        });
    }
}    

function search (){
    const searchData= inputSearch.value.toLowerCase()
    const categorySections= document.querySelectorAll('.category-section')
    const categoryNames = document.querySelectorAll(".category-name")
    let resetChanges= true
    
        Array.from(categorySections).forEach((e) =>
    {
        const categoryName = e.querySelector('.category-name')
        if(resetChanges)  {
            categoryNames.forEach((i) =>{
                i.classList.remove('bg-yellow-400')
            } )
            if(e.querySelector('.task-con')){
                const taskContent =e.querySelectorAll('.task-content')
            taskContent.forEach((i) =>{
                    i.classList.remove('bg-yellow-400')
                    
            })
            resetChanges=false
        }}
            if (categoryName.innerText.toLowerCase().includes(searchData)){
            categoryName.classList.add('bg-yellow-400')
        }
        if(e.querySelector('.task-con')){
            const taskContent =e.querySelectorAll('.task-content')
            taskContent.forEach((i) =>{
                if(i.innerText.toLowerCase().includes(searchData)){
                    i.classList.add('bg-yellow-400')
                }
            })
        }
        
    
    })
    
    
}        
        