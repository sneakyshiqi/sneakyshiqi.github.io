function $(id) {
    return document.getElementById(id);
}

function textToImg() {
    var len = $('len').value || 30;
    var i = 0;
    var fontSize = $('fontSize').value || 15;
    var lineSize = $('lineSize').value || 1;
    var pointSize = $('pointSize').value || 1;
    var points = $('points').value || 1;
    var fontWeight = $('fontWeight').value || 'normal';
    var txt = $("txt").value;
    var canvas = $('canvas');

    if (txt == '') {
        alert('Type something');
        $("txt").focus();
    }

    if (len > txt.length) {
        len = txt.length;
    }

    canvas.width = fontSize * len/5;
    canvas.height = fontSize * (3 / 2) * (Math.ceil(txt.length / len)) + txt.split("\n").length * fontSize ;
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = $("backcolor").innerHTML;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = $("fontcolor").innerHTML;
    context.strokeStyle = $("fontcolor").innerHTML;

    n = txt.length / 5;
    n2 = txt.length * fontSize * points;

    for (i = 0; i < n2; i++) {
        x = random(0, canvas.width);
        y = random(0, canvas.height);
        context.lineWidth = pointSize;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1); //randomize grains
        context.closePath();
        context.stroke();
    }

    for (i = 0; i < n; i++) {
        x = random(0, canvas.width);
        y = random(0, canvas.height);
        context.lineWidth = lineSize;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + random( - random(0, canvas.width / 2), random(0, canvas.width / 2)), y + random( - random(0, canvas.width / 2), random(0, canvas.width / 2))); //隨機畫線
        context.closePath();
        context.stroke();
    }

    context.font = fontWeight + ' ' + fontSize + 'px Asfalt' ;
    context.textBaseline = 'top';
    canvas.style.display = 'none';

    // Regular expression for nearest space
    // Split string at nearest space to specific char length.
    // 30 in this case
    // var textlen = document.getElementById("len").value;

    var str = txt;
    var txtArray = str.replace(/.{30}\S*\s+/g, "$&@").split(/\s+@/);

    for (i = 0; i < txtArray.length; i++) {
        var r = random( - 1, 1) / random(50, 100);
        context.rotate(r);
        context.fillText(txtArray[i], len*2, fontSize * i +fontSize/2, canvas.width);
    }

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var img = $("img");
    img.src = canvas.toDataURL("image/png");
}

function changeColor(name) {
    var c = $(name + "_c");
    var ctx = c.getContext("2d");
    var red = $(name + "_red");
    var green = $(name + "_green");
    var blue = $(name + "_blue");
    ctx.fillStyle = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
    $(name).innerHTML = ctx.fillStyle;
    ctx.fillRect(0, 0, 100, 100);
    $('canvas').getContext('2d').fillStyle=$("fontcolor").innerHTML;
}

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}