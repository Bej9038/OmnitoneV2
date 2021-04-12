let A1 = ctx.createConvolver();
let A1buffer;
let A2 = ctx.createConvolver();
let A2buffer;
let A3 = ctx.createConvolver();
let A3buffer;
let A4 = ctx.createConvolver();
let A4buffer;

let NegA2 = ctx.createGain();
NegA2.gain.value = -1.0;
let NegA3 = ctx.createGain();
NegA3.gain.value = -1.0;
let NegA4 = ctx.createGain();
NegA4.gain.value = -1.0;

function initAmbisonic(reverb)
{
    loadA1(reverb);
    A1.buffer = A1buffer;
    loadA2(reverb);
    A2.buffer = A2buffer;
    loadA3(reverb);
    A3.buffer = A3buffer;
    loadA4(reverb);
    A4.buffer = A4buffer;
}

function convolveSource()
{
    source.connect(A1);
    source.connect(A2);
    source.connect(A3);
    source.connect(A4);
}

function AtoB()
{
    A2.connect(NegA2);
    A3.connect(NegA3);
    A4.connect(NegA4);
    //W
    A1.connect(W);
    A2.connect(W);
    A3.connect(W);
    A4.connect(W);

    //X
    A1.connect(X);
    A2.connect(X);
    NegA3.connect(X);
    NegA4.connect(X);

    //Y
    A1.connect(Y);
    NegA2.connect(Y);
    A3.connect(Y);
    NegA4.connect(Y);

    //Z
    A1.connect(Z);
    NegA2.connect(Z);
    NegA3.connect(Z);
    A4.connect(Z);
}

function play_AFormat() {
    if (isPlaying === true) {
        source.stop();
        isPlaying = false;
    } else {
        source = ctx.createBufferSource();
        source.buffer = sourceBuffer;

        convolveSource();
        AtoB();
        combineB();
        omnitoneSetup();
        source.loop = true;
        source.start();
        isPlaying = true;
    }
}

function loadA1(reverb)
{
    let request = new XMLHttpRequest();
    request.open("GET", reverb + "1.wav", true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        ctx.decodeAudioData(request.response, (data) => A1buffer = data);
    };
    request.send();
}

function loadA2(reverb)
{
    let request = new XMLHttpRequest();
    request.open("GET", reverb + "2.wav", true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        ctx.decodeAudioData(request.response, (data) => A2buffer = data);
    };
    request.send();
}

function loadA3(reverb)
{
    let request = new XMLHttpRequest();
    request.open("GET", reverb + "3.wav", true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        ctx.decodeAudioData(request.response, (data) => A3buffer = data);
    };
    request.send();
}

function loadA4(reverb)
{
    let request = new XMLHttpRequest();
    request.open("GET", reverb + "4.wav", true);
    request.responseType = "arraybuffer";
    request.onload = function () {
        ctx.decodeAudioData(request.response, (data) => A4buffer = data);
    };
    request.send();
}

