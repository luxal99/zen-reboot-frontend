import {MatSnackBar} from '@angular/material/snack-bar';

export class SnackBarUtil {
  static openSnackBar(snackbar: MatSnackBar, message: string): void {
    snackbar.open(message, 'DONE', {duration: 1000});
  }
}
