// dang ky

$(document).ready(function () {
    if (localStorage.getItem("Car_Qty")) {
        let qty = Number(localStorage.getItem("Car_Qty"));
        $("#id_card_qty").text(qty);
    } else {
        $("#id_card_qty").text(0);
    }

    $(function () {
        setInterval(function () {
            $(".slideshow__item > picture:first")
                .slideDown()
                .fadeOut()
                .next("picture")
                .slideDown()
                .fadeIn()
                .end()
                .appendTo(".slideshow__item");
        }, 3000);
    });

    let theme_main = localStorage.getItem("theme");
    if (theme_main) {
        $("#Id_main").attr("class", theme_main);
        if (theme_main === "dark") {
            $("#theme_st").attr("src", "./icons/sang.svg");
            $("#Id_gd").text("Bật giao diện sáng");
            $("#Order_table").removeAttr("class");
            $("#Order_table").attr("class", "table table-hover table-dark");
        } else {
            $("#theme_st").attr("src", "./icons/toi.svg");
            $("#Id_gd").text("Bật giao diện tối");
            $("#Order_table").removeAttr("class");
            $("#Order_table").attr("class", "table table-hover");
        }
    } else {
        $("#Id_main").removeAttr("class");
        $("#theme_st").attr("src", "./icons/toi.svg");
        $("#Id_gd").text("Bật giao diện tối");
    }
    // đăng ký
    $("#btn_dangky").on("click", function (e) {
        e.preventDefault();
        if (
            $("input[name='User_Password']").val() !=
            $("input[name='User_PasswordConfirm']").val()
        ) {
            $("#output").addClass("form__mess--err");
            $("#output").html("Mật khẩu xác nhận chưa chính xác");
        } else {
            var url = "/register";
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
    // reset password

    $("#btn_Rest_password").on("click", function (e) {
        e.preventDefault();

        var url = "/reset-password";
        alert($("form").serialize());
        var settings = {
            data: $("form").serialize(),
            method: "POST",
            statusCode: {},
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length == 0) {
                    createToast("success", "Đặt lại mật khẩu thành công!");
                } else {
                    createToast("warning", data.Mess);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                createToast("error", xhr.responseText);
            },
        };

        $.ajax(url, settings);
    });

    $("#btnAcitive").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/active",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: $("form").serialize(),
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    $("#output").html(data.Mess);
                } else {
                    top.location.href = "/log-in"; //redirection
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

    // btn_add_cardhome
    $(".orderAdd-home").on("click", function (e) {
        e.preventDefault();
        let button = $(this).parent();
        let Item_Id = button.prevObject.attr("data-item_id");
        let CardHd = [];
        if (localStorage.getItem("CardHd")) {
            CardHd = JSON.parse(localStorage.getItem("CardHd"));
        }
        CardHd.push({
            Item_Id: Item_Id,
            Qty: 1,
        });
        if (localStorage.getItem("CardHd")) {
            localStorage.setItem("CardHd", JSON.stringify(CardHd));
        } else {
            localStorage.setItem("CardHd", JSON.stringify(CardHd));
        }
        createToast("success", "Thêm vào giỏ hàng thành công");
        if (localStorage.getItem("Car_Qty")) {
            let qty = Number(localStorage.getItem("Car_Qty")) + 1;
            localStorage.setItem("Car_Qty", qty);
            $("#id_card_qty").text(qty);
        } else {
            localStorage.setItem("Car_Qty", 1);
            $("#id_card_qty").text(1);
        }
    });

    //btn_add_card
    $("#btn_add_card").on("click", function (e) {
        e.preventDefault();
        let ArayItem_Id = location.href.split("/");
        let Item_Id = ArayItem_Id[ArayItem_Id.length - 1];

        let CardHd = [];
        if (localStorage.getItem("CardHd")) {
            CardHd = JSON.parse(localStorage.getItem("CardHd"));
        }
        CardHd.push({
            Item_Id: Item_Id,
            Qty: 1,
        });

        if (localStorage.getItem("CardHd")) {
            localStorage.setItem("CardHd", JSON.stringify(CardHd));
        } else {
            localStorage.setItem("CardHd", JSON.stringify(CardHd));
        }
        createToast("success", "Thêm vào giỏ hàng thành công");

        if (localStorage.getItem("Car_Qty")) {
            let qty = Number(localStorage.getItem("Car_Qty")) + 1;
            localStorage.setItem("Car_Qty", qty);
            $("#id_card_qty").text(qty);
        } else {
            localStorage.setItem("Car_Qty", 1);
            $("#id_card_qty").text(1);
        }
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

    // $("#btn_card_item").mouseover(function () {
    //     let Cart_html = $("input#Cart_html").val();

    //     if (Cart_html) {
    //         let cards = JSON.parse(Cart_html);
    //         let list = $("#html_card_Item");

    //         list.children().detach();
    //         $.each(cards, function (index, value) {
    //             let html = document.createElement("div");
    //             html.className = `col`;
    //             html.innerHTML = `<article class="cart-preview-item">
    //             <div
    //                 class="cart-preview-item__img-wrap"
    //             >
    //                 <img
    //                     src="${value.Img}"
    //                     alt=""
    //                     class="cart-preview-item__thubm"
    //                 />
    //             </div>

    //             <h3
    //                 class="cart-preview-item__title"
    //             >${value.Item_Name}</h3>
    //             <p
    //                 class="cart-preview-item__price"
    //             >${value.Price}</p>
    //         </article> `;

    //             document.querySelector("#html_card_Item").appendChild(html);
    //         });
    //     }
    // });

    //toast_mess

    const toasts = {
        success: {
            icon: "success.svg",
            titel: "Thành công",
        },
        error: {
            icon: "error.svg",
            titel: "Lỗi",
        },
        warning: {
            icon: "warning.svg",
            titel: "Cảnh báo",
        },
    };

    function createToast(status, mes) {
        let toast = document.createElement("div");
        let myArray;
        let mess = "";
        if (mes) {
            if (mes.length == 0) {
                mes = "Lỗi khi thực hiện chức năng này!";
                myArray = mes.split(" ");
            } else {
                myArray = mes.split(" ");
            }

            if (myArray.length > 8) {
                for (var i = 0; i < 8; i++) {
                    mess += myArray[i] + " ";
                }
                mess = mess + "...";
            } else {
                mess = mes;
            }
        } else {
            mess = "Lỗi khi thực hiện chức năng này!";
        }

        toast.className = `toast ${status}`;

        toast.innerHTML = `
    <div class="toast__mess">
       <div class="toast__mess--heading">
            <img src="./icons/${toasts[status].icon}">
       </div>
       <div class="toast__mess--info">
        <h3 class="toast__mess--titel">${toasts[status].titel} </h3>
        <p class="toast__mess--desc">${mess} </p>
       </div>   
     </div>
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
    $("#btn_card_item_love").on("click", function (e) {
        let theme = localStorage.getItem("theme");

        if (theme) {
            if (theme === "dark") {
                $("#theme_st").attr("src", "./icons/toi.svg");
                $("#Id_gd").text("Bật giao diện tối");
                $("#Id_main").removeAttr("class");
                localStorage.setItem("theme", "light");
            } else {
                $("#theme_st").attr("src", "./icons/sang.svg");
                $("#Id_gd").text("Bật giao diện sáng");
                $("#Id_main").attr("class", "dark");
                localStorage.setItem("theme", "dark");
            }
        } else {
            $("#theme_st").attr("src", "./icons/toi.svg");
            $("#Id_gd").text("Bật giao diện tối");
            $("#Id_main").attr("class", "light");
            localStorage.setItem("theme", "light");
        }
    });

    // btn_profile_update
    $("#btn_profile_update").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/user",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: $("form").serialize(),
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length == 0) {
                    createToast("success", "Cập nhật thông tin người dùng");
                } else {
                    createToast("warning", data.Mess);
                }
            },
            error: function (xhr, status, error) {
                createToast("error", xhr.responseText);
            },
        });
    });
    // Thay đổi mật khẩu
    $("#btn_profile_change_password").on("click", function (e) {
        e.preventDefault();
        if ($("input[name='User_Password']").val().length < 6) {
            createToast("warning", "Mật khẩu phải ít nhất 6 ký tự");
        } else {
            if (
                $("input[name='User_Password']").val() !=
                $("input[name='User_PasswordConfirm']").val()
            ) {
                createToast("warning", "Mật khẩu xác nhận không đúng");
            } else {
                $.ajax({
                    url: "/changepassword",
                    type: "POST",
                    dataType: "json",
                    contentType:
                        "application/x-www-form-urlencoded; charset=UTF-8",
                    data: $("form").serialize(),
                    success: function (data, textStatus, jqXHR) {
                        if (data.Mess.length == 0) {
                            createToast(
                                "success",
                                "Thay đổi mật khẩu thành công!"
                            );
                        } else {
                            createToast("warning", data.Mess);
                        }
                    },
                    error: function (xhr, status, error) {
                        createToast("error", xhr.responseText);
                    },
                });
            }
        }
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

    // Order

    // btn_Order_Add và orderRemove

    $(".orderAdd").on("click", function (e) {
        e.preventDefault();
        let button = $(this).parent();
        let Order_money = $("#Order_money");
        let amt_total = Number($("#Order_money").text().replace(/,/g, ""));
        let Item_Id = button.prevObject.attr("data-item_id");
        let Qty_Item = "#Qty_" + Item_Id;
        let Qty = Number($(Qty_Item).val()) + 1;
        let Price_Item = "#Order_Price_" + Item_Id;
        let Amt_Item = "#Order_Amt_" + Item_Id;
        let Price = Number($(Price_Item).text().replace(/,/g, ""));
        let Amt = Qty * Price;
        amt_total = amt_total + Price;
        $(Qty_Item).val(Qty);
        $(Amt_Item).text(
            Amt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        );
        $("#Order_money").text(
            amt_total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        );
    });

    $(".orderRemove").on("click", function (e) {
        e.preventDefault();
        let button = $(this).parent();
        let Order_money = $("#Order_money");
        let amt_total = Number($("#Order_money").text().replace(/,/g, ""));
        let Item_Id = button.prevObject.attr("data-item_id");
        let Qty_Item = "#Qty_" + Item_Id;
        let Price_Item = "#Order_Price_" + Item_Id;
        let Amt_Item = "#Order_Amt_" + Item_Id;
        let Price = Number($(Price_Item).text().replace(/,/g, ""));
        if (Number($(Qty_Item).val()) >= 2) {
            amt_total = amt_total - Price;
        }
        let Qty = Number($(Qty_Item).val()) - 1;
        if (Qty <= 0) {
            Qty = 1;
        }

        let Amt = Qty * Price;

        $(Qty_Item).val(Qty);
        $(Amt_Item).text(
            Amt.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        );
        $("#Order_money").text(
            amt_total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        );
    });

    // orderDelete

    $(".orderDelete").on("click", function (e) {
        e.preventDefault();
        let Order_money = $("#Order_money");
        let amt_total = Number($("#Order_money").text().replace(/,/g, ""));
        let button = $(this).parent();
        let Item_Id = button.prevObject.attr("data-item_id");
        let Order_Item = "#Order_" + Item_Id;
        let Amt_Item = "#Order_Amt_" + Item_Id;
        let Amt = Number($(Amt_Item).text().replace(/,/g, ""));
        amt_total = amt_total - Amt;
        if (Order_Item) {
            $("#Order_money").text(
                amt_total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            );
            $(Order_Item).remove();
        }
    });

    // Order-views
    $("#btn_card_item").on("click", function (e) {
        e.preventDefault();
        let qty;
        if (localStorage.getItem("Car_Qty")) {
            qty = Number(localStorage.getItem("Car_Qty"));
        } else {
            qty = 0;
        }
        if (qty <= 0) {
            return;
        }

        let CardHd = [];
        if (localStorage.getItem("CardHd")) {
            CardHd = JSON.parse(localStorage.getItem("CardHd"));
        }

        if (CardHd.length == 0) {
            createToast("warning", "Chưa có sản phẩm nào ở giỏ hàng");
            return;
        }

        let Obj_Items = {
            Trans: CardHd,
        };
        var html_str;
        $.ajax({
            type: "GET",
            url: "/order/",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            headers: {
                header1: JSON.stringify(Obj_Items),
            },
            success: function (data) {
                html_str = `<div class="order-container">
                <div  class="order-from">
            
                    <div class="order-from__group">
                        <h2 class="order-from__group--title">1.Người nhận</h2>
                        <div class="order-from__Items">
            
                             
                            <input
                                class="order-from__Items--text"
                                type="text"
                                id="Ascendant"
                                name="Ascendant"
                                placeholder="Tên người nhận"
                                value=""
                            />
                        </div>
                        <div class="order-from__Items">
            
                             
                            <input
                                class="order-from__Items--text"
                                type="text"
                                id="Adress"
                                name="Adress"
                                placeholder="Địa chỉ"
                                value=""
                            />
                        </div>
            
                        <div class="order-from__Items">
            
                             
                            <input
                                class="order-from__Items--text"
                                type="text"
                                id="Phone"
                                name="Phone"
                                placeholder="Điện thoại"
                                value=""
                            />
                        </div>
            
                    </div>
                    <div class="order-from__Items">
                        <h2 class="order-from__group--title">2.Danh sách sản phẩm</h2>
                        <div class="row row-cols-2 row-cols-lg-1">
                           `;
                $.each(data.Items, (key, value) => {
                    html_str += ` 
                    <div id="Order_${value.Item_Id}" class="col">
                        <article class="order-card">
                            <picture class="order-card__img">
                                <img
                                    src="${value.Img}"
                                    alt=""
                                    class="order-card__thumb"
                                />
                            </picture>

                            <div class="order-card__info">
                                <div class="order-card__info--heading">
                                    <h3 class="order-card__info--title">
                                        ${value.Item_Name}</h3>
                                    <p
                                        class="order-card__info--amt"
                                        id="Order_Amt_${value.Item_Id}"
                                    >
                                        ${value.Item_Amt}</p>
                                </div>
                                <p
                                    class="order-card__info--price"
                                    id="Order_Price_${value.Item_Id}"
                                    name="Order_Price"
                                >
                                    ${value.Price}
                                </p>
                                <div class="order-card__act">
                                    <div
                                        class="order-card__act--btn prevent-select"
                                    >
                                        <button
                                            class="orderRemove"
                                            data-item_id="${value.Item_Id}"
                                        >
                                            <img
                                                src="./icons/remove.svg"
                                                alt=""
                                                class="icon"
                                            />
                                        </button>

                                        <input
                                            type="number"
                                            id="Qty_${value.Item_Id}"
                                            name="Order_Qty"
                                            value="${value.Qty}"
                                            disabled="true"
                                            min="1"
                                            class="order-card__act--qty"
                                            data-item_id="${value.Item_Id}"
                                        />
                                        <button
                                            class="orderAdd"
                                            data-item_id="${value.Item_Id}"
                                        >
                                            <img
                                                src="./icons/add.svg"
                                                alt=""
                                                class="icon"
                                            />
                                        </button>

                                    </div>
                                    <button
                                        class="btn btn--outline orderDelete"
                                        data-item_id="${value.Item_Id}"
                                    >
                                        <img
                                            src="./icons/delete.svg"
                                            alt=""
                                            class="icon"
                                        />
                                    </button>
                                </div>

                            </div>

                        </article>
                    </div>
              `;
                });
                html_str += `                        </div>
                <div class="row row-cols-1">
                    <div class="order-from__total">
                        <div class="order-from__amt">
                            <span>
                                <img src="./icons/money.svg" alt="" class="icon" />
                            </span>
    
                            <p
                                id="Order_money"
                                class="order-from__amt--total"

                            > `;

                $.each(data, (key, value) => {
                    html_str += `${value[0].Total_Amt}`;
                });

                html_str += `</p>
    
                        </div>
    
                        <button id="OrderItemPay" class="btn btn--primary">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    
    </div>`;

                $("#container_body").html(html_str);
                var jQueryScript = document.createElement("script");
                jQueryScript.setAttribute("src", "js/index.js");
                document.head.appendChild(jQueryScript);

                //JSON.stringify(data)
                // alert(data);

                // if (data.Mess.length > 0) {
                //     createToast("warning", data.Mess);
                // } else {
                //     createToast("success", "Đăng ký đặt hàng thành công!");
                // }
            },
            error: function (xhr, status, error) {
                alert(error);

                createToast("error", status + xhr.responseText);
            },
        });
    });

    // OrderItemPay
    $("#OrderItemPay").on("click", function (e) {
        e.preventDefault();

        let Tran_Card = {
            Ascendant: $("#Ascendant").val().trim(),
            Adress: $("#Adress").val().trim(),
            Phone: $("#Phone").val().trim(),
        };
        let Trans = [];

        $(".order-card__act--qty").each(function () {
            let Items = {
                Item_Id: $(this).parent().prevObject.attr("data-item_id"),
                Qty: Number($(this).val()),
            };
            Trans.push(Items);
        });

        let Count = Trans.length;
        if ($("#Ascendant").val().trim().length == 0) {
            createToast("warning", "Phải nhập tên người nhận");
            return;
        }
        if ($("#Adress").val().trim().length == 0) {
            createToast("warning", "Phải nhập địa chỉ");
            return;
        }
        if ($("#Phone").val().trim().length == 0) {
            createToast("warning", "Phải nhập điện thoại");
            return;
        }

        if (Trans.length == 0) {
            createToast("warning", "Chưa có sản phẩm nào ở giỏ hàng");
            return;
        }

        let Obj_Items = {
            Tran_Card: Tran_Card,
            Trans: Trans,
        };

        $.ajax({
            url: "/order",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: JSON.stringify(Obj_Items),
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length > 0) {
                    createToast("warning", data.Mess);
                } else {
                    createToast("success", "Đăng ký đặt hàng thành công!");
                    localStorage.removeItem("Car_Qty");
                    localStorage.removeItem("CardHd");
                    setTimeout(() => {
                        window.location = "/";
                    }, 2000);
                }
            },
            error: function (xhr, status, error) {
                createToast("error", xhr.responseText);
            },
        });
    });
    // profile-user

    let modal = $(".profile__model");
    let btn_user = $(".profile-user");

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
        // return dataURL.toString().split("base64,")[1];
    }

    btn_user.click(function () {
        $("#img__avarta").attr("src", $(".profile-user__avatar").attr("src"));

        modal.show();
    });

    $(window).on("click", function (e) {
        if ($(e.target).is(".profile__model")) {
            modal.hide();
        }
    });

    // img__avarta

    $("#avrtar__image").change(function () {
        readURL(this);
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                avarta_img = e.target.result;
                $("#img__avarta").attr("src", avarta_img);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    // btn_upload

    function base64ToArrayBuffer(base64) {
        var binaryString = atob(base64);
        var bytes = new Uint8Array(binaryString.length);
        for (var i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    $("#btn_upload").on("click", function (e) {
        e.preventDefault();
        let avarta_img = getBase64Image(document.getElementById("img__avarta"));
        let image = base64ToArrayBuffer(avarta_img.split("base64,")[1]);
        alert(image);
        $.ajax({
            url: "/user/post",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            enctype: "multipart/form-data",
            data: {
                image: avarta_img.split("base64,")[1],
            },
            success: function (data, textStatus, jqXHR) {
                if (data.Mess.length == 0) {
                    createToast("success", "Thay đổi mật khẩu thành công!");
                } else {
                    createToast("warning", data.Mess);
                }
            },
            error: function (xhr, status, error) {
                createToast("error", error.toString());
            },
        });
    });
    //
});
