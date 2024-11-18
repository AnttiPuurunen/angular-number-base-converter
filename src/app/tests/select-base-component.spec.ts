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
});
