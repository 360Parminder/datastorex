
document.getElementById("loginform").addEventListener("submit",(event)=>{
  event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
  if(user){
      location.replace("file.html")
  }
 else{
  
 }
  
})


function login(){
  const email = document.getElementById("email").value
  const password =document.getElementById("password").value

  firebase.auth().signInWithEmailAndPassword(email, password)
  .catch((error)=>{
    document.getElementById("error").innerHTML=error.message
  })


}

// login with gmail

function googlelogin(){
  var signInButton = document.getElementById('google');
signInButton.addEventListener('click', function() {
  // Create a Google provider instance
  var provider = new firebase.auth.GoogleAuthProvider();

  // Sign in with Google
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // Successful sign-in
      var user = result.user;
      console.log('Signed in as:', user.displayName);

      // to store the user name in local storage and send to next page
      const username= user.displayName; 
      localStorage.setItem('username', username);
      const userphoto=user.photoURL;
      console.log("user photo"+userphoto);
      localStorage.setItem('userphoto',userphoto);

    })
    .catch(function(error) {
      // Handle sign-in error
      console.error('Sign-in error:', error);
    });
});

}

// forgetpassword



// Get the currently signed-in user
function forgetpassword(){
var emailAddress=document.getElementById("email").value


if (emailAddress) {

  firebase.auth().sendPasswordResetEmail(emailAddress)
    .then(function() {
      document.getElementById("error").innerHTML="Check your Email"
    })
    .catch(function(error) {
      document.getElementById("error").innerHTML=error.message
    });
} else {
  // User is not signed in, handle accordingly
  document.getElementById("error").innerHTML="Enter your Email"
}
}