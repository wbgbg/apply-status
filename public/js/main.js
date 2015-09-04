$(document).ready(function() {

    function refresh() {
        $(".recordList").remove();
        $.getJSON("/json/record.json", function(result) {
            for (var i = 0; i < result.list.length; i++) {
                var node = "<tr class = \"recordList\"><th>" + result.list[i].company + "</th><th>" + result.list[i].position + "</th><th>" + result.list[i].status + "</th><th>" + result.list[i].comment + "</th>" + "<th><button type=\"button\" class=\"btn btn-primary\"> <span class=\"glyphicon glyphicon-wrench\" aria-hidden=\"true\"> </span> modify </button> &nbsp;" + "<button type=\"button\" id=\"" + i + "\" class=\"btn btn-danger deleteList" + "\"> <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"> </span> delete </button></th></tr>";
                $("table").append(node);
            }
        });
    }

    $("table").on("click", ".deleteList",function() {
        console.log("hi");
        var $btn = $(this).button("loading");
        var id = $btn.attr("id");
        $.post("/delete", {"id": id}, function(data) {
        	refresh();
        })
        $btn.button("reset");
    });

    refresh();

    $(".addNew").on("click", function() {
        var $btn = $(this).button("loading");
        var nextData = {};
        nextData.company = $("input.company").val();
        nextData.position = $("input.position").val();
        nextData.status = $("input.status").val();
        nextData.comment = $("input.comment").val();
        console.log(nextData);
        $.post("/add", nextData, function(data) {
            refresh();
        });
        $("input").val("");
        $btn.button("reset");
    });


})