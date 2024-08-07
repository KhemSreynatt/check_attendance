
import * as my_dongle from 'bleuio'
import 'regenerator-runtime / runtime'


const output = document.querySelector("# output");
const connectButton = document.querySelector('# connectButton');
const iBeaconButton = document.querySelector('# iBeaconButton');
const uuidInputField = document.querySelector('# uuidInputField');

let isConnected = false;
let isAdvertising = false;


const handleConnectButton = async () => {
    if (!isConnected) {
        connect();
    } else {
        disconnect();
    }
}

connectButton.addEventListener('click', handleConnectButton);


const connect = async () => {

    // Connect to dongle
    await my_dongle.at_connect();

    isConnected = true;

    connectButton.textContent = 'Disconnect';
    output.textContent = 'Connected to dongle';

    // Enable the iBeacon button which is disabled by default to avoid errors
    iBeaconButton.addEventListener('click', handleIBeaconButton);
    iBeaconButton.classList.remove('disabled');
}


const disconnect = async () => {

    // Stop advertising
    await my_dongle.at_advstop();

    // Disconnects the dongle
    await my_dongle.at_disconnect();

    // Reset dongle status
    isConnected = false;
    isAdvertising = false;

    output.textContent = 'Dongle disconnected';
    connectButton.textContent = 'Connect';

    // Disable the iBeacon button
    iBeaconButton.classList.add('disabled');
    iBeaconButton.removeEventListener('click', handleIBeaconButton);
}

const handleIBeaconButton = async () => {
    // If the dongle is not advertising, start advertising the iBeacon
    if (!isAdvertising) {
        startAdvertising();
    } else {
        stopAdvertising();
    }
}

const startAdvertising = async () => {

    // Sets the advertise data
    await my_dongle.at_advdatai(uuidInputField.value);

    // Start advertising
    await my_dongle.at_advstart();

    isAdvertising = true;

    output.textContent = 'iBeacon created';
    iBeaconButton.textContent = 'Stop the iBeacon';
}


const stopAdvertising = async () => {
    // Stop the dongle from advertising
    await my_dongle.at_advstop();

    isAdvertising = false;

    output.textContent = 'iBeacon stopped';
    iBeaconButton.textContent = 'Create an iBeacon';
}
