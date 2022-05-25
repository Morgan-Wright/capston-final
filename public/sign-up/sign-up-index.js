const userInput = document.getElementsByClassName('user')[0];
const passInput = document.getElementsByClassName('pass')[0];
const submitButton = document.getElementsByClassName('sign-up')[0];

submitButton.addEventListener('click', handleSignUp);

async function signUp(user, password) {
    try {

    } catch(error) {
        showErrorAlert();
    }
};

function handleSignUp() {
    const username = userInput.value;
    const password = passInput.value;

    console.log({ email, password });

    signUp(username, password);
};

function showErrorAlert() {
    alert('An unexpected error occurred.');
};