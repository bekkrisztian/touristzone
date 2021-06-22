import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Country } from '../model/country';
import { CountryDto } from '../model/country-dto';
import { County } from '../model/county';
import { Others } from '../model/others';
import { Pin } from '../model/pin';
import { Sources } from '../model/sources';
import { Spectacle } from '../model/spectacle';

@Injectable({
  providedIn: 'root'
})
export class SpectacleService {

  private spectacleURL = "http://localhost:8080/api/v1/spectacles";
  private countryURL = "http://localhost:8080/api/v1/countries";
  private countyURL = "http://localhost:8080/api/v1/counties";
  private sourceURL = 'http://localhost:8080/api/v1/sources';
  private otherURL = 'http://localhost:8080/api/v1/others';
  private imageURL = 'http://localhost:8080/api/v1/images';
  private coverURL = 'http://localhost:8080/api/v1/cover';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient) { }

  getSpectacles(): Observable<Spectacle[]> {
    return this.http.get<Spectacle[]>(this.spectacleURL).pipe(
      map(response => response)
    );
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryURL).pipe(
      map(response => response)
    );
  }

  getCounties(): Observable<County[]> {
    return this.http.get<County[]>(this.countyURL).pipe(
      map(response => response)
    );
  }

  getCountry(countryId: string): Observable<Country> {
    const countryDetailsUrl = `${this.countryURL}/${countryId}`;
    return this.http.get<Country>(countryDetailsUrl);
  }

  getCounty(countyId: string): Observable<County> {
    const countyDetailsUrl = `${this.countyURL}/${countyId}`;
    return this.http.get<County>(countyDetailsUrl);
  }

  searchSpectacles(keyword: string, currentPage: number, pageSize: number) {
    const searchUrl = `${this.spectacleURL}/searchbykeyword?keyword=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<GetResponseSpectacles>(searchUrl);
  }

  getSpectacle(spectacleId: string): Observable<Spectacle> {
    const spectacleDetailsUrl = `${this.spectacleURL}/${spectacleId}`;
    return this.http.get<Spectacle>(spectacleDetailsUrl);
  }

  getCountriesAndCounties(): Observable<CountryDto[]> {
    const dtoUrl = "http://localhost:8080/api/v1/countries/countrydto";
    return this.http.get<CountryDto[]>(dtoUrl);
  }

  getSpectacleByCountyId(countyId: number, currentPage: number, pageSize: number): Observable<GetResponseSpectacles> {
    const searchUrl = `${this.spectacleURL}/findByCountyId?id=${countyId}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<GetResponseSpectacles>(searchUrl)
  }

  getSpectacleByCountryId(countryId: number, currentPage: number, pageSize: number): Observable<GetResponseSpectacles> {
    const searchUrl = `${this.spectacleURL}/findByCountryId?id=${countryId}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<GetResponseSpectacles>(searchUrl)
  }

  getSpectacleByCountryIdAndCountyId(countryId: number, countyId: number, currentPage: number, pageSize: number): Observable<GetResponseSpectacles> {
    const searchUrl = `${this.spectacleURL}/findByCountryId&CountyId?countryid=${countryId}&countyid=${countyId}&page=${currentPage}&size=${pageSize}`;
    return this.http.get<GetResponseSpectacles>(searchUrl)
  }

  getPins(): Observable<Pin[]> {
    const pinURL = "http://localhost:8080/api/v1/pins";
    return this.http.get<Pin[]>(pinURL).pipe(
      map(response => response)
    );
  }

  deletePin(id: number) {
    const API_URL = `http://localhost:8080/api/v1/pins/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  createPin(pin: Pin): Observable<Pin> {
    const API_URL = `http://localhost:8080/api/v1/pins/save`;
    return this.http.post<Pin>(API_URL, pin).pipe(
      catchError(this.handleError)
    );
  }

  getPin(pinId: string): Observable<Pin> {
    const API_URL = `http://localhost:8080/api/v1/pins/${pinId}`;
    return this.http.get<Pin>(API_URL);
  }

   // Create Spectacle
   createSpectacle(spectacle: Spectacle): Observable<Spectacle> {
    const API_URL = `${this.spectacleURL}/save`;
    return this.http.post<Spectacle>(API_URL, spectacle).pipe(
      catchError(this.handleError)
    );
  }

  // Update Spectacle
  updateSpectacle(spectacle: Spectacle): Observable<Spectacle> {
    const API_URL = `${this.spectacleURL}/save/${spectacle.id}`;
    return this.http.put<Spectacle>(API_URL, spectacle).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Spectacle
  deleteSpectacle(id: number) {
    const API_URL = `${this.spectacleURL}/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Create Country
  createCountry(country: Country): Observable<Country> {
    const API_URL = `${this.countryURL}/save`;
    return this.http.post<Country>(API_URL, country).pipe(
      catchError(this.handleError)
    );
  }

  // Update Country
  updateCountry(country: Country): Observable<Country> {
    const API_URL = `${this.countryURL}/save/${country.id}`;
    return this.http.put<Country>(API_URL, country).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Country
  deleteCountry(id: number) {
    const API_URL = `${this.countryURL}/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Create County
  createCounty(county: County): Observable<County> {
    const API_URL = `${this.countyURL}/save`;
    return this.http.post<County>(API_URL, county).pipe(
      catchError(this.handleError)
    );
  }

  // Update County
  updateCounty(county: County): Observable<County> {
    const API_URL = `${this.countyURL}/save/${county.id}`;
    return this.http.put<County>(API_URL, county).pipe(
      catchError(this.handleError)
    );
  }

  // Delete County
  deleteCounty(id: number) {
    const API_URL = `${this.countyURL}/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Flag
  deleteFlag(id: number) {
    const API_URL = `http://localhost:8080/api/v1/flag/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Create Sources
  createSources(sources: Sources, spectacleId: string): Observable<Sources> {
    const API_URL = `http://localhost:8080/api/v1/source/save/${spectacleId}`;
    return this.http.post<Sources>(API_URL, sources).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Source
  deleteSource(id: number) {
    const API_URL = `${this.sourceURL}/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Create Others
  createOthers(other: Others, spectacleId: string): Observable<Others> {
    const API_URL = `http://localhost:8080/api/v1/other/save/${spectacleId}`;
    return this.http.post<Sources>(API_URL, other).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Other
  deleteOther(id: number) {
    const API_URL = `${this.otherURL}/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Image
  deleteImage(id: number) {
    const API_URL = `${this.imageURL}/delete/${id}`;
    return this.http.delete(API_URL, {headers: this.httpHeaders}).pipe(
      catchError(this.handleError)
    );
  }

  // Delete Cover
  deleteCover(id: number) {
    const API_URL = `${this.coverURL}/delete/${id}`;
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

interface GetResponseSpectacles {
  content: [
    {
      spectacle: Spectacle[];
    }
  ];
  pageable: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}
