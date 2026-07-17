$(document).ready(function(){
    loadOrders();

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

function loadOrders() {

    var orders = JSON.parse(localStorage.getItem("orders")) || [];

    var lista = document.getElementById("ordersList");

    lista.innerHTML = "";

    if (orders.length === 0) {

        lista.innerHTML = `
            <div class="text-center p-5">
                <h4>Nemate prethodnih porudžbina.</h4>
            </div>
        `;

        return;
    }

    orders.reverse();

    for (let order of orders) {

        let proizvodi = "";

        for (let item of order.proizvodi) {
            var game = dohvatiIgruPoId(item.id)
            proizvodi += `
        <div class="d-flex align-items-center mb-2">

            <img
                src="../img/${game.folder}/1.jpg"
                class="rounded me-3"
                style="width:55px;height:55px;object-fit:cover;">

            <div class="flex-grow-1">

                <div class="fw-semibold">
                    ${game.naziv}
                </div>

            </div>

            <span class="badge ">
                ×${item.count}
            </span>
            
        </div>
        
    `;
        }

        lista.innerHTML += `
    <div class="list-group-item py-4">
    
        <div class="row">
    
            <div class="col-md-9">
    
                <div class="d-flex align-items-center mb-3">
    
                    <h5 class="mb-0">
                        ${order.datum}
                    </h5>
    
                </div>
    
                ${proizvodi}
    
            </div>
    
            <div class="col-md-3 text-end">
    
                <small class="text-muted d-block mb-1">
                    Ukupna cena
                </small>
    
                <h4 class="fw-bold mb-0">
                    ${order.ukupnaCena} RSD
                </h4>
    
            </div>
    
        </div>
    
</div>

`;
    }

}