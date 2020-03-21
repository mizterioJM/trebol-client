import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehiculoPage } from './vehiculo.page';

describe('VehiculoPage', () => {
  let component: VehiculoPage;
  let fixture: ComponentFixture<VehiculoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
