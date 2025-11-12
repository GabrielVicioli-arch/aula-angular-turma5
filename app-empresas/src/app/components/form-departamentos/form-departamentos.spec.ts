import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDepartamentos } from './form-departamentos';

describe('FormDepartamentos', () => {
  let component: FormDepartamentos;
  let fixture: ComponentFixture<FormDepartamentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDepartamentos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDepartamentos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
