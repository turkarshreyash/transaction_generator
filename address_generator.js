const bitcoin = require('bitcoinjs-lib');  
const bip32 = require('bip32');


//Internal function
//@paras para1: xpub, para2: start, para3: end, para4: internal(0)/external(1)
//@return list of addresses
var __get_address_list = function(xpub, start, end, chain){  

    let network = bitcoin.networks.testnet;
    let node = bip32.fromBase58(xpub, network)
    let address_list = []
    
    for (var i = start; i < end; i++) {
        var {address} = bitcoin.payments.p2pkh({pubkey: node.derivePath(`${chain}/${i}`).publicKey, network: network});
        address_list.push(address)
    }

    return address_list
};

module.exports = {

    //change address generate function
    //@paras para1: xpub, para2: start, para3: end
    //@return list of addresses
    change_address_generate: function(xpub,start,end){
        return __get_address_list(xpub, start, end, 1);
    },

    //receive address generate function
    //@paras para1: xpub, para2: start, para3: end
    //@return list of addresses
    receive_address_generate: function(xpub,start,end){
        return __get_address_list(xpub, start, end, 0);
    },
}