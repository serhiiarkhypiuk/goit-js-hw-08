import throttle from "lodash/throttle"
import storage from "../js/localStorage"
import isEmail from "validator/es/lib/isEmail"

const { setLocaleStorage, getLocalStorage } = storage
const form = document.querySelector('form.feedback-form')
let formData = getLocalStorage("feedback-form-state") || {}

const updateStorage = ({ target: { value, name } }) => {
    formData[name] = value

    setLocaleStorage("feedback-form-state", formData)
}

const fillForm = () => {
    if (formData.length === 0) {
        return
    }

    const { elements } = form;
    const keysFormData = Object.keys(formData);

    keysFormData.forEach(key => {
        elements[key].value = formData[key]
    })
}

fillForm()

const onSubmit = (submit) => {
    submit.preventDefault()
    
    const {
        elements: { email, message }
    } = submit.target

    if (email.value === "" && message.value === "") {
        return alert("Fields cannot be empty!")
    }

    if (!isEmail(email.value)) {
        return alert("Your email should be valid!")
    }

    if (!message.value) {
        return alert("Please, leave your message!")
    }

    console.log(formData)
    setLocaleStorage("feedback-form-state", formData)
    submit.target.reset()
}

form.addEventListener('input', throttle(updateStorage, 500))
form.addEventListener('submit', onSubmit)
