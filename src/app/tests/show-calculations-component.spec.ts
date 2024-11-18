import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ShowCalculationsComponent } from '../components/show-calculations-component';

let fixture: ComponentFixture<ShowCalculationsComponent>;

describe('Select Base Component', () => {
  beforeEach( () => {
    fixture = TestBed.createComponent(ShowCalculationsComponent)
    fixture.autoDetectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'my-first-angular-app' title`, () => {
    const app = fixture.componentInstance;
    expect(app).toBeInstanceOf(ShowCalculationsComponent);
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')).toHaveClass('calculationsBackground');
  });
});
