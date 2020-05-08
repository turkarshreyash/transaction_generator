const request = require('request');

//find better way to store token
var block_cypher_token =  "?token=ea69b7cda52e4558a6a1233df787f0c9"
var url_wallet = "https://api.blockcypher.com/v1/btc/test3/wallets"
var url_addr = "https://api.blockcypher.com/v1/btc/test3/addrs"

async function __create_wallet(wallet_name,addresses_list){
    return new Promise((resolve,reject) => {
        var data = { 
                        name: wallet_name,
                        addresses: addresses_list
                    };

        var options = {
            uri: url_wallet+block_cypher_token ,
            method: "POST",
            json: data
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
                reject(wallet_name);
            } else {
                console.log('Wallet Created:');
                resolve(wallet_name);
            }
        });
    });

}

async function __get_addresses_with_utxo(wallet_name){
    return new Promise((resolve,reject) => {

        var options = {
            uri: url_addr+"/"+wallet_name+block_cypher_token+"&unspentOnly=true",
            method: "GET",
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
                reject(null);
            } else {
                console.log('UTXOS Fetched');
                resolve(body);
            }
        });
    });
}

async function __delete_wallet(wallet_name){
    return new Promise((resolve,reject) => {

        var options = {
            uri: url_wallet+"/"+wallet_name+block_cypher_token,
            method: "DELETE",
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
                reject();
            } else {
                console.log('Deleted the wallet:');
                resolve();
            }
        });
    });
}

async function __get_utxo(addresses_list){
    return new Promise((resolve,reject) => {

        //better wway to create name
        var temp_wallet_name = "test2";
        await __create_wallet(temp_wallet_name,addresses_list)
        let utxo_unfiltered =  await __get_addresses_with_utxo(temp_wallet_name)
        await __delete_wallet(temp_wallet_name)
        resolve(utxo_unfiltered);


    });
};


module.exports = {


    // return change address with non zero balance
    get_address_utxos : async function(addresses_list){
            return new Promise((resolve,reject) => {
                // let change_address_utxo = 
                let address_utxo_filter =  await __get_utxo(addresses_list);

                // let change_address_utxo_filter = __filter(change_address_utxo);
                // return change_address_utxo_filter;

                // return change_address_utxo;
                resolve(address_utxo_filter)
            
            });
    },



















}