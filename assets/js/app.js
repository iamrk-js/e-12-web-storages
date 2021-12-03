let cl = console.log;

let studentForm = document.getElementById("studentForm");
let stdInfo = document.getElementById("stdInfo");

let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let submit = document.getElementById("submit");
let Update = document.getElementById("Update");
let deleteStd = document.getElementById("deleteStd");

const onEditStdInfo = (ele) => {
    submit.style.display = "none";
    Update.style.display = "block";
    // console.log("Edited !!!", ele);
    let getId = ele.getAttribute('data-id');
    localStorage.setItem("stdId", getId)
    cl(getId);
    let localData = retriveLocalData();
    // let getObj = localData.filter((std) => {
    //     return std.id === getId
    // });
    let getObj = localData.find((std) => {
        return std.id === getId
    });
    cl(getObj);
    fname.value = getObj.fname;
    lname.value = getObj.lname;
    email.value = getObj.email;
    contact.value = getObj.contact;
}

const onDeleteStdInfo = () => {
    let getId =localStorage.getItem("stdId");
    cl(getId);
    let localData = retriveLocalData();
    let newLocalData = localData.filter((obj) => {
        return obj.id !== getId
    })
    cl(newLocalData);
    
    localStorage.setItem("localStudentInfo", JSON.stringify(newLocalData))
    $('#exampleModal').modal('hide');
    templatingStd(newLocalData)
}
const templatingStd = (arr) => {
        let template = '';
        arr.forEach((std) => {
            template += `
                <tr>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td>
                         <button class="btn btn-primary" data-id="${std.id}" onclick="onEditStdInfo(this)">
                            Edit
                         </button>   
                    </td>
                    <td>
                         <button class="btn btn-danger"  data-id="${std.id}"  onclick="modalHandler(this)">Delete</button>
                    </td>
                </tr>
        `
        });
        stdInfo.innerHTML = template;
}
const onStudentFormSubmit = (event) => {
    event.preventDefault();
    let studentInfoArray = [];
    if (localStorage.getItem("localStudentInfo")) {
        studentInfoArray = retriveLocalData()
    }
    let stdObj = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        contact: contact.value,
        id: uuid(),
    }
    studentInfoArray.push(stdObj);
    localStorage.setItem("localStudentInfo", JSON.stringify(studentInfoArray))
    cl(studentInfoArray);
    // studentForm.reset();
    templatingStd(studentInfoArray);
    event.target.reset()
}

const onUpdateStudent = () => {
    cl("Updated Student !!!");

    let getId = localStorage.getItem("stdId");
    let localData = retriveLocalData();
    localData.forEach((obj) => {
        if (obj.id === getId) {
            obj.fname = fname.value;
            obj.lname = lname.value;
            obj.email = email.value;
            obj.contact = contact.value;
        }
    })
    cl(localData);
    templatingStd(localData)
    localStorage.setItem("localStudentInfo", JSON.stringify(localData))
    localStorage.removeItem("stdId");
    studentForm.reset();
    submit.style.display = "block";
    Update.style.display = "none";
}
studentForm.addEventListener("submit", onStudentFormSubmit);
Update.addEventListener("click", onUpdateStudent)
deleteStd.addEventListener("click", onDeleteStdInfo)
if (localStorage.getItem("localStudentInfo")) {
    cl("Local Storage Checked")
    studentInfoArray = retriveLocalData();
    templatingStd(studentInfoArray);
}

function retriveLocalData() {
    return JSON.parse(localStorage.getItem("localStudentInfo"))
}


function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function modalHandler(ele) {
    let getId = ele.getAttribute('data-id');
    localStorage.setItem("stdId", getId)
    $('#exampleModal').modal();
    
}