"use strict";
import { Cache } from "./Cache.js";
import { entries } from "./entries.js";

var card_rotated = false;

var from = 1;
var to = entries[entries.length - 1].lesson;

var chosen_hiers = entries;

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
    setTimeout(function() { card_back.innerHTML = '<p>' + elem.hieroglyph + '<br>' + elem.pinyin + '</p>'; }, 350);
}

function getRandomEntry(from, to) {

    return chosen_hiers[getRandomInt(0, chosen_hiers.length)];
}

function _next() {
    if (card_rotated) {
        rotate();
    }

    if (cache.isPtrInFront()) {
        cache.append(getRandomEntry(from, to));
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

function __setFrom(i) {
    if (i > to) {
        from = to;
        to = i;
    } else {
        from = i;
    }


    let temp = new Array();
    entries.forEach(element => {
        if (element.lesson >= from && element.lesson <= to) {
            temp.push(element);
        }
    });
    chosen_hiers = temp;
    console.log(chosen_hiers);

}

function __setTo(i) {
    if (i < from) {
        to = from;
        from = i;
    } else {
        to = i;
    }
    let temp = new Array();
    entries.forEach(element => {
        if (element.lesson >= from && element.lesson <= to) {
            temp.push(element);
        }
    });
    chosen_hiers = temp;
    console.log(chosen_hiers);
}

function __fillDropdowns() {
    let st = document.getElementById("lessonStart");
    let fn = document.getElementById("lessonFinish");
    for (let i = 1; i <= to; i++) {
        let li1 = document.createElement("li");
        let li2 = document.createElement("li");


        let link1 = document.createElement('a');
        let link2 = document.createElement('a');

        link1.text = i;
        link1.href = "#";
        link2.text = i;
        link2.href = "#";

        link1.className = "dropdown-item";
        link2.className = "dropdown-item";
        link1.onclick = function() {
            document.getElementById("lessonStartDropdown").innerText = i;
            __setFrom(i);
        };
        link2.onclick = function() {
            document.getElementById("lessonFinishDropdown").innerText = i;
            __setTo(i);
        };

        li1.appendChild(link1);
        li2.appendChild(link2);
        st.appendChild(li1);
        fn.appendChild(li2);

    }
}

setData(cache.getElem());
__fillDropdowns();
document.getElementById("next").onclick = _next;
document.getElementById("prev").onclick = _prev;
document.getElementById("entry-card").onclick = rotate;

document.addEventListener('keyup', event => {
    console.log(event.code);
    if (event.code === 'ArrowLeft') {
        _prev();
    };;
    if (event.code === 'ArrowRight') {
        _next();
    };
    if (event.code === 'Space') {
        rotate();
    };
    if (event.code === 'Enter') {
        rotate();
    };
});