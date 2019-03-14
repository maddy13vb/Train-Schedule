// Initialize Firebase
var config = {
    apiKey: "AIzaSyA7LTCQIAKOl4O9xNbATojK1PB5BUkSFCw",
    authDomain: "train-schedule-8c2b3.firebaseapp.com",
    databaseURL: "https://train-schedule-8c2b3.firebaseio.com",
    projectId: "train-schedule-8c2b3",
    storageBucket: "train-schedule-8c2b3.appspot.com",
    messagingSenderId: "404250341627"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submit").on("click", function () {
    event.preventDefault();
    var newTrain = $("#newTrainInput").val().trim();
    console.log(newTrain);
    var destination = $("#destinationInput").val().trim();
    console.log(destination);
    var firstTrainTime = moment($("#firstTrainTimeInput").val().trim(), "HH:mm").format("HH:mm");
    console.log(firstTrainTime);
    var frequency = $("#frequencyInput").val().trim();
    console.log(frequency);

    var newTrain = {
        name: newTrain,
        location: destination,
        firsttrain: firstTrainTime,
        frequencyOfTrains: frequency
    }
    database.ref().push(newTrain);
    console.log(newTrain.name);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTimeInput").val("");
    $("#frequencyOfTrainsInput").val("");

    return false;
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var newTrain = childSnapshot.val().name;
    var destination = childSnapshot.val().location;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequencyOfTrains;

    var trainFrequency = 5;
    var firstTrainArriving = "00:00";

    var initialTimeConvert = moment(firstTrainArriving, "HH:mm").subtract(1, "years");
    console.log(initialTimeConvert);

    var currentTime = moment();
    console.log("Current Time is: " + moment(currentTime).format("hh:mm"));

    var timeDifference = moment().diff(moment(initialTimeConvert), "minutes");
    console.log("Difference in Time is: " + timeDifference);

    var timeApart = timeDifference % trainFrequency;
    console.log(timeApart);


    var minutesUntilTrain = trainFrequency - timeApart;
    console.log("Minutes until Train: " + minutesUntilTrain);


    var nextTrain = moment().add(minutesUntilTrain, "minutes");
    console.log("Arrival Time is: " + moment(nextTrain).format("hh:mm"))
    // alert("Arrival Time is: " + moment(nextTrain).format("hh:mm")
    $(".trainTimes").append("<tr><td>" + newTrain + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td><td>" + minutesUntilTrain + "</td></tr>");
});
