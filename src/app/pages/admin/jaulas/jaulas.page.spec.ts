import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JaulasPage } from './jaulas.page';

describe('JaulasPage', () => {
  let component: JaulasPage;
  let fixture: ComponentFixture<JaulasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaulasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JaulasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
