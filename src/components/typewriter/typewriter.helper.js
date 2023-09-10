export default function loadTypeWriter() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var textArray = elements[i].getAttribute('data-text');
        var period = elements[i].getAttribute('data-period');
        var loop = elements[i].getAttribute('data-loop');
        if (textArray) {
            new TxtType(elements[i], JSON.parse(textArray), period, loop);
        }
    }
}

var TxtType = function (el, textArray, period, loop) {
    this.textArray = textArray;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10);
    this.loop = loop === 'true';
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.textArray.length;
    var fullTxt = this.textArray[i];

    if (!this.loop && this.loopNum >= this.textArray.length) {
        this.el.innerHTML = '';
        return;
    }

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap typing">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        if (this.period == 0) {
            this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
            return;
        }
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};