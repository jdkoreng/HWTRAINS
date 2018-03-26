var trainName = '';
var destination = '';
var frequency = '';
var nextArrival = '';
var firstTrainTime = '';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDjH8Te_c9hf6wsFVx4IAUhi343VIH6kR8",
    authDomain: "example1-c54cb.firebaseapp.com",
    databaseURL: "https://example1-c54cb.firebaseio.com",
    projectId: "example1-c54cb",
    storageBucket: "example1-c54cb.appspot.com",
    messagingSenderId: "979446409933"
  };
  firebase.initializeApp(config);
var database = firebase.database();

 // Assumptions
 var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
$("#submit").on("click", function(event) {

trainName = $("#train-name").val().trim();
destination = $("#destination").val().trim();
firstTrainTime = $("#first-train-time").val().trim();
frequency = $("#frequency").val().trim();

  // Prevent form from submitting
  event.preventDefault();
  // Get the input values
    //make values in database
    database.ref().push({

trainName: trainName,
destination: destination,
firstTrainTime: firstTrainTime,
frequency: frequency,


 
    });

    alert("Train Added!");

$("#train-name").val('');
$("#destination").val('');
$("#first-train-time").val('');
$("#frequency").val('');   

});




database.ref().on("child_added", function(childSnapshot) {

    var tFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().firstTrainTime;
    var firstTimeConvert = moment(firstTime, "HH:mm").subtract(1,"years");

    //difference between current time and time train first left (in minutes)
    var difTime = moment().diff(moment(firstTimeConvert), "minutes");
    //divide the time since the train first left by the train frequency and the remainder (means you have gone x amount of minutes into the current trip)
    var tRemainder = difTime % tFrequency;
    console.log(tRemainder);
    console.log(tFrequency);
    console.log(difTime);
    console.log(firstTimeConvert);
    console.log('tRemainder' + tRemainder);



    var minutesAway = (tFrequency - tRemainder);

    var nextArrival = moment().add(minutesAway, "minutes").format("HH: mm");
    console.log(nextArrival);

     console.log('Train Name is: ' + childSnapshot.val().trainName);
     console.log('Destination is: ' + childSnapshot.val().destination);
     console.log('First Train Time is: ' + childSnapshot.val().firstTrainTime);
     console.log('Runs at a Frequency of: ' + childSnapshot.val().frequency);

     $("#main-table").append(`
     <tr>
             <td>${childSnapshot.val().trainName}</td>
             <td>${childSnapshot.val().destination}</td> 
             <td>${childSnapshot.val().frequency}</td> 
             <td>${nextArrival}</td> 
             <td>${minutesAway}</td> 
             
            
            
             
            
     </tr> 
     `);

  
    //  <td>${childSnapshot.val().firstTrainTime}</td> 

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);

//     var currentDate = moment().format("MM DD YY");
//     console.log("current date " + currentDate);
//    var startDateFormat = (moment(startdate).format("MM DD YY"))
   
//    console.log("start date " + startDateFormat);
   
//    // console.log(currentDate-startDateFormat);
//    var monthsWorked = moment(currentDate).diff(startDateFormat, "months");
   
//    console.log("difference in months: " + moment(currentDate).diff(startDateFormat, "months"));
   

   
   
   
//    // Log everything that's coming out of snapshot
//        console.log(childSnapshot.val().name)
//        $("#main-table").append(`<
//            <tr>
//                    <td>${childSnapshot.val().name}</td>
//                    <td>${childSnapshot.val().role}</td> 
//                    <td>${childSnapshot.val().startdate}</td> 
//                    <td>${childSnapshot.val().mrate}</td> 
//                    <td>${monthsWorked}</td> 
                   
//            </tr>
//            `);
//        // Change the HTML to reflect
//        // Handle the errors
//        }, function(errorObject) {
//        console.log("Errors handled: " + errorObject.code);
   });



