import {MatDialogConfig} from '@angular/material/dialog';

export function setDialogConfig(config: MatDialogConfig): MatDialogConfig {
  if (window.screen.width <= 570) {
    return {
      width: '100%',
      minWidth: '100%',
      height: '80vh',
      position: {bottom: '0'},
      data: config.data
    };
  } else {
    return config;
  }
}
