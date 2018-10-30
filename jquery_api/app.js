// studera vad som kommer från sidan och gör det globalt tillgängligt nedan
var allt
var url
//    Om vi hittar position så vill vi ha den såklart istället för standardvärdet ovan
// samt förbereder förändring av avståndet
var urlAvstand = 1500

$(function () {

    $.get("http://ip-api.com/json/?fields=lat,lon", function (plats) {
        ipPlats = plats
        console.log(plats.lon + " " + plats.lat)
        url = "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=offentliga-toaletter&facet=plats&facet=sasong&facet=oppettider&facet=avgift&facet=antal_dam&facet=antal_herr&facet=antal_unisex&facet=antal_urinoar&facet=antal_hwc&facet=hwc_larm&facet=skotbord&geofilter.distance=" + plats.lat + "%2C" + plats.lon + "%2C" + urlAvstand;
        hamtaData(url)
    })
    $("#geoKnapp").click(function () {
        console.log("tryckt på uppdatera")
        hamtaPosGeo()
    });


})

function hamtaPosGeo() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(pos) {
        var crd = pos.coords;

        console.log('Din position:');
        console.log(`Latitude : ${crd.latitude}`);
        var urlLat = crd.latitude
        console.log(`Longitude: ${crd.longitude}`);
        var urlLong = crd.longitude
        console.log(`More or less ${crd.accuracy} meters.`);

        url = "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=offentliga-toaletter&facet=plats&facet=sasong&facet=oppettider&facet=avgift&facet=antal_dam&facet=antal_herr&facet=antal_unisex&facet=antal_urinoar&facet=antal_hwc&facet=hwc_larm&facet=skotbord&geofilter.distance=" + urlLat + "%2C" + urlLong + "%2C" + urlAvstand;

        //skriv ut med denna lokalisering
        hamtaData(url);
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
}

function hamtaData(webadress) {
    $.getJSON(webadress, function (data) {

        allt = data // ger mig tillgång till att felsöka datan som kommer in.

        for (let i = 0; i <= data.records.length - 1; i++) {
            //      console.log(i)
            //      console.log(data.records[i].fields)

            var platsen
            var items = ""
            //var grejer = []
            // var items =[]

            var itemsLength = Object.keys(allt.records[i].fields).length
            console.log(itemsLength)
            /*     for (var j = 0; j < itemsLength - 1; j++) {
                     console.log(j)
                 }
            */

            $.each(data.records[i].fields, function (key, val) {

                platsen = data.records[i].fields.plats
                // platsen i filen ligger i allt[0].fields.plats

                //  grejer.push("<li id='" + key + "'>" + data.records[i].fields.plats + ": " + key + ": " + val + "</li>")

                items = ("<li id='" + key + "'>" + data.records[i].fields.plats + ": " + key + ": " + val + "</li>")

                //objektlängden får göra om det så att det blir rätt senare


                $("<ul/>", {
                    "class": platsen,
                    // html: grejer.join( "" )
                    html: items

                }).appendTo("body");
            })
        }
    })
}