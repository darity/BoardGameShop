function dohvatiFavorite() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function sacuvajFavorite(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(id) {
    idT = Number(id);

    let favorites = dohvatiFavorite();

    if (favorites.includes(idT)) {
        favorites = favorites.filter(x => x !== idT);
    } else {
        favorites.push(idT);
    }

    sacuvajFavorite(favorites);
}

function jeFavorite(id) {
    return dohvatiFavorite().includes(Number(id));
}

function prikaziFavorite(id) {
    const heart = $("#heart");

    if (jeFavorite(id)) {
        heart.attr("src", "../img/heartFull.png");
    } else {
        heart.attr("src", "../img/heartEmpty.png");
    }
}