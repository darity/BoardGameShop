function dohvatiKorpu() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function sacuvajKorpu(korpa) {
    localStorage.setItem("cart", JSON.stringify(korpa));
}

function ucitajKorpu(){

    const korpa = dohvatiKorpu();

    $("#cartItems").html("");

    korpa.forEach(stavka=>{

        const igra = dohvatiIgruPoId(stavka.id);

        $("#cartItems").append(`
            ...
        `);

    });

}

function dodajUKorpu(id){
    //ocistiKorpu()
    var korpa = dohvatiKorpu();

    let stavka = korpa.find(x => x.id === Number(id));

    if(!stavka){
        korpa.push({
            id: Number(id),
            count: 1
        })
    }else{
        stavka.count++;
    }

    sacuvajKorpu(korpa);
}

function ukloniIzKorpe(id){
    var korpa = dohvatiKorpu();

    korpa.filter(x => x.id !== Number(id));

    sacuvajKorpu(korpa);
}

function ocistiKorpu(){
    sacuvajKorpu([]);
}

function brojProizvoda(){
    return dohvatiKorpu().reduce((sum, stavka) => sum + stavka.count, 0);
}

function dohvatiStavkuIzKorpe(id){
    return dohvatiKorpu().find(x => x.id === Number(id));
}

function ucitajSidebar(id){
    const igra = dohvatiIgruPoId(id);


    $("#sidebarImage").attr("src",
        `../img/${igra.folder}/1.jpg`);

    $("#sidebarName").text(igra.naziv);

    $("#sidebarPrice").text(igra.cena + " RSD");

    $("#cartSidebar").addClass("show");

    $(".cart-progress").removeClass("run");

    void $(".cart-progress")[0].offsetWidth;

    $(".cart-progress").addClass("run");

    $(".close-cart").click(function(){

        $("#cartSidebar").removeClass("show");

    });

    setTimeout(function(){

        $("#cartSidebar").removeClass("show");

    },5000);
}