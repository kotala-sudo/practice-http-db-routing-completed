import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];

  constructor(private stdService: StudentService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.stdService.getStudents().subscribe((data) => {
      this.studentList = data;
      console.log(data);
    });
  }

  onClearData() {
    this.stdService.clearData().subscribe((data) => {
      this.fetchData();
    });
  }
}
