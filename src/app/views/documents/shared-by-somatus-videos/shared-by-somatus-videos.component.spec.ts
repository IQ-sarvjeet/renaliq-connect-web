import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBySomatusVideosComponent } from './shared-by-somatus-videos.component';

describe('SharedBySomatusVideosComponent', () => {
  let component: SharedBySomatusVideosComponent;
  let fixture: ComponentFixture<SharedBySomatusVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedBySomatusVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedBySomatusVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
