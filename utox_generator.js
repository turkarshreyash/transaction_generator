const request = require('request');

//find better way to store token
var block_cypher_token =  "?token=ea69b7cda52e4558a6a1233df787f0c9"
<<<<<<< HEAD
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
=======
var url_hd_wallet = "https://api.blockcypher.com/v1/btc/test3/wallets/hd"
var url_addr = "https://api.blockcypher.com/v1/btc/test3/addrs"

var __create_hd_wallet = function(wallet_name,xpub,subchain_index){
    return new Promise(resolve => {
        //build json data
        let json_data = {
                            "name":wallet_name,
                            "extended_public_key":xpub,
                            "subchain_indexes":[subchain_index]
                        };

        //send post request to create wallet
        var options = {
            uri: url_hd_wallet+block_cypher_token,
            method: 'POST',
            json: json_data
>>>>>>> a1e7ac75118fb7c761a2815eddb0e96da4ca2d05
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
<<<<<<< HEAD
                reject(wallet_name);
            } else {
                console.log('Wallet Created:');
                resolve(wallet_name);
            }
        });
=======
            } else {
                console.log('Wallet Created :', body);
                
            }
        });
        resolve();
>>>>>>> a1e7ac75118fb7c761a2815eddb0e96da4ca2d05
    });

}

<<<<<<< HEAD
async function __get_addresses_with_utxo(wallet_name){
    return new Promise((resolve,reject) => {

        var options = {
            uri: url_addr+"/"+wallet_name+block_cypher_token+"&unspentOnly=true",
            method: "GET",
=======

var __derive_addresses_at_endpoint = function(wallet_name){ 
    
    return new Promise(resolve => {

     //send post request to derive addresses
        var options = {
            uri: url_hd_wallet+"/addresses/derive"+block_cypher_token+"&count=16",
            method: 'POST',
>>>>>>> a1e7ac75118fb7c761a2815eddb0e96da4ca2d05
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
<<<<<<< HEAD
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
=======
            } else {
                console.log('Derived :', body);
                
            }
        });
        resolve();
    });
}

var __get_addresses_with_utxo = function(wallet_name){
    https://api.blockcypher.com/v1/btc/test3/addrs/temp?token=ea69b7cda52e4558a6a1233df787f0c9&unspentOnly=true
    request(url_addr+block_cypher_token+"&unspentOnly=true", function(err, httpResponse, body) {
		if (err) {
			console.error('Request failed:', err);
		} else {
			console.log('UTXOS :', body);
			
		}
	});

}




var __get_utxo = function(xpub,subchain_index){

    //better wway to create name
    var temp_wallet_name = "test2"
    await __create_hd_wallet(temp_wallet_name,xpub,subchain_index);
    await __derive_addresses_at_endpoint(temp_wallet_name);
    __get_addresses_with_utxo(temp_wallet_name);
>>>>>>> a1e7ac75118fb7c761a2815eddb0e96da4ca2d05
};


module.exports = {


    // return change address with non zero balance
<<<<<<< HEAD
    get_address_utxos : async function(addresses_list){
            return new Promise((resolve,reject) => {
                // let change_address_utxo = 
                let address_utxo_filter =  await __get_utxo(addresses_list);

                // let change_address_utxo_filter = __filter(change_address_utxo);
                // return change_address_utxo_filter;

                // return change_address_utxo;
                resolve(address_utxo_filter)
            
            });
=======
    get_change_address_utxos : function(xpub){

        // let change_address_utxo = 
        __get_utxo(xpub,0);

        // let change_address_utxo_filter = __filter(change_address_utxo);
        // return change_address_utxo_filter;

        // return change_address_utxo;
>>>>>>> a1e7ac75118fb7c761a2815eddb0e96da4ca2d05
    },



















}