import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PhotosService {

  constructor(private http: Http) { }

  getAllPhotos() {
    return this.http.get('/api/photos')
    .map(res => res.json());
  }
}
