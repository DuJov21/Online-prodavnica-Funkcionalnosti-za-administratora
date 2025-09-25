'use strict'

class Artikal {
    constructor(id, naziv, cena, opis) {
        this.id = id
        this.naziv = naziv
        this.cena = cena
        this.opis = opis
    }
}

const STORAGE_KEY = "proizvodi"

let proizvodi = []

function sacuvajProizvode() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(proizvodi))
}

function ucitajProizvode() {
    let sacuvano = localStorage.getItem(STORAGE_KEY)
    if (sacuvano) {
        let parsed = JSON.parse(sacuvano)
        proizvodi = parsed.map(p => new Artikal(p.id, p.naziv, p.cena, p.opis))
    } else {
        proizvodi = [
            new Artikal(1, "Monitor", 165, "Full HD monitor 24 inča"),
            new Artikal(2, "TV", 650, "Smart TV 55 inča"),
            new Artikal(3, "Miš", 20, "Bežični miš")
        ]
        sacuvajProizvode()
    }
}

function renderTabela() {
    let tbody = document.querySelector(".products-table tbody")
    tbody.innerHTML = ""

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

function dodajNoviArtikal(e) {
    e.preventDefault()

    let naziv = document.getElementById("naziv").value.trim()
    let cena = Number(document.getElementById("cena").value)
    let opis = document.getElementById("opis").value.trim()

    if (!naziv || !cena) {
        alert("Naziv i cena su obavezni!")
        return
    }

    let postoji = proizvodi.some(p => p.naziv.toLowerCase() === naziv.toLowerCase())
    if (postoji) {
        alert("Artikal sa tim nazivom već postoji!")
        return
    }

    let noviId = proizvodi.length > 0 ? Math.max(...proizvodi.map(p => p.id)) + 1 : 1
    let noviArtikal = new Artikal(noviId, naziv, cena, opis)

    proizvodi.push(noviArtikal)

    sacuvajProizvode()

    renderTabela()

    document.querySelector(".product-form").reset()
}

window.addEventListener("DOMContentLoaded", () => {
    ucitajProizvode()
    renderTabela()
    document.querySelector(".product-form").addEventListener("submit", dodajNoviArtikal)
})