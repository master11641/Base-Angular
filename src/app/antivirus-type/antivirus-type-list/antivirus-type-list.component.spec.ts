import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntivirusTypeListComponent } from './antivirus-type-list.component';

describe('AntivirusTypeListComponent', () => {
  let component: AntivirusTypeListComponent;
  let fixture: ComponentFixture<AntivirusTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntivirusTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntivirusTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
