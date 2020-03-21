import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegTrabPage } from './reg-trab.page';

describe('RegTrabPage', () => {
  let component: RegTrabPage;
  let fixture: ComponentFixture<RegTrabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegTrabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegTrabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
