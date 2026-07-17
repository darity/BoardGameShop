$(document).ready(function(){
    $("#srLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("sr");
    });

    $("#enLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("en");
    });

    loadTranslations("favorites");
    document.title = translations[currentLanguage].favorites.title;
    loadFav();

    $(document).on("mouseenter", ".fav", function () {
        $(this).find(".heart").attr("src", "../img/heartEmpty.png");
    });

    $(document).on("mouseleave", ".fav", function () {
        $(this).find(".heart").attr("src", "../img/heartFull.png");
    });

    let poslednjaPozicija = $(window).scrollTop();
    let visinaNavbara = $(".store-header").outerHeight()+100;

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

function loadFav(){
    var fav= dohvatiFavorite();

    var lista = document.getElementById("favoritesList");

    lista.innerHTML = "";

    for (var i = 0; i < fav.length; i++) {
        var game = dohvatiIgruPoId(fav[i]);
        lista.innerHTML += `
        <div class="list-group-item py-3">

            <div class="row align-items-center">

                <div class="col-md-2 text-center">
                    <img src="../img/${game.folder}/1.jpg"
                         class="img-fluid rounded"
                         style="max-height:120px;">
                </div>

                <div class="col-md-5">

                    <h5 class="mb-2">${game.naziv}</h5>

                    <p class="text-muted mb-0">
                        ${game.akcija != null ? game.akcija.novaCena + " RSD" : game.cena + " RSD"}
                    </p>

                </div>

                <div class="col-md-5 text-end">

                    <button class="btn btn-dark me-2 mb-1 addToCart"
                            onclick="addItem(${game.id})"
                            id="fav-${game.id}"
                            ${game.stanje === 0 ? "disabled" : ""}>
                        <i class="bi bi-cart-plus"></i>
                        ${translations[currentLanguage].favorites["add-to-cart"]}
                    </button>

                    <button class="btn btn-outline-danger mb-1 fav"
                            onclick="removeFav(${game.id})">
                        <i class="favorite">
                            <img src="../img/heartFull.png" alt="srce" class="heart">
                            ${translations[currentLanguage].favorites["remove-from-favorites"]}
                        </i>
                    </button>

                </div>

            </div>

        </div>
    `;
    }
}

function proveriDostupnost(id){
    return dohvatiIgruPoId(id).stanje !== 0;
}

function addItem(id){

    if(!proveriDostupnost(id)) return;
    dodajUKorpu(id);
    azurirajDostupnost(id);
    ucitajSidebar(id);
}

function azurirajDostupnost(id){
    var data = dohvatiIgre();
    var igra = data.find(x => x.id === Number(id));

    if(!igra) return;

    igra.stanje = Math.max(0, igra.stanje - 1);
    document.getElementById(`fav-${igra.id}`).disabled = igra.stanje === 0;
    sacuvajIgre(data)
}

function removeFav(id) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites = favorites.filter(gameId => gameId !== id);

    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFav();
}