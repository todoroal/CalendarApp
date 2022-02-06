if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function removeLastPathPart(path) {
  
    let lastIndexOfSlash = path.lastIndexOf("/");
    return path.substring(0, lastIndexOfSlash);
}


function ready() {

const searchForm = document.querySelector('.search');
const token = sessionStorage.getItem("token");

    // return user to homepage if he is not logged in (no auth Token is found)
    // should also be done for other available sites
    if(!token) {
        const path = window.location.pathname;

        let newPath = removeLastPathPart(path);
        newPath = removeLastPathPart(newPath);
        newPath = removeLastPathPart(newPath);
        window.location.href = newPath+="/homepage.html";
    }
    const input=document.querySelector('.input');
    const newsList = document.querySelector('.news-list');
    const logoutBtn = document.querySelector('#logoutBtn');
    
    searchForm.addEventListener('submit', retrieve)
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        fetch('http://localhost:3000/logout', {
          method: 'POST', 
          mode: 'cors', 
          credentials: "same-origin",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token}), 
        })
        .then(result => {
            sessionStorage.removeItem("token");            
            window.location.href = e.target;
        });       
    })

    function retrieve(e){
        
        newsList.innerHTML = ''

        e.preventDefault()
        
        const apiKey='572599cc9c194bf8a7942a038580ecab'
        
        let topic = input.value;
        let url = ' https://newsapi.org/v2/everything?q=${topic}country=at&apiKey=572599cc9c194bf8a7942a038580ecab'
        
        
        fetch(url).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
            data.articles.array.forEach(article => {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.setAttribute('href', article.url );
                a.setAttribute('target', '_blank');
                a.textContent = article.title;
                li.appendChild(a);
                newsList.appendChild(li);
            });
        })

        console.log(topic)
    }
}