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
    //jos class on navbar -> vaihtuu/lisääntyy siihen responsive
    if (nav.className === "navbar") {
        nav.className += " responsive";
        //muuten class on navbar
    } else {
        nav.className = "navbar";
    }
}
//Tehdään array kirpputoreille
//alkioihin lisätään eri kirpparien tiedot
const kirppisArray = [
    {
        title: 'Fida',
        alt: 'kuva fidan logosta',
        description: 'Fida on kotimainen hyväntekeväisyysmyymäläketju. Löydät heiltä vaatteita, huonekaluja ja harrastustarvikkeita. Otamme vastaan hyvänkuntoisia vaatteita, huonekaluja ja muuta kodin irtaimistoa. ',
        filename: 'kuvat/fida_logo.jpg'
    },
    {
        title: 'UFF',
        alt: 'kuva uffin logosta',
        description: 'UFF on yleishyödyllinen säätiö, joka ylläpitää vaatekeräyspalvelua Suomessa sekä tukee globaalikehitystyötä Afrikassa ja Aaasiassa. UFF:lta löytyy vaatteille lahjoituslaatikoita ympäri kaupunkeja sekä heidän toimipisteelle voi toimittaa ehjiä ja puhtaita vaatteita sekä tekstiilejä.',
        filename: 'kuvat/uff.jpg'
    },
    {
        title: 'Relove',
        alt: 'kuva reloven logosta',
        description: 'Relovessa laadukkaita second hand-aarteita sekä kahvilassa tarjoillaan aamiaista, lounasta ja käsintehtyjö leipomuksia viikon jokaisena päivänä',
        filename: 'kuvat/relove.jpg'
    },
    {
        title: 'Kierrätyskeskus',
        alt: 'kuva kierrätyskeskuksen logosta' ,
        description: 'Kierrätyskeskuksella on pääkaupungiseudulla 12 kierrätysmyymälää sekä valtakunnallisesti toimiva verkkokauppa. Heille voi viedä ehjät ja tarpeettomat esineet, huonekalut sekä vaatteet. Kierrätyskeskusella on myös noutopalvelu isomille huonekaluille.',
        filename: 'kuvat/kierratyskeskus1.jpeg'
    },
    {
        title:'HELSINKI FLEA MARKET',
        alt: 'kuva helsinki flea marketin logosta',
        description: 'Helsinki flea market on uusi itsepalvelukirpputori joka sijaitsee Töölössä, Helsingin virkistysalueen sydämessä. Kaikki varattavissa olevat pöydät ovat rakennettu kierrätysmateriaaleista esimerkiksi teholaivoista ja melamiinilevyistä. Heiltä löytyy myös mobiilisovellus mistä voi seurata omia myyntejä ja luomaan hintalappuja suoraan kotisohvalta.',
        filename: 'kuvat/fleamarket.jpg'
    }
    ];

//haetaan tarvittavat html elementit
const mainElem = document.querySelector('main');

//looppi jolla käydään kirppisarray läpi
for (let i = 0; i < kirppisArray.length; i++) {
    //luodaan article elementti ja annetaan sille classname
    let articleElem = document.createElement('article');
    articleElem.className = 'kirppariArticlet';
    //luodaan header elementti ja h2 elementti. h2 arvoksi annetaan sen hetkisen arrayn title
    let headerElem = document.createElement('header');
    let h2Elem = document.createElement('h2');
    h2Elem.innerHTML = kirppisArray[i].title
    //h2 elementistä headerin lapsi
    headerElem.appendChild(h2Elem);

    //luodaan figure elementti ja img elementti.
    let figureElem = document.createElement('figure');
    let imgElem = document.createElement('img');
    //annetaan img elementille source ja alt arraysta. img figuren lapseksi
    imgElem.src = kirppisArray[i].filename;
    figureElem.appendChild(imgElem);
    imgElem.alt = kirppisArray[i].alt;

    //luodaan p elementti ja annetaan sille arraysta arvo
    let pElem = document.createElement('p');
    pElem.innerHTML = kirppisArray[i].description;

    //kaikki elementit on articlen lapsia
    articleElem.appendChild(headerElem);
    articleElem.appendChild(figureElem);
    articleElem.appendChild(pElem);

    //article on main elementin lapsi
    mainElem.appendChild(articleElem);
}

