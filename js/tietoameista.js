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

//lisätään event listenerit ja kutsutaan samalla funktiota
//kun hiiri on Ellan kuvan päällä, tekstikenttään tulee infoteksti Ellasta
ellaImg.addEventListener("mouseenter", function (){
    console.log('enter');
    pElem.innerText = 'Hei! Olen Ella, tulin muutaman työvuoden jälkeen takaisin koulun penkille. Löysin intoni koodaamiseen vasta vuosi sitten ja intoni opiskeluun on vain kasvanut.';
});
//kun hiiri lähtee kuvan päältä, tekstikenttä tyhjennetään kokonaan
ellaImg.addEventListener('mouseleave',function (){
    console.log('leave');
   pElem.innerText=''
});

//jokaiselle omat eventlistenerit ja funktiot samalla tyylillä
tuiskuImg.addEventListener("mouseenter", function (){
    console.log('enter');
    pElem.innerText = 'Moikka! Olen Tuisku, nuori nainen helsingistä. Aloitin opiskelun metropoliassa muutaman välivuoden jälkeen.' +
        ' Aloitin koodaamisen vasta puolisen vuotta sitten eli minulla on vielä paljon opittavaa. ';
});
tuiskuImg.addEventListener('mouseleave',function (){
    console.log('leave');
    pElem.innerText=''
});
sannaImg.addEventListener("mouseenter", function (){
    console.log('enter');
    pElem.innerText = 'Moi, olen Sanna. Tein muutamia vuosia töitä ennenkuin päätin hakea opiskelemaan ja löysinkin mieluisen alan helposti. ' +
        'Nautin erityisesti matematiikasta, fysiikasta ja ohjelmoinnista.';
});
sannaImg.addEventListener('mouseleave',function (){
    console.log('leave');
    pElem.innerText=''
});