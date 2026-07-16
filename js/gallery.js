$(document).ready(function(){
    loadPageCarousel("shop", "shop", 5);
    loadPageCarousel("games", "games", 4);
})

function loadPageCarousel(id, folder, brojSlika){

    let html = "";

    for (let i = 1; i <= brojSlika; i++) {

        html += `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
            <img src="../img/${folder}/${i}.jpg"
                 class="img-fluid gallery-image"
                 alt="">
            </div>
        `;

    }

    $("#" + id).html(html);
}