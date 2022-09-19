//YOUR FIRE BASE LINKS
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
	room_name = localStorage.getItem("room_name");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({ 
    // create 3 keys inside the room_name
    name:user_name,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}

function getData() { 
  firebase.database().ref("/"+room_name).on('value', function(snapshot) { 
  document.getElementById("output").innerHTML = ""; 
  snapshot.forEach(function(childSnapshot) { 
    childKey  = childSnapshot.key; 
    childData = childSnapshot.val(); 
    if(childKey != "Ralph") 
    {
         firebase_message_id = childKey; 
         message_data = childData; 
         // childKey = unique msd id i.e. subfolders
         // childData = is an object of all 3 key-value pairs
//Start code
         console.log(firebase_message_id);
         console.log(message_data);
          // extract all 3 values
	       name_user_value = message_data['name'];
	       message_value = message_data['message']; // returns the value associated with key
         like_value = message_data['like'];

name_with_tag = "<h4> " + name_user_value + "<img class='user_tick' src='tick.png'> </h4>";
message_with_tag = "<h4 class='message_h4'>" + message_value + "</h4>";
like_button ="<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like_value + " onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: "+ like_value + "</span></button>" + "<hr>";

 // <button><span></span></button>

        row = name_with_tag + message_with_tag +like_button + span_with_tag;       
        document.getElementById("output").innerHTML += row;
        // x += 9
        // x = x + 9
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
  console.log("clicked on like button and msg id - " + message_id);
//	button_id = message_id;
  old_likes = document.getElementById(message_id).value; // pick up value option from the like button
  // 24 (number)  "24" (string)
  // Number("24") = 24
  // the returned likes has the data type String. 
  // We need to convert String into Number() 
	updated_likes = Number(old_likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(message_id).update({
		like : updated_likes  
	 });

}

function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location.replace("index.html");
//replace() removes the URL of the current document from the document history, 
//meaning that it is not possible to use the "back" button to navigate back 
//to the original document.
}
