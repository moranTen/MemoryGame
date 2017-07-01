
$(document).ready(function (e) {
    $("#memory--settings-icon").click(function () {
        $("#winnerTable").empty();
        $("#winnerTable").append($("<tr><th>Email</th><th>Game Time</th><th>Game Score</th></tr>"));
        window.scoreTime.Winners();
    });
    window.scoreTime.Winners();
    window.scoreTime.time();
});

var id;

window.scoreTime = {
    time: function () {
        $(".startBtn").click(function () {
            var level = $("#memory--settings-grid")[0].value;
            if (level == "5x6") {
                var secs = 0;
                var min = 0;
                id = setInterval(function () {
                    secs++;
                    if (secs < 10 && min == 0) {
                        $(".timer")[0].children[0].textContent = ("Time : 00:0" + secs);
                    }
                    else if (secs < 60 && min == 0) {
                        $(".timer")[0].children[0].textContent = ("Time : 00:" + secs);
                    }
                    else if (secs == 60) {
                        secs = 0;
                        min++;
                        $(".timer")[0].children[0].textContent = ("Time : " + min + ":0" + secs);
                    }
                    else {
                        if (secs < 10)
                            $(".timer")[0].children[0].textContent = ("Time : " + min + ":0" + secs);
                        else
                            $(".timer")[0].children[0].textContent = ("Time : " + min + ":" + secs);
                    }
                    if (min == 60)
                        min = 0;
                    //console.log(secs);
                    //$(".timer")[0].children[0].textContent = ("Time : 00:0" + secs);
                }, 1000);

            }
            else          
                window.scoreTime.clearTime();
        });
    },
    clearTime: function (timeForScore, score) {
        var email = $("#mainLogin")[0].className.split(' ')[1];
        var data = {
            "clicked": "game",
            "email": email,
            "score": score,
            "time": timeForScore
        };

        $.ajax({
            url: "http://localhost:50196/connection.ashx",
            crossDomain: true,
            data: data,
            success: function (response) {
            }
        });


        clearInterval(id);
        $(".timer")[0].children[0].textContent = "";
    },
    Winners: function () {
        var i = 0;
        $.ajax({
            url: "http://localhost:50196/getWinners.ashx",
            crossDomain: true,
            success: function (response) {
                var s = response.split(' ');
                while (s.length - 1 > i) {
                    console.log(s[i]);
                    console.log(s[i + 1]);
                    console.log(s[i + 2]);
                    var tr = $("<tr><th>" + s[i] + "</th><th>" + s[i + 1] + "</th><th>" + s[i + 2] + "</th></tr>");
                    $("#winnerTable").append(tr);
                    i += 3;
                }

            }
        });
    }
}
