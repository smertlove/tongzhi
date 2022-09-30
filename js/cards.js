"use strict";
import { Cache } from "./Cache.js";
import { entries } from "./entries.js";

var card_rotated = false;


var cache = new Cache(entries[getRandomInt(0, entries.length)], 10);

var colors = [
    "rgb(252, 38, 38)",
    "rgb(252, 38, 217)",
    "rgb(201, 61, 252)",
    "rgb(125, 45, 252)",
    "rgb(75, 145, 250)",
    "rgb(75, 218, 250)",
    "rgb(75, 250, 218)",
    "rgb(75, 250, 177)",
    "rgb(75, 250, 113)",
    "rgb(151, 250, 75)",
    "rgb(227, 250, 75)",
    "rgb(250, 221, 75)",
    "rgb(250, 180, 75)",
    "rgb(250, 75, 75)"
]


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



function setData(elem) {
    let card_front = document.getElementById("entry-card-front");
    let card_back = document.getElementById("entry-card-back");
    let card = document.getElementById("entry-card");

    card.style.backgroundColor = colors[getRandomInt(0, colors.length)]
    setTimeout(function() { card_front.innerHTML = '<p>' + elem.translation + '</p>'; }, 150);
    setTimeout(function() { card_back.innerHTML = '<p>' + elem.hieroglyph; + '</p>'; }, 350);


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
}

function _prev() {
    if (card_rotated) {
        rotate();
    }
    cache.lmovPtr();
    setData(cache.getElem());
}

function __change_visibility(elem1, elem2) {
    setTimeout(function() { elem2.style.visibility = "collapse"; }, 150);
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