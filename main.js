console.log('hola mundo');

const todos = JSON.parse(localStorage.getItem('todos')) || []; 
const render = () => {
    const todoList = document.getElementById('todo-list');
    /*
    todoList.innerHTML = ''; // esta linea se la agregamos porque sino los elementos que se van a ir agregando en el for se iran repitiendo.
    for (let i = 0; i < todos.length; i++) {
        todoList.innerHTML +=`<li> ${todos[i]} </li>` ; //aca le pones += para que vaya agregando los elementos, porque si ponemos = solo se iran remplazando los elementos con los nuevos que vayamos creando.  
    }
    */
    const todoTemplate = todos.map(t => {
        return `<li> ${t} </li>`;
    })
    todoList.innerHTML = todoTemplate.join(''); //a todoTemplate le ponemos el join para poder separar los elementos del array con espacios. Ya que sino usamos el join('') este array va a separar los elementos por default con una , 
    // todos.map(t => `<li> ${t} </li>`)
    //esto hace que t es el parametro de la funtion callback, t seria el elemento que esta dentro del array todos, pero con map se crea un nuevo array con el mismo elemento pero creando una lista por <li> </li>.
    const elements = document.querySelectorAll('#todo-list li');    //le estamos indicando que elemento queremos agarrar dentro del ul.
    elements.forEach((element, i) => {
        element.addEventListener('click', () => {
            console.log(element);
            element.parentNode.removeChild(element); //los nodos padres pueden eliminar a sus hijos.
            todos.splice(i, 1);     //splice() primero le indicamos el indice y luego la cantidad de elementos que queremos eliminar.
            actualizaTodos(todos);
            render();   //llamamos devuelta a render cada vez que eliminamos un elemento para que se vaya renderizando todo el tiempo y se vaya actualizando porque sino el indice de los elementos no se iban actualizando y a la hora de usar splice los indices quedaban viejos y no se llegaban a eliminar bien del array todos.
        })
    });
}

const actualizaTodos = (todos) => {
    const todosStrings = JSON.stringify(todos);
    localStorage.setItem('todos', todosStrings);
}

window.onload = () => {
    render();
    const form = document.getElementById('todo-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        let input = document.getElementById('todo');
        const inputTex = input.value;
        input.value = '';
        console.log(inputTex);
        todos.push(inputTex);
        actualizaTodos(todos);
        render();
    }
    

    
}