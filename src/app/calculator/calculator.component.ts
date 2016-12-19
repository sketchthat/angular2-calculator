import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  calculatorScreen: string;
  _calculatorButton: string;
  _calculatorFunction: string[];

  previousCalculations: FirebaseListObservable<any>;

  constructor(
    private _angularFire: AngularFire
  ) {
    this._calculatorButton = '';
    this._calculatorFunction = [];
    this.calculatorScreen = '';
  }

  ngOnInit() {
  }

  pressNumber(number) {
    if (this.calculatorScreen != '' && this._calculatorButton == '') {
      this.calculatorScreen = '';
    }

    this.calculatorScreen += number;
    this._calculatorButton += number;
  }

  pressSign(sign) {
    this.calculatorScreen += sign;

    this._calculatorFunction.push(this._calculatorButton);
    this._calculatorFunction.push(sign);

    this._calculatorButton = '';
  }

  _showResult(): any {
    let _runningCalculation: string = '';
    let _tempCalc: number = 0;
    let _prevSign: string = '';

    this._calculatorFunction.forEach(n => {
      _runningCalculation += n;

      if (n.match(/^\d+$/)) {
        if (_prevSign == '+') {
            _tempCalc = _tempCalc + parseInt(n);
        } else if (_prevSign == '-') {
            _tempCalc = _tempCalc - parseInt(n);
        } else if (_prevSign == '/') {
            _tempCalc = _tempCalc / parseInt(n);
        } else if (_prevSign == '*') {
            _tempCalc = _tempCalc * parseInt(n);
        } else {
          _tempCalc = +n;
        }

        _prevSign = '';
      } else {
        _prevSign = n;
      }
    })

    return { result: _tempCalc, calculation: _runningCalculation };
  }

  pressEquals() {
    this._calculatorFunction.push(this._calculatorButton);
    this._calculatorButton = '';

    let _result = this._showResult();

    this.calculatorScreen = _result.result.toString();

    this._calculatorButton = '';
    this._calculatorFunction = [];

    // Save calculation to firebase.
  }
}
