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
//apin dokumentaatiio ja ohjeet: https://assets.ctfassets.net/rmtbrkc0y0vp/1kkxUiiE7vrUm1FSfUYmOB/79e3ffb3724970bea230bc9d6bcb2519/kierratys.info_API_3.0_dokumentaatio.pdf
//apin osoite ilman materiaalia
const osoite = 'https://api.kierratys.info/collectionspots/?api_key=cd7ea34371fd693ea010c8146a53377c62b0e4cc&municipality=';
//osoite jossa mukana käyttäjän valitsema osio
let apiOsoite;
//cors ongelmaan apuja
const proxy = 'https://api.allorigins.win/get?url=';

// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const mainElem = document.querySelector('main');
const hakunappi = document.getElementById("hakunappi");
const resetnappi = document.getElementById('reset');
const tekstiiliElem = document.getElementById('tekstiili');
const purkuElem = document.getElementById('purkujate');
const puuElem = document.getElementById('puu');
const lamppuElem = document.getElementById('lamput');
const sahkoElem = document.getElementById('sahko');
const vaarallinenElem = document.getElementById('vaarallinen');
//array materiaalivalinnoille
let materiaalit = [];

//event listenerit jokaiselle materiaalinapille. Materiaalin koodi lisätään arrayhyn
// muutetaan myös elementin classista active napin väri muuttuu
tekstiiliElem.addEventListener("click", function(){
    tekstiiliElem.className = 'active';
    materiaalit.push('113');

});
purkuElem.addEventListener("click", function(){
    purkuElem.className = 'active';
    materiaalit.push('119');
});
puuElem.addEventListener("click", function(){
    puuElem.className = 'active';
    materiaalit.push('117');
});
lamppuElem.addEventListener("click", function(){
    lamppuElem.className = 'active';
    materiaalit.push('116');
});
sahkoElem.addEventListener("click", function(){
    sahkoElem.className = 'active';
    materiaalit.push('109');
});
vaarallinenElem.addEventListener("click", function() {
    vaarallinenElem.className = 'active';
    materiaalit.push('108');
});

// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', teeKysely);
//event listener napille, joka päivittää sivun ja samalla resetoi haut
resetnappi.addEventListener('click', function (){
    window.location.reload();
});


function teeKysely() {
    // haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    let kaupunki = document.getElementById('hakuteksti').value;
    //jos materiaaleja ei ole valittu:
    if(materiaalit.length === 0){
        apiOsoite = osoite + kaupunki;
        console.log("Kysely ilman materiaaleja: " + apiOsoite);
        let proxyOsoite = proxy + encodeURIComponent(apiOsoite);

        teeHaku(proxyOsoite);
    }
    else {
        materiaalit = materiaalit.join();
        apiOsoite = osoite + kaupunki + '&material=' + materiaalit;
        console.log("Materiaalikysely: " + apiOsoite);
        let proxyOsoite = proxy + encodeURIComponent(apiOsoite);

        teeHaku(proxyOsoite);
    }
    materiaalit = '';
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
    console.log('debug koko' + jsonData.results.length)
    console.log(jsonData)
    const hakutulokset = document.getElementById('hakutulokset');
    let htmlKoodi= ``;
    hakutulokset.innerHTML = '';
    for(let i =0 ; i < jsonData.results.length ; i++){
        htmlKoodi += `<article class="pisteet"> 
                         <header>
                            <h3> ${jsonData.results[i].name} </h3>   
                         </header>      
                         ${jsonData.results[i].description_fi}
                         <p>Osoite: <br> ${jsonData.results[i].address}</p>
                         <p>Ylläpitäjä: <br>${jsonData.results[i].operator}</p> 
                      </article>`;
    }
    mainElem.innerHTML = htmlKoodi;
}