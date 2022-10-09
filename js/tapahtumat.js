/*
* Kehittäjät: Tuisku Närhi, Sanna Lohkovuori, Ella Sigvart
* Versio 1.2
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
//APIN dokumentaatio ja ohjeet: https://open-api.myhelsinki.fi/doc#

//apin osoitteen alkuosa muuttujaksi
const apiOsoite = "https://open-api.myhelsinki.fi/v1/events/?tags_search=";
//osoite jossa mukana käyttäjän hakusana
let apiKysely;
//cors ongelmaan apuja proxyosoitteelle
const proxy = 'https://api.allorigins.win/get?url=';

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
const mainElem = document.querySelector('main');

// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', teeKysely);

// Funktio muodostaa hakukyselyn.
// Lopuksi funktio kutsuu teeHaku() funktiota.
function teeKysely() {
    // haetaan html-sivulta käyttäjän antama hakuteksti
    let hakusana = document.getElementById('hakuteksti').value;
    // muodostetaan ja tulostetaan konsoliin hakukysely
    apiKysely = apiOsoite + hakusana;
    console.log("Lähetettävä kysely: " + apiKysely);
    //muodostetaan lopullinen proxykysely, joka lähetetään
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
    //muutetaan väärässä muodossa oleva json oikeaan muotoon funktiolla
    let jsonData = JSON.parse(jsonContents.contents);
    //tulostetaan konsoliin saatu oikeassa muodossa oleva data
    console.log(jsonData)
    //haetaan elementti johon tulokset lisätään
    const hakutulokset = document.getElementById('hakutulokset');
    //muuttuja johon lisättävä koodi tallennetaan
    let htmlKoodi= ``;
    //tyhjennetään hakutulokset hakujen välissä
    hakutulokset.innerHTML = '';
    //loop jossa käydään json data läpi ja liätään tarvittavt tiedot muuttujaan
    for(let i =0 ; i < jsonData.data.length ; i++){
        htmlKoodi += `             
                     <article> 
                            <header>
                                <h3>
                                ${jsonData.data[i].name.fi}      
                                </h3>            
                            </header>    
                            <p> ${jsonData.data[i].description.body} </p>
                            <link>
                                <a href = "${jsonData.data[i].info_url}" >Tapahtuman sivulle</a>
                            </link>
                     </article>           
              `;
    }
    //syötetään luotu koodi main elementtiin
    mainElem.innerHTML = htmlKoodi;
}