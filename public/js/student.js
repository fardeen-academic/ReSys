var db = firebase.firestore();
var uid;
var user = firebase.auth().currentUser;


var p = document.getElementById("profile");
var r = document.getElementById("result");
var c = document.getElementById("construction");
p.style.display = "block";
c.style.display = "none";
    

function profile(){
    p.style.display = "block";
    c.style.display = "none";
 
}
function result(){
    p.style.display = "none";
    c.style.display = "block";

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
