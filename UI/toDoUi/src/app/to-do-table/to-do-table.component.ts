import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToDoTableDataSource, ToDoTableItem } from './to-do-table-datasource';

@Component({
  selector: 'to-do-table',
  templateUrl: './to-do-table.component.html',
  styleUrls: ['./to-do-table.component.scss']
})
export class ToDoTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Array<any>>;

  @Output() markCompleted = new EventEmitter<any>();
  @Output() markDeleted = new EventEmitter<any>();

  dataSource: MatTableDataSource<Array<any>>;
  @Input() set toDoItems(toDoItems:Array<any>) {
    this.dataSource = new MatTableDataSource(toDoItems);
    if(this.table) {
      this.table.dataSource = this.dataSource;
    }
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['taskToDo', 'completeBefore', 'isDeleted'];

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }



}
