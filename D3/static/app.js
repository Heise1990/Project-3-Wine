d3.csv("/Documents/Project-3-Wine/winemag-data_first150k.csv").then((data) => {
    var description = []
    data.forEach(function(d){
        
        if (d.points > '90') 
        description.push(d.description);

    });
    console.log(description)


    string_to_array = function (str) {
     return str.trim().split(" ");
    };
    //console.log(string_to_array(description));

    var description_words = []
    description.forEach(function(d){
        description_words.push(string_to_array(d))
    });
    console.log(description_words)



    ///var description_words2 = []
    ///Array.from(description_words.forEach(function(element){
        ///description_words2.push(element)
    ///});
    ///console.log(description_words2)

    ///console.log(description_words.join())
    description_words2 = description_words.join()
    string_to_array2 = function (str) {
        return str.trim().split(",");
    };
    description_words3 = string_to_array2(description_words2)
    ///description_words3 = Array.from(description_words2)
    
    console.log(description_words2)

    console.log(description_words3)

    const map = description_words3.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    words = map.keys(description_words3);
    console.log(words);
    quantity = map.values(description_words3);
    console.log(quantity);
    var arr = Array.from(map.entries());
    sortedArr = arr.sort(function(a, b){return b[1]-a[1]})
    console.log(sortedArr);
    var keys = Array.from(words);
    var values = Array.from(quantity);
    console.log(keys);
    console.log(values);
    
});