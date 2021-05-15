import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Opinion } from '../model/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private http: HttpClient) { }

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  getOpinions(): Observable<Opinion[]> {
    return this.http.get<Opinion[]>('http://localhost:8080/api/v1/opinions').pipe(
      map(response => response)
    );
  }

  // add opinion
  addOpinion(opinion: Opinion): Observable<Opinion> {
    const API_URL = 'http://localhost:8080/api/v1/opinions/save';
    return this.http.post<Opinion>(API_URL, opinion).pipe(
      catchError(this.handleError)
    );
  }

  // Delete opinion
  deleteOpinion(id: number) {
    const API_URL = `http://localhost:8080/api/v1/opinions/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
