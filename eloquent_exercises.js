/* CHAPTER 3 Functions
   ------------------- */

// find the minimum number from 'a', 'b', 'c'
function min(a,b,c){
	a>b && (a=b);
	a>c && (a=c);
	return a;
}

// determine if a +ve or -ve integer 'num' is even
function isEven(num){
	if (num === 0){
		return true;
	}else if (num === 1 || num === -1){
		return false;
	}else if (num > 0){
		return isEven(num - 2);
	}else{
		return isEven(num + 2);
	}
}

// given a string, returns the quantity of the character 'x'
function countXs(str, x){
	var xs = 0;
	for (var i=0; i<str.length; i++){
		if (str.charAt(i) == x){
			xs++;
		}
	}
	return xs;
}

/* CHAPTER 4 Data structures: Objects & Arrays
   ------------------------------------------- */

// Create array with elements from 'a' to 'b' inclusive, with increments 'step'
function range(a,b,step){
	var ar = [];
	step === undefined && (step = 1);
	for (var x=a; step >= 0 ? x<=b : x>=b; x += step){
		ar.push(x);
	}
	return ar;
}

function sum(array){
	return array.reduce(function(prevVal, curVal){
		return prevVal + curVal;
	})
}

function reverseArray(ar){
	var newAr = [];
	for (var i=0; i<ar.length; i++){
		newAr.unshift(ar[i]);
	}
	return newAr;
}

function reverseArrayInPlace(ar){
	for (var i=0; i<Math.floor(ar.length/2); i++){
		var tmp = ar[i];
		ar[i] = ar[ar.length-1-i];
		ar[ar.length-1-i] = tmp;
	}
	return ar;
}

// create a linked list from array
function arrayToList(ar){
	var prev = null;
	for (var i=ar.length-1; i>=0; i--){
		var cur = {
			val: ar[i],
			rest: prev
		}
		prev = cur;
	}
	return cur;
}

// create an array from linked list
function listToArray(list){
	var ar = [];
	while (list){
		ar.push(list.val);
		list = list.rest;
	}
	return ar;
}

// prepend an element 'el' before list
function prepend(list, el){
	return {
		val: el,
		rest: list
	};
}

function printList(list){
	var str = "";
	while(list){
		str += "(" + list.val + ")";
		list = list.rest
		if (list)
			str += '-';
	}
	return str;
}

// find the element at position 'pos' in a linked list. pos is zero based.
function nth(list, pos){
	for (var i=0; list != null && i<pos; i++){
		list = list.rest;
	}
	return list || undefined;
}

// recursive version of nth function.
function nth_r(list, pos){
	if (list == null){		// beyond last element
		return undefined;
	}else if (pos === 0){	// element at pos
		return list;
	}
	return nth_r(list.rest, pos - 1);
}

/* compares object 'a' and 'b' for strict equality, i.e. both reference the same object.
 * Otherwise, compares the property values themselves */
function deepEqual(a,b){
	if (typeof a === 'object' && typeof b === 'object'){
		if (a == b)
			return true;
		if (a == null || b == null)
			return false;
		for (var prop in a){
			if (!deepEqual(a[prop],b[prop]))
				return false;
		}
		for (var prop in b){
			if (!deepEqual(a[prop],b[prop]))
				return false;
		}
	}else if (a !== b)
		return false;
	return true;
}

/* CHAPTER 5 Higher Order Functions
   -------------------------------- */

// flatten 2d array into 1d array
function flatten2dArray(ar){
	return ar.reduce(function(prev, cur){
		return prev.concat(cur);
	});
}

var ANCESTRY_FILE = require('/Users/tim/Documents/js/eloquent_exercises/ancestry.js');
var ancestry = JSON.parse(ANCESTRY_FILE);

var byName = {};
ancestry.forEach(function(person){
	byName[person.name] = person;
});

// find the age difference for every mother and child
var ageDiff = ancestry.filter(function(person){
	return byName[person.mother];
}).map(function(person){
	return person.born - byName[person.mother].born;
});

function average(array){
	function plus(a,b){ return a + b};
	return array.reduce(plus) / array.length;
}

var centuries = {};
// get age of every person and group them per century
ancestry.forEach(function(person){
	var century = Math.ceil(person.died / 100);
	if (!(century in centuries))
		centuries[century] = [];
	centuries[century].push(person.died - person.born);
});

/* Groups elements in array by a value returned from groupName function
   input:
	groupName - returns the group name an element in array belongs
	array - has elements we want to group
   output:
    object mapping group names to arrays containing the elements that belong to that group */
function groupBy(array, groupName){
	var groups = {};
	array.forEach(function(el){
		var key = groupName(el);
		if (key in groups)
			groups[key].push(el);
		else
			groups[key] = [el];
	});
	return groups;
}

var byCentury = groupBy(ancestry, function (person){
	return Math.ceil(person.died / 100);
});

for (century in byCentury){
	var ages = byCentury[century].map(function(person){
		return person.died - person.born;
	});
	// console.log(century + ":" + average(ages));
}

// Call isTrue on each element in array and return true if all calls return true
function every(array, isTrue){
	for (var i=0; i<array.length; i++){
		if (!isTrue(array[i]))
			return false;
	}
	return true;
}

// Call isTrue on each element in array and return true if any call returns true
function some(array, isTrue){
	for (var i=0; i<array.length; i++){
		if (isTrue(array[i]))
			return true;
	}
	return false;
}