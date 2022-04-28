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
  username = 'J. Admin'
  showAlert = false;
  showLocationUpdate = false;
  zoom = 16;
  center = {
    lat: 6.435838,
    lng: 3.451384,
  };
  polygon = [
    { lat: 6.436914, lng: 3.451432 },
    { lat: 6.436019, lng: 3.450917 },
    { lat: 6.436584, lng: 3.450917 },
    { lat: 6.435006, lng: 3.450928 },
    { lat: 6.434953, lng: 3.451808 },
    { lat: 6.435251, lng: 3.451765 },
    { lat: 6.435262, lng: 3.451969 },
    { lat: 6.435518, lng: 3.451958 },
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
