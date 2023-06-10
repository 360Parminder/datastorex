

function mobile(){
  let mobile=document.getElementById("mobile");
  if (mobile) {
    var display = mobile.style.display;
    if (display == "none") {
      mobile.style.display = "block";
    }
    else {
      mobile.style.display = "none";
    }
  }
}






//comeback message for tab bar
let docTitle = document.title;
window.addEventListener("blur",()=>{
  document.title="Come back :(";

})
window.addEventListener("focus",()=>{
  document.title=docTitle;
})