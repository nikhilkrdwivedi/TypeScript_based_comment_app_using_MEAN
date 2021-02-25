import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentWindowComponent } from './comment-window.component';

describe('ChatWindowComponent', () => {
  let component: CommentWindowComponent;
  let fixture: ComponentFixture<CommentWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
