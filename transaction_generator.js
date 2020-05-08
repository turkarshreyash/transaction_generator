const prompt = require('prompt-sync')({sigint: true});
const base58 = require('bs58');
const address_generator = require("./address_generator")
const utox_generator = require("./utox_generator")


// Importing settings from settings.json file
indexes =   {   "purpose_index" :"8000002c",
                "coin_index" : "00000001",
                "account_index":"00000001",
                "change_index" : "00000001",
                "receive_index" : "00000000"
            };




// Taking Inputs

// xpub
// Test Address:
var xpub = "043587cf03b0b5419c80000000b6570b860fb42b7b8748f3472fb5df8c1c4abd4c7e3f7b5dadf02ddf5ccd8dc503e034088eff098df01f32c659a63866f6e325543297bcfd7bf776725b08434cd66e373ff0"
// var xpub = String(prompt('Enter xpub: '))
xpub = base58.encode(Buffer.from(xpub,'hex'));



// output address
// const output_address = base58.encode(Buffer.from(prompt('Enter Address to send money: '),'hex'));

// value to send
// const output_value = base58.encode(Buffer.from(prompt('Enter value : '),'hex'));


// //Testing receive addresses from 0 to 20
var receive_addresses = address_generator.receive_address_generate(xpub,0,20);
var change_addresses = address_generator.change_address_generate(xpub,0,20);

var utxo_receive_addresses =  await utox_generator.get_address_utxos(receive_addresses)
console.log(utxo_receive_addresses)