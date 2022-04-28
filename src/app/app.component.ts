import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  latitude: number = 51.678418;
  longitude: number = 7.809007;

  title = 'app';
}
