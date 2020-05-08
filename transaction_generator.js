async function start(){

    const prompt = require('prompt-sync')({sigint: true});
    const base58 = require('bs58');
    const coinselect = require('coinselect')
    const address_generator = require("./address_generator")
    const utox_generator = require("./utox_generator")
    const generate_unsigned_txn = require("./generate_unsigned_txn")


    // Importing settings from settings.json file
    indexes =   {   "purpose_index" :"8000002c",
                    "coin_index" : "00000001",
                    "account_index":"00000001",
                    "change_index" : "00000001",
                    "receive_index" : "00000000"
                };

    //fee
    fee_rate = 10


    // TAKING INPUTS  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // xpub
    // Test Address:
    var xpub = "043587cf03b0b5419c80000000b6570b860fb42b7b8748f3472fb5df8c1c4abd4c7e3f7b5dadf02ddf5ccd8dc503e034088eff098df01f32c659a63866f6e325543297bcfd7bf776725b08434cd66e373ff0"
    // var xpub = prompt('Enter xpub: ')
    xpub = base58.encode(Buffer.from(xpub,'hex'));



    // output address
    var output_address = "mrLmiHX9f2pQ9qmswWRyN7wA286djPmAzE"
    // var output_address = prompt('Enter Address to send money: ')
    // const output_address = base58.encode(Buffer.from(output_address,'hex'));

    // value to send
    var output_value_mbtc = 0.005;
    // var output_value_mbtc = prompt('Enter value mBTC: ')
    var output_value_satoshi = output_value_mbtc*100000
    //   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< TAKING INPUTS



    // UTXOS FROM BLOCKCYPHER API  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // //Testing receive addresses from 0 to 20
    var receive_addresses = address_generator.receive_address_generate(xpub,0,20);
    var change_addresses = address_generator.change_address_generate(xpub,0,20);
    
    // utxo from received and change address via blockcypher apis
    var utxo_receive_addresses = await utox_generator.get_address_utxos(receive_addresses)
    var utxo_change_addresses = await utox_generator.get_address_utxos(change_addresses)

    // combine utxos
    var utxos = []

    if(utxo_change_addresses != null){
        utxos = utxos.concat(utxo_change_addresses)
    }
    if(utxo_receive_addresses != null){
        utxos = utxos.concat(utxo_receive_addresses)
    }


    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    UTXOS FROM BLOCKCYPHER API 



    // GENERATING OUTPUTS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    var output  =   [
                        {
                            address: output_address,
    		                value: output_value_satoshi
                        }
                    ]

    //coin select algorithm
    var {inputs, outputs, fee}  = coinselect(utxos, output, fee_rate);      
    
    //adding output change address
    outputs.forEach(out => {
        if(! ("address" in out)){
            out["address"] = change_addresses[0]
        }
    });
    
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    GENERATING OUTPUTS
    // console.log(inputs)

    var unsigned_txn_json = generate_unsigned_txn.generate_unsigned_txn(inputs,outputs)

    









                

    







 
}


start();