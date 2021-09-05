import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

interface TextBox {
  boxId: number;
  text: string;
  bold: boolean;
  fontSize: number;
  color: string;
}
@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  @Input() properties: TextBox;
  @Output() deleteTextBox = new EventEmitter<number>();
  @Output() updateTextBox = new EventEmitter<TextBox>();

  @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;
  elementDetails: TextBox;

  @ViewChild('fontSize', { static: true }) fontSize: ElementRef;
  @ViewChild('text', { static: true }) textElement: ElementRef;

  constructor(private _ngZone: NgZone) { }

  ngOnInit() {
    this.elementDetails = this.properties;

  }
  bold() {
    this.elementDetails.bold = !this.elementDetails.bold;
    this.updateTextBox.emit(this.elementDetails);
  }

  colorChange(textColor) {
    this.elementDetails.color = textColor.target.value;
    this.updateTextBox.emit(this.elementDetails);
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => {
        this.elementDetails.fontSize = this.fontSize.nativeElement.value;
        this.updateTextBox.emit(this.elementDetails);
        this.autosize.resizeToFitContent(true);

      });
  }
  delete() {
    debugger
    this.deleteTextBox.emit(this.elementDetails.boxId);
  }
  updateText(event) {
    this.elementDetails.text = event.target.value;
    this.updateTextBox.emit(this.elementDetails);
  }
}
