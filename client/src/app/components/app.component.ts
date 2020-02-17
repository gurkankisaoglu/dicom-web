import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ImageService} from '../services/imageService/image.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ImageComponent} from './image/image.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
    displayedColumns: string[] = ['name', 'action', 'upload'];
    dataSource: MatTableDataSource<Image> = new MatTableDataSource();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private imageService: ImageService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadImages();
    }

    /**
     * Loads all images from database and adds to table.
     */
    loadImages() {
        this.imageService.getAllImages().subscribe(response => {
            this.dataSource = new MatTableDataSource<Image>(response.images);
            this.dataSource.paginator = this.paginator;
        });
    }

    /**
     * gets a base64 image string and passes to the dialog box as data.
     * @param name<string>: filename that will be shown.
     */
    loadImage(name: any) {
        this.imageService.getImage(name).subscribe(response => {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;

            dialogConfig.data = {
                base64Str: response.image
            };

            this.dialog.open(ImageComponent, dialogConfig);

        });
    }

    /**
     * gets uploaded zip file and sends it to the server.
     */
    uploadFileToServer($event: Event) {
        const fileList: FileList = (event.target as HTMLInputElement).files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.imageService.uploadZip(file).subscribe(
                response => {
                    this.loadImages();
                }
            );
        }
    }
}

/**
 * model class for images
 */
export interface Image {
    _id: string;
    fileName: string;
}
