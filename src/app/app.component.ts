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
  search$ = new Subject<string>();
  searchField:string = 'name';
  ngModelOptions = {
    standalone:true
  }

  constructor(private http: HttpClient) {
  }
  ngOnInit(): void {
    this.loadData();
     this.search$.pipe(debounceTime(300)).subscribe((value) => {
        this.loadData({
          search:value,
          field:this.searchField
        });
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
    this.search$.next(event.target.value);
  }

}
