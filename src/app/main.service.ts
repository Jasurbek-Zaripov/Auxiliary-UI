import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
  ) { }

  async getLangs(): Promise<any> {
    return new Promise((ok, err) => {
      this.http.get('http://localhost:3000/compiler/get-languages-info').subscribe({
        next: (res: any) => ok(res),
        error: (e: any) => err(e)
      });
    });
  }

  async getResult(data: any): Promise<any> {
    return new Promise((ok, err) => {
      this.http.post('http://localhost:3000/compiler', data, {
        headers: {}
      }).subscribe({
        next: (res: any) => ok(res),
        error: (e: any) => err(e)
      });
    });
  }

  async getQuestion(): Promise<any> {
    return new Promise((ok, err) => {
      this.http.get('http://localhost:3000/question').subscribe({
        next: (res: any) => ok(res),
        error: (e: any) => err(e)
      });
    });
  }
}
