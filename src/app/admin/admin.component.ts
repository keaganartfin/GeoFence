import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { PusherService } from '../pusher.service';

declare const google;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private loader: MapsAPILoader, private pusher: PusherService) {}

  theRanchPolygon;
  username = 'Admin'
  showAlert = false;
  showLocationUpdate = false;
  zoom = 13;
  center = {
    lat: 41.70880,
    lng: -87.97925,
  };
  polygon = [
    { lat: 41.71868, lng: -87.99878 },
    { lat: 41.71996, lng: -87.95198 },
    { lat: 41.70836, lng: -87.95172 },
    { lat: 41.69765, lng: -87.96692 },
    { lat: 41.69508, lng: -88.00127 },
    { lat: 41.71714, lng: -88.00101 },

  ];

  ngOnInit() {
    this.loader.load().then(() => {
      this.theRanchPolygon = new google.maps.Polygon({ paths: this.polygon });
    });

    const channel = this.pusher.init();
    channel.bind('ping', (position) => {
      this.center = {
        ...position,
      };
      const latLng = new google.maps.LatLng(position);
      this.showLocationUpdate = true;
      if (
        !google.maps.geometry.poly.containsLocation(latLng, this.theRanchPolygon)
      ) {
        this.showAlert = true;
      }
    });
  }
}
