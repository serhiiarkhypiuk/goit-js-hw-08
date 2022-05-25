import throttle from "lodash/throttle"

const form = document.querySelector('form.feedback-form')

const updateStorage = (event) => {
    const {
        elements: { email, message }
    } = event.currentTarget

    localStorage.setItem("feedback-form-state",
        JSON.stringify({ [email.name]: email.value, [message.name]: message.value }))
}

form.addEventListener('input', throttle(updateStorage, 500))

