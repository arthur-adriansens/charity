/** @format */

// todo: client side or server side?


const QRCode = require("qrcode");

const options = {
    version: 2, // default = calculated, 1-40, amount of black & wite dots, 1 = 21x21
    errorCorrectionLevel: "L(ow) M(edium=default) Q(uartile) H(igh)",
    maskPattern: 0, //number between 0-7, no default, default = calculated
    toSJISFunc: "", //Helper function for japanese & chinese

    margin: 4, // width of quiet zone, default = 4
    scale: 4, // 1=1px per black dot, default = 4
    small: false, //only relavint for terminal renderer. Outputs smaller QR code. default = false
    // width; acts over scale, ignored if to small
    type: "image/jpeg", // image/png, image/jpeg, image/webp
    quality: 0.3,
    color: {
        dark: "#000000ff", // default = #000000ff, should be darker then light
        light: "#ffffffff", // default = #ffffffff
    },
};

QRCode.toDataURL("I am a pony!", function (err, url) {
    console.log(url);
});

QRCode.toString("http://www.google.com", function (err, string) {
    if (err) throw err;
    console.log(string);
});

QRCode.toFile(
    "path/to/filename.png",
    "Some text",
    {
        color: {
            dark: "#00F", // Blue dots
            light: "#0000", // Transparent background
        },
    },
    function (err) {
        if (err) throw err;
        console.log("done");
    }
);
