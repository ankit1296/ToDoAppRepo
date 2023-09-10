import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'toDoUi';
  baseUrl = 'http://localhost:4000';
  toDoItemsUrl = '/toDo';
  toDoItems:Array<any> = [];
  task:string = '';
  constructor(private http:HttpClient) {

  }

  ngOnInit(): void {
    this.getToDoItems();
  }

  getToDoItems(): void {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    this.http.get(`${this.baseUrl}${this.toDoItemsUrl}`,{headers}).subscribe((items)=>{
      this.toDoItems = (items as Array<any>).filter(item=>!item.isDeleted);
    },
    err=>{
      console.error('Error occured while fetching items',err);
    })
  }

  addTask(): void {
    const taskData = { taskToDo: this.task, completeBefore: null };
     this.http.post(`${this.baseUrl}${this.toDoItemsUrl}`,taskData).subscribe(()=> {
          this.getToDoItems();
          this.task = '';
     },
     err=>{
      console.error('Error occured while saving task',err);
    })
  }

  markCompleted(item:any): void {
    let params = new HttpParams();
    params = params.append('id', item._id);
     this.http.patch(`${this.baseUrl}${this.toDoItemsUrl}`,undefined,{params}).subscribe(()=> {
          this.getToDoItems();
          this.task = '';
     },
     err=>{
      console.error('Error occured while saving task',err);
    })
  }
  markDeleted(item:any): void {
    let params = new HttpParams();
    params = params.append('id', item._id);
     this.http.delete(`${this.baseUrl}${this.toDoItemsUrl}`,{params}).subscribe(()=> {
          this.getToDoItems();
          this.task = '';
     },
     err=>{
      console.error('Error occured while saving task',err);
    })
  }
}
