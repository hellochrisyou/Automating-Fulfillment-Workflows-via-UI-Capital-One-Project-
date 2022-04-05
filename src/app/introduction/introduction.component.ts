import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  constructor(private _router: Router) { }
  ngOnInit(): void {
  }
  public navigateToDemo(): void {
    this._router.navigate(['finance'])
  }
}