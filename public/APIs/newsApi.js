
const searchFrom= document.querySelector('.search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.newsList')

searchFrom.addEventListener('submit', retrieve)

function retrieve(e){
    if (input.value==''){
        alert('Bitte zuerst einen Suchbegriff eingeben')
        return
    }


    newsList.innerHTML=''

    e.preventDefault()

   
    let topic = input.value;

    let url= 'http://newsapi.org/v2/top-headlines?country=atq=${topic}&apikey=538d94982e5444b78cfe15198c4786b2'

    console.log(topic)

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        console.log()
        data.articles.forEach(article => {
            let li = document.createElement('li')
            let a = document.createElement('a')

            a.setAttribute('href', article.url);
            a.setAttribute('target', '_blank');
            a.textContent=article.title;
            li.appendChild(a);
            newsList.app

            
        });
    }).catc((error)=>{
        console.log(error)
    })
}


/*function getNews(){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('http://newsapi.org/v2/top-headlines?country=at&apikey=538d94982e5444b78cfe15198c4786b2', options)
    .then(res => res.json())
    .then(res =>{
        for(var i=0; i<res.articles.length;i++){
            document.getElementById("container").innerHTML +=
            "<div><img style='float:left;width:150px;' src='+res.articles[i].urlRiImage+'><h1>"+res.articles[i].title+"</h1>"
            +res.articles[i].source.name+"<br>"+res.articles[i].description+"<a href='+res.articles[i].url+' target='_blank'>"+res.articles[i].url+"</a></div>";
        }
    })

    
}

*/