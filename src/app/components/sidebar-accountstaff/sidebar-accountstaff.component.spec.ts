import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAccountstaffComponent } from './sidebar-accountstaff.component';

describe('SidebarAccountstaffComponent', () => {
  let component: SidebarAccountstaffComponent;
  let fixture: ComponentFixture<SidebarAccountstaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAccountstaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAccountstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
