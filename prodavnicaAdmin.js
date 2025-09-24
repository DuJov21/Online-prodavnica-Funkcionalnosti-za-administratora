'use strict'

class Artikal {
    constructor(id, naziv, cena, opis) {
        this.id = id
        this.naziv = naziv
        this.cena = cena
        this.opis = opis
    }
}

// Niz proizvoda
let proizvodi = [
    new Artikal(1, "Monitor", 165, "Full HD monitor 24 inča"),
    new Artikal(2, "TV", 650, "Smart TV 55 inča"),
    new Artikal(3, "Miš", 20, "Bežični miš")
]

// Funkcija za prikaz proizvoda u tabeli
function renderTabela() {
    let tbody = document.querySelector(".products-table tbody")
    tbody.innerHTML = "" // očisti prethodne redove

    proizvodi.forEach(proizvod => {
        let tr = document.createElement("tr")

        let tdId = document.createElement("td")
        tdId.textContent = proizvod.id

        let tdNaziv = document.createElement("td")
        tdNaziv.textContent = proizvod.naziv

        let tdCena = document.createElement("td")
        tdCena.textContent = proizvod.cena

        tr.appendChild(tdId)
        tr.appendChild(tdNaziv)
        tr.appendChild(tdCena)

        tbody.appendChild(tr)
    })
}
// Poziv da odmah popuni tabelu
renderTabela()