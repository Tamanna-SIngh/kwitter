
//ADD YOUR FIREBASE LINKS

var firebaseConfig = {
  apiKey: "AIzaSyBt3VJaV7l_5DrkLPygHg48NQHdGTurV98",
  authDomain: "chatapp-689e4.firebaseapp.com",
  databaseURL: "https://chatapp-689e4.firebaseio.com",
  projectId: "chatapp-689e4",
  storageBucket: "chatapp-689e4.appspot.com",
  messagingSenderId: "205658792542",
  appId: "1:205658792542:web:782b0936244df3e0c24acf",
  measurementId: "G-8VQ5K24J3S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



user_name = localStorage.getItem("user_name");

document.getElementById("h3user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;
  localStorage.setItem("room_name", room_name);
  
// writing into the firebase database // create Main Folder
  firebase.database().ref("/").child(room_name).update({
    Kit : "creating kwitter"
  });

  window.location = "kwitter_page.html";
}

// read from the database
function getData() { 
  // on function for reading from database
  // set function for writing
  // The forEach() method calls a function once for each element in an array, in order.
  // ("/") = Root Folder
  // database events : when the value changes = 'value'
// snapshot is an array that holds the current values of the database
  firebase.database().ref("/").on('value', function(snapshot) {
      document.getElementById("output").innerHTML = ""; 
      
      snapshot.forEach(function(childSnapshot) { 
      childKey  = childSnapshot.key; // key represents the key of the snapshot array
      Room_names = childKey; // childkey holds all the roomnames/mainfolders
      
      //start code
       // room_names is an array
      console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id = " + Room_names + " onclick='redirectToRoomName(this.id)' > " + "#" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      // LHS += RHS
      // LHS = LHS + RHS
      // x +=4
      // x = x + 4
    });
  });

}

getData();



function redirectToRoomName(name) // the name of the room on which we click
{
  //console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location = "index.html";
}
