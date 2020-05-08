const request = require('request');
var crypto = require('crypto');

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

        //better wway to create name
        var temp_wallet_name = crypto.createHash('md5').update(addresses_list[0]).digest('hex').slice(0, 24)
        await __create_wallet(temp_wallet_name,addresses_list)
        let utxo_unfiltered =  await __get_addresses_with_utxo(temp_wallet_name)
        await __delete_wallet(temp_wallet_name)
        return utxo_unfiltered;
};

async function __filter_utxo(utxo_unfiltered){
        let txrefs = JSON.parse(utxo_unfiltered)["txrefs"] 
        if(txrefs== undefined){
            return null;
        }
        
        const resultSet = new Set();
        txrefs.forEach(utxo => {
            const obj = {
            txId: utxo.tx_hash,
            vout: utxo.tx_output_n,
            value: utxo.value,
            address: utxo.address
            };
            resultSet.add(JSON.stringify(obj));
        });
        const resultList = [];
        resultSet.forEach(tx => {
            resultList.push(JSON.parse(tx));
        });
        return resultList;
}


module.exports = {


    // return change address with non zero balance
    get_address_utxos : async function(addresses_list){
        // let change_address_utxo = 
        let address_utxo_unfilter =  await __get_utxo(addresses_list);
        let address_utxo_filtered = __filter_utxo(address_utxo_unfilter);
        return address_utxo_filtered;
    },



















}