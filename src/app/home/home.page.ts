import { Component } from '@angular/core';
import { ApifruitsService } from '../services/apifruits.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lines: string;
  stringResult: string;
  submitted = false;

  constructor() {}

  ngOnInit(): void {
  }
}