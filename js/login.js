// alert("fe")
const form = document.getElementById("form")
const User = document.getElementById("User-name");
const password = document.getElementById("password")
let notes = localStorage.getItem("notes");
let name = "ncc";

// export default {name}

let data;
if(notes == null){
   data = []
}else{
  data= JSON.parse(notes)
}
form.addEventListener("submit",(e)=>{
    
   if( validPlayer() === true){
    // alert("pppp")
   }else{
    alert("please enter correct userName or password")
    e.preventDefault()
   }
    
})
function validPlayer() {
let result = false;
data.forEach((element,index) => {
    if(data[index].user === User.value && data[index].password === password.value){
        result=true;
    }
   
})
return result
}


// console.log(data[0].Name)
// const minute = 1000 * 60;
// const hour = minute * 60;
// const day = hour * 24;
// const year = day * 365;
// console.log(Math.round(Date.now()/year))