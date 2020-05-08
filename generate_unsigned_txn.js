const bitcoin = require('bitcoinjs-lib');  
const bip32 = require('bip32');
const base58 = require('bs58');

// Settings
var untransactions_settings  =  {
                                    version:      "02000000",
                                    locktime:     "00000000",
                                    sighash_code: "01000000",


                                };


module.exports = {

    generate_unsigned_txn: async function(inputs,outputs){

        let network = bitcoin.networks.testnet;

        var input_list_for_unsigned_txn = []

        inputs.forEach(input => {
            input["script_sig"] = bitcoin.address.toOutputScript(input["address"],network);
            delete input["address"]
            input_list_for_unsigned_txn.push(input)
        });

        

        var unsigned_txn_json = {

            version: untransactions_settings["version"],
            
            no_of_inputs: inputs.length,

            inputs: input_list_for_unsigned_txn,

            no_of_outputs: outputs.length,

            outputs: outputs,

            locktime: untransactions_settings["locktime"],

            sighash_code: untransactions_settings["sighash_code"]

        } 

        return  unsigned_txn_json

    }











}
