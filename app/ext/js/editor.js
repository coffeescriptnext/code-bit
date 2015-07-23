var editor =
    {
        save: function() {
            var html    = $(".html-editor").val(),
                css     = $(".css-editor").val(),
                js      = $(".js-editor").val(),
                bitName = $(".open-bit").html(),
                bit     =
                    {
                        name: bitName,
                        html: html,
                        css: css,
                        js: js
                    },
                bits    = JSON.parse(localStorage.getItem("bits")) || {};
            if (bits.projects == undefined) bits.projects = {};
            bits.projects[bitName] = bit;
            if (bits.manifest == undefined) bits.manifest = [];
            bits.manifest.push(bitName);
            bits = JSON.stringify(bits);
            localStorage.setItem("bits", bits);
        },

        load: function() {
            var bitName = $(".open-bit").html(),
                bits    = JSON.parse(localStorage.getItem("bits")),
                bitInfo = bits.projects[bitName];
            try {
                $(".html-editor").val(bitInfo.html);
                $(".css-editor").val(bitInfo.css);
                $(".js-editor").val(bitInfo.js);
            } catch (TypeError) {
                alert("No such files");
            }
        },

        preview: function() {
            localStorage.setItem("preview", $(".open-bit").html());
            window.open("preview.html", "_blank");
        },

        tidy: function(editor) {
            var code;
            if (editor == 1) {
                code = $(".html-editor").val();
                code = $.htmlClean(code, {format: true});
            }
        }
    }

$(document).ready(function() {
    $(document).delegate('.code-editor', 'keydown', function(e) {
        var keyCode = e.which;

        if (keyCode == 9) {
            e.preventDefault();
            var start = $(this).get(0).selectionStart;
            var end = $(this).get(0).selectionEnd;
            var spaces;
            // set textarea value to: text before caret + tab + text after caret
            spaces = "    ";
            $(this).val($(this).val().substring(0, start)
                + spaces
                + $(this).val().substring(end));

            // put caret at right position again
            $(this).get(0).selectionStart =
            $(this).get(0).selectionEnd = start + spaces.length;
        }
    });

    $(".code-editor").change(function() { editor.save() });
});
