const kategorije = {
    "Strategije": "Strategije.html",
    "Porodične": "Porodicne.html",
    "Zabavne":"Zabavne.html",
};

const pocetniPodaci = {
        igre: [
            {
                id: 1,
                naziv: "Settlers of Catan",
                kategorija: "Strategije",
                proizvodjac: "Catan Studio",
                opis: "Izgradi naselja, trguj resursima i osvoji ostrvo Catan u jednoj od najpoznatijih strateških društvenih igara.",
                kratakOpis: "Klasična igra trgovine i izgradnje.",
                folder: "catan",
                brojSlika: 3,
                brojIgraca: "3-4",
                trajanje: "90 min",
                uzrast: "10+",
                jezik: "Srpski",
                cena: 5999
            },
            {
                id: 2,
                naziv: "Ticket to Ride",
                kategorija: "Porodične",
                proizvodjac: "Days of Wonder",
                opis: "Poveži gradove železničkim rutama i osvoji najviše poena pažljivim planiranjem.",
                kratakOpis: "Porodična igra planiranja železničkih ruta.",
                folder: "ticket",
                brojSlika: 3,
                brojIgraca: "2-5",
                trajanje: "60 min",
                uzrast: "8+",
                jezik: "Srpski",
                cena: 5499
            },
            {
                id: 3,
                naziv: "Dixit",
                kategorija: "Porodične",
                proizvodjac: "Libellud",
                opis: "Koristi maštu i asocijacije kako bi pogodio pravu ilustraciju i osvojio poene.",
                kratakOpis: "Igra mašte i kreativnosti.",
                folder: "dixit",
                brojSlika: 3,
                brojIgraca: "3-6",
                trajanje: "30 min",
                uzrast: "8+",
                jezik: "Srpski",
                cena: 4299
            },
            {
                id: 4,
                naziv: "Codenames",
                kategorija: "Zabavne",
                proizvodjac: "Czech Games Edition",
                opis: "Timska igra reči u kojoj pogađate tajne agente pomoću pažljivo odabranih tragova.",
                kratakOpis: "Brza i zabavna timska igra.",
                folder: "codenames",
                brojSlika: 3,
                brojIgraca: "4-8",
                trajanje: "20 min",
                uzrast: "10+",
                jezik: "Srpski",
                cena: 3599
            },
            {
                id: 5,
                naziv: "Azul",
                kategorija: "Strategije",
                proizvodjac: "Plan B Games",
                opis: "Sakupljaj keramičke pločice i ukrasi kraljevsku palatu uz pažljivo planiranje poteza.",
                kratakOpis: "Elegantna apstraktna strategija.",
                folder: "azul",
                brojSlika: 3,
                brojIgraca: "2-4",
                trajanje: "45 min",
                uzrast: "8+",
                jezik: "Engleski",
                cena: 4899
            },
            {
                id: 6,
                naziv: "Pandemic",
                kategorija: "Strategije",
                proizvodjac: "Z-Man Games",
                opis: "Sarađujte kao tim stručnjaka i spasite svet od širenja opasnih epidemija.",
                kratakOpis: "Kooperativna igra spašavanja sveta.",
                folder: "pandemic",
                brojSlika: 3,
                brojIgraca: "2-4",
                trajanje: "45 min",
                uzrast: "8+",
                jezik: "Engleski",
                cena: 5799
            },
            {
                id: 7,
                naziv: "7 Wonders",
                kategorija: "Strategije",
                proizvodjac: "Repos Production",
                opis: "Razvij svoju civilizaciju, gradi čuda sveta i nadmudri protivnike.",
                kratakOpis: "Razvoj civilizacije kroz draft karata.",
                folder: "7wonders",
                brojSlika: 3,
                brojIgraca: "3-7",
                trajanje: "35 min",
                uzrast: "10+",
                jezik: "Srpski",
                cena: 6299
            },
            {
                id: 8,
                naziv: "Carcassonne",
                kategorija: "Porodične",
                proizvodjac: "Hans im Glück",
                opis: "Postavljaj pločice, gradi gradove i osvajaj teritorije u srednjovekovnoj Francuskoj.",
                kratakOpis: "Klasik među igrama sa pločicama.",
                folder: "carcassonne",
                brojSlika: 3,
                brojIgraca: "2-5",
                trajanje: "45 min",
                uzrast: "7+",
                jezik: "Srpski",
                cena: 3899
            },
            {
                id: 9,
                naziv: "Splendor",
                kategorija: "Porodične",
                proizvodjac: "Space Cowboys",
                opis: "Skupljaj dragulje, razvij trgovinu i postani najugledniji renesansni trgovac.",
                kratakOpis: "Brza igra ekonomije i razvoja.",
                folder: "splendor",
                brojSlika: 3,
                brojIgraca: "2-4",
                trajanje: "30 min",
                uzrast: "10+",
                jezik: "Srpski",
                cena: 4699
            },
            {
                id: 10,
                naziv: "King of Tokyo",
                kategorija: "Zabavne",
                proizvodjac: "IELLO",
                opis: "Preuzmi ulogu džinovskog čudovišta i osvoji Tokio bacanjem kockica i specijalnim moćima.",
                kratakOpis: "Haotična igra čudovišta i kockica.",
                folder: "tokyo",
                brojSlika: 3,
                brojIgraca: "2-6",
                trajanje: "30 min",
                uzrast: "8+",
                jezik: "Engleski",
                cena: 4399
            },
            {
                id: 11,
                naziv: "Terraforming Mars",
                kategorija: "Strategije",
                proizvodjac: "FryxGames",
                opis: "Upravljaj korporacijom i pretvori Mars u planetu pogodnu za život.",
                kratakOpis: "Duboka strateška igra razvoja Marsa.",
                folder: "mars",
                brojSlika: 3,
                brojIgraca: "1-5",
                trajanje: "120 min",
                uzrast: "12+",
                jezik: "Engleski",
                cena: 8999
            },
            {
                id: 12,
                naziv: "Exploding Kittens",
                kategorija: "Zabavne",
                proizvodjac: "Exploding Kittens",
                opis: "Luda kartaška igra puna mačaka, eksplozija i neočekivanih obrta.",
                kratakOpis: "Brza i humoristična kartaška igra.",
                folder: "kittens",
                brojSlika: 3,
                brojIgraca: "2-5",
                trajanje: "15 min",
                uzrast: "7+",
                jezik: "Srpski",
                cena: 2499,
            }
        ]
};

function prosecnaOcena(komentari) {

    if (komentari.length === 0)
        return 0;

    const suma = komentari.reduce((suma, komentar) => suma + komentar.ocena, 0);

    return (suma / komentari.length).toFixed(1);
}

function inicijalizujIgre(){
    console.log("Inicijalizacija");
    if(localStorage.getItem("globalData") != null)
        return;

    let podaci = structuredClone(pocetniPodaci);

    podaci.igre.forEach(igra => {

        igra.komentari = generisiKomentare();

        igra.akcija = generisiAkciju(igra.cena);
        if(igra.akcija == null)
            igra.novo = generisiNovo();

        igra.stanje = generisiStanje();

    });

    localStorage.setItem("globalData", JSON.stringify(podaci));

}

function generisiDatum() {

    const pocetak = new Date(2026, 6, 1);   // 1.7.2026.
    const kraj = new Date(2026, 11, 31);    // 31.12.2026.

    const datum = new Date(
        pocetak.getTime() +
        Math.random() * (kraj.getTime() - pocetak.getTime())
    );

    const dan = String(datum.getDate()).padStart(2, "0");
    const mesec = String(datum.getMonth() + 1).padStart(2, "0");
    const godina = datum.getFullYear();

    return `${dan}.${mesec}.${godina}.`;
}

function randomElement(niz) {
    return niz[Math.floor(Math.random() * niz.length)];
}

function generisiOcene() {

    const ocene = [];

    const broj = Math.floor(Math.random() * 15) + 5;

    for(let i = 0; i < broj; i++){

        ocene.push(Math.floor(Math.random() * 2) + 4);

    }

    return ocene;
}

function generisiStanje() {

    return Math.floor(Math.random() * 21); // 0-20

}

function generisiKomentare() {

    const komentari = [];

    const broj = Math.floor(Math.random() * 5) + 2;

    for(let i = 0; i < broj; i++){

        komentari.push({

            korisnik:
                randomElement(IMENA) +
                " " +
                randomElement(PREZIMENA),

            ocena:
                Math.floor(Math.random() * 2) + 4,

            tekst:
                randomElement(KOMENTARI),

            datum: generisiDatum()

        });

    }

    return komentari;
}

function generisiAkciju(cena){

    if(Math.random() < 0.4){

        const popust = [10,15,20,25,30];

        const procenat = randomElement(popust);

        return {
            popust: procenat,

            novaCena:
                Math.round(cena * (1 - procenat / 100)),

            trajeDo: generisiDatum()

        };

    }

    return null;

}

const IMENA = [
    "Marko",
    "Nikola",
    "Jovana",
    "Ana",
    "Sara",
    "Milica",
    "Stefan",
    "Petar",
    "Luka",
    "Marija",
    "Mina",
    "Aleksandar",
    "Kristina",
    "Teodora",
    "Vuk",
    "Filip"
];

const PREZIMENA = [
    "Petrović",
    "Jovanović",
    "Nikolić",
    "Ilić",
    "Marković",
    "Pavlović",
    "Kostić",
    "Đorđević",
    "Popović",
    "Milošević"
];

const KOMENTARI = [
    "Odlična igra, preporučujem!",
    "Veoma zabavna za celu porodicu.",
    "Komponente su odličnog kvaliteta.",
    "Igramo je skoro svakog vikenda.",
    "Pravila su jednostavna i brzo se nauče.",
    "Jedna od najboljih igara koje posedujem.",
    "Odličan odnos cene i kvaliteta.",
    "Kupio bih je ponovo bez razmišljanja.",
    "Idealna za druženje sa prijateljima.",
    "Svaka partija je drugačija.",
    "Preporuka za sve ljubitelje društvenih igara.",
    "Odlična strateška igra.",
    "Lepo izgleda i još je zabavnija.",
    "Vredi svake pare.",
    "Brzo prođe vreme dok se igra."
];



function dohvatiIgre() {
    return JSON.parse(localStorage.getItem("globalData")).igre;
}

function sacuvajIgre(data) {
    var globalData = JSON.parse(localStorage.getItem("globalData"));

    globalData.igre = data;

    localStorage.setItem("globalData", JSON.stringify(globalData));
}


function dohvatiIgruPoId(id) {
    return dohvatiIgre().find(i => i.id == id);
}

function dohvatiCenu(igra){
    return igra.cena;
}

function dohvatiOcenu(igra) {
    return prosecnaOcena(igra.komentari);
}

function generisiNovo() {
    return Math.random() < 0.5; // oko 30% igara će biti nove
}

