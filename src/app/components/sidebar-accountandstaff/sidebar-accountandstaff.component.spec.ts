import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAccountandstaffComponent } from './sidebar-accountandstaff.component';

describe('SidebarAccountandstaffComponent', () => {
  let component: SidebarAccountandstaffComponent;
  let fixture: ComponentFixture<SidebarAccountandstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAccountandstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAccountandstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
