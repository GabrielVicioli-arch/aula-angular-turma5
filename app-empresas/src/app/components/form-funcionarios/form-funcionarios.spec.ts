import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFuncionarios } from './form-funcionarios';

describe('FormFuncionarios', () => {
  let component: FormFuncionarios;
  let fixture: ComponentFixture<FormFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFuncionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFuncionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
