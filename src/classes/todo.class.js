export class Todo {

    static fromJson( {id, tarea, completado, creado} ){

        // Como hacer para comprobar que no exista ninguna id igual y comprobar que esos valores existan?
        const tempTodo = new Todo( tarea );
        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }

    constructor( tarea ){
        
        this.tarea = tarea;

        this.id    = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
        

    }

    imprimirClase() {
        console.log( `${this.tarea} - ${ this.id }` );
    }
}