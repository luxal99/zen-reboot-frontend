import {ComponentType} from '@angular/cdk/portal';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

export class DialogUtil {
  static openDialog(component: ComponentType<any>, options: MatDialogConfig, dialog: MatDialog): MatDialogRef<any> {
    return dialog.open<any>(component, options);
  }
}
