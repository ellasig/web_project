/*
* Kehittäjät: Tuisku Närhi, Ella Sigvart, Sanna Lohkovuori
* Versio 1.1
* 1.10.2022
* */

'use strict';

//tehdään slideshow:

//luodaan array kuville
const huoltoKuvat= [
    {filename: "kuvat/slideshow1.jpg",
    alt: 'Kuva vaatteista'},
    {filename: "kuvat/slideshow2.jpg",
    caption: 'pieniä vikoja voi korjata ompelemalla'},
    {filename: "kuvat/slideshow3.jpg",
    caption: 'Villa puhdistaa itse itseään eikä sitä tarvitse pestä kokoaikaa'},
    {filename: "kuvat/yhdistelmaKuva_slideshow.jpg",
    caption: 'kierrätäthän vaatteet, joita et enää käytä'},
    {filename: "kuvat/slideshow4.jpg",
    caption: 'Silittämällä saat ehostettua vaatteita.'}
];

let curIndex = 0;
let imgDuration = 5000;

function slideShow() {
    document.getElementById('slideKuva').src = huoltoKuvat[curIndex].filename;
    curIndex++;
    if (curIndex === huoltoKuvat.length) { curIndex = 0; }
    setTimeout("slideShow()", imgDuration);
}
slideShow();