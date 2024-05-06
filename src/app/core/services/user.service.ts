import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/usersdata';

  constructor(private _http:HttpClient) { }
  
  registerUser(user: any): Observable<any> {
    return this._http.post<any>('http://localhost:3000/usersdata', user);
  }
  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profilePicture', file);

    return this._http.post<any>(`${this.apiUrl}/upload-profile-picture`, formData);
  }

  getProfilePicture(): Observable<string> {
    return this._http.get<string>(`${this.apiUrl}/profile-picture`);
  }
  loginUser(loginFormValue: any): Observable<any> {
    return this._http.get<any>('http://localhost:3000/usersdata');
  }
  getUserData() {
    return this._http.get(this.apiUrl);
  }

  updateUserData(userData: any) {
    return this._http.put(this.apiUrl, userData);
  }

  
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}`; 
    const body = { currentPassword, newPassword };
    return this._http.post(url, body);
  }
  updateUserProfile(id:number,updatedProfile: any): Observable<any> {
    return this._http.put(`http://localhost:3000/usersdata/${id}`, updatedProfile);
  }
 
 
}
