// header, footer 호출
$(document).ready(function () {
    $('#header').load('inc.html .cont', burgerMenuEvent);
    $('#footer').load('inc.html .stn');
})

let winSize = window.innerWidth;

// slick
if (document.body.contains(document.querySelector(".collections"))) {
    $('.swiper-wrapper').slick({
        arrows: true,
        dots: false,
        infinite: true,
        draggable: true,
        prevArrow: '<button class="swiper-btn-prev"><img src="./resource/images/ico_left_arrow.png" alt="prev_arrow"></button>',
        nextArrow: '<button class="swiper-btn-next"><img src="./resource/images/ico_right_arrow.png" alt="next_arrow"></button>',
    });
}

// swiper
if (document.body.contains(document.querySelector(".product_detail"))) {
    var mySwiper2;
    if (winSize > 768 && mySwiper2 == undefined) {
        mySwiper2 = new Swiper('.product_detail .swiper-container', {
            slidesPerView: 3,
            spaceBetween: 50,
            loop: true,
            navigation: {
                nextEl: '.product_detail .swiper-btn-next',
                prevEl: '.product_detail .swiper-btn-prev',
            },
        });
    }
    if (winSize <= 768 && mySwiper2 != undefined) {
        mySwiper2.destroy();
        mySwiper2 = undefined;
    }
    window.addEventListener("resize", function () {
        winSize = window.innerWidth;
        if (winSize > 768 && mySwiper2 == undefined) {
            mySwiper2 = new Swiper('.product_detail .swiper-container', {
                slidesPerView: 3,
                spaceBetween: 50,
                loop: true,
                navigation: {
                    nextEl: '.product_detail .swiper-btn-next',
                    prevEl: '.product_detail .swiper-btn-prev',
                },
            });
        }
        if (winSize <= 768 && mySwiper2 != undefined) {
            mySwiper2.destroy();
            mySwiper2 = undefined;
        }
    })
}

// scroll event 스크롤 이벤트
var scrStn = document.querySelectorAll('.scroll_stn');
var scrStnY, scrStnUp, scrStnDown;
window.addEventListener('scroll', function () {
    for (var i = 0; i < scrStn.length; i++) {
        scrStnY = (scrStn[i].getBoundingClientRect().top + window.pageYOffset) - window.innerHeight;
        scrStnUp = scrStnY + (window.innerHeight / 2 - window.innerHeight / 4) <= window.pageYOffset;
        scrStnDown = scrStnY <= window.pageYOffset;
        if (scrStnUp) {
            scrStn[i].classList.add('active');
        } //scroll fadein event
        else if (scrStnDown) {
            scrStn[i].classList.remove('active');
        } //scroll fadeout event
    }
})


// checkbox style on/off 체크박스 온오프 이펙트
const chkBoxLabel = document.querySelectorAll(".chkBox");
const chkBoxArea = document.querySelectorAll(".chkBox input");
for (let i = 0; i < chkBoxLabel.length; i++) {
    let idx = i;
    chkBoxLabel[idx].addEventListener("click", function () {
        for(let k=0; k<chkBoxLabel.length; k++){
            chkBoxLabel[k].classList.remove("on");
        }
        if (chkBoxArea[idx].checked == true) {
            chkBoxLabel[idx].classList.add("on");
        }
    })
}


// burger menu event 버거메뉴 이벤트
function burgerMenuEvent() {
    const btnMenu = document.querySelector(".btn_menu");
    const btnMenuIco = document.querySelector(".btn_menu i");
    const btnGnb = document.querySelector("#gnb");
    btnMenu.addEventListener("click", function () {
        if (btnGnb.classList.contains("on")) {
            btnGnb.classList.remove("on");
            btnMenuIco.classList.remove("fa-times");
            btnMenuIco.classList.add("fa-bars");
        } else {
            btnGnb.classList.add("on");
            btnMenuIco.classList.add("fa-times");
            btnMenuIco.classList.remove("fa-bars");
        }
    })
}


// shopping cart list index change event 쇼핑카트 태그 순서 변경 이벤트
if (winSize <= 768) {
    $(".btn_close").each(function (index) {
        $(".product_name").eq(index).after($(".btn_close").eq(index));
    });
}
window.addEventListener("resize", function () {
    winSize = window.innerWidth;
    if (winSize <= 768) {
        $(".btn_close").each(function (index) {
            $(".product_name").eq(index).after($(".btn_close").eq(index));
        });
    } else {
        $(".btn_close").each(function (index) {
            $(".price_total_item").eq(index).after($(".btn_close").eq(index));
        });
    }
});

// 아이템 수량 증가버튼
let stateNum;
const btnNum = document.querySelectorAll(".btn_num");
const stateNumArea = document.querySelector(".state_num");
for(let i=0; i<btnNum.length; i++){
    stateNum = 0;
    btnNum[i].addEventListener("click",function(){
        if( btnNum[i].classList.contains("minus") ){
            stateNum--;
            if(stateNum <= 0){
                stateNum = 0;
            }
        }
        if( btnNum[i].classList.contains("plus") ){
            stateNum++;
        }
        stateNumArea.innerHTML = stateNum;
    })
}