$(document).ready(function(){
    $("#srLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("sr");
    });

    $("#enLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("en");
    });

    loadTranslations("gallery");
    document.title = translations[currentLanguage].gallery.title;

    loadPageCarousel("shop", "shop", 5);
    loadPageCarousel("games", "games", 4);

    let poslednjaPozicija = $(window).scrollTop();
    let visinaNavbara = $(".store-header").outerHeight();

    $(window).on("scroll", function () {

        const trenutnaPozicija = $(this).scrollTop();

        if (trenutnaPozicija <= visinaNavbara) {
            $(".navbar").removeClass("fixed");
        }
        else{
            $(".navbar").addClass("fixed");
        }

        poslednjaPozicija = trenutnaPozicija;
    });
})

function loadPageCarousel(id, folder, brojSlika){

    let html = "";

    for (let i = 1; i <= brojSlika; i++) {

        html += `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
            <img src="../img/${folder}/${i}.jpg"
                 class="img-fluid gallery-image"
                 alt="">
            </div>
        `;

    }

    $("#" + id).html(html);
}