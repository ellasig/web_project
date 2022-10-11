/*
* Kehittäjät: Tuisku Närhi, Ella Sigvart, Sanna Lohkovuori
* Versio 2.1
* 8.10.2022
 */

'use strict';

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

//APIN KÄYTTÖÄ KIERRÄTYSPISTEIDEN HAKUUN

//apin dokumentaatiio ja ohjeet: https://assets.ctfassets.net/rmtbrkc0y0vp/1kkxUiiE7vrUm1FSfUYmOB/79e3ffb3724970bea230bc9d6bcb2519/kierratys.info_API_3.0_dokumentaatio.pdf
//apin osoite ilman materiaalia
const apiOsoite = 'https://api.kierratys.info/collectionspots/?api_key=cd7ea34371fd693ea010c8146a53377c62b0e4cc';
//osoite jossa mukana käyttäjän valitsema osio
let osoite;
//cors ongelmaan apuja proxy osoitteella
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
// muutetaan myös elementin classista active jolloin napin väri muuttuu
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

// lisätään hakunapille tapahtumankäsittelijä
hakunappi.addEventListener('click', teeKysely);
//event listener resetnapille, joka päivittää sivun ja samalla resetoi haut
resetnappi.addEventListener('click', function (){
    window.location.reload();
});

//funktio joka tekee api kyselyn
function teeKysely() {
    // haetaan html-sivulta käyttäjän antama hakuteksti
    let kaupunki = document.getElementById('hakuteksti').value;
    if (kaupunki === ''){
        window.alert('Anna kaupunki!');
        window.location.reload();
    }
    kaupunki = '&municipality=' + kaupunki;
    //jos materiaaleja ei ole valittu tehdään haku ilman materiaalifiltteriä
    if(materiaalit.length === 0){
        //muodostetaan kyselyn osoite
        osoite = apiOsoite + kaupunki;
        //consoliin kysely ilman materiaaleja
        console.log("Kysely ilman materiaaleja: " + osoite);
        //tehdään lopullinen hakuosoite jossa mukana proxy osa
        let proxyOsoite = proxy + encodeURIComponent(osoite);
        //kutsutaan teeHaku funktiota jonka parametrina on lopullinen hakuosoite
        teeHaku(proxyOsoite);
    }
    //jos on materiaalivalintoja:
    else {
        //listataan materiaalit arraysta pilkku välissään
        materiaalit = materiaalit.join();
        //luodaan osoite materiaalifiltterin kanssa
        osoite = apiOsoite + kaupunki + '&material=' + materiaalit;
        //consoliin osoite
        console.log("Materiaalikysely: " + osoite);
        //Luodaan lopullinen osoite proxyn ja apiosoitteen kanssa
        let proxyOsoite = proxy + encodeURIComponent(osoite);
        //kutsutaan hakufunktiota, jonka parametrina on lopullinen hakusoite
        teeHaku(proxyOsoite);
    }
    //materiaali array tyhjäksi
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
//varsinainen datan käsittely
function tulokset(json){
    //muutetaan väärässä muodossa oleva json oikeaan muotoon funktiolla
    let jsonData = JSON.parse(json.contents);
    //tulostetaan konsoliin saatu oikeassa muodossa oleva data
    console.log(jsonData)
    //haetaan elementti johon tulokset lisätään
    const hakutulokset = document.getElementById('hakutulokset');
    //muuttuja johon lisättävä koodi tallennetaan
    let htmlKoodi= ``;
    //tyhjennetään hakutulokset hakujen välissä
    hakutulokset.innerHTML = '';
    //loop jossa käydään json data läpi ja liätään tarvittavt tiedot muuttujaan
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
    //syötetään luotu koodi main elementtiin
    mainElem.innerHTML = htmlKoodi;
}
