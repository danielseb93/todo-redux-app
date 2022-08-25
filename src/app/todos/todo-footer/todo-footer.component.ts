import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../../filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: actions.filtrosValidos[] = ['completados','pendientes','todos']
  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe( state => {
      this.filtroActual = state.filter;
      this.pendientes = state.todos.filter( todo => !todo.isComplete ).length;
    });
  }
  
  aplicarFiltro(filtro: actions.filtrosValidos){
    this.store.dispatch(actions.setFiltro({filtro}));
  }

  
  limpiarCompletados(){
    this.store.dispatch(limpiarCompletados());
  }

}
