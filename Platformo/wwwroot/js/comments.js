"use strict";

$(function () {
    initSignalr();
    loadComments();

    $(document).on("click", "#comment-submit", function () {
        const comment = tinymce.get("comment-content").getContent();
        const gameId = $("#comment-submit").data("id");
        $.ajax({
            type: "POST",
            url: "/Game/CreateComment",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "GameId": gameId, "Comment": comment }),
            datatype: "json",
            success: function (data) {
                console.log(data)
            },
            error: function () {
                console.log("An error occured")
            }
        })
    })

    function loadComments() {
        const gameId = $("#comment-submit").data("id");
        $.ajax({
            type: "GET",
            url: "/Game/GetComments",
            contentType: "application/json; charset=utf-8",
            data: { "Id": gameId },
            datatype: "json",
            success: function (data) {
                $("#comments-container").html(data);
            },
            error: function () {
                console.log("An error occured")
            }
        })
    }

    function initSignalr() {
        var connection = new signalR.HubConnectionBuilder().withUrl("/CommentHub").build();

        connection.on("Update", function () {
            loadComments();
        });

        connection.start();
    }
})