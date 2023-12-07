$(document).ready(function () {
    let Status = $("#Status").val();
    if (Status === "0") {
        $("#btn_success").attr("hidden", true);
        $("#btn_Recover").attr("hidden", true);
    } else if (Status === "1") {
        $("#btn_delivery").attr("hidden", true);
        $("#btn_Recover").attr("hidden", true);
    } else if (Status === "2") {
        $("#btn_success").attr("hidden", true);
        $("#btn_Recover").attr("hidden", true);
        $("#btn_delivery").attr("hidden", true);
    } else {
        $("#btn_delivery").attr("hidden", true);
        $("#btn_success").attr("hidden", true);
        $("#btn_Delete").attr("hidden", true);
    }
    $("#btn_delivery").on("click", function (e) {
        e.preventDefault();
        $("#email_err").html(``);
        if ($("#Ascendant").val().trim().length === 0) {
            $("#email_err").html(`Phải nhập tên người nhận`);
            return;
        }
        if ($("#Adress").val().length === 0) {
            $("#email_err").html(`Phải nhập địa chỉ người nhận`);
            return;
        }
        if ($("#Phone").val().length === 0) {
            $("#email_err").html(`Phải nhập số điện thoại người nhận`);
            return;
        }
        if ($("#Deliver").val().length === 0) {
            $("#email_err").html(`Phải nhập tên người giao`);
            return;
        }
        if ($("#Phone_Del").val().length === 0) {
            $("#email_err").html(`Phải nhập số điện thoại người giao`);
            return;
        }
        let idx = location.href.lastIndexOf("/");
        let url = location.href.substring(0, idx) + "/delivery";
        let settings = {
            data: $("form").serialize(),
            method: "PUT",
            statusCode: {},
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#email_err").html(data.Mess);
                } else {
                    window.location.href = "/OrderAll";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#email_err").html(jqXHR.responseText);
            },
        };
        $.ajax(url, settings);
    });
    $("#btn_success").on("click", function (e) {
        e.preventDefault();
        $("#email_err").html(``);
        if ($("#Ascendant").val().trim().length === 0) {
            $("#email_err").html(`Phải nhập tên người nhận`);
            return;
        }
        if ($("#Adress").val().length === 0) {
            $("#email_err").html(`Phải nhập địa chỉ người nhận`);
            return;
        }
        if ($("#Phone").val().length === 0) {
            $("#email_err").html(`Phải nhập số điện thoại người nhận`);
            return;
        }
        if ($("#Deliver").val().length === 0) {
            $("#email_err").html(`Phải nhập tên người giao`);
            return;
        }
        if ($("#Phone_Del").val().length === 0) {
            $("#email_err").html(`Phải nhập số điện thoại người giao`);
            return;
        }
        let idx = location.href.lastIndexOf("/");
        let url = location.href.substring(0, idx) + "/success";
        let settings = {
            data: $("form").serialize(),
            method: "PUT",
            statusCode: {},
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#email_err").html(data.Mess);
                } else {
                    window.location.href = "/OrderAll";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#email_err").html(jqXHR.responseText);
            },
        };
        $.ajax(url, settings);
    });

    $("#btn_Delete").on("click", function (e) {
        e.preventDefault();
        $("#email_err").html(``);

        let idx = location.href.lastIndexOf("/");
        let url = location.href.substring(0, idx) + "/Delete";
        let settings = {
            data: $("form").serialize(),
            method: "PUT",
            statusCode: {},
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#email_err").html(data.Mess);
                } else {
                    window.location.href = "/OrderAll";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#email_err").html(jqXHR.responseText);
            },
        };
        $.ajax(url, settings);
    });
    $("#btn_Recover").on("click", function (e) {
        e.preventDefault();
        $("#email_err").html(``);
        let idx = location.href.lastIndexOf("/");
        let url = location.href.substring(0, idx) + "/Recover";
        let settings = {
            data: $("form").serialize(),
            method: "PUT",
            statusCode: {},
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#email_err").html(data.Mess);
                } else {
                    window.location.href = "/OrderAll";
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("#email_err").html(jqXHR.responseText);
            },
        };
        $.ajax(url, settings);
    });
});
