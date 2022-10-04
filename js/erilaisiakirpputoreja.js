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

const picArray = [

    {
        title: 'Fida',
        caption: '',
        description: 'Fida on kotimainen hyväntekeväisyysmyymäläketju. Löydät heiltä vaatteita, huonekaluja ja harrastustarvikkeita. Otamme vastaan hyvänkuntoisia vaatteita, huonekaluja ja muuta kodin irtaimistoa. ',
        filename: 'kuvat/fida_logo.jpg'

    },
    {
        title: 'UFF',
        caption: '',
        description: 'UFF on yleishyödyllinen säätiö, joka ylläpitää vaatekeräyspalvelua Suomessa sekä tukee globaalikehitystyötä Afrikassa ja Aaasiassa. UFF:lta löytyy vaatteille lahjoituslaatikoita ympäri kaupunkeja sekä heidän toimipisteelle voi toimittaa ehjiä ja puhtaita vaatteita sekä tekstiilejä.',
        filename: 'kuvat/uff.jpg'
    },

    {
        title: 'Relove',
        caption: '',
        description: 'Relovessa laadukkaita second hand-aarteita sekä kahvilassa tarjoillaan aamiaista, lounasta ja käsintehtyjö leipomuksia viikon jokaisena päivänä',
        filename: 'kuvat/relove.jpg'
    },

    {
        title: 'Kierrätyskeskus',
        caption: '' ,
        description: 'Kierrätyskeskuksella on pääkaupungiseudulla 12 kierrätysmyymälää sekä valtakunnallisesti toimiva verkkokauppa. Heille voi viedä ehjät ja tarpeettomat esineet, huonekalut sekä vaatteet. Kierrätyskeskusella on myös noutopalvelu isomille huonekaluille.',
        filename: 'kuvat/kierratyskeskus1.jpeg'
    },

    {
        title:'HELSINKI FLEA MARKET',
        caption: '',
        description: 'Helsinki flea market on uusi itsepalvelukirpputori joka sijaitsee Töölössä, Helsingin virkistysalueen sydämessä. Kaikki varattavissa olevat pöydät ovat rakennettu kierrätysmateriaaleista esimerkiksi teholaivoista ja melamiinilevyistä. Heiltä löytyy myös mobiilisovellus mistä voi seurata omia myyntejä ja luomaan hintalappuja suoraan kotisohvalta.',
        filename: 'kuvat/fleamarket.jpg'
    }

    ];

const mainElem = document.querySelector('main');

for (let i = 0; i < picArray.length; i++) {

    let articleElem = document.createElement('article');

    let headerElem = document.createElement('header');
    let h2Elem = document.createElement('h2');
    h2Elem.innerHTML = picArray[i].title

    headerElem.appendChild(h2Elem);


    let figureElem = document.createElement('figure');
    let imgElem = document.createElement('img');

    imgElem.src = picArray[i].filename;
    figureElem.appendChild(imgElem);
    imgElem.alt = "";

    let figcaptionElem = document.createElement('figcaption');
    figcaptionElem.innerHTML = picArray[i].caption;
    figureElem.appendChild(figcaptionElem);

    let pElem = document.createElement('p');
    pElem.innerHTML = picArray[i].description;

    articleElem.appendChild(headerElem);
    articleElem.appendChild(figureElem);
    articleElem.appendChild(pElem);

    mainElem.appendChild(articleElem);
}





