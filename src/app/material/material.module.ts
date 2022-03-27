import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar'; // ヘッダー用
import { MatMenuModule } from '@angular/material/menu'; // 開閉メニュー用
import { MatIconModule } from '@angular/material/icon'; // アイコン用
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

const material = [
  MatButtonModule,
  MatRadioModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatGridListModule,
  MatCardModule,
  LayoutModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

@NgModule({
  declarations: [],
  exports: [material]
})
export class MaterialModule { }
