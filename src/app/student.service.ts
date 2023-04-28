import { Injectable } from '@angular/core';
import { Student } from './student';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  nextID: number = 0;

  constructor(private http: HttpClient) {}

  getNextID(): number {
    return ++this.nextID;
  }

  addStudent(newStd: Student) {
    return this.http.post(
      'https://studentdata-779e9-default-rtdb.firebaseio.com/' + 'student.json',
      newStd
    );
  }

  getStudents(): Observable<Student[]> {
    return this.http
      .get<Student[]>(
        'https://studentdata-779e9-default-rtdb.firebaseio.com/' +
          'student.json'
      )
      .pipe(
        map((responseData) => {
          const studentArray: Student[] = [];
          for (let key in responseData) studentArray.push(responseData[key]);
          return studentArray;
        })
      );
  }

  clearData() {
    this.nextID = 0;
    return this.http.delete(
      'https://studentdata-779e9-default-rtdb.firebaseio.com/' + 'student.json'
    );
  }
}
