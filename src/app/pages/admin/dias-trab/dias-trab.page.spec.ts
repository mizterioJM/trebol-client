import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiasTrabPage } from './dias-trab.page';

describe('DiasTrabPage', () => {
  let component: DiasTrabPage;
  let fixture: ComponentFixture<DiasTrabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiasTrabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiasTrabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
