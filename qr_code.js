document.addEventListener('DOMContentLoaded', function () {
    function onScanSuccess(decodedText, decodedResult) {

        document.getElementById('qrcode').innerText = `Scanned QR Code: ${decodedText}`;
        console.log(`Scanned QR Code: ${decodedText}`, decodedResult);
    }


    function onScanFailure(error) {
        console.warn(`QR Code scan error: ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        /* verbose= */ false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});