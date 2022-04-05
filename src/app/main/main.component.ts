import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  langs: any = [];
  FuncNames: any = [];
  Inputs: any = [];
  Outputs: any = [];
  createdComponent: number[] = [];
  deletedComponent: number[] = [];
  fd!: FormData;
  results: any = [];
  loading = false;

  constructor(private mainService: MainService) { }

  async ngOnInit() {
    this.initFd();
    const res: any = await this.mainService.getLangs();
    this.langs = Object.entries(res);
  }

  onSelect(eve: any) {
    let val = eve.target.value;
    this.fd.delete('lang');
    this.fd.append('lang', val);
  }

  onFile(eve: any) {
    this.fd.delete('file');
    this.fd.append('file', eve.files[0]);
  }

  async send() {
    this.loading = true;
    this.cleanData();
    this.fd.append('name', JSON.stringify(this.FuncNames));
    this.fd.append('inp', JSON.stringify(this.Inputs));
    this.fd.append('out', JSON.stringify(this.Outputs));
    this.results = await this.mainService.getResult(this.fd);
    console.log(this.results);
    this.clearFd();
    this.loading = false;
  }
  initFd() {
    this.fd = new FormData();
  }
  clearFd() {
    ['name', 'inp', 'out'].map(e => this.fd.delete(e));
  }
  cleanData() {
    this.deletedComponent.map(idx => {
      this.FuncNames = this.FuncNames.filter((e: string, i: number) => i != idx);
      this.Inputs = this.Inputs.filter((e: string, i: number) => i != idx);
      this.Outputs = this.Outputs.filter((e: string, i: number) => i != idx);
      this.createdComponent = this.createdComponent.filter((e: number, i: number) => i != idx);
    });
    this.deletedComponent = [];
  }

  forInp() {
    this.createdComponent.push(0);
  }

  isHas() {
    return this.fd.has('file') && this.fd.has('lang') || this.loading;
  }

  //for events
  onDel(idx: number) {
    this.deletedComponent.push(idx);
  }
  onFunc(data: any) {
    this.FuncNames[data.idx] = data.a;
  }
  onInp(data: any) {
    this.Inputs[data.idx] = data.a;
  }
  onOut(data: any) {
    this.Outputs[data.idx] = data.a;
  }
}