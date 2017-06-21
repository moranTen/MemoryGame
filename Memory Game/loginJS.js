
$(document).ready(function () {


    if (localStorage.UserName != "" && localStorage.Password != "") {


        $("#mainLogin").css("display", "none");
        $("#memory--settings-modal").css("display", "block");
        $("#memory--end-game-modal").css("display", "block");
        $("#memory--app-container").css("display", "block");
        $(".memory--menu-bar").css("display", "block");
        $("#mainLogin").addClass(localStorage.UserName);
    }


    $("#loginBtn").click(function () {

        var userEmail = $("#user").val();
        var userPassword = $("#pass").val();

        var data = {
            "clicked": "login",
            "email": userEmail,
            "pass": userPassword,
        };
        $.ajax({
            url: "http://localhost:50196/connection.ashx",
            crossDomain: true,
            data: data,
            success: function (response) {
                console.log(response);
                if (response == "True") {
                    localStorage.UserName = $("#user")[0].value;
                    localStorage.Password = $("#pass")[0].value;
                    $("#mainLogin").addClass(localStorage.UserName);

                    $("#mainLogin").css("display", "none");
                    $("#memory--settings-modal").css("display", "block");
                    $("#memory--end-game-modal").css("display", "block");
                    $("#memory--app-container").css("display", "block");
                    $(".memory--menu-bar").css("display", "block");

                }
                else {
                    localStorage.UserName = "";
                    localStorage.Password = "";
                    $(".login-form .group .label").css("color", "red");
                    //
                }
            }
        }).done(function () {
            //console.log(localStorage.UserName);
            //console.log(localStorage.Password);
        });
    });

    $("#registerBtn").click(function(){
        var firstName = $(".userFirstName").val();
        var lastName = $(".userLastName").val();
        var password = $(".userPassword").val();
        var email = $(".userEmail").val();

        var data = {
            "clicked": "register",
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "pass": password,
        };

        $.ajax({
            url: "http://localhost:50196/connection.ashx",
            crossDomain: true,
            data: data,
            success: function (response) {
            }
        });

        $(".userFirstName").val("");
        $(".userLastName").val("");
        $(".userPassword").val("");
        $(".userEmail").val("");
    });

    $("#memory--settings-icon").click(function () {
        window.scoreTime.clearTime();
    });

    $("#LogOut").click(function () {
        $("#mainLogin").removeClass(localStorage.email);
        localStorage.UserName = "";
        localStorage.Password = "";

        $("#mainLogin").css("display", "block");
        $("#memory--settings-modal").css("display", "none");
        $("#memory--end-game-modal").css("display", "none");
        $("#memory--app-container").css("display", "none");
        $(".memory--menu-bar").css("display", "none");
        $(".login-form .group .label").css("color", "#aaa");
        $("#user")[0].value = "";
        $("#pass")[0].value = "";
    });

});
