import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule, NzLayoutModule, NzMenuModule,NzButtonModule,
    NzAvatarModule,NzIconModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
