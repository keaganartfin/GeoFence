import { Injectable } from '@angular/core';
declare const Pusher: any;

@Injectable()
export class PusherService {
  constructor() {
    const pusher = new Pusher('bc694f40c8216f0be3c7', {
      cluster: 'us2',
    });
    this.channel = pusher.subscribe('location');
  }
  channel;

  public init() {
    return this.channel;
  }
}