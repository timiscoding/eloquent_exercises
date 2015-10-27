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