const input = document.querySelector('.input_text');
const button = document.querySelector('.button');
const container_graph = document.querySelector('.container_graph');
const message_validation = document.querySelector('.message_validation');

const states = ['q0', 'q1', 'q2', 'q3', 'q4'];
const alphabet = ['g', 'o', 'v', 'a', 'G', 'O', 'V', 'A'];
const initial_state = 'q0';
const final_state = 'q4';

const transitions = {
    'q0': { 'g': 'q1', 'G': 'q1' },
    'q1': { 'o': 'q2', 'v': 'q2', 'a': 'q2', 'O': 'q2', 'V': 'q2', 'A': 'q2' },
    'q2': { 'v': 'q3', 'o': 'q3', 'a': 'q3', 'V': 'q3', 'O': 'q3', 'A': 'q3' },
    'q3': { 'a': 'q4', 'o': 'q4', 'v': 'q4', 'A': 'q4', 'O': 'q4', 'V': 'q4' },
}

const validar_cadena = (cadena) => {

    let current_state = initial_state;


    for (let character of cadena) {

        if (!alphabet.includes(character)) {
            create_graph(current_state, null, null, false, true);
            return false;
        }

        if (character in transitions[current_state]) {
            create_graph(current_state, character, current_state === initial_state);
            current_state = transitions[current_state][character];
        } else {
            return false;
        }
    }
    create_graph(current_state, null, null, final_state === current_state);
    return final_state === current_state;
}

const create_graph = (current_state, character, isFirstState, isValid) => {


    const state = document.createElement('div');
    const state_text = document.createElement('p');
    const character_text = document.createElement('p');
    const arrow_next_container = document.createElement('div');
    const arrow_next = document.createElement('img');


    if (isFirstState) {

        const first_state_container = document.createElement('div');
        const first_state = document.createElement('div');
        const arrow = document.createElement('div');

        state_text.textContent = current_state;
        arrow.classList.add('arrow');

        first_state.classList.add('state')
        first_state.appendChild(state_text);
        first_state_container.classList.add('container_first_state')
        first_state_container.appendChild(arrow);
        first_state_container.appendChild(first_state);
        container_graph.appendChild(first_state_container);

    } else {

        state_text.textContent = current_state;
        state.classList.add('state');

        if (isValid) {
            const estado_final = document.createElement('div');
            estado_final.classList.add('final_state');
            estado_final.appendChild(state_text);
            state.appendChild(estado_final);
            container_graph.appendChild(state);
            return
        }

        state.appendChild(state_text);
        container_graph.appendChild(state);

    }


    if (character) {
        character_text.textContent = character;
        arrow_next.src = 'arrow.png';
        arrow_next_container.classList.add('arrow_next_container');
        arrow_next_container.appendChild(arrow_next);
        arrow_next_container.appendChild(character_text);
        container_graph.appendChild(arrow_next_container);
    }
}




const addMessage = (isValid, messageReceived) => {
    const message = document.createElement('p');

    if (messageReceived) {
        message.textContent = 'Ingesa la cadena';
        message_validation.appendChild(message);
        return;
    }

    message.textContent = isValid ? 'Cadena valida' : 'Cadena no valida';
    message.classList.add(isValid ? 'valid' : 'notValid');


    message_validation.appendChild(message);
}

button.addEventListener('click', (e) => {
    e.preventDefault();
    container_graph.innerHTML = '';
    message_validation.innerHTML = '';
    if (input.value.trim() === '') {
        addMessage(null, true)
        return;
    }

    let inputValue = input.value;

    const cadena_valida = validar_cadena(inputValue);
    addMessage(cadena_valida);

});
