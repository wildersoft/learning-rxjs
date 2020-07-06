import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 't1';

  ngOnInit() : void {

    const numbers$ = interval(1000).pipe(
      take(5), map(i => i * 10), filter(x=> x > 20)
    ).subscribe(x=> console.log(x));
  }

  ngOnDestroy(): void {
  }
}
