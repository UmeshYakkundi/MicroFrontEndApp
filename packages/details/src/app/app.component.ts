import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

var parentContext:any ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'details';
  @Input('selectedDevice') selectedDevice:any;

  constructor(
    public router: Router) {
      parentContext = this;
      document.addEventListener('route-change-event', this.handleEventData, { capture: true });
  }

  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
  }

  handleEventData = function (e:any) {
    parentContext.router.navigate(['/'+e.detail]);
    parentContext.router.initialNavigation();
  };

  sendSelectedResources() {
    let resource = {
      "id": 1,
      "name": "FlashSystem233"
    };
    document.dispatchEvent(new CustomEvent('app-component-event', { detail: resource }));
  }

  ngOnDestroy(): void {
    document.removeEventListener("route-change-event", this.handleEventData);
  }

}
