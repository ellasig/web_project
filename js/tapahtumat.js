/*
* Kehittäjät: Tuisku Närhi
* Versio 1.2
* 5.10.2022
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

const apiurl = "https://open-api.myhelsinki.fi/v1/events/?tags_search=";

// lopullinen hakukysely, joka lähetetään nettiin.
let apiKysely;
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
    apiKysely = apiurl + hakusana;

    console.log("Lähetettävä kysely: " + apiKysely);
    let proxyKysely = proxy + encodeURIComponent(apiKysely);

    // kutsutaan fetch-jutut hoitavaa funktiota
    teeHaku(proxyKysely);        // parametrina hakulause
}

function teeHaku(proxyApiKysely)  {

    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(proxyApiKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        vastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function(error){           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}

// Funktio hoitaa kyselystä saadun json-datan käsittelyn.
// Funktio saa parametrina json-muodossa olevan datan.

function vastaus(jsonContents){
    let jsonData = JSON.parse(jsonContents.contents);
    console.log('debug koko' + jsonData.data.length)
    console.log(jsonData)
    const hakutulokset = document.getElementById('hakutulokset');
    let htmlKoodi= ``;
    hakutulokset.innerHTML = '';
    for(let i =0 ; i < jsonData.data.length ; i++){
        htmlKoodi += `             
                     <article> 
                            <header>
                                <h3>
                                ${jsonData.data[i].name.fi} </header>      
                                </h3>                
                            <p> ${jsonData.data[i].description.body} </p>
                            <link>
                                <a href = "${jsonData.data[i].info_url}" >Tapahtuman sivulle</a>
                            </link>
                     </article>           
              `;
    }
    mainElem.innerHTML = htmlKoodi;
}