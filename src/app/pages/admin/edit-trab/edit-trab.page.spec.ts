import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTrabPage } from './edit-trab.page';

describe('EditTrabPage', () => {
  let component: EditTrabPage;
  let fixture: ComponentFixture<EditTrabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTrabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTrabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
