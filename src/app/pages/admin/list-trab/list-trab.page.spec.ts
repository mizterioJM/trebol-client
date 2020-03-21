import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListTrabPage } from './list-trab.page';

describe('ListTrabPage', () => {
  let component: ListTrabPage;
  let fixture: ComponentFixture<ListTrabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTrabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListTrabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
