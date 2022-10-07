/*
* Kehittäjät: Tuisku Närhi
* Versio 1.1
* 7.10.2022
* */
'use strict'

//Navbarista responsiivinen:
//Vaihdellaan responsive classia navbariin kun käyttäjä painaa ikonia
function navbarClass() {
    let nav = document.getElementById("myNavbar");
    if (nav.className === "navbar") {
        nav.className += " responsive";
    } else {
        nav.className = "navbar";
    }
}

//APIN KÄYTTÖÄ
const osoite = 'https://api.kierratys.info/collectionspots/?api_key=cd7ea34371fd693ea010c8146a53377c62b0e4cc&municipality='
// lopullinen hakukysely (jossa myös hakusana, joka lähetetään nettiin.
let apiOsoite;
//cors ongelmaan apuja
const proxy = 'https://api.allorigins.win/get?url=';

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
const mainElem = document.querySelector('main');

// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', teeKysely);

// Funktio muodostaa hakukyselyn.
// Lopuksi funktio kutsuu teeHaku() funktiota.
function teeKysely() {
    // haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    let hakusana = document.getElementById('hakuteksti').value;
    // muodostetaan ja tulostetaan konsoliin lopullinen hakukysely
    apiOsoite = osoite + hakusana;

    console.log("Lähetettävä kysely: " + apiOsoite);
    let proxyOsoite = proxy + encodeURIComponent(apiOsoite);

    // kutsutaan fetch-jutut hoitavaa funktiota
    teeHaku(proxyOsoite);        // parametrina hakulause
}
function teeHaku(proxyHaku)  {

    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(proxyHaku).then(function(response) {
        return response.json();
    }).then(function(json) {
        tulokset(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function(error){           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}
function tulokset(json){
    let jsonData = JSON.parse(json.contents);
    console.log('debug koko' + jsonData.data.length)
    console.log(jsonData)
    const hakutulokset = document.getElementById('hakutulokset');
    let htmlKoodi= ``;
    hakutulokset.innerHTML = '';
    for(let i =0 ; i < jsonData.data.length ; i++){
        htmlKoodi += `<article> 
                            <header>
                                <h3>
                                ${jsonData.data[i].name.fi} </header>      
                                </h3>                
                            <p> ${jsonData.data[i].description.body} </p>
                            <link>
                                <a href = "${jsonData.data[i].info_url}" >Tapahtuman sivulle</a>
                            </link>
                     </article>`;
    }
    mainElem.innerHTML = htmlKoodi;
}