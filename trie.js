// An abstract datatype representing the tree
// Abstraction function, (list) word_list, (json) trie --> Trie
// Accessible method - fetch
var Trie = function(wordList){
	var that = Object.create(Trie.prototype);
	var word_list = wordList;
	
	// iteration funcitons
	from_to = function (from, to, f) {
		if (from > to) return;
		f(from); from_to(from+1, to, f);
	};
	each = function (a, f) {
		from_to(0, a.length-1, function (i) {f(a[i]);});
	};

	map = function (a, f) {
	var result = [];
	each (a, function (e) {
		result.push(f(e));
		});
	return result;
	};
	until = function(f){
		f() || until(f);
	};

	//list reduction function. returns a funciton that adds the given suffix to the front of the element
	var add_suffix = function(suffix){ // EXAMPLE USE OF FUNCTIONALS
			return function(e){
				return suffix + e;
			}
		};

	//initializes the class with the proper trie object. Preprocesses the words and constructs the trie
	//
	var trie = (function(){
		var wordTrie = {};
		var words_copy = word_list; 
	    
	    until(function(){ //EXAMPLE USE OF FUNCTIONALS
	    	
	    	var word = words_copy.pop();    
	    	var root = wordTrie;
	    	var letters = word.toLowerCase();
	    	var l = letters.length;

	    	from_to(0, l,  function(i){ //EXAMPLE USE OF FUNCTIONALS
	    		var letter = letters[i];

	    		if (!root[letter]) {

	    			root[letter] = {};
	    		}
	    		root = root[letter];
	    		if (i === l-1) { root.$ = 1; }

	    	});
	    	return words_copy.length <=0;
	    });
	    return wordTrie;
	})();
	
	// separates the input into strings and finds the proper subtree for fe to process.
	// @param string userInput, the input string,
	// @param json trie, the trie to use
	// @result json trie, sub trie
	var sor = function(userInput, trie){
		var str = userInput.trim();
		if(trie){
			if(str.length <= 1)
			{
				
				return trie;
			}
			else {
				return sor(str.substring(1, str.length), trie[str[0]]);
			}
		}
	};
	
	// the only exposed method in this class, depends on fe() and so()
	// @param string c, the input string,
	// @param integer limit, the number of results to fetch
	// @result Array, list of the fetched words 
	that.fetch = function(c, limit){
		var tr = sor(c, trie);
		
		var res = fe(c[c.length-1], tr);
		var res_arr = [];
		res_arr = map(res, add_suffix(c.substring(0, c.length-1))); //EXAMPLE USE OF FUNCTIONALS
	
		return res_arr.sort().slice(0, limit);
		
	};

	// fetches results from the trie
	// @param string c, the input string,
	// @param json trie, trie to use
	// @result Array, list of the fetched words 
	var fe = function(c, trie){

		var result_arr = [];
		if(trie){
			for (var key in trie[c]){
				if(key == '$'){

					result_arr.push( c + "");
				}
				else{
					var fetched = fe(key, trie[c]);
					for(var st in fetched){

						result_arr.push((c+fetched[st]));
					}

				}
			}
		}
		return result_arr;

	};
	return that;
}