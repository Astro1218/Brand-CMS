import { Observable } from 'rxjs';
import { IStockist, IStockists, IStockistLanguageIndex, StockistService } from '../../services/stockist.services'
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core'
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService, ILanguageCountries } from '../../services/common.service';
import { MapService, ICounty, IRegion } from '../../services/map.service';
import { environment } from '../../../environments/environment';
declare var google

@Component({
    selector: 'stockist-dialog',
    templateUrl: './stockist-dialog.component.html',
})
export class StockistDialogComponent implements OnInit {
    stockist: IStockist
    stockistForm: FormGroup
    mapForm: FormGroup
    languages: Array<IStockistLanguageIndex> = []
    languageCountries: Array<ILanguageCountries> = []
    regions: Array<IRegion> = []
    counties: Array<ICounty> = []
    isOnline: boolean = false

    constructor(
        public dialogRef: MdDialogRef<StockistDialogComponent>,
        @Inject(MD_DIALOG_DATA) public data: any,
        private stockistService: StockistService,
        private commonService: CommonService,
        private fb: FormBuilder,
        private snackbar: MdSnackBar,
        private mapService: MapService
    ) { }

    ngAfterViewInit() {
        // if (!this.data.isNew)
        //     this.load()
    }

    getGeoLocation(): Promise<any> {
        return new Promise<void>(resolve => {
            //console.log('starting to get location')
            var v_lat = 52.58970076871785, v_lng = -1.4920806884765625, map
            let form = this.mapForm
            let snack = this.snackbar

            var add2 = !this.stockistForm.value.address2 ? '' : this.stockistForm.value.address2

            var address =
                // this.stockistForm.value.address1 + ', ' +
                // add2 + ', ' +
                // this.stockistForm.value.city + ', ' +
                // this.stockistForm.value.county + ', ' +
                this.stockistForm.value.country + ', ' +
                this.stockistForm.value.postCode

            //console.log(address)

            var geocoder = new google.maps.Geocoder()

            // next line creates asynchronous request
            geocoder.geocode({ 'address': address }, function (results, status) {
                // and this is function which processes response
                if (status == google.maps.GeocoderStatus.OK) {
                    v_lat = results[0].geometry.location.lat()
                    v_lng = results[0].geometry.location.lng()
                } else {
                    snack.open('Geocode was not successful for the following reason: ' + status, '', { duration: 3000 })
                }

                form.patchValue({
                    latitude: v_lat,
                    longitude: v_lng
                })

                resolve()

                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 8,
                    center: new google.maps.LatLng(v_lat, v_lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false
                })
            })
        })
    }

    load() {
        var map, geocoder, v_lat = 52.58970076871785, v_lng = -1.4920806884765625

        v_lat = this.mapForm.value.latitude
        v_lng = this.mapForm.value.longitude


        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: new google.maps.LatLng(v_lat, v_lng),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false
        })

        google.maps.event.addListener(map, "mousemove", () => {
            if (map.getCenter().lat() != 0 && map.getCenter().lng() != 0) {
                this.mapForm.patchValue({
                    latitude: map.getCenter().lat(),
                    longitude: map.getCenter().lng()
                })
            }
        })
    }

    ngOnInit() {
        if (!this.data.data) {
            this.data.data = {
                stockistId: 0
            }
        }

        console.log('stockistId', this.data.data.stockistId)

        this.stockistForm = this.fb.group({
            stockistId: [0],
            stockistTypeId: [2],
            stockistType: ['Offline'],
            stockistName: ['', Validators.required],
            cmsActive: [false, Validators.required],
            brandId: [0],
            address1: [''],
            address2: [''],
            city: [''],
            mapRegionId: [0],
            mapCountyId: [0],
            country: [''],
            postCode: [''],
            imageFilename: [''],
            telephone: [''],
            webURL: [''],
            isPremierStockist: [false]
        })

        this.setRequirements({ value: 2 })
        this.isOnline = false;

        this.mapForm = this.fb.group({
            stockistId: [0],
            latitude: [0, Validators.required],
            longitude: [0, Validators.required]
        })

        if (!this.data.isNew) this.getStockistDataAndIndex(this.data.data.stockistId)

        this.commonService.getLanguageCountries().subscribe(r => this.languageCountries = r)

        this.mapService.getRegions().subscribe(r => this.regions = r)

        this.uploadUrl = `${environment.api_url}Stockist/UploadStockistLogo?Brand=${this.data.brand.brand}&Id=${this.data.data.stockistId}`


    }

    getCounties(mapRegionId) {
        this.mapService.getCountiesByRegion(mapRegionId).subscribe(r => this.counties = r)
    }

    getStockistDataAndIndex(stockistId) {
        this.stockistService.getStockist(stockistId)
            .subscribe(r => {
                this.stockistForm.patchValue(r)
                this.setRequirements({ value: r.stockistTypeId })
                this.mapForm.patchValue(r)
                this.load()
                this.getCounties(r.mapRegionId)
                this.stockistUrl = `${environment.aws_bucket_url}${environment.aws_bucket}/${this.data.brand.brand.toLowerCase()}/stockistlogo/${this.data.data.stockistId}/${this.stockistForm.value.imageFilename}`
            })
    }

    selectLanguage(model: IStockistLanguageIndex) {
        if (model) {
            Object.assign(model, {
                active: !model.cmsActive,
                stockistId: this.data.data.stockistId
            })
        }

        this.stockistService.insertStockistLanguageIndex(model)
            //.do(r => console.log('insertStockistLanguageIndex', r))
            .subscribe(r => {
                this.snackbar.open('Updated stockist language', '', { duration: 3000 })
            })
    }

    setRequirements(type) {
        if (type.value == 1) {
            this.isOnline = true
            // Online
            console.log('Online')
            this.stockistForm.controls['webURL'].setValidators([Validators.required])
            this.stockistForm.controls['address1'].clearValidators()
            this.stockistForm.controls['city'].clearValidators()
            this.stockistForm.controls['mapCountyId'].clearValidators()
            this.stockistForm.controls['mapRegionId'].clearValidators()
            this.stockistForm.controls['country'].clearValidators()
            this.stockistForm.controls['postCode'].clearValidators()
        }
        else {
            this.isOnline = false
            // Offline
            console.log('Offline')
            this.stockistForm.controls['address1'].setValidators([Validators.required])
            this.stockistForm.controls['city'].setValidators([Validators.required])
            this.stockistForm.controls['mapCountyId'].setValidators([Validators.required])
            this.stockistForm.controls['mapRegionId'].setValidators([Validators.required])
            this.stockistForm.controls['country'].setValidators([Validators.required])
            this.stockistForm.controls['postCode'].setValidators([Validators.required])
            this.stockistForm.controls['webURL'].clearValidators()
        }

        this.stockistForm.controls['webURL'].updateValueAndValidity()
        this.stockistForm.controls['address1'].updateValueAndValidity()
        this.stockistForm.controls['city'].updateValueAndValidity()
        this.stockistForm.controls['mapCountyId'].updateValueAndValidity()
        this.stockistForm.controls['mapRegionId'].updateValueAndValidity()
        this.stockistForm.controls['country'].updateValueAndValidity()
        this.stockistForm.controls['postCode'].updateValueAndValidity()
    }

    update() {
        var result: IStockist = this.mapForm.value
        this.stockistService.updateCoordinates(result)
            .subscribe(r => {
                this.snackbar.open('Coordinates updated', '', { duration: 4000 })
            });
    }

    save() {
        var result: IStockist = this.stockistForm.value

        result.isPremierStockist = result.isPremierStockist ? true : false
        Object.assign(result, {
            active: result.cmsActive,
            brandId: this.data.brand.brandId
        })

        this.stockistService.insertStockist(result)
            //.do(r => console.log('insertStockist', r))
            .subscribe(r => {
                this.snackbar.open('Request completed', '', { duration: 4000 })

                // only when a new stockist is added
                if (this.data.isNew) {
                    //console.log('get location')
                    this.getGeoLocation().then(() => {
                        //console.log('got location')
                        this.mapForm.patchValue({ stockistId: r.stockistId })
                        //console.log('patched values')
                        this.stockistService.updateCoordinates(this.mapForm.value).subscribe()

                        this.data.isNew = false
                        this.getStockistDataAndIndex(r.stockistId)
                    })
                }
            })
    }



    // logo

    upfiles
    uploadUrl
    stockistUrl

    msgs: any[]
    uploadedFiles: any[] = []

    maxFileSize: number = environment.uploadFileSize


    get() {
        this.stockistService.getStockist(this.data.data.stockistId)
            .do(r => console.log('getStockist', r))
            .subscribe(r => {
                this.stockistForm.patchValue(r)
                this.stockistUrl = `${environment.aws_bucket_url}${environment.aws_bucket}/${this.data.brand.brand.toLowerCase()}/stockistlogo/${this.data.data.stockistId}/${this.stockistForm.value.imageFilename}`
            })
        this.uploadedFiles = []
    }

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file)
        }

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' })

        this.snackbar.open('Successfully uploaded.', '', { duration: 3000 })
        this.get()
    }

    onError(event) {
        this.snackbar.open('An error occured. Please check file size.', '', { duration: 3000 })
    }

    delete() {
        this.stockistService.deleteStockistLogo(this.data.data.stockistId).subscribe(r => {
            this.snackbar.open('Successfully deleted.', '', { duration: 3000 })
            this.get()
        })
    }
}
