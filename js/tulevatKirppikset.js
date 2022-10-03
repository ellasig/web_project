/*
* Kehittäjät: Tuisku Närhi, Ella Sigvart, Sanna Lohkovuori
* Versio 1.1
* 1.10.2022
* */

'use strict'

//Käytetään APIa tälle sivulle.

const apiurl = "https://open-api.myhelsinki.fi/v1/events/?tags_search=";

// lopullinen hakukysely, joka lähetetään nettiin.
let apiKysely;

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

    // kutsutaan fetch-jutut hoitavaa funktiota
    teeHaku(apiKysely);        // parametrina hakulause
}

// Funktio saa parametrina hakulauseen.
function teeHaku(apiKysely)  {

    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(apiKysely).then(function(response) {
        return response.json();
    }).then(function(json) {
        vastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function(error){           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}

// Funktio hoitaa kyselystä saadun json-datan käsittelyn.
// Funktio saa parametrina json-muodossa olevan datan.

function vastaus(jsonData){
    const hakutulokset = document.getElementById('hakutulokset');
    hakutulokset.innerHTML = '';
    for(let i =0 ; i < jsonData.length ; i++){
        let htmlKoodi = `
              <main> 
                     <article> 
                            <header> ${jsonData[i].name} </header> 
                        
                            <p> ${jsonData[i].description} </p>
                            <p>
                                <a href = "${jsonData[i]}.url" >Tapahtuman sivulle</a>
                            </p>
                     </article>
              </main>
              `;
        mainElem.innerHTML += htmlKoodi;
    }
}