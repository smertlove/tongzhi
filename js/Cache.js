export class Cache {
    constructor(elem, maxlen) {
        this.data = new Array();
        this.data.push(elem);
        this.ptr = 0;
        this.maxlen = maxlen;
    }

    isEmpty() {
        return this.length == 0;
    }

    isPtrInFront() {
        return this.ptr == this.data.length - 1;
    }

    isPtrInBack() {
        return this.ptr == 0;
    }

    rmovPtr() {
        if (this.ptr < this.data.length - 1) {
            ++this.ptr;
        }
    }

    lmovPtr() {
        if (this.ptr > 0) {
            --this.ptr;
        }
    }

    isMaxLen() {
        return this.maxlen == this.data.length;
    }

    getElem() {
        return this.data[this.ptr];
    }

    append(elem) {
        if (this.isMaxLen()) {
            this.data.shift();
        }
        this.data.push(elem);
    }

    pprint() {
        console.log(this.data);
    }

}