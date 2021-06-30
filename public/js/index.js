var db = firebase.firestore();
var uid;
var role = "student";
var user = firebase.auth().currentUser;

var lform = document.getElementById('loginform');
var prform = document.getElementById('p_resetform');
var title = document.getElementById('title');
prform.style.display = "none";

function showprform(){
    lform.style.display = 'none';
    prform.style.display = 'block';
    title.innerHTML = "Password Reset";
}

function showlform(){
    lform.style.display = 'block';
    prform.style.display = 'none';
    title.innerHTML("Student Login");
}


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        var uid = user.uid;
        console.log("UID = "+uid);
        window.location = 'student_portal.html';
    };
});

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("Logging in");
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+errorMessage);
        console.log("Error");
    });
}

function resetpassword(){
    var email = document.getElementById("resetemail").value;
    firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    window.alert("Password reset link sent to your email!");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error "+errorCode+": "+errorMessage);
  });
}