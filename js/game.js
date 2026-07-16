let selectedRating = 0;
$(document).ready(function () {
    //localStorage.clear();
    //ocistiKorpu();
    loadGame();
    ucitajIgru();


    document.querySelectorAll(".rating-star").forEach(star => {

        star.addEventListener("click", function () {

            selectedRating = Number(this.dataset.value);

            document.querySelectorAll(".rating-star").forEach((s, index) => {

                s.src = index < selectedRating
                    ? "../img/satarY.png"
                    : "../img/starB.png";

            });

        });

    });

    $("#addComment").click(function () {

        const id = new URLSearchParams(window.location.search).get("id");

        if (dodajKomentar(id)) {

            document.getElementById("commentName").value = "";
            document.getElementById("commentText").value = "";

            selectedRating = 0;

            document.querySelectorAll(".rating-star").forEach(star => {
                star.src = "../img/starB.png";
            });

            // Ponovo učitaj komentare
            const igra = dohvatiIgruPoId(id);
            ucitajKomentare(igra);
            document.getElementById("rating").innerHTML =  prikaziZvezdice(dohvatiOcenu(igra)) +
                " " +
                dohvatiOcenu(igra) +
                " (" +
                igra.komentari.length +
                " ocena)";
        }

    })

    $("#addToCart").click(function () {
        const id = new URLSearchParams(window.location.search).get("id");

        if(!proveriDostupnost(id)) return;
        dodajUKorpu(id);
        azurirajDostupnost(id);
        ucitajSidebar(id);
    })

    $("#favorite").click(function () {
        const id = new URLSearchParams(window.location.search).get("id");
        toggleFavorite(id);
        prikaziFavorite(id);
    });
})

function dodajKomentar(idIgre) {

    const ime = document.getElementById("commentName").value.trim();
    const tekst = document.getElementById("commentText").value.trim();

    if (ime === "") {
        document.getElementById("form-error-name").textContent = "Unesite ime.";
        return false;
    }

    if (selectedRating === 0) {
        document.getElementById("form-error-rating").textContent= "Izaberite ocenu.";
        return false;
    }

    let globalData = JSON.parse(localStorage.getItem("globalData"));

    let igra = globalData.igre.find(i => i.id == idIgre);

    igra.komentari.push({
        korisnik: ime,
        ocena: selectedRating,
        tekst: tekst,
        datum: new Date().toLocaleDateString("sr-RS")
    });

    localStorage.setItem("globalData", JSON.stringify(globalData));

    return true;
}

function loadGame() {
    const id = new URLSearchParams(window.location.search).get("id");
    const igra = dohvatiIgre().find(i => i.id == id);

    document.title ="BoardGameShop | "  + igra.naziv ;
    document.getElementById("breadcrumbGame").textContent = igra.naziv;
    document.getElementById("breadcrumbCategory").textContent = igra.kategorija;
    document.getElementById("breadcrumbCategory").href = kategorije[igra.kategorija];
}
function ucitajIgru() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const sveIgre = dohvatiIgre();
    const igra = sveIgre.find(i => i.id == id);

    prikaziFavorite(id);

    var price;
    var oldPrice;

    if(igra.akcija) {
        price = igra.akcija.novaCena + "RSD";
        oldPrice = igra.cena + "RSD";
    }
    else {
        oldPrice = "";
        price = igra.cena + "RSD";
    }


    if (igra) {
        drawGallery(igra);
        document.getElementById("addToCart").disabled = igra.stanje === 0;

        document.getElementById("gameTitle").innerText = igra.naziv;
        document.getElementById("rating").innerHTML =  prikaziZvezdice(dohvatiOcenu(igra)) +
                                                                " " +
                                                                dohvatiOcenu(igra) +
                                                                " (" +
                                                                igra.komentari.length +
                                                                " ocena)";
        document.getElementById("shortDescription").innerText = igra.kratakOpis;
        document.getElementById("oldPrice").textContent = oldPrice;
        document.getElementById("gamePrice").textContent = price;
        document.getElementById("players").textContent = igra.brojIgraca;
        document.getElementById("duration").textContent = igra.trajanje;
        document.getElementById("age").textContent = igra.uzrast;
        document.getElementById("gameCategory").textContent = igra.kategorija;
        document.getElementById("gameDescription").textContent = igra.opis;
        document.getElementById("availability").textContent =
            igra.stanje > 0 ? `${igra.stanje} kom.` : "Nije na stanju";

        document.getElementById("features").innerHTML = `
            <li class="mb-2"><strong>Proizvođač:</strong> ${igra.proizvodjac}</li>
            <li class="mb-2"><strong>Jezik:</strong> ${igra.jezik}</li>
            <li class="mb-2"><strong>Tip igre:</strong> ${igra.kategorija}</li>
            <li class="mb-2"><strong>Broj igrača:</strong> ${igra.brojIgraca}</li>
            <li class="mb-2"><strong>Trajanje:</strong> ${igra.trajanje}</li>
            <li class="mb-2"><strong>Uzrast:</strong> ${igra.uzrast}</li>
            <li class="mb-2"><strong>Isporuka:</strong> 1–2 radna dana</li>
            <li class="mb-2" id="features-available"><strong>Dostupnost:</strong> ${
                    igra.stanje > 0? `${igra.stanje} komada`: "Nije na stanju"}</li>
        `;

        ucitajKomentare(igra)
    } else {
        document.getElementById("glavniSadrzaj").innerHTML = "<h2>Igra nije pronađena.</h2>";
    }
}

var currentImage;
let currentGame;
function drawGallery(igra) {
    currentImage = 1;
    currentGame = igra;

    document.getElementById("mainImage").src = `../img/${igra.folder}/${currentImage}.jpg`;

    populateGallery(igra);
}

function populateGallery() {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    for(i = 1; i <= currentGame.brojSlika; i++) {
        if(i === currentImage) continue;

        gallery.innerHTML += `
             <img src="../img/${currentGame.folder}/${i}.jpg"
              class="thumb img-fluid rounded shadow-sm w-25" onmouseenter="hoverImage(this, ${i})">
        `;

    }
}

let hoverTimeout;

function hoverImage(img, index) {
    clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(() => {
        promeniSliku(img, index);
    },150)
}

function ucitajKomentare(igra) {

    const commentCount = document.getElementById("commentCount");
    const comments = document.getElementById("comments");

    commentCount.innerText = igra.komentari.length;
    comments.innerHTML = "";

    igra.komentari.forEach(komentar => {

        comments.innerHTML += `
            <div class="retro-card mb-3">

                <div class="d-flex justify-content-between">

                    <strong>${komentar.korisnik}</strong>

                    <small>${komentar.datum}</small>

                </div>

                <div class="mb-2">

                    ${prikaziZvezdice(komentar.ocena)}

                </div>

                <p class="mb-0">

                    ${komentar.tekst}

                </p>

            </div>
        `;

    });

}

function promeniSliku(img, index) {

    currentImage = index;

    const main = document.getElementById("mainImage");

    const temp = main.src;
    main.src = img.src;
    img.src = temp;
}

function prikaziZvezdice(ocena){

    let html = "";

    for(let i = 1; i <= 5; i++){

        if(i <= Math.round(ocena))
            html += `<img src="../img/satarY.png" class="star-icon" alt="★">`;
        else
            html += `<img src="../img/starB.png" class="star-icon" alt="★">`;

    }

    return html;
}

function azurirajDostupnost(id, amount = -1){
    var data = dohvatiIgre();
    var igra = data.find(x => x.id === Number(id));

    if(!igra) return;

    igra.stanje = Math.max(0, igra.stanje + Number(amount));
    document.getElementById("addToCart").disabled = igra.stanje === 0;
    sacuvajIgre(data)

    document.getElementById("availability").textContent =
        igra.stanje > 0 ? `${igra.stanje} kom.` : "Nije na stanju";
    document.getElementById("features-available").innerHTML =
        `<strong>Dostupnost:</strong> ${
        igra.stanje > 0? `${igra.stanje} komada`: "Nije na stanju"}</li>`;
}

function proveriDostupnost(id){
    return dohvatiIgruPoId(id).stanje !== 0;
}