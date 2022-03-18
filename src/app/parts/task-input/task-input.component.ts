import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.scss']
})
export class TaskInputComponent implements OnInit {
  /**
   * 入力テキスト
   *
   * @type {string}
   * @memberof TaskInputComponent
   */
  inText: string = '';
  /**
   * 入力検査結果（ボタン活性/非活性）
   *
   * @type {boolean}
   * @memberof TaskInputComponent
   */
  @Input() isButtonDisabled: boolean = true;
  @Output() inputAdd: EventEmitter<string> = new EventEmitter<string>();
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    console.log("TaskInputComponent Init");
  }

  /**
   * 入力変更発生を通知する
   *
   * @param {string} inText
   * @memberof TaskInputComponent
   */
  onNgModelChange(inText: string): void {
    this.inputChange.emit(inText)
  }

  /**
   * 改行入力(enter)を追加ボタンの代替にする
   *
   * @param {*} event
   * @memberof TaskInputComponent
   */
  onKeyUp(event: any): void {
    if (event.code !== "Enter") return;

    if (!this.isButtonDisabled) {
      this.onButtonClick()
    }
  }
  /**
   * 追加イベント発生を通知する
   *
   * @memberof TaskInputComponent
   */
  onButtonClick(): void {
    this.inputAdd.emit(this.inText)
    this.inText = ''
  }

}
