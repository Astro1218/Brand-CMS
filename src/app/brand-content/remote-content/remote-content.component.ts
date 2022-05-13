import { Component, OnInit, ViewChild } from '@angular/core';
import { RemoteContentService } from '../../services/remote-content.service';
import { BrandComponent } from '../brand.component';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'remote-content',
    templateUrl: './remote-content.component.html'
})


export class RemoteContentComponent implements OnInit {
    content
    folder
    list

    folderList: Array<any> = []
    filesList: Array<any> = []
    selectedFolder
    folderHistory = []
    hasFiles = false

    @ViewChild('files') files


    constructor(
        private remoteContentService: RemoteContentService,
        private brand: BrandComponent,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.get('')
    }

    get(prefix) {
        this.remoteContentService.getContent(this.brand.brand, prefix)
            //.do(r => console.log(r))
            .subscribe(r => {
                this.content = r
                this.folderList = r.content.commonPrefixes
                // removes first item
                this.filesList = r.content.s3Objects//.splice(1, 1)
                // set first item as header
                this.selectedFolder = r.content.prefix

                console.log('load content', r)
            })
    }

    goToFolder(prefix) {
        if (!prefix) {
            this.folderHistory = []
        } else {
            this.folderHistory.push(this.selectedFolder)
        }

        this.get(prefix)
    }

    goToLastFolder() {
        var prefix = this.folderHistory.pop()
        this.get(prefix)
    }

    addFolder(folder) {
        var model = { currentUrl: this.content.currentUrl, folderName: folder };
        this.remoteContentService.post(model)
            .do(r => console.log(r))
            .subscribe(r => {
                this.get('')
                this.folder = ''
                this.snackBar.open('Added folder', '', { duration: 3000 })
            })
    }

    upload() {
        var files = this.files.nativeElement.files
        console.log(this.files.nativeElement.files)
        var fd = new FormData();

        fd.append('file', files[0]);
        fd.append('prefix', this.selectedFolder)

        this.remoteContentService.uploadFiles(fd)
            .do(r => console.log(r))
            .subscribe(r => {
                this.get(this.selectedFolder)
                this.snackBar.open('Uploaded file(s)', '', { duration: 3000 })
            })
    }

    checkForFiles() {
        var files = this.files.nativeElement.files

        if (files.length > 0) {
            this.hasFiles = true
        } else {
            this.hasFiles = false
        }
    }

    delete(prefix) {
        var model = { prefix: prefix };
        this.remoteContentService.delete(model)
            .do(r => console.log(r))
            .subscribe(r => {
                this.get(this.selectedFolder)
                this.snackBar.open('Deleted content', '', { duration: 3000 })
            })
    }

    copy(urlToCopy) {
        console.log(urlToCopy)

        var aux = document.createElement("input");

        // Get the text from the element passed into the input
        aux.setAttribute("value", urlToCopy);

        // Append the aux input to the body
        document.body.appendChild(aux);

        // Highlight the content
        aux.select();

        // Execute the copy command
        document.execCommand("copy");

        // Remove the input from the body
        document.body.removeChild(aux);

        this.snackBar.open('Copied to clipboard', '', { duration: 3000 })
    }

}