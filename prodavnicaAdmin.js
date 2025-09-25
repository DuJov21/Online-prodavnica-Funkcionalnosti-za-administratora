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

        tr.addEventListener("click", () => prikaziDetalje(proizvod))

        tbody.appendChild(tr)
    })
}
function prikaziDetalje(proizvod) {
    document.getElementById("detail-naziv").textContent = proizvod.naziv
    document.getElementById("detail-cena").textContent = proizvod.cena
    document.getElementById("detail-opis").textContent = proizvod.opis
}

// Funkcija za dodavanje novog artikla iz forme
function dodajNoviArtikal(e) {
    e.preventDefault() // sprečava reload stranice

    let naziv = document.getElementById("naziv").value.trim()
    let cena = Number(document.getElementById("cena").value)
    let opis = document.getElementById("opis").value.trim()

    if (!naziv || !cena) {
        alert("Naziv i cena su obavezni!")
        return
    }

    // Provera da li artikal već postoji po nazivu
    let postoji = proizvodi.some(p => p.naziv.toLowerCase() === naziv.toLowerCase())
    if (postoji) {
        alert("Artikal sa tim nazivom već postoji!")
        return
    }

    // Kreiramo novi artikal sa sledećim ID
    let noviId = proizvodi.length > 0 ? proizvodi[proizvodi.length - 1].id + 1 : 1
    let noviArtikal = new Artikal(noviId, naziv, cena, opis)

    // Dodaj u niz
    proizvodi.push(noviArtikal)

    // Ponovo iscrtaj tabelu
    renderTabela()

    // Očisti formu
    document.querySelector(".product-form").reset()
}
// Poziv da odmah popuni tabelu
renderTabela()
document.querySelector(".product-form").addEventListener("submit", dodajNoviArtikal)