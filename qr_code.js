document.addEventListener('DOMContentLoaded', function () {
    function onScanSuccess(decodedText, decodedResult) {
        // Handle the decoded text (QR code content)
        document.getElementById('result').innerText = `Scanned QR Code: ${decodedText}`;
        console.log(`Scanned QR Code: ${decodedText}`, decodedResult);
    }

    function onScanFailure(error) {
        // Handle scan failure, usually better to ignore and keep scanning.
        console.warn(`QR Code scan error: ${error}`);
    }

    // Create an instance of Html5QrcodeScanner
    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        /* verbose= */ false);

    // Start scanning
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});