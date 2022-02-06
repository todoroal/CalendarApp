if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function removeLastPathPart(path) {

  let lastIndexOfSlash = path.lastIndexOf("/")
  return path.substring(0, lastIndexOfSlash)
}

function ready() {

  const submitBtn = document.getElementById("regBtn")
  const errorMsgDiv = document.getElementById("errorMsg")

  const usernameField = document.getElementById("username")
  const emailField = document.getElementById("email")
  const pwField = document.getElementById("pw")
  const confirmPwField = document.getElementById("confirmPw")


  submitBtn.addEventListener('click', () => {

    if (usernameField.value == "" || emailField.value == ""
      || pwField.value == "" || confirmPwField.value == "") {
      errorMsgDiv.innerHTML = "Please fill out all input fields"
      return
    }

    if (pwField.value != confirmPwField.value) {
      errorMsgDiv.innerHTML = "Passwords do not match."
      return
    }

    const data = { name: usernameField.value, email: emailField.value, password: pwField.value, confirmPassword: confirmPwField.value }

    fetch('http://localhost:3000/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(data => {
      if (data.status >= 400) {
        errorMsgDiv.innerHTML = "An error occured. Please try again and check your data."
      } else {
        errorMsgDiv.innerHTML = "Successfully registered. Now let's log in"
        const path = window.location.pathname

        let newPath = removeLastPathPart(path)
        newPath = removeLastPathPart(newPath)
        newPath = removeLastPathPart(newPath)

        window.location.href = newPath += "/homepage.html"
      }
    }).catch((err) => {
      errorMsgDiv.innerHTML = "An error occured. Please try again and check your data."
    })
  })
}
