$("#submit").on("click", sendRequest);

function sendRequest(eve) {
    eve.preventDefault();

    if (
        $("input[name='User_Password']").val() !=
        $("input[name='User_PasswordConfirm']").val()
    ) {
        $("#output").addClass("form__mess--err");
        $("#output").html("Mật khẩu xác nhận chưa chính xác");
    } else {
        var url = "/dangky";
        var settings = {
            data: $("form").serialize(),
            method: "POST",
            statusCode: {},
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#output").addClass("form__mess--err");

                    $("#output").html(data.Mess);
                } else {
                    $("#output").removeClass("form__mess--err");
                    $("#output").html(
                        "Đăng ký tài khoản thành công vào hòm thư để active tài khoản!"
                    );
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#output").html(jqXHR.responseText);
            },
        };

        $.ajax(url, settings);
    }
}

$("#btnAcitive").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/xacthuc",
        type: "POST",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: $("form").serialize(),
        success: function (data, textStatus, jqXHR) {
            if (data.Mess.length > 0) {
                $("#output").html(data.Mess);
            } else {
                top.location.href = "/dangnhap"; //redirection
            }
        },
        error: function (xhr, status, error) {
            $("#output").html(xhr.responseText);
        },
    });
});

$("#btnLogin").on("click", function (e) {
    e.preventDefault();
    $.ajax({
        url: "/dangnhap",
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
                    url: "/",
                    method: "GET",
                    timeout: 0,
                    headers: {
                        Id: "1",
                        token: "óadsadksadhsjdhsjdhsjdAA",
                    },
                };

                $.ajax(settings).done(function (response) {
                    window.location.href = "/";
                });

                // $.ajax({
                //     url: "/trangchu",
                //     type: "GET",
                //     headers: { Authorization: localStorage.getItem("Key") },
                //     success: function (response) {
                //         // window.location.href = "/trangchu";
                //         document.write(response);
                //         //alert("Thanh công:", data);
                //     },
                //     error: function (xhr, status, error) {
                //         alert("Thất bại:", xhr);
                //     },
                // });
            } else {
                $("#output").html("Email và tên đăng nhập không hợp lệ");
            }
        },
        error: function (xhr, status, error) {
            $("#output").html(xhr.responseText);
        },
    });
});
