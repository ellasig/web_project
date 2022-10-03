/*
* Kehittäjät: Tuisku Närhi, Ella Sigvart, Sanna Lohkovuori
* Versio 1.1
* 1.10.2022
* */

'use strict'

//Käytetään APIa tälle sivulle.

const apiurl = "https://open-api.myhelsinki.fi/v1/events/?tags_search=flea%20markets";

// lopullinen hakukysely, joka lähetetään nettiin.
let apiKysely;

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
const hakukentta = document.getElementById('haku');
const mainElem = document.querySelector('main');