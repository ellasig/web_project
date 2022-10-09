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

//TEHDÄÄN SLIDESHOW:

//luodaan array kuville jotka tulevat huoltokohdan slideshow
const huoltoKuvat= [
    {filename: "kuvat/slideshow1.jpg",
    alt: 'Kuva vaatteista'},
    {filename: "kuvat/slideshow2.jpg",
    alt: 'kuva ompeluvälineistä'},
    {filename: "kuvat/slideshow3.jpg",
    alt: 'kuva villapaidoista'},
    {filename: "kuvat/yhdistelmaKuva_slideshow.jpg",
    alt: 'kuva vaatteista'},
    {filename: "kuvat/slideshow4.jpg",
    alt: 'kuva silittämisestä'}
];

//tarvittavat muuttujat
let curIndex = 0;
//aika jonka yksi kuva pysyy näkyvillä tallennettuna muuttujaan (5s)
let imgDuration = 5000;
//funktio slideshowlle
function slideShow() {
    //haetaan kuvien elementit id:llä ja annetaan niille source arraysta
    document.getElementById('slideKuva').src = huoltoKuvat[curIndex].filename;
    document.getElementById('slideKuva').alt = huoltoKuvat[curIndex].alt;
    //index +1
    curIndex++;
    //jos index on arrayn pituuden suuruinen annetaan indexille arvo 0
    if (curIndex === huoltoKuvat.length) {curIndex = 0; }
    //funktio paussilla muuttujalle annetun ajan
    setTimeout("slideShow()", imgDuration);
}
slideShow();