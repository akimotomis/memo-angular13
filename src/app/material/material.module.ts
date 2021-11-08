import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'; // ヘッダー用
import { MatMenuModule } from '@angular/material/menu'; // 開閉メニュー用
import { MatIconModule } from '@angular/material/icon'; // アイコン用
import { MatDividerModule } from '@angular/material/divider';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule
];

@NgModule({
  declarations: [],
  exports: [material]
})
export class MaterialModule { }
