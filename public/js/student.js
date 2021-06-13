var db = firebase.firestore();
var uid;
var user = firebase.auth().currentUser;


var p = document.getElementById("profile");
var r = document.getElementById("result");
var c = document.getElementById("construction");
var pagetitle = document.getElementById("pagetitle")
p.style.display = "block";
c.style.display = "none";
    

function profile(){
    p.style.display = "block";
    c.style.display = "none";
    document.getElementById("pagetitle").innerHTML = "Profile";
 
}
function result(){
    p.style.display = "none";
    c.style.display = "block";
    document.getElementById("pagetitle").innerHTML = "Result";

}

var header = document.getElementById("menu");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        uid = user.uid;
        console.log(uid);
        db.collection('student').doc(user.uid).get()
        .then(doc=>{
        console.log(doc.data().Name);
        var name = doc.data().Name;
        var sid = doc.data().studentID;
        document.getElementById("name").innerHTML = name;
        document.getElementById("student_id").innerHTML = sid;
        });
    }
});


var docRef = db.collection("student").doc(uid).get()

function logout(){
    console.log("logout");
    firebase.auth().signOut().then(() => {
        window.location = '/?logout=true';
        console.log("Logged out");
      }).catch((error) => {
        console.log("Error logging out");
      });
}
