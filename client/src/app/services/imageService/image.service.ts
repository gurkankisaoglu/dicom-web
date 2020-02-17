import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    private api = 'http://localhost:3000/api/image';

    constructor(private http: HttpClient) {
    }

    getAllImages() {
        return this.http.get<{ images: [{ _id: string, fileName: string }], errorMessage: string }>(this.api);
    }

    getImage(name: string) {
        return this.http.get<{ image: string, errorMessage: string }>(this.api + '/' + name);
    }

    uploadZip(file: File) {
        const formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        formData.append('fileType', 'zip');
        return this.http.post(this.api + '/upload', formData);
    }
}
