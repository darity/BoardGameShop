$(document).ready(function(){
    //localStorage.clear();
    inicijalizujIgre();
    load();
    ucitajNoveIgre();
    ucitajAkcije();
    azurirajStrelice("#noveIgreSlider", "#prevGames", "#nextGames");
    azurirajStrelice("#akcijeSlider", "#prevGamesa", "#nextGamesa");

    $(".retro-btn").click(function () {
        const target = $(this).data("target");

        $("html, body").animate({
            scrollTop: $(target).offset().top - $(".header").outerHeight() -100
        }, 600);
    });

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

    $("#nextGames").click(function () {
        const sirinaKartice = $("#noveIgreSlider").first().outerWidth(true) + 20;

        $("#noveIgreSlider").animate({
            scrollLeft: "+=" + sirinaKartice
        }, 400);
    });

    $("#prevGames").click(function () {
        const sirinaKartice = $("#noveIgreSlider").first().outerWidth(true) + 20;

        $("#noveIgreSlider").animate({
            scrollLeft: "-=" + sirinaKartice
        }, 400);
    });

    $("#nextGamesa").click(function () {
        const sirinaKartice = $("#akcijeSlider").first().outerWidth(true) + 20;

        $("#akcijeSlider").animate({
            scrollLeft: "+=" + sirinaKartice
        }, 400);
    });

    $("#prevGamesa").click(function () {
        const sirinaKartice = $("#akcijeSlider").first().outerWidth(true) + 20;

        $("#akcijeSlider").animate({
            scrollLeft: "-=" + sirinaKartice
        }, 400);
    });

    $("#noveIgreSlider").on("scroll", function () {
        azurirajStrelice("#noveIgreSlider", "#prevGames", "#nextGames");
    });

    $("#akcijeSlider").on("scroll", function () {
        azurirajStrelice("#akcijeSlider", "#prevGamesa", "#nextGamesa");
    });
})

function dohvatiIkonicuKategorije(cat) {
    if (cat === "Zabavne") {
        return `<img src="../img/fun.png" alt="Zabavne igre">`;
    }
    else if (cat === "Strategije") {
        return `<img src="../img/strategy.png" alt="Strategije">`;
    }
    else{
        return `<img src="../img/family.png" alt="Porodicne">`;
    }

}

function load() {
    var row = document.getElementById("najboljeOcenjene");
    var data = dohvatiIgre();

    data.sort(function(a, b) {
        return dohvatiOcenu(b) - dohvatiOcenu(a);
    });

    data = data.slice(0, 3);

    row.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var igra = data[i];
        console.log(igra);
        console.log(igra.komentari);
        row.innerHTML += `
               
                <div class="col-sm-6 col-md-4 col-lg-3 mt-3">
                    <div class="card clickable-card" data-id="${igra.id}">
                        <img class="card-img-top" src="../img/${igra.folder}/1.jpg" alt="${igra.naziv}">
                        <div class="card-body">
                            <h4 class="card-title"><a href="Igra.html?id=${igra.id}">${igra.naziv}</a></h4>
                            <div class="card-text">
                                <div class="res-info">
                                    <div class="res-single d-flex align-items-center">
                                        ${dohvatiIkonicuKategorije(igra.kategorija)}
                                        <em>${igra.kategorija}</em>
                                    </div>
                                    
                                    <div class="res-single d-flex align-items-center">
                                        <img src="../img/satarY.png" alt="ocena">
                                        <em>${prosecnaOcena(igra.komentari)}</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}

function ucitajNoveIgre() {
    var row = document.getElementById("noveIgreSlider");
    var data = dohvatiIgre();
    row.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var igra = data[i];
        if(!igra.novo) continue;
        row.innerHTML += `
                <div class="game-slide mt-3">
                    <div class="card card-new">
                        <span class="new-badge">
                            NOVO
                        </span>
                        <div class="clickable-card" data-id="${igra.id}">
                            <img class="card-img-top" src="../img/${igra.folder}/1.jpg" alt="${igra.naziv}">
                            <div class="card-body">
                                <h4 class="card-title"><a href="Igra.html?id=${igra.id}">${igra.naziv}</a></h4>
                                <div class="card-text">
                                    <div class="res-info">
                                        <div class="res-single d-flex align-items-center">
                                            ${dohvatiIkonicuKategorije(igra.kategorija)}
                                            <em>${igra.kategorija}</em>
                                        </div>
                                        <div class="res-single d-flex align-items-center">
                                            <img src="../img/satarY.png" alt="ocena">
                                            <em>${dohvatiOcenu(igra)}</em>
                                        </div>\
                                        <div class="res-single d-flex align-items-center">
                                            <img src="../img/price.png" alt="cena">
                                            <em>${igra.cena}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}

function ucitajAkcije() {
    var row = document.getElementById("akcijeSlider");
    var data = dohvatiIgre().filter(function(a) {
        return a.akcija !== null;
    });

    row.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        var igra = data[i];

        row.innerHTML += `
                <div class="game-slide mt-3">
                    <div class="card action-card">
                        <span class="discount-badge">
                            -${igra.akcija.popust}%
                        </span>
                        <div class="clickable-card" data-id="${igra.id}">
                            <img class="card-img-top" src="../img/${igra.folder}/1.jpg" alt="${igra.naziv}">
                            <div class="card-body">
                                <h4 class="card-title"><a href="Igra.html?id=${igra.id}">${igra.naziv}</a></h4>
                                <div class="card-text">
                                    <div class="res-info">
                                       
                                        
                                        <div class="res-single d-flex align-items-center">
                                            <img src="../img/price.png" alt="cena">
                                            <div>
                                                <em class="old-price">
                                                    ${igra.cena}&nbsp;RSD
                                                </em>
                                                <br>
                                                <strong class="new-price">
                                                    ${igra.akcija.novaCena}&nbsp;RSD
                                                </strong>
                                            </div>
                                            
                                        </div>
                                        
                                        <div class="res-single d-flex align-items-center">
                                            <img src="../img/calendar.png" alt="datum">
                                            <em>Do ${igra.akcija.trajeDo}</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
    }
}

function azurirajStrelice(sliderId, prevId, nextId) {
    const slider = $(sliderId);

    const scrollLeft = slider.scrollLeft();
    const scrollWidth = slider[0].scrollWidth;
    const clientWidth = slider[0].clientWidth;

    const maxScroll = scrollWidth - clientWidth;

    // Leva strelica
    if (scrollLeft <= 1) {
        $(prevId).hide();
    } else {
        $(prevId).show();
    }

    // Desna strelica
    if (scrollLeft >= maxScroll - 1) {
        $(nextId).hide();
    } else {
        $(nextId).show();
    }
}