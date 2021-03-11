


  
function getEpisode(){
    fetch('http://localhost:3000/podcast')
    .then(r => r.json())
    .then(episodes => //buildEpisode(episodes))
            {
        episodes.forEach(episode => addEpisode(episode))
    })
}
getEpisode()

function buildEpisode(episode){
    const div1 = document.querySelector('.card-body')
    const div2 = document.querySelector('.card-img')
    let  div3 = document.querySelector('.card')
    const h6 = document.createElement('h6')
    const img = document.createElement('img')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')

    h6.textContent = `${episode.episode} - ${episode.title}`
    p1.textContent = episode.date
    p2.textContent = episode.description
    img.src = episode.imageURL
    img.style.width= "30rem"
  
    div2.appendChild(img)
    div1.append( h6, p1, p2) 
    div3.append(div2, div1)

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
    //console.log(episode)
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
    img.style.padding = "35px"
    btn.textContent = "Delete"
  

    div.append(h6, p1, p2, img, btn)
  
}






//fecth for topics from db
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
     // debugger
        console.log(newTopic)
    const ul = document.getElementById('topic-list')
    const li = document.createElement('li')
    const deleteBtn = document.createElement('button')
  
  
    li.textContent = newTopic.topic
      deleteBtn.textContent = "X"
  
  
        li.appendChild(deleteBtn)
      ul.appendChild(li)
     
     
     
      deleteBtn.addEventListener('click', () => {
        li.remove()
        
        fetch(`http://localhost:3000/topic/${newTopic.id}`, {
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(topics =>console.log(topics))

    })
    
  
  }


