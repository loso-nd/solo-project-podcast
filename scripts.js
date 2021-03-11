  
function getEpisode(){
    fetch('http://localhost:3000/podcast')
    .then(r => r.json())
    .then(episodes => //buildEpisode(episodes))
            {
        episodes.forEach(episode => buildEpisode(episode))
    })
}
getEpisode()

function buildEpisode(episode){
    const div1 = document.querySelector('.card-body')
    const div2 = document.querySelector('.card-img')
    const h6 = document.createElement('h5')
    const img = document.createElement('img')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')

    h6.textContent = `${episode.episode} - ${episode.title}`
    p1.textContent = episode.date
    p2.textContent = episode.description
    img.src = episode.imageURL
    img.style.width= "30rem"
  

    // imgCont.innerHTML = `
    // <div class="media">
    // <img class="d-flex mr-3 img-thumbnail align-self-center" 
    // src="${episode.imageURL}" alt="Podcast" width="200px" height="200px">
    // <div class="media-body">
    //     <h4>${episode.title}</h4>
    //     <p>${episode.description}</p>
    //     <p>${episode.date}</p>

    // </div>`
    div2.appendChild(img)
    div1.append( h6, p1, p2) 

    //imgContainer.append(img,h4 )

}
const formOne = document.querySelector('#first')


formOne.addEventListener("submit", (e) => {
    console.log(e)
    e.preventDefault()

    fetch("http://localhost:3000/podcast", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: e.target.title.value,
            // episode: e.target.episode.value,
            date: e.target.date.value,
            imageURL: e.target.image.value,
            // description: e.target.description.value
        })
        })
        .then(response => response.json())
        .then(newEpisode =>  {
        //console.log(newEpisode)
        addEpisode(newEpisode)
    })
}) 

function addEpisode(episode){
    console.log(episode)

    const container = document.getElementById('pod-list')
    const div = document.getElementById('main');
    const h6 = document.createElement('h6')
    const img = document.createElement('img')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const btn = document.createElement('button')
  

    h6.textContent = `${episode.episode} - ${episode.title}`
    p1.textContent = episode.date
    p2.textContent = episode.description
    img.src = episode.imageURL
    img.className = "toy-avatar"
    img.style.padding = "35px"
    btn.textContent = "Delete"
    btn.innerHTML = "Delete"

    div.append(h6, p1, p2, img, btn)
  
}


function getTopic(){
    fetch('http://localhost:3000/topic')
    .then(r => r.json())
    .then(topics => //console.log(topics))
            {
        topics.forEach(topic => addTopic(topic))
    })
}
getTopic()



const formTwo = document.querySelector('#second')


formTwo.addEventListener("submit", (e) => {
    console.log(e)
    e.preventDefault()


    //console.log(newTopic)
    fetch("http://localhost:3000/topic", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: e.target.name.value,
            topic: e.target.topic.value
        })
        })
        .then(response => response.json())
        .then(newTopic =>  {
        console.log(newTopic)
            addTopic(newTopic)
    })
})  

function addTopic(newTopic){
    console.log(newTopic)
    const ul = document.getElementById('topic-list')
    const li = document.createElement('li')
    li.textContent = newTopic.name
    ul.appendChild(li)
}