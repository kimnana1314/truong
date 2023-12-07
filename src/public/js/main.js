$(document).ready(function () {
    $("#btnLogin").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/log-in",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: $("form").serialize(),

            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length == 0 && data.Pass) {
                    var mes =
                        "{ Id:" +
                        "'" +
                        data.Id +
                        "'" +
                        ",Ref:" +
                        "'" +
                        data.Ref +
                        "'" +
                        "}";
                    localStorage.setItem("Key", mes);
                    var settings = {
                        url: "/orderAll",
                        method: "GET",

                        timeout: 0,
                        headers: {
                            Id: data.Id,
                            token: "",
                        },
                    };

                    $.ajax(settings).done(function (response) {
                        window.location.href = "/orderAll";
                    });
                } else {
                    $("#output").html("Email và tên đăng nhập không hợp lệ");
                }
            },
            error: function (xhr, status, error) {
                $("#output").html(xhr.responseText);
            },
        });
    });

    $("#Id_Exit").on("click", function (e) {
        localStorage.removeItem("Key");

        $.ajax({
            url: "/exit",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: null,
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#output").html(data.Mess);
                } else {
                    top.location.href = "/log-in";
                }
            },
            error: function (xhr, status, error) {
                $("#output").html(xhr.responseText);
            },
        });
        setTimeout(() => {
            window.location = "/";
        }, 2000);
    });
});
