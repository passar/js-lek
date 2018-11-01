// studera vad som kommer från sidan och gör det globalt tillgängligt nedan
var allt
var url
// Om vi hittar position så vill vi ha den såklart istället för standardvärdet ovan
// samt förbereder förändring av avståndet
var urlAvstand = 1500
// var urlAvstand = 200000

$(function () {
    // denna här hämtar adress på ip vilket är snabbare men precitionen är så dålig samt att tjänsten var nere en kväll
    $.getJSON("http://ip-api.com/json/?fields=192", function (plats) {
        ipPlats = plats
        console.log(plats.lon + " " + plats.lat)
        url = "https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=offentliga-toaletter&facet=plats&facet=sasong&facet=oppettider&facet=avgift&facet=antal_dam&facet=antal_herr&facet=antal_unisex&facet=antal_urinoar&facet=antal_hwc&facet=hwc_larm&facet=skotbord&geofilter.distance=" + plats.lat + "%2C" + plats.lon + "%2C" + urlAvstand;
        hamtaData(url)
    }, hamtaPosGeo()) 

    // ovan position vill inte fungera längre
// hamtaPosGeo()

    $("#geoKnapp").click(function () {
        console.log("tryckt på uppdatera")
        // lägg till en rensa artikeln
        $("article").replaceWith('<article class="container">')
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
        /*
                console.log('Din position:');
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);
        */
        var urlLat = crd.latitude
        var urlLong = crd.longitude

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

        for (let i = 0; i < data.records.length; i++) {
            // start here
            // compare time of client with opengin hours and season
            // opening hours = check time
            // make client time visible
            // get the opeining season
            // split the string of the season
            // calculate tha season range
            // convert the clients month
            var dettaNu = new Date().getMonth()
            // compare clients month to season range
            // if ( the date or time is out of range ignore) {
            // if there are no toilets widen the range of search
            // do search again with the new value

            var items = []
            var itemsLength = Object.keys(data.records[i].fields).length

            var kortare = data.records[i].fields

            // Vissa offentliga toaletter har en avgift
            var avgiften = ""
            if (kortare.avgift != undefined) {
                avgiften = "<li> Avgift: " + kortare.avgift + "</li>"
            }

            // Tiden kan visas snyggare. Fixa skriva till hur långt kvar till att den stänger/öppnar.
            oppet = kortare.oppettider
            // Gör en funktion för att lösa båda problemen
            function addTecken(strang, position, tecken) {
                var a = strang
                var b = tecken
                var position
                return [a.slice(0, position), b, a.slice(position)].join('');
            }

            // allt.records[4].fields.sasong = aprsep
            // dela till [apr, sep]

            var manader = delaDatum("aprsep", 3)

            function delaDatum(strang, position){
                var a = strang
                var position
                return [a.slice(0,position), a.slice(position)]

                /*
                var forstaOrd = []
                var andraOrd
                forstaOrd.push(strang.charAt(0)) // a
                forstaOrd.push(strang.charAt(1)) // p
                forstaOrd.push(strang.charAt(2)) // r

                andraOrd[0] = strang.charAt(3) // s
                andraOrd[1] = strang.charAt(4) // e
                andraOrd[2] = strang.charAt(5) // e

                return [forstaOrd,andraOrd] // [apr, se]
            */
            }


            if (oppet.charAt(0) == 0) { // 0720 -> 07-20
                oppet = addTecken(oppet, 2, "-")
            }
            if (oppet.charAt(0) == "d") { // dygnetrunt -> dygnet runt
                oppet = addTecken(oppet, 6, "\ ")
            }
            var sasongen = kortare.sasong
            if (sasongen == "helaaret") { // helaaret -> Hela året
                sasongen = "Hela året"
            }

            var platsen = kortare.plats
            // här skrivs varje datainlägg
            $("<div>", {
                "class": "card-deck mb-3 text-left",
                html:
                    '<div class="card mb-4 shadow-sm"> \
                <div class="card-header"> \
                    <h4 class="my-0 font-weight-normal">'+ platsen + "</h4> \
                </div> \
<div class=\"card-body\">\
<ul class=\"list-unstyled mt-3 mb-4\">"+
                    "<li> Öppettider: " + oppet + "</li>" +
                    "<li> Säsong: " + sasongen + "</li>" + avgiften +
                    "</ul>" +
                    "<a href=\'https://www.google.com/maps/search/?api=1&query=" + kortare.geo_point_2d + "'" +
                    `   <button type="button" class="btn btn-lg btn-block btn-outline-primary"> \
              Till google maps \
            </button>\
          </a>\
        </div>\
      </div>`
            }).appendTo("article");
        }
    })
}
