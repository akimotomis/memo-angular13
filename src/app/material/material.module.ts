import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar'; // ヘッダー用
import { MatMenuModule } from '@angular/material/menu'; // 開閉メニュー用
import { MatIconModule } from '@angular/material/icon'; // アイコン用
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const material = [
  MatButtonModule,
  MatRadioModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatInputModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  exports: [material]
})
export class MaterialModule { }
