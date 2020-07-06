import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 't1';

  ngOnInit() : void {

    const numbers$ = interval(1000).pipe(
      take(5)
    ).subscribe(x=> console.log(x));

  }

  ngOnDestroy(): void {
  }
}
