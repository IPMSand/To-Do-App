import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTableComponent } from './todo-table.component';

describe('TodoTableComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
