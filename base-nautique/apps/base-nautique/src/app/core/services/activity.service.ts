import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activity {
  _id: number;
  name: string;
  description: string;
  image: string;
}


@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  base_url = `${environment.api_url}/activities`
  constructor(private http:HttpClient) { }

  getActivities():Observable<Activity[]>{
    return this.http.get<Activity[]>(this.base_url);
  }

  getOneActivity(id:string):Observable<Activity>{
    return this.http.get<Activity>(this.base_url+"/"+id)
  }

  createActivity(activity: Partial<Activity>): Observable<Activity> {
  return this.http.post<Activity>(this.base_url, activity);
}

updateActivity(id: string, activity: Partial<Activity>): Observable<Activity> {
    return this.http.patch<Activity>(`${this.base_url}/${id}`, activity);
  }

removeActivity(id:string){
  return this.http.delete(`${this.base_url}/${id}`)
}
  
}
