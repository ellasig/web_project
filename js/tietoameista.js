/*
* Kehittäjät: Tuisku Närhi, Ella Sigvart, Sanna Lohkovuori
* Versio 1.1
* 1.10.2022
* */

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

/*
* Tehdään eventlistener jossa kun käyttäjä vie hiiren kuvan päälle tulee tekstiä kyseisestä henkilöstä.
* jokaiselle omat kuvat ja listenerit*/

//haetaan tarvittavat elementit
const pElem = document.getElementById('henkiloTietoa');
const ellaImg = document.getElementById('ellaKuva');
const tuiskuImg = document.getElementById('tuiskuKuva');
const sannaImg = document.getElementById('sannaKuva');

//lisätään event listenerit

//kun hiiri Ellan kuvan päällä tekstikenttään tulee teksti Ellasta
ellaImg.addEventListener("mouseenter", function (){
    console.log('enter');
    pElem.innerText = 'Hei! Olen Ella, tulin muutaman työvuoden jälkeen takaisin koulun penkille. Löysin intoni koodaamiseen vasta vuosi sitten ja intoni opiskeluun on vain kasvanut.';
});
//kun hiiri lähtee kuvan päältä, tekstikenttä tyhjennetään kokonaan
ellaImg.addEventListener('mouseleave',function (){
    console.log('leave');
   pElem.innerText=''
});

//jokaiselle omat samalla tyylillä
tuiskuImg.addEventListener("mouseenter", function (){
    console.log('enter');
    pElem.innerText = 'Moikka! Olen Tuisku, nuori nainen helsingistä. Aloitin opiskelun metropoliassa muutaman välivuoden jälkeen.' +
        ' Aloitin koodaamisen vasta kun aloitin koulussa joten olen nyt koodannut puolisen vuotta. Paljon on opittavaa siis. ' +
        ' ' ;
});
tuiskuImg.addEventListener('mouseleave',function (){
    console.log('leave');
    pElem.innerText=''
});
sannaImg.addEventListener("mouseenter", function (){
    console.log('enter');
    pElem.innerText = 'Olen Sanna, niin ja näin vanha, mitä haluut kertoo itestäs :)';
});
sannaImg.addEventListener('mouseleave',function (){
    console.log('leave');
    pElem.innerText=''
});