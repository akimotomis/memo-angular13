import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'; // ヘッダー用
import { MatMenuModule } from '@angular/material/menu'; // 開閉メニュー用
import { MatIconModule } from '@angular/material/icon'; // アイコン用

const material = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  exports: [material]
})
export class MaterialModule { }
