import { INavigation } from './services/common.service'
import { AuthService, IAuth } from './services/auth.service'
import { ImageService } from './services/image.service'
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core'
import { MdSidenav } from '@angular/material'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'app'
  imageUrl
  selectedBrand: String = 'silverline'
  auth: IAuth
  showToggle: boolean = true
  showAdminToggle: boolean = false
  categories: Array<INavigation> = []
  brandId: number

  @ViewChild('sidenav') sidenav: MdSidenav
  @ViewChild('sidenavAdmin') sidenavAdmin: MdSidenav

  constructor(
    private cdRef: ChangeDetectorRef,
    private imageService: ImageService,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.authAdmin()
      .do(r => console.log())
      .subscribe(r => {
        this.auth = r
        localStorage.setItem('cms_auth', JSON.stringify(r))
      })
  }

  ngAfterViewChecked() {
    this.imageUrl = this.imageService.getUrl(this.selectedBrand)
    this.cdRef.detectChanges()
  }

  open() {
    this.sidenav.open()
    this.showToggle = true
  }
  close() {
    this.sidenav.close()
    this.showToggle = false
  }

  adminOpen() {
    this.sidenavAdmin.open()
    this.showAdminToggle = true
  }

  adminClose() {
    this.sidenavAdmin.close()
    this.showAdminToggle = false
  }

  toggle() {
    this.sidenav.toggle()
  }
  toggleAdmin() {
    this.sidenavAdmin.toggle()
  }

  setBrandCategories(categories: Array<INavigation>, brandId: number) {
    this.categories = categories
    this.brandId = brandId
  }

  getImage(brand) {
    return this.imageService.getUrl(brand, this.imageUrl)
  }
}
