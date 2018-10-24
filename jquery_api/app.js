// studera vad som kommer från sidan och gör det globalt tillgängligt nedan
 var allt
$(document).ready(function() {

    //    $.getJSON("offentliga-toaletter.json", function(data) {
    // filen är helt annorlunda

    $.getJSON("https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=offentliga-toaletter&facet=plats&facet=sasong&facet=oppettider&facet=avgift&facet=antal_dam&facet=antal_herr&facet=antal_unisex&facet=antal_urinoar&facet=antal_hwc&facet=hwc_larm&facet=skotbord&refine.oppettider=dygnetrunt", function(data) {

               allt = data

        for (let i = 0; i <= data.records.length - 1; i++) {
            //      console.log(i)
            //      console.log(data.records[i].fields)

            var items =""
//            var items =[]

            $.each(data.records[i].fields, function(key, val) {

                var platsen = data.records[i].fields.plats
                // platsen i filen ligger i allt[0].fields.plats


//                items.push("<li id='" + key + "'>" + data.records[i].fields.plats + ": " + key + ": " + val + "</li>")
                items=("<li id='" + key + "'>" + data.records[i].fields.plats + ": " + key + ": " + val + "</li>")

                //objektlängden får göra om det så att det blir rätt senare
                console.log( Object.keys( allt.records[i].fields ).length )

                $("<ul/>", {
                    "class": platsen,
//                    html: items.join( "" )
                    html: items

                }).appendTo("body");
                
            })

            
        }
    })
})
