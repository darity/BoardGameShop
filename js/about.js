$(document).ready(function () {

    $("#srLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("sr");
    });

    $("#enLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("en");
    });

    loadTranslations("about");
    document.title = translations[currentLanguage].about.title;

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