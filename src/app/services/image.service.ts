import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core'

@Injectable()
export class ImageService {

    constructor() { }

    getUrl(brand: String, fileName: string = ''): String {
        var url: string = ''

        const brandName = brand ? brand.toLowerCase() : ''

        switch (brandName) {
            case 'admin':
                url = '../assets/admin.png'
                break
            case 'silverline':
                url = '../assets/brands/silver.png'
                break
            case 'triton':
                url = '../assets/brands/triton.png'
                break
            case 'gmc':
                url = '../assets/brands/gmc.png'
                break
            case 'dickie dyer':
                url = `${environment.aws_bucket_url}${environment.aws_bucket}/${brandName}/logo/${fileName}`
                break
            case 'powermaster':
                url = '../assets/brands/power.png'
                break
            case 'smaart':
                url = '../assets/brands/smaart.png'
                break
            case 'fixman':
                url = '../assets/brands/fix.png'
                break
            case 'plumbob':
                url = '../assets/brands/plumb.png'
                break
            default:
                url = '../assets/question_mark.png'
                break
        }

        if (fileName != "")
            url = `${environment.aws_bucket_url}${environment.aws_bucket}/${brandName}/logo/${fileName}`
        else if (brand === 'admin')
            url = '../assets/admin.png'
        else
            url = '../assets/question_mark.png'

        return url
    }
}
