import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions!: Question[];
  show: boolean[] = [false];
  constructor(private mainService: MainService,
    private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.questions = await this.mainService.getQuestion();
    console.log(this.questions);
  }

  getFileUrl(data: Question["script"]) {
    let byte = this.base64ToArrayBuffer(data.file_buffer);
    let blob = new Blob([byte], { type: data.type });
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  base64ToArrayBuffer(base64: any) {
    let binaryString = window.atob(base64);
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
      let ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  setShow(idx: number) {
    this.show[idx] = !this.show[idx];
  }
}
export interface Question {
  id: string;
  name: string;
  created_at: string;
  changed_at: string;
  download_count: number;
  person: any;
  _4test: { function_name: string[], input: string[], output: string[]; };
  script: {
    type: string,
    file_buffer: any;
  };
}
