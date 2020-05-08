const request = require('request');

//find better way to store token
var block_cypher_token =  "?token=ea69b7cda52e4558a6a1233df787f0c9"
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
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
            } else {
                console.log('Wallet Created :', body);
                
            }
        });
        resolve();
    });

}


var __derive_addresses_at_endpoint = function(wallet_name){ 
    
    return new Promise(resolve => {

     //send post request to derive addresses
        var options = {
            uri: url_hd_wallet+"/addresses/derive"+block_cypher_token+"&count=16",
            method: 'POST',
        };

        request(options, function(err, httpResponse, body) {
            if (err) {
                console.error('Request failed:', err);
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
};


module.exports = {


    // return change address with non zero balance
    get_change_address_utxos : function(xpub){

        // let change_address_utxo = 
        __get_utxo(xpub,0);

        // let change_address_utxo_filter = __filter(change_address_utxo);
        // return change_address_utxo_filter;

        // return change_address_utxo;
    },



















}