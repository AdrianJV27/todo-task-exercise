

// Referencias en el HTML

import { Todo } from '../classes'
import { todoList } from '../index'

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('a.filtro')

export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado? 'completed' : '') }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado? 'checked' : '') }>
            <label >${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    // Hacemos un append y retornamos el first element child para no reotrnar el div y se quede dentro de una etiqueta <ul>
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;

}

// Eventos

txtInput.addEventListener('keyup', ( event ) => {

    if (event.keyCode === 13 && txtInput.value.length > 0) {
        
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
    }
})

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');

    if(nombreElemento.includes('input')){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
});


btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //Forma que se me ha ocurrido
    divTodoList.querySelectorAll('li.completed').forEach( todo => todo.remove());
    //Forma de fernando
    // for (let i  = divTodoList.children.length -1 ; i >= 0 ; i--) {
    //     const element = divTodoList.children[ i ];
        
    //     if (element.classList.contains('completed')) {
    //         divTodoList.removeChild(element);

    //         // Tambien se podria hacer asi (Forma que se me ha ocurrido)
    //         // element.remove();
    //     }

    // }
    
})
// Como hacer para que si esta el filtro en pendientes y yo añado uno nuevo y le doy check automaticamente se ponga a hidden
ulFiltros.addEventListener('click', (event) => {

    console.log(event.target.text);
    const filtro = event.target.text;

    if (!filtro) { return; }

    //*Elminina la classe de todos los elementos y luego la añade a la que es necesario
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');
    
    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado){
                    elemento.classList.add('hidden')
                }
            break;
            
            case 'Completados':
                if (!completado){
                    elemento.classList.add('hidden')
                }
            break;
        }

    }
})