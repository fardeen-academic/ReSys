var db = firebase.firestore();
var uid;
const user = firebase.auth().currentUser;


var p = document.getElementById("profile");
var r = document.getElementById("result");
var c = document.getElementById("construction");
var reg = document.getElementById("registration");

var pagetitle = document.getElementById("pagetitle")
p.style.display = "block";
c.style.display = "none";
reg.style.display = "none";
var sname,sid;    

function profile(){
    p.style.display = "block";
    c.style.display = "none";
    reg.style.display = "none";
    document.getElementById("pagetitle").innerHTML = "Profile";
}

function registration(){
  reg.style.display = "block";
  p.style.display = "none";
  c.style.display = "none";
  document.getElementById("pagetitle").innerHTML = "Registration";
}

function result(){
    p.style.display = "none";
    c.style.display = "block";
    reg.style.display = "none"
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
        sname = doc.data().Name;
        sid = doc.data().studentID;
        document.getElementById("name").innerHTML = sname;
        //document.getElementById("student_id").innerHTML = sid;
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

var csi115 = "Computer and Programming Concept"
var csi116 = "Computer and Programming Concept Sessional"
var eee193 = "Electronics"
var math135 = "Discrete Math"
var phy217 = "Physics"

function subjectvalue(sub_code,n){
  if(sub_code!=null){
    scode= sub_code.replace(/\s/g, '');
    document.getElementById("sub"+n).innerHTML = eval(scode.toLowerCase());
  }
}
const reg_form = document.querySelector('#reg_form');
reg_form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const semester = reg_form.semester.value;
  db.collection('pending').doc(uid).set({
    semester: semester,
    sub_code1: reg_form.sc1.value.replace(/\s/g, '').toLowerCase(),
    sub_code2: reg_form.sc2.value.replace(/\s/g, '').toLowerCase(),
    sub_code3: reg_form.sc3.value.replace(/\s/g, '').toLowerCase(),
    sub_code4: reg_form.sc4.value.replace(/\s/g, '').toLowerCase(),
    sub_code5: reg_form.sc5.value.replace(/\s/g, '').toLowerCase(),
  }).then((docRef)=>{
    window.alert("Registration Request Submitted Successfully");
  }).catch((error) => {
    console.error("Error: ", error);
  });
  reg_form.reset();
})

function sub_code(sub_code){
  var position = -3;
  var scode = [sub_code.slice(0, -3), " ", sub_code.slice(-3)].join('').toUpperCase();
}
