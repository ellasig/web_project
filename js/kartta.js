/*
* Kehittäjät: Tuisku Närhi, Ella Sigvart, Sanna Lohkovuori
* Versio 1.1
* 5.10.2022
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

/* KARTTA ALKAA TÄSTÄ*/

// elementit, joihin tulostetaan tiedot
const nimi = document.getElementById('nimi');
const asemanOsoite = document.getElementById('osoite');
const kaupunki = document.getElementById('kaupunki');
const lisatiedot = document.getElementById('lisatiedot');
const navigoi = document.getElementById('navigoi');
const paikanna = document.getElementById('paikanna');

// jatka paikannusta kartan liikuttamisen jälkeen
paikanna.addEventListener('click', kaynnistaPaikannus);

// tyhjä olio oman paikan tallennusta varten
let paikka = null;

// tyhjä olio paikannuksen aloittamista ja pysäyttämistä varten
let paikannus = null;

// zoomtaso
let zoomlevel = 11;

// liitetään kartta elementtiin #map
const map = L.map('map');
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// taulukko markkereita varten
const markers = L.layerGroup();
map.addLayer(markers);

// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

// kustom ikonit: oma paikka punainen, latauspiste vihreä
const punainenIkoni = L.divIcon({className: 'punainen-ikoni'});
const vihreaIkoni = L.divIcon({className: 'vihrea-ikoni'});

// Funktio, joka ajetaan, kun paikkatiedot on haettu
function success(pos) {
    // poistetaan vanhat markerit
    markers.clearLayers();
    console.log('markkerit', markers);
    // asetetaan oma paikka
    paikka = pos.coords;

    // Tulostetaan paikkatiedot konsoliin
    console.log('Your current position is:');
    console.log(`Latitude : ${paikka.latitude}`);
    console.log(`Longitude: ${paikka.longitude}`);
    console.log(`More or less ${paikka.accuracy} meters.`);
    paivitaKartta(paikka);
    lisaaMarker(paikka, 'Olen tässä', punainenIkoni);
    //haeKirpputorit(paikka);
}

function paivitaKartta(crd) {
    // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
    map.setView([crd.latitude, crd.longitude], zoomlevel);
}
//TODO: muuta oikeet muuttujat
function lisaaMarker(crd, teksti, ikoni, kirpputori) {
    const marker = L.marker([crd.latitude, crd.longitude], {icon: ikoni}).
    bindPopup(teksti).
    on('popupopen', function(popup) {
        console.log(jsonData.data);
        nimi.innerHTML = jsonData.data.name.fi;
        asemanOsoite.innerHTML = jsonData.data.location.address.street_address;
        kaupunki.innerHTML = jsonData.data.location.address.locality + jsonData.data.location.address.neighbourhood;
        lisatiedot.innerHTML = jsonData.data.info_url;
        navigoi.href = `https://www.google.com/maps/dir/?api=1&origin=${paikka.latitude},${paikka.longitude}&destination=${crd.latitude},${crd.longitude}&travelmode=driving`;
    });
    markers.addLayer(marker);
}

// Funktio, joka ajetaan, jos paikkatietojen hakemisessa tapahtuu virhe
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function kaynnistaPaikannus() {
// Käynnistetään paikkatietojen haku
    console.log('aloita paikannus');
    paikannus = navigator.geolocation.watchPosition(success, error, options);
}

// keskeytä paikannus, jos käyttäjä siirtää karttaa
map.on('mousedown', function() {
    console.log('paikannus keskeytetty?');
    navigator.geolocation.clearWatch(paikannus);
});

map.on('zoom', function() {
    zoomlevel = map.getZoom();
    console.log(zoomlevel);
});

// haetaan kirpputorit
// API-dokumentaatio: https://open-api.myhelsinki.fi/doc#/v2places/listAll
const proxy = 'https://api.allorigins.win/get?url=';
const osoite = 'https://open-api.myhelsinki.fi/v2/places/?tags_search=Second%20hand';
let proxyOsoite = proxy + encodeURIComponent(osoite);

haeKirpparit(proxyOsoite)

function haeKirpparit(kirpparit) {

    // suoritetaan hakukysely, fetch hoitaa mahdolliset tietoliikenneongelmat.
    fetch(kirpparit).then(function (response) {
        return response.json();
    }).then(function (json) {
        vastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    }).catch(function (error) {           // Jos tapahtuu virhe,
        console.log(error);             // kirjoitetaan virhe konsoliin.
    });
}

function vastaus(jsonContents){
    let jsonData = JSON.parse(jsonContents.contents);
    console.log('debug koko' + jsonData.data.length)
    for(let i =0 ; i < jsonData.data.length ; i++){
        const teksti = jsonData.data[i].location.address.street_address;
        console.log('debug teksti ' + teksti)
        const koordinaatit = {
            latitude: jsonData.data[i].location.lat,
            longitude: jsonData.data[i].location.lon,
        };
        console.log(jsonData.data[i].location.lat);
        console.log('debug koordinaatit' + koordinaatit.longitude + koordinaatit.latitude);

        lisaaMarker(koordinaatit, teksti, vihreaIkoni, jsonData.data[i].name.fi);
    }
}

// aloita paikannus
kaynnistaPaikannus();