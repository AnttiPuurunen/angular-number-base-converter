import { TestBed } from '@angular/core/testing';
import { NumberBaseConverter } from '../components/number-base-converter';

describe('Number Base Converter', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberBaseConverter],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NumberBaseConverter);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Number Base Converter' title`, () => {
    const fixture = TestBed.createComponent(NumberBaseConverter);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Number base converter');
  });

});
