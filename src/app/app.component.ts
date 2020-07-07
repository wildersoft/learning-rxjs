import { Component } from '@angular/core';
import { Observable, fromEvent, observable, Subject } from 'rxjs';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { debounceTime, retry, map, switchMap, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {

  }

  title = 't1';
  searchString;
  searchSubject$ = new Subject<string>();
  results$ = new Observable<any>();

  queryAPI(searchString) {
    console.log('queryApi' + searchString);
    return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`)
    .pipe( map(result => result['data']['children']) );
  }

  ngOnInit() : void {
    this.results$ = this.searchSubject$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      //do changed to tap
      tap(x=> console.log('tap:' + x)),
      switchMap(searchString => this.queryAPI(searchString) )
    );
  }

    inputChanged($event) {
      console.log('input changed', $event);
      this.searchSubject$.next($event);
    }
  ngOnDestroy(): void {
  }
}
