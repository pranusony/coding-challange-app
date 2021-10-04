import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'coding-challange-app';

  displayedColumns: string[] = ['name', 'specialty'];
  results$:Observable<any> = new Observable<any>();
  search$ = new Subject<{search:string, field:string}>();
  searchField:string = 'name';
  searchValue:string = '';

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.loadData();
     this.search$.pipe(debounceTime(300)).subscribe((filter) => {
        this.loadData(filter);
     })
  }

  loadData(filter?:{
    search:string,
    field:string
  }) {
    if(filter) {
      this.results$ = this.http.get(`http://localhost:3000/api/data?search=${filter.search}&field=${filter.field}`)
    } else {
      this.results$ = this.http.get("http://localhost:3000/api/data");
    }
  }

  handleSearch(event:any) {
    this.searchValue = event.target.value;
    this.initiateSearch();
  }

  handleFieldChange(event:any) {
    this.searchField = event.target.value;
    this.initiateSearch();
  }

  initiateSearch() {
    this.search$.next({
      search:this.searchValue,
      field:this.searchField,
    });
  }
}
