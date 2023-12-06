"use strict";

$(function () {
    $(document).on("click", "#comment-submit", function () {
        const comment = $("#comment-content").val();
        const gameId = $("#comment-submit").data("id");
        alert(gameId);
        $.ajax({
            type: "POST",
            url: "/Game/CreateComment",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "GameId": gameId, "Comment": comment }),
            datatype: "json",
            success: function (data) {
                console.log(data)
                alert(data)
            },
            error: function () {
                console.log("An error occured")
            }
        })
    })
})