import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectBaseComponent } from '../components/select-base-component';

let fixture: ComponentFixture<SelectBaseComponent>;

describe('Select Base Component', () => {
  beforeEach( () => {
    fixture = TestBed.createComponent(SelectBaseComponent)
    fixture.autoDetectChanges();
  });

  it('should create the Select Base Component', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should be an instance of Select Base Component`, () => {
    const app = fixture.componentInstance;
    expect(app).toBeInstanceOf(SelectBaseComponent);
  });

  it('select base options should be defined', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select')?.options).toBeDefined();
  });

  it('select base options has the desired amount of options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('select')?.childElementCount).toEqual(9);
  });

  it('select base options should have desired option choices', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const optionsList = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    let correctOptions = [];

    compiled.querySelectorAll('option')?.forEach( optionElements => {
        if (Number(optionElements.value) == optionsList[optionElements.index])
            correctOptions.push(Number(optionElements.value));
        });

    expect(correctOptions.length).toBe(9);
  });
});
