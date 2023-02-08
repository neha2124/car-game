// alert("hello")
const form = document.getElementById("form")
const Name = document.getElementById("name")
const userName = document.getElementById("User-name") 
const password = document.getElementById("password")
let notes = localStorage.getItem("notes");
let data;
if(notes == null){
   data = []
}else{
  data= JSON.parse(notes)
}
form.addEventListener("submit",(e)=>{
   
    validName()
    user()
    validPassword()
    if(validForm() === true){
        let obj={
            Name: Name.value,
            user:userName.value,
            password:password.value
        }
        data.push(obj)
        localStorage.setItem("notes",JSON.stringify(data))
    }else{
        e.preventDefault();
    }
   
})
function validForm (){
    const input = form.querySelectorAll(".input-group")
   let result = true
    input.forEach((cont) => {
        if(cont.classList.contains('error')){
            result= false;
        }

    })
    return result;
}

function  validName () {
    if(Name.value.trim() === ""){
        error(Name,"please enter your name ")
    }else if (Name.value.trim().length < 2){
        error(Name, "invalid name")
    }else{
        success(Name)
    }
}
function user(){
    if(userName.value.trim() == ""){
        error(userName,"please enter user name ")
    }else if (userName.value.trim().length < 2){
        error(userName, "invalid name")
    }else{
        success(userName)
    }
}
let validPassword = () => {
    let pass = /^[A-Za-z]\w{7,14}$/;
    if (password.value.match(pass)) {
        success(password)
    }

    else {
        error(password, 'weak password')
    }
}

function error (element,message){
    let parent = element.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove("success")
    }
    parent.classList.add('error')
    const para = parent.querySelector("span")
       para.textContent=message

}
function success (element){
    let parent = element.parentElement
    if(parent.classList.contains("error")){
        parent.classList.remove("error")
    }
    parent.classList.add("success")


}