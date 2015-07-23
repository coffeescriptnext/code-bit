$(document).ready(function() {
    $(".file-menu").change(function() {
        if (this.value == "save-bit") {
            var name;
            if ($(".open-bit").html() != "") {
                name = $(".open-bit").html();
            } else {
                name = prompt("Save As");
            }

            $(".open-bit").html(name);
            editor.save();
        } else if (this.value == "open-bit") {
            var name = prompt("Open");
            $(".open-bit").html(name);
            editor.load();
        } else if (this.value == "preview") {
            editor.preview();
        }
    });
    
    $(".edit-menu").change(function() {
        if (this.value == "tidy") {
            window.open("http://www.dirtymarkup.com/", "_blank");
        }
    });

    $(".global-dropdown").change(function() {
        $(".default-menu").attr("selected", "true");
    });
});
