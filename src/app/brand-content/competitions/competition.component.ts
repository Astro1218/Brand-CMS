import { Component, OnInit } from '@angular/core';
import { IProductMagazineReview, MagazineReviewsService } from '../../services/magazine-reviews.service';
import { BrandComponent } from '../brand.component';
import { CompetitionDialogComponent } from './competition-dialog.component';
import { MdDialog, MdSnackBar } from '@angular/material';
import { CompetitionService, ICompetition } from '../../services/competition.service';

@Component({
    selector: 'competition',
    templateUrl: './competition.component.html'
})

export class CompetitionComponent implements OnInit {
    list: Array<ICompetition> = []

    constructor(
        private service: CompetitionService,
        private brand: BrandComponent,
        private dialog: MdDialog,
        private snackBar: MdSnackBar
    ) { }

    ngOnInit() {
        this.get()
    }

    onDrop() {
          let reordered = []
          this.list.forEach((o, i: number) => {
              reordered.push({
                  competitionId: o.competitionId,
                  cmsOrder: i + 1
              })
          })

          this.service.sortCompetition(reordered)
              .do(r => console.log('sortCompetition', r))
              .subscribe(r => this.snackBar.open('Sorted!', '', { duration: 3000 }))

  }

    get() {
        this.service.get(this.brand.brandId)
            .do(r => console.log(r))
            .subscribe(r => this.list = r)
    }

    remove(model) {
        if (confirm('Deleting this will not remove image gallery items, just the Product SKU for this ' +
         'Magazine Review and containing Review Items. Are you sure you want to continue to remove?')) {
            console.log(model)

            this.service.delete(model.competitionId)
                .subscribe(r => {
                    this.get()
                    this.snackBar.open('Competition Deleted', '', { duration: 3000 })
                })
        }
    }

    openDialog(model: ICompetition, isNew: boolean) {
        const dialogRef = this.dialog.open(CompetitionDialogComponent, {
            data: { data: model, isNew: isNew, brandId: this.brand.brandId },
            width: '700px',
            backdropClass: 'dialog-bg'
        })

        dialogRef.afterClosed()
            .subscribe((result: ICompetition) => {
                if (result) {
                    Object.assign(result, {});
                    result.brandId = this.brand.brandId

                    console.log(result)
                    this.service.post(result)
                        .subscribe(r => {
                            this.get()
                            this.snackBar.open('Competition Updated', '', { duration: 3000 })
                        })
                }
            })
    }
}
