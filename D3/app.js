export default function define(runtime, observer) {
    const main = runtime.module();
    ///main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
    // main.variable(observer()).define(["md"], function(md){return(
    // md`# Bubble Chart`
    // )});
    main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","DOM","color","format", "data_low"], function(pack,data,d3,width,height,DOM,color,format, data_low)
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
    d3.csv("/Documents/Project-3-Wine/clean_data130.csv").then((data1) => {
        var description = []
        data1.forEach(function(d){
            
            if (d.points > '95') 
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
        
        const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
        
        for (var i = 0; i < sortedArr.lenght; i++) {
            if (sortedArr[i] == stopwords) {
                sortedArr.splice(i, 1);
            }
        }

        //console.log(sortedArr);
        
        var data = [{word: "fruit", quantity: 412}, {word:"black", quantity: 268}, {word: "tannins", quantity: 252}, {word: "rich", quantity: 198}, {word: "ripe", quantity: 197}, {word: "cherry", quantity: 187}, {word: "acidity", quantity: 263}, {word: "great", quantity: 155}, {word: "dark", quantity: 153}, {word: "aromas", quantity: 139}, {word: "spice", quantity: 137}, {word: "Cabernet", quantity: 133}, {word: "sweet", quantity: 114}, {word:"structure", quantity: 108}, {word: "dense", quantity: 106}, {word: "age", quantity: 106}, {word: "concentrated", quantity: 105}, {word: "years", quantity: 199}, {word: "complex", quantity: 102}, {word: "red", quantity: 102}, {word: "berry", quantity: 96}, {word: "long", quantity: 94}, {word: "firm", quantity: 94}, {word: "chocolate", quantity: 93}, {word: "blackberry", quantity: 90}, {word: "notes", quantity: 88}, {word: "structured", quantity: 88}, {word: "new", quantity: 87}, {word: "dry", quantity: 83}, {word: "raspberry", quantity: 82}, {word: "intense", quantity: 81}, {word:"balanced", quantity: 158}, {word: "finish", quantity: 81}, {word: "richness", quantity: 79}, {word: "powerful", quantity: 79}, {word: "oak", quantity: 78}, {word: "well", quantity: 78}, {word: "vintage", quantity: 77}, {word: "delicious", quantity: 75}, {word: "licorice", quantity: 73}, {word: "texture", quantity: 70}, {word: "power", quantity: 70}]
        console.log(data.length)
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
    const root1 = pack(data_low);
    var svg1 = d3.select("#svg-area2")
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("font-size", 14)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");

    const leaf1 = svg1.selectAll("g")
        .data(root1.leaves())
        .join("g")
            .attr("transform", d => `translate(${d.x +1},${d.y + 1})`);
    d3.csv("/Documents/Project-3-Wine/clean_data130.csv").then((data1) => {
        var description_low = []
        data1.forEach(function(d){
            
            if (d.points < '83') 
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
        var data_low = [{word: "flavors", quantity: 1645}, {word: "aromas", quantity: 741}, {word: "palate", quantity: 591}, {word: "fruit", quantity: 768}, {word: "sweet", quantity: 466}, {word: "finish", quantity: 832}, {word: "green", quantity: 369}, {word: "cherry", quantity: 355}, {word: "nose", quantity: 345}, {word: "tastes", quantity: 263}, {word: "simple", quantity: 246}, {word: "red", quantity: 243}, {word: "soft", quantity: 240}, {word: "berry", quantity: 227}, {word: "acidity", quantity: 337}, {word: "dry", quantity: 221}, {word: "bitter", quantity: 216}, {word: "citrus", quantity: 195}, {word: "oak", quantity: 187}, {word: "notes", quantity: 186}, {word: "feels", quantity: 184}, {word: "raspberry", quantity: 179}, {word: "herbal", quantity: 178}, {word: "blend", quantity: 177}, {word: "sour", quantity: 176}, {word: "tart", quantity: 174}, {word: "little", quantity: 171}, {word: "apple", quantity: 158}, {word: "thin", quantity: 155}, {word: "tannins", quantity: 151}, {word: "candied", quantity: 149}, {word: "vegetal", quantity: 145}, {word: "mouth", quantity: 145}, {word:"very", quantity: 137}, {word: "heavy", quantity: 136}, {word: "plum", quantity: 133}, {word: "sharp", quantity: 129}, {word: "bit", quantity: 129}, {word: "flavor", quantity: 127}, {word: "white", quantity: 124}, {word: "blackberry", quantity: 122}, {word: "hard", quantity: 117}, {word: "vanilla", quantity: 116}, {word: "smells", quantity: 114}, {word: "flat", quantity: 113}, {word: "alcohol", quantity: 108}]
        console.log(data_low.length)
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
    
    
    //return svg.node();
    

}
);
    main.variable(observer("data")).define("data", [{word: "fruit", quantity: 412}, {word:"black", quantity: 268}, {word: "tannins", quantity: 252}, {word: "rich", quantity: 198}, {word: "ripe", quantity: 197}, {word: "cherry", quantity: 187}, {word: "acidity", quantity: 263}, {word: "great", quantity: 155}, {word: "dark", quantity: 153}, {word: "aromas", quantity: 139}, {word: "spice", quantity: 137}, {word: "Cabernet", quantity: 133}, {word: "sweet", quantity: 114}, {word:"structure", quantity: 108}, {word: "dense", quantity: 106}, {word: "age", quantity: 106}, {word: "concentrated", quantity: 105}, {word: "years", quantity: 199}, {word: "complex", quantity: 102}, {word: "red", quantity: 102}, {word: "berry", quantity: 96}, {word: "long", quantity: 94}, {word: "firm", quantity: 94}, {word: "chocolate", quantity: 93}, {word: "blackberry", quantity: 90}, {word: "notes", quantity: 88}, {word: "structured", quantity: 88}, {word: "new", quantity: 87}, {word: "dry", quantity: 83}, {word: "raspberry", quantity: 82}, {word: "intense", quantity: 81}, {word:"balanced", quantity: 158}, {word: "finish", quantity: 81}, {word: "richness", quantity: 79}, {word: "powerful", quantity: 79}, {word: "oak", quantity: 78}, {word: "well", quantity: 78}, {word: "vintage", quantity: 77}, {word: "delicious", quantity: 75}, {word: "licorice", quantity: 73}, {word: "texture", quantity: 70}, {word: "power", quantity: 70}]);
    main.variable(observer("data_low")).define("data_low", [{word: "flavors", quantity: 1645}, {word: "aromas", quantity: 741}, {word: "palate", quantity: 591}, {word: "fruit", quantity: 768}, {word: "sweet", quantity: 466}, {word: "finish", quantity: 832}, {word: "green", quantity: 369}, {word: "cherry", quantity: 355}, {word: "nose", quantity: 345}, {word: "tastes", quantity: 263}, {word: "simple", quantity: 246}, {word: "red", quantity: 243}, {word: "soft", quantity: 240}, {word: "berry", quantity: 227}, {word: "acidity", quantity: 337}, {word: "dry", quantity: 221}, {word: "bitter", quantity: 216}, {word: "citrus", quantity: 195}, {word: "oak", quantity: 187}, {word: "notes", quantity: 186}, {word: "feels", quantity: 184}, {word: "raspberry", quantity: 179}, {word: "herbal", quantity: 178}, {word: "blend", quantity: 177}, {word: "sour", quantity: 176}, {word: "tart", quantity: 174}, {word: "little", quantity: 171}, {word: "apple", quantity: 158}, {word: "thin", quantity: 155}, {word: "tannins", quantity: 151}, {word: "candied", quantity: 149}, {word: "vegetal", quantity: 145}, {word: "mouth", quantity: 145}, {word:"very", quantity: 137}, {word: "heavy", quantity: 136}, {word: "plum", quantity: 133}, {word: "sharp", quantity: 129}, {word: "bit", quantity: 129}, {word: "flavor", quantity: 127}, {word: "white", quantity: 124}, {word: "blackberry", quantity: 122}, {word: "hard", quantity: 117}, {word: "vanilla", quantity: 116}, {word: "smells", quantity: 114}, {word: "flat", quantity: 113}, {word: "alcohol", quantity: 108}]);
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

    

    //return main;
    
}
  
d3.csv("/Documents/Project-3-Wine/clean_data130.csv").then((data1) => {
    
    
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
            color: 'rgb(214,39,40)'
        }
    };
    var data = [trace1, trace2];
    var layout = {
        barmode: 'group',
        height: 500,
        width: 1400,
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
        width: 1400,
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

d3.csv("/Documents/Project-3-Wine/clean_data130.csv").then((data1) => {
    
    
    data1.forEach(function(d) {
        d.points = +d.points,
        d.price = +d.price
    })
    
    var points = []
        data1.forEach(function(d){
            
            points.push(d.points);

        });
    const map = points.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    
    var arr5 = Array.from(map.entries());
    var sortedArr5 = arr5.sort(function(a, b){return a[0]-b[0]})
    
    var points5 = sortedArr5.map(function(value,index) {return value[0]; });
    console.log(points5);
    var quantity5 = sortedArr5.map(function(value,index) {return value[1]; });
    console.log(quantity5);
     
        
    
    var trace5 = {
        x: points5,
        y: quantity5,
        //name: 'Points',
        type: 'bar',
        marker: {
            color: 'rgb(214,39,40)'
        }
    };
    
    var data5 = [trace5];
    var layout5 = {
        barmode: 'group',
        height: 500,
        width: 1400
        
    };
    Plotly.newPlot("bar2", data5, layout5)
});