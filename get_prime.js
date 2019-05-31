var fs = require('fs')
var BigInt = require('big-integer')

var i = 0

function replaceAt(string, index, replace) {
	return string.substring(0, index) + replace + string.substring(index + 2);
}

function swap(index, contents)
{
	if (contents[index] === 'f')
		contents = replaceAt(contents, index, '7b')
	else if (contents[index] === '6')
		contents = replaceAt(contents, index, 'e1')
	else if (contents[index] === '1')
		contents = replaceAt(contents, index, 'f4')
	else if (contents[index] === '5' && contents[index + 1] === '4')
		contents = replaceAt(contents, index, '16')
	else if (contents[index] === '5' && contents[index + 1] === '7')
		contents = replaceAt(contents, index, 'a4')
	else if (contents[index] === 'c')
		contents = replaceAt(contents, index, 'b5')
	else
		console.log("there has been an error, at index %d", index)
	return(contents)
}

function swap1(index, contents) {
	// console.log("in 1")
	swap2(index, contents)
	contents = swap(index[0], contents)
	swap2(index, contents)
}
function swap2(index, contents) {
	// console.log("in 2")
	swap3(index, contents)
	contents = swap(index[1], contents)
	swap3(index, contents)
}
function swap3(index, contents) {
	// console.log("in 3")
	swap4(index, contents)
	contents = swap(index[2], contents)
	swap4(index, contents)
}
function swap4(index, contents) {
	// console.log("in 4")
	swap5(index, contents)
	contents = swap(index[3], contents)
	swap5(index, contents)
}
function swap5(index, contents) {
	// console.log("in 5")
	swap6(index, contents)
	contents = swap(index[4], contents)
	swap6(index, contents)
}
function swap6(index, contents) {
	// console.log("in 6")
	swap7(index, contents)
	contents = swap(index[5], contents)
	swap7(index, contents)
}
function swap7(index, contents) {
	// console.log("in 7")
	swap8(index, contents)
	contents = swap(index[6], contents)
	swap8(index, contents)
}
function swap8(index, contents) {
	// console.log("in 8")
	swap9(index, contents)
	contents = swap(index[7], contents)
	swap9(index, contents)
}
function swap9(index, contents) {
	// console.log("in 9")
	swap10(index, contents)
	contents = swap(index[8], contents)
	swap10(index, contents)
}
function swap10(index, contents) {
	// console.log("in 10")
	swap11(index, contents)
	contents = swap(index[9], contents)
	swap11(index, contents)
}

function content_is_prime(contents)
{
	// if (i === 124)
	// 	console.log(contents)
	var clean = contents.replace(/\:/g, '')
	var yo = BigInt(clean, 16)
	// console.log(yo)
	console.log("----", yo.isPrime(), i)
	i++
}

function swap11(index, contents) {
	// console.log("in 11")
	content_is_prime(contents)
	contents = swap(index[10], contents)
	content_is_prime(contents)
	// console.log(i)
	// i++
}

function match(contents, index, pattern) {
	return contents.indexOf(pattern, index)
}

function all_index(contents, index, pattern)
{
	var ret = []

	while (index >= 0)
	{
		index = match(contents, index + 1, pattern)
		if (index > 0) { ret.push(index) }
	}
	return ret
}

function get_prime()
{
	fs.readFile('prime23.txt', 'utf8', function(err, contents) {


	console.log(contents)
	
	var index = all_index(contents, 0, 'fb')

	index.push(all_index(contents, 0, '12'))
	index.push(all_index(contents, 0, '54'))
	index.push(all_index(contents, 0, '57'))
	index.push(all_index(contents, 0, 'cd'))
	index = [].concat.apply([], index)
	// console.log(index)
	
	// swap(index[1], contents)
	// swap1(index, contents)
	// console.log(contents.substring(460, 500), '------', contents[480] + contents[481])
	
	var clean = contents.replace(/\:/g, '')
	console.log(clean)
	var yo = BigInt(clean, 16)
	console.log(yo)
	// console.log("----", yo.isPrime())
	// console.log(BigInt(contents.replace('s/\:/g', '')))
	})

}
get_prime()