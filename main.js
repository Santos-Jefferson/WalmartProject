function getStringFromUser() {
    var input = document.getElementById("searchString").value;
    var walmartApiKey = "8d97n679j89udpwveju6naw3";
    var url = "http://api.walmartlabs.com/v1/search?query=" + input + "&apiKey=" + walmartApiKey;

    var settings = {
        "async": true,
        "crossDomain": true,
        "dataType": 'jsonp', 
        "url": url,
        "method": "GET",
        "headers": {
            "Cache-Control": "no-cache",
            "Postman-Token": "d58cbb69-4cb1-436c-a02b-ba5f27cf9981"
        }
    }
    var table = "";
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.items.length; i++) {
            table += "<div class=prodGallery><a target=_blank href=http://teste.com><img src=" + response.items[i].thumbnailImage + "></a>";
            table += "<div class=desc><strong>" + response.items[i].name + "</strong><br /><br />";
            table += response.items[i].shortDescription + "<br />";
            table += "<strong>" + response.items[i].salePrice.toFixed(2) + "</strong></div></div>";
        }
        document.getElementById("jsonReturn").innerHTML = table;
    });
}