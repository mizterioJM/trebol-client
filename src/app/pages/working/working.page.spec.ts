import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkingPage } from './working.page';

describe('WorkingPage', () => {
  let component: WorkingPage;
  let fixture: ComponentFixture<WorkingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
