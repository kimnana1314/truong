document.getElementById("btn_love").addEventListener("click", function (e) {
    var img = document.getElementById("prod_imb_cb");
    var check_box = document.getElementById("img_checkbox");
    if (check_box.checked) {
        img.setAttribute("src", "./icons/heart.svg");
        img.removeAttribute("class");
        img.setAttribute("class", "prod-act__icon-imge like-btn__icon icon");
        check_box.checked = false;
    } else {
        img.setAttribute("src", "./icons/heart_red.svg");
        img.removeAttribute("class");
        img.setAttribute("class", "prod-act__icon-imge like-btn__icon--liked");
        check_box.checked = true;
    }
});

document.getElementById("preview_img1").addEventListener("click", function (e) {
    var img = document.getElementById("preview_img");
    var img1 = document.getElementById("preview_img1");
    var img2 = document.getElementById("preview_img2");
    var img3 = document.getElementById("preview_img3");
    var img4 = document.getElementById("preview_img4");
    img.setAttribute("src", e.target.src);
    img1.removeAttribute("class");
    img1.setAttribute(
        "class",
        "prod-preview__list-img prod-preview__list--current"
    );
    img2.removeAttribute("class");
    img2.setAttribute("class", "prod-preview__list-img");
    img3.removeAttribute("class");
    img3.setAttribute("class", "prod-preview__list-img");
    img4.removeAttribute("class");
    img4.setAttribute("class", "prod-preview__list-img");
});

document.getElementById("preview_img2").addEventListener("click", function (e) {
    var img = document.getElementById("preview_img");
    var img1 = document.getElementById("preview_img1");
    var img2 = document.getElementById("preview_img2");
    var img3 = document.getElementById("preview_img3");
    var img4 = document.getElementById("preview_img4");
    img.setAttribute("src", e.target.src);
    img1.removeAttribute("class");
    img1.setAttribute("class", "prod-preview__list-img");
    img2.removeAttribute("class");
    img2.setAttribute(
        "class",
        "prod-preview__list-img prod-preview__list--current"
    );
    img3.removeAttribute("class");
    img3.setAttribute("class", "prod-preview__list-img");
    img4.removeAttribute("class");
    img4.setAttribute("class", "prod-preview__list-img");
});

document.getElementById("preview_img3").addEventListener("click", function (e) {
    var img = document.getElementById("preview_img");
    var img1 = document.getElementById("preview_img1");
    var img2 = document.getElementById("preview_img2");
    var img3 = document.getElementById("preview_img3");
    var img4 = document.getElementById("preview_img4");
    img.setAttribute("src", e.target.src);
    img1.removeAttribute("class");
    img1.setAttribute("class", "prod-preview__list-img");
    img2.removeAttribute("class");
    img2.setAttribute("class", "prod-preview__list-img");
    img3.removeAttribute("class");
    img3.setAttribute(
        "class",
        "prod-preview__list-img prod-preview__list--current"
    );
    img4.removeAttribute("class");
    img4.setAttribute("class", "prod-preview__list-img");
});

document.getElementById("preview_img4").addEventListener("click", function (e) {
    var img = document.getElementById("preview_img");
    var img1 = document.getElementById("preview_img1");
    var img2 = document.getElementById("preview_img2");
    var img3 = document.getElementById("preview_img3");
    var img4 = document.getElementById("preview_img4");
    img.setAttribute("src", e.target.src);
    img1.removeAttribute("class");
    img1.setAttribute("class", "prod-preview__list-img");
    img2.removeAttribute("class");
    img2.setAttribute("class", "prod-preview__list-img");
    img3.removeAttribute("class");
    img3.setAttribute("class", "prod-preview__list-img");
    img4.removeAttribute("class");
    img4.setAttribute(
        "class",
        "prod-preview__list-img prod-preview__list--current"
    );
});
