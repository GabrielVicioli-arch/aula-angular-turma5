// Importações principais do Angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Importação do serviço e do modelo que serão usados
import { DepartamentoService } from '../../services/departamento-services';
import { TipoDepartamento } from '../../models/tipo-departamento';

@Component({
  selector: 'app-lista-departamentos', // nome da tag HTML que representa este componente
  imports: [FormsModule], // módulo necessário para usar [(ngModel)] no template
  templateUrl: './lista-departamentos.html', // HTML do componente
  styleUrl: './lista-departamentos.scss', // CSS/SCSS do componente
})
export class ListaDepartamentos {

  // Variável ligada ao campo de texto no HTML (para digitar o nome do departamento)
  nomeCategoria: string = '';

  // O serviço é injetado no construtor para poder fazer requisições HTTP
  constructor(private apiDpto: DepartamentoService) {}

  // Função que cria um novo departamento
  criarDepartamento(): void {

    // Cria um objeto no formato do modelo TipoDepartamento
    // Esse objeto é o que será enviado para o backend
    let objParaEnviar: TipoDepartamento = {
      departamento: this.nomeCategoria
    };

    // Chama o serviço que envia os dados para o servidor (POST)
    this.apiDpto.postCriarDepartamento(objParaEnviar).subscribe({
      // Se a criação for bem-sucedida
      next: itemCriado => {
        console.log(itemCriado); // mostra o retorno no console
        alert('Departamento criado'); // exibe um alerta simples de sucesso
      },
      // Caso dê erro
      error: error => {
        console.log(error); // mostra o erro no console
      }
    });
  }
}
