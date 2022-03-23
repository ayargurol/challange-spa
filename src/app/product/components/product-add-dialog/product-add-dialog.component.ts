import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'dialog-product-add-dialog',
    templateUrl: 'product-add-dialog.component.html',
})
export class ProductAddDialog {
    constructor(
        public dialogRef: MatDialogRef<ProductAddDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}