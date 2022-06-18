import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.css'],
})
export class ListLogsComponent implements OnInit {
  listLogs: Logs[] = [];

  constructor(private _logsService: LogsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.logs();
  }

  logs() {
    this._logsService.getLogs().subscribe(
      (data) => {
        this.listLogs = data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
