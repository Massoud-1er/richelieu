var Base64 = require('js-base64').Base64

// const big_int = "31717798413454838971739311391870214101486054474438584033384974797696836002786889741922328038249283935148167589396475764515984792248325276562635675483085593307632384945480084324354199386711259069590701728377654610059849152461565385315663116675949927841648944186909262315756698281769715236261451165791551915966478594350188775515440951028291159455059215312824555650594351073103466656762227393296283706561572878742697938628619638158647442707072448440611516636972942995420402896454059886602289729674742684089684431444671962667947543907887166525136215144578229439700937796435258581268686887244530718134835932679669470198549"

function string_format(big_int) {
    var inline = big_int.replace(/(\w{30})/g, '$1\n    ')
    console.log(inline.replace(/(\w{2})/g, '$1:'))
    return(inline.replace(/(\w{2})/g, '$1:'))
}

module.exports = function format(modulus, priv_exp, prime1, prime2, exponent1, exponent2, coef) {
    // return("Private-Key: (4096 bit)\nmodulus:\n    " + string_format(modulus) + '\n' + "publicExponent: 10001 (0x2711)\nprivateExponent:\n    " + string_format(priv_exp) + '\n' + "prime1:\n    " + string_format(prime1) + "\n" + "prime2:\n    " + string_format(prime2) + "\n" + "exponent1:\n    " + string_format(exponent1) + "\n" + "exponent2:\n    " + string_format(exponent2) + "\n" + "coefficient:\n    " + string_format(coef))
    return("{'version': 0, 'modulus'" + modulus + ", 'publicExponent': 10001, 'privateExponent:'" + priv_exp + ",'prime':" + prime1 + ",'prime2':" + prime2 + ",'exponent1:" + exponent1 + ",'exponent2':" + exponent2 + ", 'coefficient':" + coef +'}')
}
