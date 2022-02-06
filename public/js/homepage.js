if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {

  const logintBtn = document.getElementById("loginBtn")
  const errorMsgDiv = document.getElementById("errorMsg")

  const usernameField = document.getElementById("username")
  const pwField = document.getElementById("pw")


  logintBtn.addEventListener('click', () => {

    if (usernameField.value == "" || pwField.value == "") {
      errorMsgDiv.innerHTML = "Please fill out all input fields"
      return
    }

    const data = { name: usernameField.value, password: pwField.value }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      mode: 'cors',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(result => {

        if (result.status >= 400) {
          errorMsgDiv.innerHTML = "Invalid credentials. Try again."
        } else {

          // store authToken in session storage of browser
          sessionStorage.setItem("token", result.token)

          errorMsgDiv.innerHTML = "Successfully logged in."
          const path = window.location.pathname

          let lastIndexOfSlash = path.lastIndexOf("/")
          let newPath = path.substring(0, lastIndexOfSlash)
          window.location.href = newPath += "/frontEnd/html/index.html"
        }
      }).catch((err) => {
        console.log(err)
        errorMsgDiv.innerHTML = "An error occured. Please try again and check your data."
      })
  })
}
