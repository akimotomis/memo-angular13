import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'memo-Angular13';
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller) {
    this.router.events.pipe(
      filter((event): event is Scroll => event instanceof Scroll)
    ).subscribe(e => {
      console.log(e);

      // this is fix for dynamic generated(loaded..?) content
      setTimeout(() => {
        if (e.position) {
          // backward navigation
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          // anchor navigation
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          // forward navigation
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
    });
  }
}
