$(document).ready(function() {

    $("#srLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("sr");
    });

    $("#enLang").click(function (e) {
        e.preventDefault();
        changeLanguageTo("en");
    });

    loadTranslations("cart");
    document.title = translations[currentLanguage].cart.title;

    loadCart();

    $("#order").on("click", () => orderCart());

    document.getElementById("fullName").addEventListener("focus", function () {
        resetErrors();

    });
    document.getElementById("city").addEventListener("focus", function () {
        resetErrors();

    });
    document.getElementById("phone").addEventListener("focus", function () {
        resetErrors();

    });

    document.getElementById("address").addEventListener("focus", function () {
        resetErrors();

    });
    document.getElementById("postalCode").addEventListener("focus", function () {
        resetErrors();
    });
    document.getElementById("fullName").addEventListener("input", function () {

        this.value = this.value.replace(/[^a-zA-ZčćžšđČĆŽŠĐ\s]/g, "");
    });
    document.getElementById("city").addEventListener("input", function () {

        this.value = this.value.replace(/[^a-zA-ZčćžšđČĆŽŠĐ\s]/g, "");
    });
    document.getElementById("phone").addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");
    });
    document.getElementById("postalCode").addEventListener("input", function () {

        this.value = this.value.replace(/\D/g, "");
    });

    let poslednjaPozicija = $(window).scrollTop();
    let visinaNavbara = $(".store-header").outerHeight() +100;

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

var totalPrice = 0;
function loadCart() {
    var cart = dohvatiKorpu();
    var games = dohvatiIgre();

    var lista = document.getElementById("listaKorpe");

    lista.innerHTML = "";

    totalPrice = 0;

    for (var i = 0; i < cart.length; i++) {

        var item = cart[i];
        var game = games.find(x => x.id === Number(item.id));


        var total = (game.akcija != null ? game.akcija.novaCena : game.cena)  * item.count;
        totalPrice += total;

        lista.innerHTML += `
            <div class="list-group-item py-3">
                <div class="row align-items-center">
                    <div class="col-md-2 text-center">
                        <img src="../img/${game.folder}/1.jpg" class="img-fluid rounded" style="max-height:120px;">
                    </div>
        
                    <div class="col-md-4">
                        <h5 class="mb-2">${game.naziv}</h5>
                        <p class="text-muted mb-0">${game.akcija != null ? game.akcija.novaCena + " RSD" : game.cena + " RSD"}</p>
                    </div>
        
                    <div class="col-md-3 text-center">
        
                        <label class="form-label mb-2"> ${translations[currentLanguage].cart["cart-quantity"]}</label>
        
                        <div class="btn-group">
                            <button class="btn btn-outline-dark" onclick="promeniKolicinu(${game.id},-1)">-</button>
                            <button class="btn btn-light" disabled>${item.count}</button>
                            <button class="btn btn-outline-dark" onclick="promeniKolicinu(${game.id},1)">+</button>
                        </div>
                    </div>
        
                    <div class="col-md-2 text-end">
                        <h6>${total} RSD</h6>
                    </div>
        
                    <div class="col-md-1 text-end">
                        <button class="btn" onclick="promeniKolicinu(${game.id}, -${item.count})"><img src="../img/delete.png"></button>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("ukupnaCena").innerHTML =
        totalPrice + " RSD";
}

function promeniKolicinu(id, amount) {

    var cart = dohvatiKorpu();
    var item = cart.find(x => x.id === Number(id));

    if (!item) return;

    var data = dohvatiIgre();
    var igra = data.find(x => x.id === Number(id));

    if (!igra) return;

    // Povećanje količine
    if (amount > 0) {

        if (igra.stanje === 0)
            return;

        igra.stanje--;
        item.count++;

    }
    // Smanjenje količine
    else {

        item.count--;

        igra.stanje++;

        if (item.count <= 0) {
            ukloniIzKorpe(id);
        } else {
            sacuvajKorpu(cart);
        }
    }

    sacuvajIgre(data);
    loadCart();
}


function orderCart() {
    console.log("Klik")
    if (!validateForm())
        return;

    var cart = dohvatiKorpu();

    if (cart.length === 0) {
        resetForm();
        return;
    }

    var orders = JSON.parse(localStorage.getItem("orders")) || [];

    var order = {

        datum: new Date().toLocaleDateString("sr-RS"),

        dostava: {
            ime: $("#fullName").val().trim(),
            telefon: $("#phone").val().trim(),
            adresa: $("#address").val().trim(),
            grad: $("#city").val().trim(),
            postanskiBroj: $("#postalCode").val().trim()
        },

        ukupnaCena: totalPrice,

        proizvodi: [...cart]

    };

    orders.push(order);

    localStorage.setItem("orders", JSON.stringify(orders));

    sacuvajKorpu([]);
    resetForm();
    loadCart();

}

function validateForm(){
    var name = document.getElementById("fullName").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var address = document.getElementById("address").value.trim();
    var postalCode = document.getElementById("postalCode").value.trim();
    var city = document.getElementById("city").value.trim();

    document.getElementById("fullNameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("addressError").textContent = "";
    document.getElementById("postalCodeError").textContent = "";
    document.getElementById("cityError").textContent = "";

    if (name === "") {
        document.getElementById("fullNameError").textContent =
            translations[currentLanguage].cart["enter-full-name"];
        return false;
    }

    if (phone === "") {
        document.getElementById("phoneError").textContent =
            translations[currentLanguage].cart["enter-phone"];
        return false;
    }

    if (address === "") {
        document.getElementById("addressError").textContent =
            translations[currentLanguage].cart["enter-address"];
        return false;
    }

    if (postalCode === "") {
        document.getElementById("postalCodeError").textContent =
            translations[currentLanguage].cart["enter-postal-code"];
        return false;
    }

    if (city === "") {
        document.getElementById("cityError").textContent =
            translations[currentLanguage].cart["enter-city"];
        return false;
    }

    return true;
}

function resetForm(){
    document.getElementById("fullName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("postalCode").value = "";
    document.getElementById("city").value = "";
}

function resetErrors() {
    document.getElementById("fullNameError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("addressError").textContent = "";
    document.getElementById("postalCodeError").textContent = "";
    document.getElementById("cityError").textContent = "";
}

function izracunajUkupnuCenu() {

    var total = 0;

    var cart = dohvatiKorpu();

    for (var item of cart) {

        var cena = item.discount > 0
            ? item.price * (100 - item.discount) / 100
            : item.price;

        total += cena * item.count;

    }

    return total;
}
