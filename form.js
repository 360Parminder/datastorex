document.getElementById("form").addEventListener("submit",(event)=>{
    event.preventDefault()
  })
  


  function  signup(){

    const email =document.getElementById("email").value
    const pass =document.getElementById("password").value
    const repass=document.getElementById("confirmpass").value
    // const name = document.getElementById("name").value
    if(pass==repass){

    firebase.auth().createUserWithEmailAndPassword(email, pass)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
   
    alert("successfully sign up"+email);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("error"+errorMessage);
    console.log("error code: ",errorCode);
  });
}
else{
    alert("Password does not match with confirm password");
}

}


// for popup


// function popup(){
//    window.open("popup.html","","top=150,left=500,height=600,width=400,scrollbars=yes,resizable=no,");
// }