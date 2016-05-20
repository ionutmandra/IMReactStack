'use strict';

export default () => {
    let oStorage = {};
    
    Object.defineProperty(oStorage, 'key', {
        value: (nKeyId) => {
            var key = Object.keys(oStorage)[nKeyId];
            return (typeof key === 'undefined') ? null : unescape(key);
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });
    
    Object.defineProperty(oStorage, 'getItem', {
        value: (sKey) => {
            var key = sKey + '';
            return (oStorage[escape(key)] === null) ? 'null' : oStorage[escape(key)];
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });
    
    Object.defineProperty(oStorage, 'setItem', {
        value: (sKey, sValue) => {
            if (typeof sValue !== 'object') {
                oStorage[escape(sKey)] = sValue + '';
            } else {
                oStorage[escape(sKey)] = sValue;
            }
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });
    
    Object.defineProperty(oStorage, 'removeItem', {
        value: (sKey) => {
            if (!sKey) {
                return;
            }
            delete oStorage[escape(sKey)];
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });
    
    Object.defineProperty(oStorage, 'length', {
        get: () => {
            return Object.keys(oStorage).length;
        },
        configurable: false,
        enumerable: false,
    });
    
    Object.defineProperty(oStorage, 'clear', {
        value: () => {
            Object.keys(oStorage).forEach(function (key) {

                delete oStorage[key];
            });
        },
        writable: false,
        configurable: false,
        enumerable: false,
    });
    
    return oStorage;
};