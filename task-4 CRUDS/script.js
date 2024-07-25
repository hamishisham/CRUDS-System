const studentNameInput = document.getElementById("studentName");
const studentMailInput = document.getElementById("studentMail");
const studentClassInput =document.getElementById("studentClass");
const searchInputName =document.getElementById("searchInputN");
const searchInputClass =document.getElementById("searchInputC");

let statusPage = 'add';
let globalIndex;


let studentGroup =[];
if (localStorage.getItem('student')){
    studentGroup =JSON.parse(localStorage.getItem('student'));
    displayStudents();
}

///////////////Add//////////

function addStudent(){
    const studentObj ={
        name:studentNameInput.value,
        mail:studentMailInput.value,
        class:studentClassInput.value,

    }
    if(statusPage=='add'){
        studentGroup.push(studentObj);
        localStorage.setItem('student',JSON.stringify(studentGroup));

    }
    else{
        studentGroup[globalIndex]=studentObj;
        statusPage="add";
        document.getElementById("addStudent").innerHTML='Add New Student';
    }
    displayStudents();
    clear();
}




///////////Display/////////
function displayStudents(){
    let show ='';
    for(let i = 0; i < studentGroup.length ; i++){
        show += 
        `
        <tr>
            <td>${studentGroup[i].name}</td>
            <td>${studentGroup[i].mail}</td>
            <td>${studentGroup[i].class}</td>
            <td><button id="update" onclick="updateStudent(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteStudent(${i})">Delete</button></td>
            
        </tr>
        `
    }
    document.getElementById("showData").innerHTML=show;

}

///////////Clear/////////////
function clear(){
    studentNameInput.value ="";
    studentMailInput.value ="";
    studentClassInput.value ="";
}



//////////Delete/////////////
function deleteStudent(index){
    studentGroup.splice(index,1);
    localStorage.setItem('student',JSON.stringify(studentGroup));
    displayStudents();
    
}


//////////Search By Name/////////////
function searchName(textName){
    let show ='';
    for(let i = 0; i < studentGroup.length ; i++){
        if(studentGroup[i].name.toLowerCase().startsWith(textName.toLowerCase())){
                show += 
            `
            <tr>
                <td>${studentGroup[i].name}</td>
                <td>${studentGroup[i].mail}</td>
                <td>${studentGroup[i].class}</td>
                <td><button id="update" onclick="UpdateStudent(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteStudent(${i})">Delete</button></td>
                
            </tr>
            `
        }  
    }
    document.getElementById("showData").innerHTML=show;
    
}

searchInputName.addEventListener('input',()=>{searchName(searchInputName.value)});


//////////Search By Class/////////////
function searchClass(textClass){
    let show ='';
    for(let i = 0; i < studentGroup.length ; i++){
        if(studentGroup[i].class.toLowerCase().startsWith(textClass.toLowerCase())){
                show += 
            `
            <tr>
                <td>${studentGroup[i].name}</td>
                <td>${studentGroup[i].mail}</td>
                <td>${studentGroup[i].class}</td>
                <td><button id="update" onclick="updateStudent(${i}))>Update</button></td>
                <td><button id="delete" onclick="deleteStudent(${i})">Delete</button></td>
                
            </tr>
            `
        }  
    }
    document.getElementById("showData").innerHTML=show;
    
}

searchInputClass.addEventListener('input',()=>{searchClass(searchInputClass.value)});

///////////////Update Data////////////
function updateStudent(index){
    globalIndex=index;
    studentNameInput.value =studentGroup[index].name;
    studentMailInput.value =studentGroup[index].mail;
    studentClassInput.value =studentGroup[index].class;

    document.getElementById("addStudent").innerHTML='Update Data';
    statusPage='update';
    

}
