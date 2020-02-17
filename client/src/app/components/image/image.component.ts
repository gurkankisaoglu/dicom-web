import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    base64Image: string;

    constructor(
        private sanitizer: DomSanitizer,
        private dialogRef: MatDialogRef<ImageComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.base64Image = 'data:image/png;base64,' + data.base64Str;
    }

    ngOnInit() {
    }

    transform() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
    }

}
