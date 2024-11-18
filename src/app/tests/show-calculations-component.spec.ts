import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ShowCalculationsComponent } from '../components/show-calculations-component';

let fixture: ComponentFixture<ShowCalculationsComponent>;

describe('Show Calculations Component', () => {
  beforeEach( () => {
    fixture = TestBed.createComponent(ShowCalculationsComponent)
    fixture.autoDetectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should be an instance of "Show Calculations Component"`, () => {
    const app = fixture.componentInstance;
    expect(app).toBeInstanceOf(ShowCalculationsComponent);
  });

  it('<div>-element should should have className calculationsBackground', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')).toHaveClass('calculationsBackground');
  });
});
