// dang ky
$(document).ready(function () {
    let theme_main = localStorage.getItem("theme");
    if (theme_main) {
        $("#Id_main").attr("class", theme_main);
        if (theme_main === "dark") {
            $("#theme_st").attr("src", "./icons/toi.svg");
            $("#Id_gd").text("Bật giao diện sáng");
        } else {
            $("#theme_st").attr("src", "./icons/sang.svg");
            $("#Id_gd").text("Bật giao diện tối");
        }
    } else {
        $("#Id_main").removeAttr("class");
        $("#theme_st").attr("src", "./icons/sang.svg");
        $("#Id_gd").text("Bật giao diện tối");
    }

    $("#btn_dangky").on("click", function (e) {
        e.preventDefault();
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
    });

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
                            Id: data.Id,
                            token: "",
                        },
                    };

                    $.ajax(settings).done(function (response) {
                        window.location.href = "/";
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
    // sang pham

    $("#btn_love").on("click", function (e) {
        let img = $("#prod_imb_cb");
        let check_box = $("#img_checkbox");
        if (check_box.is(":checked")) {
            img.attr("src", "./icons/heart.svg");
            img.removeAttr("class");
            img.attr("class", "prod-act__icon-imge like-btn__icon icon");
        } else {
            img.attr("src", "./icons/heart_red.svg");
            img.removeAttr("class");
            img.attr("class", "prod-act__icon-imge like-btn__icon--liked");
        }
        check_box.attr("checked", !check_box.is(":checked"));
        let ArayItem_Id = location.href.split("/");
        let Item_Id = ArayItem_Id[ArayItem_Id.length - 1];
        let Love = check_box.is(":checked") ? 1 : 0;

        $.ajax({
            url: location.href,
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                Item_Id: Item_Id,
                Love: Love,
            },
            success: function (data, textStatus, jqXHR) {
                // alert("Thành công:", data);
            },
            error: function (xhr, status, error) {
                // alert("Thất bại:", status.responseText);
            },
        });
    });

    $("#preview_img1").on("click", function (e) {
        e.preventDefault();

        var img = $("#preview_img");
        var img1 = $("#preview_img1");
        var img2 = $("#preview_img2");
        var img3 = $("#preview_img3");
        var img4 = $("#preview_img4");
        img.attr("src", e.target.src);
        img1.removeAttr("class");
        img1.attr(
            "class",
            "prod-preview__list-img prod-preview__list--current"
        );
        img2.removeAttr("class");
        img2.attr("class", "prod-preview__list-img");
        img3.removeAttr("class");
        img3.attr("class", "prod-preview__list-img");
        img4.removeAttr("class");
        img4.attr("class", "prod-preview__list-img");
    });
    $("#preview_img2").on("click", function (e) {
        e.preventDefault();

        var img = $("#preview_img");
        var img1 = $("#preview_img1");
        var img2 = $("#preview_img2");
        var img3 = $("#preview_img3");
        var img4 = $("#preview_img4");
        img.attr("src", e.target.src);
        img1.removeAttr("class");
        img1.attr("class", "prod-preview__list-img");
        img2.removeAttr("class");
        img2.attr(
            "class",
            "prod-preview__list-img prod-preview__list--current"
        );
        img3.removeAttr("class");
        img3.attr("class", "prod-preview__list-img");
        img4.removeAttr("class");
        img4.attr("class", "prod-preview__list-img");
    });
    $("#preview_img3").on("click", function (e) {
        e.preventDefault();

        var img = $("#preview_img");
        var img1 = $("#preview_img1");
        var img2 = $("#preview_img2");
        var img3 = $("#preview_img3");
        var img4 = $("#preview_img4");
        img.attr("src", e.target.src);
        img1.removeAttr("class");
        img1.attr("class", "prod-preview__list-img");
        img2.removeAttr("class");
        img2.attr("class", "prod-preview__list-img");
        img3.removeAttr("class");
        img3.attr(
            "class",
            "prod-preview__list-img prod-preview__list--current"
        );
        img4.removeAttr("class");
        img4.attr("class", "prod-preview__list-img");
    });

    $("#preview_img4").on("click", function (e) {
        e.preventDefault();
        var img = $("#preview_img");
        var img1 = $("#preview_img1");
        var img2 = $("#preview_img2");
        var img3 = $("#preview_img3");
        var img4 = $("#preview_img4");
        img.attr("src", e.target.src);
        img1.removeAttr("class");
        img1.attr("class", "prod-preview__list-img");
        img2.removeAttr("class");
        img2.attr("class", "prod-preview__list-img");
        img3.removeAttr("class");
        img3.attr("class", "prod-preview__list-img");
        img4.removeAttr("class");
        img4.attr(
            "class",
            "prod-preview__list-img prod-preview__list--current"
        );
    });

    //btn_add_card
    $("#btn_add_card").on("click", function (e) {
        e.preventDefault();
        let ArayItem_Id = location.href.split("/");
        let Item_Id = ArayItem_Id[ArayItem_Id.length - 1];
        $.ajax({
            url: "/addcard",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: {
                Item_Id: Item_Id,
            },
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length == 0) {
                    createToast("success", "Thêm vào giỏ hàng thành công");
                } else {
                    createToast("warning", data.Mess);
                }
            },
            error: function (xhr, status, error) {
                createToast("error", xhr.responseText);
            },
        });
    });

    // getcard: Cart_html
    $("#btn_card_item_love").mouseover(function () {
        let Cart_html_love = $("input#Cart_html_love").val();

        if (Cart_html_love) {
            let cards_love = JSON.parse(Cart_html_love);
            let list_love = $("#html_card_Item_love");
            list_love.children().detach();
            $.each(cards_love, function (index, value) {
                let html = document.createElement("div");
                html.className = `col`;
                html.innerHTML = `<article class="cart-preview-item">
                <div
                    class="cart-preview-item__img-wrap"
                >
                    <img
                        src="${value.Img}"
                        alt=""
                        class="cart-preview-item__thubm"
                    />
                </div>

                <h3
                    class="cart-preview-item__title"
                >${value.Item_Name}</h3>
                <p
                    class="cart-preview-item__price"
                >${value.Price}</p>
            </article> `;

                document
                    .querySelector("#html_card_Item_love")
                    .appendChild(html);
            });
        }
    });

    $("#btn_card_item").mouseover(function () {
        let Cart_html = $("input#Cart_html").val();

        if (Cart_html) {
            let cards = JSON.parse(Cart_html);
            let list = $("#html_card_Item");
            list.children().detach();
            $.each(cards, function (index, value) {
                let html = document.createElement("div");
                html.className = `col`;
                html.innerHTML = `<article class="cart-preview-item">
                <div
                    class="cart-preview-item__img-wrap"
                >
                    <img
                        src="${value.Img}"
                        alt=""
                        class="cart-preview-item__thubm"
                    />
                </div>

                <h3
                    class="cart-preview-item__title"
                >${value.Item_Name}</h3>
                <p
                    class="cart-preview-item__price"
                >${value.Price}</p>
            </article> `;

                document.querySelector("#html_card_Item").appendChild(html);
            });
        }
    });

    //toast_mess

    const toasts = {
        success: {
            icon: '<img src="./icons/success.svg"  alt=""  class="toasts_img">',
        },
        error: {
            icon: '<img src="./icons/error.svg"  alt=""  class="toasts_img">',
        },
        warning: {
            icon: '<img src="./icons/warning.svg" alt=""    class="toasts_img">',
        },
    };

    function createToast(status, mes) {
        let toast = document.createElement("div");
        let myArray;
        if (mes.length == 0) {
            mes = "Lỗi khi thực hiện chức năng này!";
            myArray = mes.split(" ");
        } else {
            myArray = mes.split(" ");
        }

        let mess = "";
        if (myArray.length > 8) {
            for (var i = 0; i < 8; i++) {
                mess += myArray[i] + " ";
            }
            mess = mess + "...";
        } else {
            mess = mes;
        }

        toast.className = `toast ${status}`;

        toast.innerHTML = `
    ${toasts[status].icon}
    <span class="msg">${mess}</span>
    <span class="countdown"></span>
    `;

        document.querySelector("#toasts").appendChild(toast);

        setTimeout(() => {
            toast.style.animation = "hide_slide 1s ease forwards";
        }, 1000);
        setTimeout(() => {
            toast.remove();
        }, 2000);
    }

    //giao diện sáng tối
    $("#Id_theme").on("click", function (e) {
        let theme = localStorage.getItem("theme");

        if (theme) {
            if (theme === "dark") {
                $("#theme_st").attr("src", "./icons/sang.svg");
                $("#Id_gd").text("Bật giao diện tối");
                $("#Id_main").removeAttr("class");
                localStorage.setItem("theme", "light");
            } else {
                $("#theme_st").attr("src", "./icons/toi.svg");
                $("#Id_gd").text("Bật giao diện sáng");
                $("#Id_main").attr("class", "dark");
                localStorage.setItem("theme", "dark");
            }
        } else {
            $("#theme_st").attr("src", "./icons/toi.svg");
            $("#Id_gd").text("Bật giao diện sáng");
            $("#Id_main").attr("class", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // btn_profile_update
    $("#btn_profile_update").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/nguoidung",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: $("form").serialize(),
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length == 0) {
                    createToast(
                        "success",
                        "Cập nhật thông tin người dùng thành công"
                    );
                } else {
                    createToast("warning", data.Mess);
                }
            },
            error: function (xhr, status, error) {
                createToast("error", xhr.responseText);
            },
        });
    });

    // Id_Exit
    $("#Id_Exit").on("click", function (e) {
        localStorage.removeItem("Key");
        localStorage.removeItem("theme");
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
                    top.location.href = "/dangnhap";
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
