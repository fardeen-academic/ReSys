var db = firebase.firestore();
var uid;
const user = firebase.auth().currentUser;


var p = document.getElementById("profile");
var res = document.getElementById("result");
var c = document.getElementById("construction");
var reg = document.getElementById("registration");
firebase.auth().onAuthStateChanged(function(user){
  if(user){
      uid = user.uid;
      db.collection('student').doc(user.uid).get()
      .then(doc=>{
      sname = doc.data().Name;
      sid = doc.data().studentID;
      semail = user.email;
      document.getElementById("name").innerHTML = sname;
      document.getElementById("sid").innerHTML = sid;
      document.getElementById("sname").innerHTML = sname;
      document.getElementById("semail").innerHTML = semail;
      
      //document.getElementById("student_id").innerHTML = sid;
      });
  }
});
var pagetitle = document.getElementById("pagetitle")
p.style.display = "block";
c.style.display = "none";
reg.style.display = "none";
res.style.display="none";
var sname,sid;    

function profile(){
    p.style.display = "block";
    c.style.display = "none";
    reg.style.display = "none";
    res.style.display="none";
    document.getElementById("pagetitle").innerHTML = "Profile";
    document.getElementById("sid").innerHTML = sid;
    document.getElementById("sname").innerHTML = sname;
}

function registration(){
  reg.style.display = "block";
  p.style.display = "none";
  c.style.display = "none";
  res.style.display="none";
  document.getElementById("pagetitle").innerHTML = "Registration";
}

function result(){
    p.style.display = "none";
    res.style.display = "block";
    reg.style.display = "none";
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
        db.collection('student').doc(user.uid).get()
        .then(doc=>{
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
var csi123 = "Structured Programming Language"
var engl100 = "English Fundamentals"
var csi124 = "Structured Programming Language Sessional"	
var eee195 = "Electronics"	
var eee196 = "Electronics Sessional"	
var engl101 = "Composition"
var math113 = "Differential & Integral Calculus"
var cse133 = "Digital Logic Design"
var cse134 = "Digital Logic Design Sessional"
var csi221 = "Data Structure"
var csi222 = "Data Structure Sessional"
var engl102 = "Public Speaking"
var soc113 = "Bangladesh Studies"
var acct227 = "Accounting"
var cse213 = "Digital Electronics & Pulse Technique"
var cse214 = "Digital Electronics & Pulse Technique Sessional"
var math225 = "Coordinate Geometry & Vector Calculus"
var cse233 = "Computer Organization & Architecture"
var cse234 = "Computer Organization & Architecture Sessional"
var csi231 = "Algorithms"
var csi232 = "Algorithms Sessional"
var econ319 = "Economics"
var math237 = "Matrix & Differential Equation"
var csi223 = "Database Management System"
var csi315 = "Theory of Computing"
var cse335 = "Data Communication"
var csi421 = "Artificial Intelligence & Expert Systems"
var engl137 = "Technical Writing And Communication"
var cse415 = "Computer Networks"
var csi233 = "Advanced Programming"
var csi323 = "System Analysis & Design"
var math319 = "Fourier Analysis & Laplace Transformation"
var math337 = "Mathematical Analysis for Computer Science"
var csi313 = "Operating System"
var csi314 = "Operating System Sessional"
var csi331 = "Software Engineering"
var csi332 = "Software Engineering Sessional"
var csi483 = "Machine Learning"
var math327 = "Numerical Methods"
var cse327 = "Microprocessor and Interfacing"

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
  var scode = [sub_code.slice(0, -3), " ", sub_code.slice(-3)].join('').toUpperCase();
  return scode;
}
function get_gpa(n){
  gpa=0;
  grade="";
  if(n>=80){
    gpa=4.0;
    grade = "A+";
  }else if(n>=75){
    gpa=3.75;
    grade="A";
  }else if(n>=70){
    gpa=3.50;
    grade="A-";
  }else if(n>=65){
    gpa=3.25;
    grade="B+";
  }else if(n>=60){
    gpa=3.0;
    grade="B";
  }else if(n>=55){
    gpa=2.75;
    grade="B-";
  }else if(n>=50){
    gpa=2.50;
    grade="C";
  }else if(n>=45){
    gpa=2.25;
    grade="D";
  }else if(n>=40){
    gpa=2.0;
    grade="E";
  }else if(n<40){
    gpa=0;
    grade="F";
  }
  return [gpa,grade];
}

function renderresult(doc){
  document.getElementById('s1').innerHTML = sub_code(doc.s1);
  document.getElementById('subn1').innerHTML = eval(doc.s1);
  document.getElementById('num1').innerHTML = doc.r1;
  let gpa=get_gpa(doc.r1)
  document.getElementById('gpa1').innerHTML = gpa[0];
  document.getElementById('grade1').innerHTML = gpa[1];
  
  document.getElementById('s2').innerHTML = sub_code(doc.s2);
  document.getElementById('subn2').innerHTML = eval(doc.s2);
  document.getElementById('num2').innerHTML = doc.r2;
  gpa=get_gpa(doc.r2)
  document.getElementById('gpa2').innerHTML = gpa[0];
  document.getElementById('grade2').innerHTML = gpa[1];
  
  document.getElementById('s3').innerHTML = sub_code(doc.s3);
  document.getElementById('subn3').innerHTML = eval(doc.s3);
  document.getElementById('num3').innerHTML = doc.r3;
  gpa=get_gpa(doc.r3)
  document.getElementById('gpa3').innerHTML = gpa[0];
  document.getElementById('grade3').innerHTML = gpa[1];
  
  document.getElementById('s4').innerHTML = sub_code(doc.s4);
  document.getElementById('subn4').innerHTML = eval(doc.s4);
  document.getElementById('num4').innerHTML = doc.r4;
  gpa=get_gpa(doc.r4)
  document.getElementById('gpa4').innerHTML = gpa[0];
  document.getElementById('grade4').innerHTML = gpa[1];
  
  document.getElementById('s5').innerHTML = sub_code(doc.s5);
  document.getElementById('subn5').innerHTML = eval(doc.s5);
  document.getElementById('num5').innerHTML = doc.r5;
  gpa=get_gpa(doc.r5)
  document.getElementById('gpa5').innerHTML = gpa[0];
  document.getElementById('grade5').innerHTML = gpa[1];
  
}

const resultform = document.querySelector('#resultform');
resultform.addEventListener('submit',(e)=>{
  e.preventDefault();
  const semester = resultform.semesternum.value;
  document.getElementById('semester').innerHTML = semester+" Semester";
  db.collection('student').doc(uid).collection('result').doc(semester).get()
      .then(doc=>{
        console.log(doc.data());
      renderresult(doc.data());
      }).catch((error) => {
        console.error("Error: ", error);
    });
    resultform.reset();
    });
    