let selectedRating = 0;
$(document).ready(function () {
    //localStorage.clear();
    loadGame();
    ucitajIgru();

    let selectedRating = 0;

    document.querySelectorAll(".rating-star").forEach(star => {

        star.addEventListener("click", function () {

            selectedRating = Number(this.dataset.value);
            console.log("Selected:", selectedRating);

            document.querySelectorAll(".rating-star").forEach((s, index) => {

                s.src = index < selectedRating
                    ? "../img/satarY.png"
                    : "../img/starB.png";

            });

        });

    });

    $("#addComment").click(function () {
        console.log("Klik!");
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
        }

    })

})

function dodajKomentar(idIgre) {

    const ime = document.getElementById("commentName").value.trim();
    const tekst = document.getElementById("commentText").value.trim();

    if (ime === "") {
        alert("Unesite ime.");
        return false;
    }

    if (selectedRating === 0) {
        alert("Izaberite ocenu.");
        return false;
    }

    if (tekst === "") {
        alert("Unesite komentar.");
        return false;
    }

    let globalData = JSON.parse(localStorage.getItem("globalData"));

    let igra = globalData.igre.find(i => i.id == idIgre);

    igra.komentari.push({
        korisnik: ime,
        datum: new Date().toLocaleDateString("sr-RS"),
        ocena: selectedRating,
        tekst: tekst
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
        const gallery = document.getElementById("gallery");

        for(let i = 1; i <= igra.brojSlika; i++){
            gallery.innerHTML += `
            <img
                src="../img/${igra.folder}/${i}.jpg"
                onclick="promeniSliku(this.src)"
                class="thumb">
            `;

        }

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
        document.getElementById("features").innerHTML = `
            <li class="mb-2">🏭 <strong>Proizvođač:</strong> ${igra.proizvodjac}</li>
            <li class="mb-2">🌍 <strong>Jezik:</strong> ${igra.jezik}</li>
            <li class="mb-2">🎲 <strong>Tip igre:</strong> ${igra.kategorija}</li>
            <li class="mb-2">👥 <strong>Broj igrača:</strong> ${igra.brojIgraca}</li>
            <li class="mb-2">⏱️ <strong>Trajanje:</strong> ${igra.trajanje}</li>
            <li class="mb-2">🎂 <strong>Uzrast:</strong> ${igra.uzrast}</li>
            <li class="mb-2">📦 <strong>Dostupnost:</strong> ${
                    igra.stanje > 0
                        ? `${igra.stanje} komada`
                        : "Nije na stanju"
                }</li>
            <li>🚚 <strong>Isporuka:</strong> 1–2 radna dana</li>
        `;

        ucitajKomentare(igra)
    } else {
        document.getElementById("glavniSadrzaj").innerHTML = "<h2>Igra nije pronađena.</h2>";
    }
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

function promeniSliku(src){

    document.getElementById("mainImage").src = src;

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