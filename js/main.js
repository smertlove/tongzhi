"use strict";

import { entries } from "./entries.js";

function make_entries(containerID, entries) { EntryMaker._make_entries(containerID, entries); }

function clear(containerID) { Clearer._clear(containerID); }

export class EntryMaker {

    static make_entry(container, trans, hier) {
        let entry = document.createElement("div");
        let translation = document.createElement("div");
        let hieroglyph = document.createElement("div");

        entry.classList = ["entry"];
        translation.classList = ["translation"];
        hieroglyph.classList = ["hieroglyph"];
        hieroglyph.hidden = true;

        translation.innerText = trans;
        hieroglyph.innerText = hier;
        hieroglyph.classList.add("fade-out");

        entry.appendChild(translation);
        entry.appendChild(hieroglyph);

        entry.onclick = function() {
            if (hieroglyph.hidden == true) {
                hieroglyph.hidden = false;
                hieroglyph.classList.remove("fade-out");
                hieroglyph.classList.add("fade-in");
            } else {
                hieroglyph.hidden = true;
                hieroglyph.classList.add("fade-out");
                hieroglyph.classList.remove("fade-in");
            }
        }
        let entryHr = document.createElement("hr");
        entryHr.classList.add("entry-hr");
        entry.append(entryHr);

        container.appendChild(entry);
    }

    static _make_entries(containerID, entries) {

        let container = document.getElementById(containerID);
        let cur_lesson = 0;


        entries.forEach(element => {
            if (element.lesson > cur_lesson) {
                cur_lesson++;

                let anchor = document.createElement("a");
                anchor.name = cur_lesson;
                anchor.classList.add("tricky-anchor");
                container.appendChild(anchor);

                let lesson_hdr = document.createElement("p");
                lesson_hdr.classList = ["lesson-hdr"];
                lesson_hdr.innerText = "Урок " + cur_lesson;

                container.appendChild(lesson_hdr);

                let lessonLink = document.createElement("li");
                lessonLink.innerHTML = '<a  href="#' + cur_lesson + '"> Урок ' + cur_lesson + '</a>';
                document.getElementById("lesson-nav-menu").appendChild(lessonLink);
            }
            this.make_entry(container, element.translation, element.hieroglyph + " [" + element.pinyin + "]");
        });
    }
}

make_entries('word_container', entries);