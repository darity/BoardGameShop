var kriterijumSortiranja = "";

$(document).ready(function(){
    //localStorage.clear();
    ucitajCatalog();

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

    $("#pretraga").on("input", function () {
        filtrirajISortiraj();
    });

    $("#sortSelected").click(function () {
        $(".sort-dropdown").toggleClass("open");
        $(".sort-options").toggle();
    });

    $(".sort-options div").click(function () {
        kriterijumSortiranja = $(this).data("value");

        var tekst = $(this).text();
        $("#sortText").text(tekst);

        $(".sort-options").hide();
        $(".sort-dropdown").removeClass("open");

        filtrirajISortiraj();
    });

    $("#downloadPdf").click(function () {
        generisiPDF(catalog);
    });
})

function dohvatiIkonicuKategorije(cat) {
    if (cat === "Zabavne igre") {
        return `<img src="../img/fun.png" alt="Zabavne igre">`;
    }
    else if (cat === "Strategije") {
        return `<img src="../img/strategy.png" alt="Strategije">`;
    }
    else{
        return `<img src="../img/family.png" alt="Porodicne">`;
    }

}

var catalog = [];

function ucitajCatalog() {
    catalog = dohvatiIgre();
    prikaziCatalog(catalog);
}

function prikaziCatalog(igre) {
    var row = document.getElementById("listaIgara");

    row.innerHTML = "";

    if (igre.length === 0) {
        row.innerHTML = "<p class='ml-3'>Trenutno nema dostupnih igara.</p>";
        return;
    }

    igre.forEach(igra => {
        row.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mt-3">
                <div class="card h-100">

                    <img 
                        class="card-img-top" 
                        src="../img/${igra.folder}/1.jpg" 
                        alt="${igra.naziv}"
                    >

                    <div class="card-body">

                        <h4 class="card-title">
                            <a href="Igra.html?id=${igra.id}">
                                ${igra.naziv}
                            </a>
                        </h4>

                        <p class="card-text">
                            ${igra.opis}
                        </p>

                        <div class="res-info">
                            <p class="card-text">
                                <small class="text-muted">
                                    <img src="../img/satarY.png" alt="zvezdica">
                                    ${dohvatiOcenu(igra)}
                                </small>
                                
                            </p>
                            
                            
                        </div>
                   

                       <div class="card-bottom">
                            <a href="Igra.html?id=${igra.id}" class="game-details-btn">
                                Pogledaj
                            </a>
                  
                            <div class="game-price">
                                <img src="../img/price.png" alt="cena">
                                <strong>${igra.cena}&nbsp;RSD</strong>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        `;
    });
}

function filtrirajISortiraj() {
    var unos = $("#pretraga").val().trim().toLowerCase();
    var kriterijum = kriterijumSortiranja;

    var rezultat = catalog.filter(igra => {
        var naziv = igra.naziv.toLowerCase();
        var cena = igra.cena.toString();

        return naziv.includes(unos) || cena.includes(unos);
    });

    if (kriterijum === "naziv-asc") {
        rezultat.sort((a, b) => a.naziv.localeCompare(b.naziv));
    }
    else if (kriterijum === "naziv-desc") {
        rezultat.sort((a, b) => b.naziv.localeCompare(a.naziv));
    }
    else if (kriterijum === "cena-asc") {
        rezultat.sort((a, b) => a.cena - b.cena);
    }
    else if (kriterijum === "cena-desc") {
        rezultat.sort((a, b) => b.cena - a.cena);
    }

    prikaziCatalog(rezultat);
}


function generisiPDF(igre) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let y = 20;

    // Naslov
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Katalog igara", 20, y);

    y += 15;

    igre.forEach(function (igra, index) {

        // Ako nema dovoljno mesta za sledeću igru
        if (y > 250) {
            pdf.addPage();
            y = 20;
        }

        // Naziv igre
        pdf.setFontSize(15);
        pdf.setFont("helvetica", "bold");
        pdf.text((index + 1) + ". " + igra.naziv, 20, y);

        y += 9;

        // Opis
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");

        const opis = pdf.splitTextToSize(
            "Opis: " + igra.opis,
            165
        );

        pdf.text(opis, 25, y);

        y += opis.length * 6;

        // Cena
        pdf.text(
            "Cena: " + igra.cena + " RSD",
            25,
            y
        );

        y += 7;

        // Ocena
        pdf.text(
            "Prosecna ocena: " + dohvatiOcenu(igra),
            25,
            y
        );

        y += 8;

        // Linija između igara
        pdf.line(20, y, 190, y);

        y += 12;
    });

    pdf.save("katalog.pdf");
}
