var userUID;
var user;
// for switch to login page
firebase.auth().onAuthStateChanged((user) => {
  if (user) { userUID = user.uid }
  if (!user) {
    location.replace("index.html");
  }
})

// to show logout btn
function down() {
  var drop_down = document.getElementById("drop_down");
  if (drop_down) {
    var display = drop_down.style.display;
    if (display == "none") {
      drop_down.style.display = "block";
    }
    else {
      drop_down.style.display = "none";
    }
  }
}
//  for logout
function logout() {
  firebase.auth().signOut()
  localStorage.clear();
}


// to upload files to storage
var file;

if(file=null){
  var click = document.getElementById("click");
  click.style.display="none";
}
function upload() {

  
  // Get the file input element
  var fileInput = document.getElementById("fileInput");

  // Get the file
  file = fileInput.files[0];
  // if user is not select any file
 

  if (file == null) {
    var nofile = document.getElementById("error");
    nofile.textContent = "Plz select a file";
  }
  // Get the currently signed-in user
  user = firebase.auth().currentUser;

  if (user) {
    console.log("user" + user);
    // Create a storage reference with the user's UID
    var storageRef = firebase.storage().ref().child('files/');

    // Set the path and name of the file
    var filePath = userUID + '/' + file.name;

    // Upload the file
    storageRef.child(filePath).put(file)
      .then(function (snapshot) {
        alert("File uploaded successfully");
        console.log('File uploaded successfully');
        // Perform further actions if needed
      })
      
      .catch(function (error) {
        console.error('Error uploading file:', error);
      });
      file.clear();

  } else {
    // User is not signed in, handle accordingly
    console.log('User is not signed in');
  }
}

// to download the client files

function myfile() {
 
  // Get the currently signed-in user
  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in, get their UID
    var userUID = user.uid;

    // Create a storage reference with the user's UID
    var storageRef = firebase.storage().ref().child('files/' + userUID);

    // List all files under the user's UID
    storageRef.listAll()
      .then(function (result) {
        //to count the no of files
        var filecount=document.getElementById("filecount");
        var filelength = result.items.length;
        filecount.textContent=filelength;

        result.items.forEach(function (fileRef) {
          // Access the download URL for each file
         var listItem = document.createElement("li"); // Create a new <li> element
          var link = document.createElement("p"); // Create a new <a> element for the download link
          var download = document.createElement("a");// to download the file
          var copy =document.createElement("button");
          var emptydiv=document.createElement("div");
          listItem.className="list";
          download.className="download";
          download.textContent="Download";
          copy.className="copy";
          copy.textContent="Copy ";
          emptydiv.className="emptydiv";
             
          fileRef.getDownloadURL().then(function (downloadURL) {
            download.href = downloadURL; // Set the download URL
            link.textContent = fileRef.name; // Set the file name as the text content of the link
             // Add an onclick event listener to the copy button
            emptydiv.appendChild(download);
            emptydiv.appendChild(copy);
            listItem.appendChild(link);// Append the link to the <li> element
            listItem.appendChild(emptydiv);
            // listItem.appendChild(download); 
            // listItem.appendChild(copy);
            fileList.appendChild(listItem); // Append the <li> element to the <ul> element
            copy.addEventListener('click', function () {

              navigator.clipboard.writeText(downloadURL);
              alert('Link copied!');
             });
            
          })
          
            .catch(function (error) {
              console.error('Error getting download URL:', error);
            });
        });
      })
      .catch(function (error) {
        console.error('Error listing files:', error);
      });
  } else {
    // User is not signed in, handle accordingly
    console.log('User is not signed in');
  }
}
// to recive the user name from the last page to show on screen
var userphoto = localStorage.getItem("userphoto");
var usr = document.getElementById("usr");
usr.src = userphoto;

var username = localStorage.getItem('username');
var usernames = document.getElementById("usernames");
usernames.textContent = username;

var profilephoto = document.getElementById("profile");
profilephoto.src = userphoto;

if (username == null) {
  usernames.textContent = 'Welcome';
  usr.src = 'https://cdn.discordapp.com/attachments/868355076153028650/882283957004173322/images_3.jpeg';
  profilephoto.src = 'https://cdn.discordapp.com/attachments/868355076153028650/882283957004173322/images_3.jpeg';
}


// forget password
function forget(){
// Get the currently signed-in user
var user = firebase.auth().currentUser;

if (user) {
  var emailAddress = user.email;

  firebase.auth().sendPasswordResetEmail(emailAddress)
    .then(function() {
      error.textContent='Password reset email sent';
      // Handle success, such as displaying a notification to the user
    })
    .catch(function(error) {
      alert('Error sending password reset email:', error)
      console.error('Error sending password reset email:', error);
      // Handle error, such as displaying an error message to the user
    });
} else {
  alert('User is not signed in');
  // User is not signed in, handle accordingly
  console.log('User is not signed in');
}

}


