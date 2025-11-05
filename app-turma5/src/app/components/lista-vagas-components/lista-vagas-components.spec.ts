import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVagasComponents } from './lista-vagas-components';

describe('ListaVagasComponents', () => {
  let component: ListaVagasComponents;
  let fixture: ComponentFixture<ListaVagasComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVagasComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaVagasComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
