var fs = require('fs')
var BigInt = require('jsbn').BigInteger
const { exec } = require('child_process')
const modulo = new BigInt('cd5f8a24c7605008897a3c922c0e812e769de0a46442c350cb78c7868539f3d38aac80b3e6a506605910e8599806b4d1d148f2f6b81da04796a8a5aee18f29e83e16775a2a0a00870541f6574ed1438636ae0a0c116e07104f48f72094863a3869e1c8fc220627278962fb22873e3156f18e55dec94e970064ec7f4e0e88454012e2fd5dfe5f8d19bf170f9ccb3f46e0fd1019bcb02d9083a0703c617f996379e6478354a73ae6e6acbce1f4333ecfaf24366a3e977d3cd3cbfe8d8a387bd876bfdab8488f6f47bf1fbe33010fd2d7e22b4db2e567783ce0b606db86b93759714c4f6396a7fb9f74c4021043b0f3d46d2633ebd43a877863df7d680f506587c119dd64100ca831ce2af33d951b524c5f06b49f5bf2cb381e74181930d06a80505c06abd5bf4870f0c9fb581bd80dba889660639f936edea8fe5d0c9eae58062ed693252583c71cc782ba613e01438e69b43f9e64eca84f9ea04e811ad7b39efd7876d1b6b501c4f48acce6f24239f6c04028788135cd88c3d15be0f2ebb7de9e9c19a7a93037005ee0a9a640bada332ec0d05ee9f08a832354a0487a927d5e88066e2569e6c5d4688e422bfa0b27c6171c6d7bf029bfd9165752af19aa71b33a1ea70b6c371fb21e47f527d80b7d04f582ad9f9935af723682dc01ca9880621870decb7ad15648cdf4ef153016f3e6d87933b8ec54cfa1fdf87c467020a3e753')
const formatting = require('./formatting')
const e = new BigInt('10001')
var i = 0
var nb = 0

function decrypt_file(private_key)
{
	exec('openssl rsautl -decrypt -inkey '+ private_key + ' -in motDePasseGPG.txt.enc -out motDePasseGPG.txt', (err, stdout, stderr) => {
		if (err) {
		  throw(err)
		}
		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	  });
}

function get_info (p, q)
{
	p.subtract(1)
	q.subtract(1)
	phi = (p.multiply(q))
	d = phi
	d.modInverse(e)
	dp = p
	dp.modInverse(e)
	dq = q
	dq.modInverse(e)
	p.add(1)
	q.add(1)
	qi = q
	qi.modInverse(p)
  // console.log("=============", modulo, e, d, p, q, dp, dq, qi)
  // console.log(formatting(modulo.toString(16), d.toString(16), p.toString(16), q.toString(16), dp.toString(16), dq.toString(16), qi.toString(16)))
	var filename = "./keys/---key" + nb
	fs.writeFileSync(filename, formatting(modulo.toString(16), d.toString(16), p.toString(16), q.toString(16), dp.toString(16), dq.toString(16), qi.toString(16)), err => {
		console.log(err)
		// decrypt_file(filename)
	})
	nb++
	// console.log(modulo.toString(16), e.toString(16), d.toString(16), p.toString(16), q.toString(16), dp.toString(16), dq.toString(16), qi.toString(16))
}

function replaceAt (string, index, replace) {
  return string.substring(0, index) + replace + string.substring(index + 2)
}

function swap (index, contents) {
  if (contents[index] === 'f') { contents = replaceAt(contents, index, '7b') } else if (contents[index] === '6') { contents = replaceAt(contents, index, 'e1') } else if (contents[index] === '1') { contents = replaceAt(contents, index, 'f4') } else if (contents[index] === '5' && contents[index + 1] === '4') { contents = replaceAt(contents, index, '16') } else if (contents[index] === '5' && contents[index + 1] === '7') { contents = replaceAt(contents, index, 'a4') } else if (contents[index] === 'c') { contents = replaceAt(contents, index, 'b5') } else { console.log('there has been an error, at index %d', index) }
  return (contents)
}

function swap1 (index, contents) {
  // console.log("in 1")
  swap2(index, contents)
  contents = swap(index[0], contents)
  swap2(index, contents)
}
function swap2 (index, contents) {
  // console.log("in 2")
  swap3(index, contents)
  contents = swap(index[1], contents)
  swap3(index, contents)
}
function swap3 (index, contents) {
  // console.log("in 3")
  swap4(index, contents)
  contents = swap(index[2], contents)
  swap4(index, contents)
}
function swap4 (index, contents) {
// console.log("in 4")
  swap5(index, contents)
  contents = swap(index[3], contents)
  swap5(index, contents)
}
function swap5 (index, contents) {
  // console.log("in 5")
  swap6(index, contents)
  contents = swap(index[4], contents)
  swap6(index, contents)
}
function swap6 (index, contents) {
  // console.log("in 6")
  swap7(index, contents)
  contents = swap(index[5], contents)
  swap7(index, contents)
}
function swap7 (index, contents) {
  // console.log("in 7")
  swap8(index, contents)
  contents = swap(index[6], contents)
  swap8(index, contents)
}
function swap8 (index, contents) {
  // console.log("in 8")
  swap9(index, contents)
  contents = swap(index[7], contents)
  swap9(index, contents)
}
function swap9 (index, contents) {
// console.log("in 9")
swap10(index, contents)
contents = swap(index[8], contents)
swap10(index, contents)
}
function swap10 (index, contents) {
// console.log("in 10")
swap11(index, contents)
contents = swap(index[9], contents)
swap11(index, contents)
}

function content_is_prime (contents) {
  // if (i === 124)
  // 	console.log(contents)
  var clean = contents.replace(/\:/g, '')
  var prime1 = new BigInt(clean, 16)
  // console.log(prime1)
  if (prime1.isProbablePrime()) {
	var prime2 = modulo.divide(prime1)
	// console.log('-----', prime2.isProbablePrime(), i)
	if (prime2.isProbablePrime())
	{
		get_info(prime1, prime2)
	}
  }
  i++
}

function swap11 (index, contents) {
  // console.log("in 11")
  content_is_prime(contents)
  contents = swap(index[10], contents)
  content_is_prime(contents)
  // console.log(i)
  // i++
}

function match (contents, index, pattern) {
  return contents.indexOf(pattern, index)
}

function all_index (contents, index, pattern) {
  var ret = []

  while (index >= 0) {
    index = match(contents, index + 1, pattern)
    if (index > 0) { ret.push(index) }
  }
  return ret
}

function get_prime () {
  fs.readFile('prime2.txt', 'utf8', function (err, contents) {
	  if (err) console.log(err)
    // console.log(contents)

    var index = all_index(contents, 0, 'fb')

    index.push(all_index(contents, 0, '12'))
    index.push(all_index(contents, 0, '54'))
    index.push(all_index(contents, 0, '57'))
    index.push(all_index(contents, 0, 'cd'))
    index = [].concat.apply([], index)
    // console.log(index)

    // swap(index[1], contents)
    swap1(index, contents)
    // console.log(contents.substring(460, 500), '------', contents[480] + contents[481])

    // var clean = contents.replace(/\:/g, '')
    // console.log(clean)
    // var yo = new BigInt(clean, 16)
    // console.log(yo.toString())
    // console.log("----", yo.isProbablePrime())
    // console.log(BigInt(contents.replace('s/\:/g', '')))
  })
}
get_prime()



// key = pempriv(n, e, d, p, q, dp, dq, qi)

// f = open(output_file,"w")
// f.write(key)
// f.close()
// formatting(modulo.toString(16), d.toString(16), p.toString(16), q.toString(16), dp.toString(16), dq.toString(16), qi.toString(16))
// var b_prime1 = new BigInt("00da06fe4712d48e6c7f8603970ab1d543ced1f45df8cb57ae24b605d0cb7c2857a3b057aeb2bb6514d63a44d4357adb682dbf09d9f5bbd4b5c1e423fa7a3d7e676bed8372fdbed99e5775b0044df8d80ba074c3bce9d8c97d44780ead8a511606788c763c64cfa8bb8c895bd9b058381bb7cf973ac74fab4de510a003d4dbf4dd048da0bfb4e82fffe860dfd9ad0fe7f6a7f791feacf21cd259cd20980650a7f78c343c6d4ad4944a27620501d78a1ecb501c2424a5b135a1347cc1e65749c622fe66ed5e43a9ef45e4f89f2012384cc48ec3314c8b9afc857e727e81f7c6e6d1bdb8697e71e04f818593c1bde51801421fc37b63d67446ddcf07d128466e923b")
// var b_prime2 = new BigInt("00d7d3a3fdd650730a0a944665bc91973c4721ea7d5056aa1a69b4cc2ad4efb7628ed27768d933a5eb9f2e410cb7322a706e0c794b42d7ab030b88250c169efa63982626539bc4327a498be9434c101ffba17e453929175e6d184110625b24d85f1df086551825dd94a6ce6fb3bb295ba4032fed3bb1a1579d000f8785048f6b0f1f06070b1cdb908c5675a9fd1dd0a78e73f2dc8a9a716a1269e882f0b09550086296923e268e315b9f053985393d1ce211110135534baf42c6a5d093b8604952e93e18f7d94bb577d9c6c55c7bef58e4b91b8e36910edd2265e1c4145e23eb59a5fbf2eda6ae3f212445fdb09d85bbc2e9622773d2f44ae3aa6a8f5fe04886f1")
// get_info(b_prime1, b_prime2)
// console.log(b_prime1, b_prime2)