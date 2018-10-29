// studera vad som kommer från sidan och gör det globalt tillgängligt nedan
var allt
var url
$(function () {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
      
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      
      navigator.geolocation.getCurrentPosition(success, error, options);
      
    // Skapa en platsbaserad url. Detta är grundformen och kommer att vara utgångspunkten
    // var url // = "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=offentliga-toaletter&facet=plats&facet=sasong&facet=oppettider&facet=avgift&facet=antal_dam&facet=antal_herr&facet=antal_unisex&facet=antal_urinoar&facet=antal_hwc&facet=hwc_larm&facet=skotbord&geofilter.distance=56.0467%2C12.6944%2C2000"
    
    //    Om vi hittar position så vill vi ha den såklart istället för standardvärdet ovan
        // samt förbereder förändring av avståndet
    var urlLat, urlLong
    var urlAvstand = 2000

    if (navigator.geolocation) {
    
        navigator.geolocation.getCurrenPosition(function (position) {
            urlLat = position.coords.latitude
            urlLong = position.coords.longitude

            url = "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=offentliga-toaletter&facet=plats&facet=sasong&facet=oppettider&facet=avgift&facet=antal_dam&facet=antal_herr&facet=antal_unisex&facet=antal_urinoar&facet=antal_hwc&facet=hwc_larm&facet=skotbord&geofilter.distance=" + urlLat + "%2C" + urlLong + "%2C" + urlAvstand
   
        })  
    }



    // $.getJSON("offentliga-toaletter.json", function(data) {
    // filen är helt annorlunda








$.getJSON(url, function (data) {

    allt = data // ger mig tillgång till att felsöka datan som kommer in.

    for (let i = 0; i <= data.records.length - 1; i++) {
        //      console.log(i)
        //      console.log(data.records[i].fields)

        var items = ""
        //          var items =[]

        $.each(data.records[i].fields, function (key, val) {

            var platsen = data.records[i].fields.plats
            // platsen i filen ligger i allt[0].fields.plats
            $("<ul/>", { platsen }).appendTo("body")

            //                items.push("<li id='" + key + "'>" + data.records[i].fields.plats + ": " + key + ": " + val + "</li>")
            items = ("<li id='" + key + "'>" + data.records[i].fields.plats + ": " + key + ": " + val + "</li>")

            //objektlängden får göra om det så att det blir rätt senare
            console.log(Object.keys(allt.records[i].fields).length)

            $("<ul/>", {
                "class": platsen,
                //                    html: items.join( "" )
                html: items

            }).appendTo("body");

        })


    }
})
})
