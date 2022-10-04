'use strict';

const picArray = [

    {
        caption: 'Fida',
        description: 'Fida on kotimainen hyväntekeväisyysmyymäläketju. Löydät heiltä vaatteita, huonekaluja ja harrastustarvikkeita. Voit myös lahjoittaa meille tavaraa. ',
        filename: 'kuvat/fida_logo.jpg'

    },
    {
        caption: 'UFF',
        description: 'UFF on yleishyödyllinen säätiö, joka ylläpitää vaatekeräyspalvelua Suomessa sekä tukee globaalikehitystyötä Afrikassa ja Aaasiassa. UFF:lta löytyy vaatteille lahjoituslaatikoita ympäri kaupunkeja sekä heidän toimipisteelle voi toimittaa ehjiä ja puhtaita vaatteita sekä tekstiilejä.',
        filename: 'kuvat/uff.jpg'
    },

    {
        caption: 'Relove',
        description: 'Relovessa laadukkaita second hand-aarteita sekä kahvilassa tarjoillaan aamiaista, lounasta ja käsintehtyjö leipomuksia viikon jokaisena päivänä',
        filename: 'kuvat/relove.jpg'
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





