export default function define(runtime, observer) {
    const main = runtime.module();
    ///main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    // main.variable(observer()).define(["md"], function(md){return(
    // md`# Bubble Chart`
    // )});
    main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","DOM","color","format"], function(pack,data,d3,width,height,DOM,color,format)
{
    const root = pack(data);
    var svg = d3.select("#svg-area")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-size", 14)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");

    const leaf = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
            .attr("transform", d => `translate(${d.x +1},${d.y + 1})`);
    d3.csv("/Documents/Project-3-Wine/winemag-data_first150k.csv").then((data1) => {
        var description = []
        data1.forEach(function(d){
            
            if (d.points < '85') 
            description.push(d.description);

        });
        //console.log(description)


        function string_to_array(str) {
        return str.trim().split(" ");
        };
        //console.log(string_to_array(description));

        var description_words = []
        description.forEach(function(d){
            description_words.push(string_to_array(d))
        });
        //console.log(description_words)



        ///var description_words2 = []
        ///Array.from(description_words.forEach(function(element){
            ///description_words2.push(element)
        ///});
        ///console.log(description_words2)

        ///console.log(description_words.join())
        var description_words2 = description_words.join()
        function string_to_array2(str) {
            return str.trim().split(",");
        };
        var description_words3 = string_to_array2(description_words2)
        ///description_words3 = Array.from(description_words2)
        
        //console.log(description_words2)

        //console.log(description_words3)

        const map = description_words3.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        var words1 = map.keys(description_words3);
        //console.log(words1);
        var quantity1 = map.values(description_words3);
        //console.log(quantity1);
        var arr = Array.from(map.entries());
        var sortedArr = arr.sort(function(a, b){return b[1]-a[1]})
        console.log(sortedArr);
        var keys = Array.from(words1);
        var values = Array.from(quantity1);
        //console.log(keys);
        //console.log(values);
        
        var words = ["fruit", "black", "rich", "tannins", "ripe", "cherry", "spice", "sweet", "Cabernet", "blackberry", "dark", "dry", "oak", "chocolate", "red", "blend", "firm", "berry", "complex", "vanilla", "plum", "fresh", "elegant", "balanced", "soft", "dense", "cassis", "smooth", "Pinot", "cola", "delicious", "Sauvignon", "white", "smoky", "crisp", "wood", "intense", "powerfull"]
        var quantity = [16640, 7772, 7212, 9637, 7172, 8426, 4959, 3923, 3911, 3863, 3812, 3807, 3573, 3304, 3289, 2996, 2974, 2949, 2840, 2631, 2511, 2357, 2342, 2283, 2274, 2258, 2256, 2150, 2136, 2121, 2118, 2092, 2080, 1969, 1926, 1898, 1896, 1871]
        var data = [{word: "fruit", quantity: 16640}, {word:"black", quantity: 7772}, {word: "rich", quantity: 7212}, {word: "tannins", quantity: 9637}, {word: "ripe", quantity: 7172}, {word: "cherry", quantity: 8426}, {word: "spice", quantity: 4959}, {word: "sweet", quantity: 3923}, {word: "Cabernet", quantity: 3911}, {word: "blackberry", quantity: 3863}, {word: "dark", quantity: 3812}, {word: "dry", quantity: 3807}, {word: "oak", quantity: 3573}, {word:"chocolate", quantity: 3304}, {word: "red", quantity: 3289}, {word: "blend", quantity: 2996}, {word: "firm", quantity: 2974}, {word: "berry", quantity: 2949}, {word: "complex", quantity: 2840}, {word: "vanilla", quantity: 2631}, {word: "plum", quantity: 2511}, {word: "fresh", quantity: 2357}, {word: "elegant", quantity: 2342}, {word: "balanced", quantity: 2283}, {word: "soft", quantity: 2274}, {word: "dense", quantity: 2258}, {word: "cassis", quantity: 2256}, {word: "smooth", quantity: 2150}, {word: "Pinot", quantity: 2136}, {word: "cola", quantity: 2121}, {word: "delicious", quantity: 2118}, {word:"Sauvignon", quantity: 2092}, {word: "white", quantity: 2080}, {word: "smoky", quantity: 1969}, {word: "crisp", quantity: 1926}, {word: "wood", quantity: 1898}, {word: "intense", quantity: 1896}, {word: "powerfull", quantity: 1871}]
        
        data.forEach(function(d) {
            d.quantity = +d.quantity
        })
        console.log(data[0])
    });
    leaf.append("circle")
        .attr("id", d => (d.leafUid = DOM.uid("leaf")).word)
        .attr("r", d => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(d.data.word));

    leaf.append("clipPath")
        .attr("id", d => (d.clipUid = DOM.uid("clip")).word)
        .append("use")
        .attr("xlink:href", d => d.leafUid.href);

    leaf.append("text")
        .attr("clip-path", d => d.clipUid)
        .selectAll("tspan")
        .data(d => d.data.word.split(/(?=[A-Z][a-z])|\s+/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.lenght /2 + 0.8}em`)
        .text(d => d);

    leaf.append("title")
        .text(d => `${d.data.quantity === undefined ? "" : `${d.data.word}
        `}${format(d.value)}`);


    //bubble chart 2
    var svg = d3.select("#svg-area1")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-size", 14)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");

    const leaf1 = svg.selectAll("g")
        .data(root.leaves())
        .join("g")
            .attr("transform", d => `translate(${d.x +1},${d.y + 1})`);
    d3.csv("/Documents/Project-3-Wine/winemag-data_first150k.csv").then((data1) => {
        var description_low = []
        data1.forEach(function(d){
            
            if (d.points < '85') 
            description_low.push(d.description);

        });
        //console.log(description)


        function string_to_array(str) {
        return str.trim().split(" ");
        };
        //console.log(string_to_array(description));

        var description_words9 = []
        description_low.forEach(function(d){
            description_words9.push(string_to_array(d))
        });
        //console.log(description_words)



        ///var description_words2 = []
        ///Array.from(description_words.forEach(function(element){
            ///description_words2.push(element)
        ///});
        ///console.log(description_words2)

        ///console.log(description_words.join())
        var description_words8 = description_words9.join()
        function string_to_array2(str) {
            return str.trim().split(",");
        };
        var description_words7 = string_to_array2(description_words8)
        ///description_words3 = Array.from(description_words2)
        
        //console.log(description_words2)

        //console.log(description_words3)

        const map = description_words7.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        var words2 = map.keys(description_words7);
        //console.log(words1);
        var quantity2 = map.values(description_words7);
        //console.log(quantity1);
        var arr1 = Array.from(map.entries());
        var sortedArr1 = arr1.sort(function(a, b){return b[1]-a[1]})
        console.log(sortedArr1);
        var keys = Array.from(words2);
        var values = Array.from(quantity2);
        //console.log(keys);
        //console.log(values);
        var data_low = [{word: "fruit", quantity: 16971}, {word: "cherry", quantity: 11500}, {word: "sweet", quantity: 7641}, {word: "acidity", quantity: 6634}, {word: "dry", quantity: 6558}, {word: "soft", quantity: 6081}, {word: "red", quantity: 6077}, {word: "tannins", quantity: 7162}, {word: "berry", quantity: 5605}, {word: "fresh", quantity: 5230}, {word: "ripe", quantity: 5029}, {word: "green", quantity: 4779}, {word: "black", quantity: 4331}, {word: "crisp", quantity: 4258}, {word: "citrus", quantity: 4090}, {word: "light", quantity: 4013}, {word: "spice", quantity: 3991}, {word: "apple", quantity: 3987}, {word: "oak", quantity: 3963}, {word: "simple", quantity: 3885}, {word: "plum", quantity: 3581}, {word: "blackberry", quantity: 3556}, {word: "white", quantity: 3540}, {word: "vanilla", quantity: 3513}, {word: "raspberry", quantity: 3422}, {word: "herbal", quantity: 2986}, {word: "acidity", quantity: 2978}, {word: "peach", quantity: 2829}, {word: "rich", quantity: 2609}, {word: "Pinot", quantity: 2572}, {word: "tart", quantity: 2530}, {word: "clean", quantity: 2946}, {word: "bright", quantity: 2486}, {word:"easy", quantity: 2406}, {word: "pear", quantity: 2073}, {word: "chocolate", quantity: 2043}, {word: "spicy", quantity: 2018}, {word: "lemon", quantity: 2010}, {word: "pinneapple", quantity: 2002}, {word: "Cabernet", quantity: 1996}, {word: "pepper", quantity: 1937}]
    
        data_low.forEach(function(d) {
            d.quantity = +d.quantity
        })
        console.log(data_low[0])
    });
    leaf1.append("circle")
        .attr("id", d => (d.leafUid = DOM.uid("leaf")).word)
        .attr("r", d => d.r)
        .attr("fill-opacity", 0.7)
        .attr("fill", d => color(d.data.word));

    leaf1.append("clipPath")
        .attr("id", d => (d.clipUid = DOM.uid("clip")).word)
        .append("use")
        .attr("xlink:href", d => d.leafUid.href);

    leaf1.append("text")
        .attr("clip-path", d => d.clipUid)
        .selectAll("tspan")
        .data(d => d.data.word.split(/(?=[A-Z][a-z])|\s+/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, nodes) => `${i - nodes.lenght /2 + 0.8}em`)
        .text(d => d);

    leaf1.append("title")
        .text(d => `${d.data.quantity === undefined ? "" : `${d.data.word}
        `}${format(d.value)}`);
    return svg.node();


}
);
    main.variable(observer("data")).define("data", [{word: "fruit", quantity: 16640}, {word:"black", quantity: 7772}, {word: "rich", quantity: 7212}, {word: "tannins", quantity: 9637}, {word: "ripe", quantity: 7172}, {word: "cherry", quantity: 8426}, {word: "spice", quantity: 4959}, {word: "sweet", quantity: 3923}, {word: "Cabernet", quantity: 3911}, {word: "blackberry", quantity: 3863}, {word: "dark", quantity: 3812}, {word: "dry", quantity: 3807}, {word: "oak", quantity: 3573}, {word:"chocolate", quantity: 3304}, {word: "red", quantity: 3289}, {word: "blend", quantity: 2996}, {word: "firm", quantity: 2974}, {word: "berry", quantity: 2949}, {word: "complex", quantity: 2840}, {word: "vanilla", quantity: 2631}, {word: "plum", quantity: 2511}, {word: "fresh", quantity: 2357}, {word: "elegant", quantity: 2342}, {word: "balanced", quantity: 2283}, {word: "soft", quantity: 2274}, {word: "dense", quantity: 2258}, {word: "cassis", quantity: 2256}, {word: "smooth", quantity: 2150}, {word: "Pinot", quantity: 2136}, {word: "cola", quantity: 2121}, {word: "delicious", quantity: 2118}, {word:"Sauvignon", quantity: 2092}, {word: "white", quantity: 2080}, {word: "smoky", quantity: 1969}, {word: "crisp", quantity: 1926}, {word: "wood", quantity: 1898}, {word: "intense", quantity: 1896}, {word: "powerfull", quantity: 1871}]);
    main.variable(observer("data_low")).define("data_low", [{word: "fruit", quantity: 16971}, {word: "cherry", quantity: 11500}, {word: "sweet", quantity: 7641}, {word: "acidity", quantity: 6634}, {word: "dry", quantity: 6558}, {word: "soft", quantity: 6081}, {word: "red", quantity: 6077}, {word: "tannins", quantity: 7162}, {word: "berry", quantity: 5605}, {word: "fresh", quantity: 5230}, {word: "ripe", quantity: 5029}, {word: "green", quantity: 4779}, {word: "black", quantity: 4331}, {word: "crisp", quantity: 4258}, {word: "citrus", quantity: 4090}, {word: "light", quantity: 4013}, {word: "spice", quantity: 3991}, {word: "apple", quantity: 3987}, {word: "oak", quantity: 3963}, {word: "simple", quantity: 3885}, {word: "plum", quantity: 3581}, {word: "blackberry", quantity: 3556}, {word: "white", quantity: 3540}, {word: "vanilla", quantity: 3513}, {word: "raspberry", quantity: 3422}, {word: "herbal", quantity: 2986}, {word: "acidity", quantity: 2978}, {word: "peach", quantity: 2829}, {word: "rich", quantity: 2609}, {word: "Pinot", quantity: 2572}, {word: "tart", quantity: 2530}, {word: "clean", quantity: 2946}, {word: "bright", quantity: 2486}, {word:"easy", quantity: 2406}, {word: "pear", quantity: 2073}, {word: "chocolate", quantity: 2043}, {word: "spicy", quantity: 2018}, {word: "lemon", quantity: 2010}, {word: "pinneapple", quantity: 2002}, {word: "Cabernet", quantity: 1996}, {word: "pepper", quantity: 1937}]);
    main.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
    data => d3.pack()
        .size([width - 2, height - 2])
        .padding(3)
       (d3.hierarchy({children: data})
        .sum(d => d.quantity))
    )});
      main.variable(observer("width")).define("width", function(){return(
    932
    )});
      main.variable(observer("height")).define("height", ["width"], function(width){return(
    width
    )});
      main.variable(observer("format")).define("format", ["d3"], function(d3){return(
    d3.format(",d")
    )});
      main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
    d3.scaleOrdinal(data.map(d => d.word), d3.schemeCategory10)
    )});
      main.variable(observer("d3")).define("d3", ["require"], function(require){return(
    require("d3@6")
    )});

    

    return main;
    
}
  
//export default function define1(runtime, observer) {
//     const main1 = runtime.module();
//     main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
//     main.variable(observer()).define(["md"], function(md){return(
//     md`# Bubble Chart`
//     )});
//     main1.variable(observer("chart")).define("chart", ["pack","data_low","d3","width","height","DOM","color","format"], function(pack,data_low,d3,width,height,DOM,color,format)
// {
//     const root = pack(data1);
//     var svg = d3.select("#svg-area1")
//         .append("svg")
//         .attr("viewBox", [0, 0, width, height])
//         .attr("font-size", 14)
//         .attr("font-family", "sans-serif")
//         .attr("text-anchor", "middle");

//     const leaf = svg.selectAll("g")
//         .data(root.leaves())
//         .join("g")
//             .attr("transform", d => `translate(${d.x +1},${d.y + 1})`);
//     d3.csv("/Documents/Project-3-Wine/winemag-data_first150k.csv").then((data1) => {
//         var description_low = []
//         data1.forEach(function(d){
            
//             if (d.points < '85') 
//             description_low.push(d.description);

//         });
//         //console.log(description)


//         function string_to_array(str) {
//         return str.trim().split(" ");
//         };
//         //console.log(string_to_array(description));

//         var description_words9 = []
//         description_low.forEach(function(d){
//             description_words9.push(string_to_array(d))
//         });
//         //console.log(description_words)



//         ///var description_words2 = []
//         ///Array.from(description_words.forEach(function(element){
//             ///description_words2.push(element)
//         ///});
//         ///console.log(description_words2)

//         ///console.log(description_words.join())
//         var description_words8 = description_words9.join()
//         function string_to_array2(str) {
//             return str.trim().split(",");
//         };
//         var description_words7 = string_to_array2(description_words8)
//         ///description_words3 = Array.from(description_words2)
        
//         //console.log(description_words2)

//         //console.log(description_words3)

//         const map = description_words7.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
//         var words2 = map.keys(description_words7);
//         //console.log(words1);
//         var quantity2 = map.values(description_words7);
//         //console.log(quantity1);
//         var arr1 = Array.from(map.entries());
//         var sortedArr1 = arr1.sort(function(a, b){return b[1]-a[1]})
//         console.log(sortedArr1);
//         var keys = Array.from(words2);
//         var values = Array.from(quantity2);
//         //console.log(keys);
//         //console.log(values);
//         var data_low = [{word: "fruit", quantity: 16971}, {word: "cherry", quantity: 11500}, {word: "sweet", quantity: 7641}, {word: "acidity", quantity: 6634}, {word: "dry", quantity: 6558}, {word: "soft", quantity: 6081}, {word: "red", quantity: 6077}, {word: "tannins", quantity: 7162}, {word: "berry", quantity: 5605}, {word: "fresh", quantity: 5230}, {word: "ripe", quantity: 5029}, {word: "green", quantity: 4779}, {word: "black", quantity: 4331}, {word: "crisp", quantity: 4258}, {word: "citrus", quantity: 4090}, {word: "light", quantity: 4013}, {word: "spice", quantity: 3991}, {word: "apple", quantity: 3987}, {word: "oak", quantity: 3963}, {word: "simple", quantity: 3885}, {word: "plum", quantity: 3581}, {word: "blackberry", quantity: 3556}, {word: "white", quantity: 3540}, {word: "vanilla", quantity: 3513}, {word: "raspberry", quantity: 3422}, {word: "herbal", quantity: 2986}, {word: "acidity", quantity: 2978}, {word: "peach", quantity: 2829}, {word: "rich", quantity: 2609}, {word: "Pinot", quantity: 2572}, {word: "tart", quantity: 2530}, {word: "clean", quantity: 2946}, {word: "bright", quantity: 2486}, {word:"easy", quantity: 2406}, {word: "pear", quantity: 2073}, {word: "chocolate", quantity: 2043}, {word: "spicy", quantity: 2018}, {word: "lemon", quantity: 2010}, {word: "pinneapple", quantity: 2002}, {word: "Cabernet", quantity: 1996}, {word: "pepper", quantity: 1937}]
    
//         data_low.forEach(function(d) {
//             d.quantity = +d.quantity
//         })
//         console.log(data_low[0])
//     });
//     leaf.append("circle")
//         .attr("id", d => (d.leafUid = DOM.uid("leaf")).word)
//         .attr("r", d => d.r)
//         .attr("fill-opacity", 0.7)
//         .attr("fill", d => color(d.data.word));

//     leaf.append("clipPath")
//         .attr("id", d => (d.clipUid = DOM.uid("clip")).word)
//         .append("use")
//         .attr("xlink:href", d => d.leafUid.href);

//     leaf.append("text")
//         .attr("clip-path", d => d.clipUid)
//         .selectAll("tspan")
//         .data(d => d.data.word.split(/(?=[A-Z][a-z])|\s+/g))
//         .join("tspan")
//         .attr("x", 0)
//         .attr("y", (d, i, nodes) => `${i - nodes.lenght /2 + 0.8}em`)
//         .text(d => d);

//     leaf.append("title")
//         .text(d => `${d.data.quantity === undefined ? "" : `${d.data.word}
//         `}${format(d.value)}`);

//     return svg.node();


//     }
//     );
//     main1.variable(observer("data_low")).define("data_low", [{word: "fruit", quantity: 16971}, {word: "cherry", quantity: 11500}, {word: "sweet", quantity: 7641}, {word: "acidity", quantity: 6634}, {word: "dry", quantity: 6558}, {word: "soft", quantity: 6081}, {word: "red", quantity: 6077}, {word: "tannins", quantity: 7162}, {word: "berry", quantity: 5605}, {word: "fresh", quantity: 5230}, {word: "ripe", quantity: 5029}, {word: "green", quantity: 4779}, {word: "black", quantity: 4331}, {word: "crisp", quantity: 4258}, {word: "citrus", quantity: 4090}, {word: "light", quantity: 4013}, {word: "spice", quantity: 3991}, {word: "apple", quantity: 3987}, {word: "oak", quantity: 3963}, {word: "simple", quantity: 3885}, {word: "plum", quantity: 3581}, {word: "blackberry", quantity: 3556}, {word: "white", quantity: 3540}, {word: "vanilla", quantity: 3513}, {word: "raspberry", quantity: 3422}, {word: "herbal", quantity: 2986}, {word: "acidity", quantity: 2978}, {word: "peach", quantity: 2829}, {word: "rich", quantity: 2609}, {word: "Pinot", quantity: 2572}, {word: "tart", quantity: 2530}, {word: "clean", quantity: 2946}, {word: "bright", quantity: 2486}, {word:"easy", quantity: 2406}, {word: "pear", quantity: 2073}, {word: "chocolate", quantity: 2043}, {word: "spicy", quantity: 2018}, {word: "lemon", quantity: 2010}, {word: "pinneapple", quantity: 2002}, {word: "Cabernet", quantity: 1996}, {word: "pepper", quantity: 1937}]);
//     main1.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
//     data => d3.pack()
//         .size([width - 2, height - 2])
//         .padding(3)
//     (d3.hierarchy({children: data})
//         .sum(d => d.quantity))
//     )});
//     main1.variable(observer("width")).define("width", function(){return(
//     932
//     )});
//     main1.variable(observer("height")).define("height", ["width"], function(width){return(
//     width
//     )});
//     main1.variable(observer("format")).define("format", ["d3"], function(d3){return(
//     d3.format(",d")
//     )});
//     main1.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
//     d3.scaleOrdinal(data.map(d => d.word), d3.schemeCategory10)
//     )});
//     main1.variable(observer("d3")).define("d3", ["require"], function(require){return(
//     require("d3@6")
//     )});
    
//     return main1
// }



d3.csv("/Documents/Project-3-Wine/winemag-data_first150k.csv").then((data1) => {
    
    
    data1.forEach(function(d) {
        d.points = +d.points,
        d.price = +d.price
    })
    const reduced = data1.reduce(function(m,d){
        if(!m[d.country]){
            m[d.country] = {...d, count: 1};
        }
        m[d.country].points += d.points;
        m[d.country].price += d.price;
        m[d.country].count += 1;
        return m;
    },{});

    const result = Object.keys(reduced).map(function(k){
        const item = reduced[k];
        return {
            country : item.country,
            avg_points: item.points/item.count,
            avg_price: item.price/item.count
        }
    })
    //console.log(JSON.stringify(result,null,4));
    //console.log(result)
    var sorted = result.sort(function(a, b){return b.avg_points-a.avg_points});
    //console.log(sorted)
    var country = []
    
    sorted.forEach(function(d){
        
        country.push(d.country);

    });
    var points = []
    
    sorted.forEach(function(d){
        
        points.push(d.avg_points);

    });
    var price = []
    
    sorted.forEach(function(d){
        
        price.push(d.avg_price);

    });
    var trace1 = {
        x: country,
        y: points,
        name: 'Points',
        type: 'bar'
    };
    var trace2 = {
        x: country,
        y: price,
        name: 'Price',
        type: 'bar',
        marker: {
            color: 'rgb(204,204,204)'
        }
    };
    var data = [trace1, trace2];
    var layout = {
        barmode: 'group',
        height: 500,
        width: 1100,
        xaxis: {
            tickangle: -45
        }
    };
    Plotly.newPlot("bar", data, layout)

    var points = []
    data1.forEach(function(d){
        
        points.push(d.points);

    });
    var price = []
    data1.forEach(function(d){
        
        price.push(d.price);

    });
    //var points_price = points.concat(price)
    //console.log(points_price)

    var trace10 = {
        x: points,
        y: price,
        mode: 'markers',
        //type: 'scatter',
        marker: { 
            color: points,
            //size: x[i]*y[i],
            //opacity: [1, 0.8, 0.6, 0.4]
        }
    };

    var data10 = [trace10];

    var layout10 = {
        title: 'Points vs Prices',
        showlegend: false,
        height: 500,
        width: 1100,
        xaxis: {
            //range: [5.5],
            title: {
              text: 'Points'
            }
        },
        yaxis: {
            //range: [0,5],
            title: {
              text: 'Price'
            }
        }
        
    };
    Plotly.newPlot("scatter", data10, layout10);
});  