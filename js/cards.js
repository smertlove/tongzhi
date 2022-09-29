"use strict";
import { Cache } from "./Cache.js";
import { entries } from "./entries.js";

var card_rotated = false;


var cache = new Cache(entries[getRandomInt(0, entries.length)], 10);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



function setData(elem) {
    let card_front = document.getElementById("entry-card-front");
    let card_back = document.getElementById("entry-card-back");

    setTimeout(function() { card_front.innerText = elem.translation; }, 150);
    setTimeout(function() { card_back.innerText = elem.hieroglyph; }, 350);


}

function _next() {
    if (card_rotated) {
        rotate();
    }

    if (cache.isPtrInFront()) {
        cache.append(entries[getRandomInt(0, entries.length)]);
    }
    cache.rmovPtr();


    setData(cache.getElem());
    cache.pprint();
}

function _prev() {
    if (card_rotated) {
        rotate();
    }
    cache.lmovPtr();
    setData(cache.getElem());
    cache.pprint();
}

function __change_visibility(elem1, elem2) {
    setTimeout(function() { elem2.style.visibility = "hidden"; }, 150);
    setTimeout(function() { elem1.style.visibility = "visible"; }, 350);
}

function rotate() {
    let card = document.getElementById("entry-card");
    card.classList.toggle("flip");

    let trans_side = document.getElementById("entry-card-front");
    let hier_side = document.getElementById("entry-card-back");
    if (card_rotated) {
        __change_visibility(trans_side, hier_side);
        card_rotated = !card_rotated;
    } else {
        __change_visibility(hier_side, trans_side);
        card_rotated = !card_rotated;
    }

}

setData(cache.getElem());
document.getElementById("next").onclick = _next;
document.getElementById("prev").onclick = _prev;
document.getElementById("entry-card").onclick = rotate;