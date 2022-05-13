var map;
var geocoder;

$(document).ready(function () {

    var v_lat = $("#Latitude").val(); //52.58970076871785
    var v_lng = $("#Longitude").val(); // -1.4920806884765625

    //if (v_lat == 0) { $("#Latitude").val(52.58970076871785); $("#Longitude").val(-1.4920806884765625); }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: new google.maps.LatLng(v_lat, v_lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    });
    geocoder = new google.maps.Geocoder();

    $('#City,#County,#Country,#PostCode').focusout(function () {
        var address = $('#Address1').val() + ', ' + $('#Address2').val() + ', ' +
                          $('#City').val() + ', ' + $('#County').val() + ', ' +
                          $('#Country').val() + ', ' + $('#PostCode').val();

        if (geocoder) {
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    $("#Latitude").val(map.getCenter().lat());
                    $("#Longitude").val(map.getCenter().lng());
                } else {
                    //alert("Address not recognised by Google Maps: " + status);
                }
            });
        }

    });

    // Detect User Map Movement (update the the form input values with the map centre co-ords)
    google.maps.event.addListener(map, "mousemove", function () {
        if (map.getCenter().lat() != 0 && map.getCenter().lng() != 0) {
            $("#Latitude").val(map.getCenter().lat());
            $("#Longitude").val(map.getCenter().lng());
        }
    });

});