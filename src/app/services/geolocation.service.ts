import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

declare var google

// place in index.html
// <script type="text/javascript" src="//maps.google.com/maps/api/js?key=AIzaSyDU1WcgwZzaK9b2vziSYKf6v8N5LPT_SwM"></script>

@Injectable()
export class GeolocationService {

    constructor() { }

    get(address1: String, address2: string, city: string, county: string, country: string, postCode: string) {
        var v_lat = 52.58970076871785, v_lng = -1.4920806884765625

        var address = address1 + ', ' + address2 + ', ' + city + ', ' + county + ', ' + country + ', ' + postCode

        var geocoder = new google.maps.Geocoder()

        // next line creates asynchronous request
        geocoder.geocode({ 'address': address }, function (results, status) {
            // and this is function which processes response
            if (status == google.maps.GeocoderStatus.OK) {
                v_lat = results[0].geometry.location.lat()
                v_lng = results[0].geometry.location.lng()
                console.log('service', v_lat, v_lng); // the place where loc contains geocoded coordinates
                return [v_lat, v_lng]
            } else {
                console.log("Geocode was not successful for the following reason: " + status)
            }
        })
    }
}
