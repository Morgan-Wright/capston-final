const userInput = document.getElementsByClassName('user')[0];
const passInput = document.getElementsByClassName('pass')[0];
const submitButton = document.getElementsByClassName('login')[0];

submitButton.addEventListener('click', handleLogin);

async function login(username, password) {
    try {

    } catch (error) {
        showErrorAlert();
    }
};

function handleLogin() {
    const username = userInput.value;
    const password = passInput.value;

    console.log({ username, password })

    login(username, password);
};

function showErrorAlert() {
    alert('An unexpected error occurred.')
}