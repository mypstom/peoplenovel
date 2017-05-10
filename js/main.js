// Initialize Firebase
var config = {
    apiKey: "AIzaSyAYY4zpSHoLaaYQemMZOOwBIPymLmhrfcU",
    authDomain: "peoplenovel.firebaseapp.com",
    databaseURL: "https://peoplenovel.firebaseio.com",
    projectId: "peoplenovel",
    storageBucket: "peoplenovel.appspot.com",
    messagingSenderId: "236617768056"
};
firebase.initializeApp(config);
var database = firebase.database();
var d = new Date()
    //var ref = firebase.database().ref().child(d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString());
var ref = firebase.database().ref().child("/test");

var role = 0;

$(document).ready(function() {

    ref.once('value', function(snap) {
        //init data
        $(".text-container").html("");
        snap.forEach(function(element) {

            if (element.val().role == 0) {
                $(".text-container").append("<div class='boy-title'>" + $(".boy").text() + "</div> ： " + element.val().text + "</br>");
            } else {
                $(".text-container").append("<div class='girl-title'>" + $(".girl").text() + "</div> ： " + element.val().text + "</br>");
            }
            $(".text-container").scrollLeft(0);
        });

    });

    ref.on('child_added', function(element) {
        if (element.val().role == 0) {
            $(".text-container").append("<div class='boy-title'>" + $(".boy").text() + "</div> ： " + element.val().text + "</br>");
        } else {
            $(".text-container").append("<div class='girl-title'>" + $(".girl").text() + "</div> ： " + element.val().text + "</br>");
        }
        $(".text-container").scrollLeft(0);
    });

    $(".start-panel ").click(function() {
        $(".main-view").fadeToggle();
        $(this).hide();
    });

    $(".input-area .select-role").on("click", function() {
        $(".girl").toggle();
        $(".boy").toggle();
        role == 0 ? role = 1 : role = 0;
    });

    $(".sent-text").on("click", function() {
        if ($(".input").val().length > 0) {
            if (role == 0) {
                // $(".text-container").append("<div class='boy-title'>" + $(".boy").text() + "</div> ： " + $(".input").val() + "</br>");
                ref.push({ role: 0, text: $(".input").val(), time: new Date().getTime() });
                $(".input").val("");
            } else {
                // $(".text-container").append("<div class='girl-title'>" + $(".girl").text() + "</div> ： " + $(".input").val() + "</br>");
                ref.push({ role: 1, text: $(".input").val(), time: new Date().getTime() });
                $(".input").val("");
            }
        }
    });
});