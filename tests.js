var test_trie = Trie(WORDS);
test('gives an empty result for an empty input', function() {
    ok(test_trie.fetch("").length == 0, "Empty result for empty string");
    ok(test_trie.fetch(" ").length == 0, "Empty result for space");
    ok(test_trie.fetch("").length == 0, "Empty result for empty string");
});
test('fetches the correct number of results', function() {
    ok(test_trie.fetch("t", 0).length == 0, "0 required 0 displayed");
    ok(test_trie.fetch("t", 1).length == 1, "1 required 1 displayed");
    ok(test_trie.fetch("t", 10).length == 10, "10 required 10 displayed");
    
});
test('fetches the right outputs', function() {
	var q_results = ["qualify", "quality", "quantity", "quarter", "quarterback", "queen", "quest", "question", "questionnaire", "quick", "quickly", "quiet", "quietly", "quit", "quite", "quote"];
    var th_results = ["than", "thank", "thanks", "thanksgiving", "that", "the", "theater", "their", "them", "theme", "themselves", "then", "theological", "theology", "theoretical", "theory", "therapist", "therapy", "there", "thereby", "therefore", "these", "they", "thick", "thigh", "thin", "thing", "think", "thinking", "third", "thirty", "this", "thoroughly", "those", "though", "thought", "thousand", "thread", "threat", "threaten", "three", "threshold", "thrive", "throat", "through", "throughout", "throw", "thumb", "thus"]
    var all_results = ["all", "allegation", "alleged", "allegedly", "alley", "alliance", "allow", "ally"];
    deepEqual(test_trie.fetch("q"), q_results, "Correct output for single character");
    deepEqual(test_trie.fetch("th"), th_results, "Correct output for double character input");
    deepEqual(test_trie.fetch("all"), all_results, "Correct output for multiple character input");
    ok(test_trie.fetch("theadle").length == 0, "Empty result for non existent word");
});
test('outputs are in the right order', function() {
    deepEqual(test_trie.fetch("t", 100), test_trie.fetch("t", 100).sort(), "outputs are in the right order")
    
});


