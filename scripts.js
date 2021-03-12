//How we get a list of episodes with fetch [CRUD]

function getEpisode(){
     //debugger
    fetch('http://localhost:3000/podcast')
    .then(resp => resp.json())
    .then(episodes => 
            {
        episodes.forEach(episode => addEpisode(episode))
    })
}
getEpisode()

//Grab the podcast form, add e.listener, fetch POST [CRUD]
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
            episode: e.target.episode.value,
            date: e.target.date.value,
            imageURL: e.target.image.value,
            description: e.target.description.value
            })
        })
        .then(response => response.json())
        .then(newEpisode =>  {
        //console.log(newEpisode)
        addEpisode(newEpisode)
    })
}) 

//DOM Manipulation
//add e.listener(2), fetch DELETE [CRUD]
function addEpisode(episode){
    console.log(episode)
    const div = document.getElementById('main');
    const h6 = document.createElement('h6')
    const img = document.createElement('img')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    const btn = document.createElement('button')
    const btn1 = document.createElement('button')
    const btn2 = document.createElement('button')
  
    h6.textContent = `Episode ${episode.episode} - ${episode.title}`
    p1.textContent = `Published: ${episode.date}`
    p2.textContent = `${episode.description.substring(0, 250) + "..."}`
    p2.id = "description"
    p2.classList = "rounded"
    img.src = episode.imageURL
    img.style.width = "15rem"
    img.style.marginBottom = "30px"
    img.classList = "rounded"
    btn.textContent = "Show More"
    btn.style.width ="150px"
    btn.style.marginLeft= "5px"
    btn.classList = "rounded border border-light"
    btn1.textContent = "Delete"
    btn1.className= "btn btn-primary"
    btn2.textContent = "Subscribe"
    btn2.className= "btn btn-warning"

    p2.append(btn)
    div.append(h6, p1, p2, img, btn1, btn2)


    btn1.addEventListener('click', () => {
        console.log("Are you there")
        img.remove()
        h6.remove()
        p2.remove()
        p1.remove()
        btn2.remove()
        btn.remove()
        btn1.remove()
            
        fetch(`http://localhost:3000/podcast/${episode.id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(removeEpisode => console.log(removeEpisode))
    
    })

    btn.addEventListener('click', () => {
        if (btn.innerHTML == "Show More"){
            btn.innerHTML = "Show Less"
            p2.textContent = episode.description
            p2.append(btn)
        }
        else {
            btn.innerHTML = "Show More"
            p2.textContent = `${episode.description.substring(0, 250) + "..."}`
            p2.append(btn)
        }
    })
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
  
//Grabbing the form associated with the second form. 
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
            topic: e.target.topic.value,
            comments: e.target.comments.value
        })
    })
    .then(response => response.json())
    .then(newTopic =>  {
        console.log(newTopic)
            addTopic(newTopic)
        })
    })  
  
//DOM Manipulation
//Append to the DOM & fetch DELETE topics to and from the list  ( CRU[D] )
function addTopic(newTopic){
     // debugger
        console.log(newTopic)
    const ul = document.getElementById('topic-list')
    const div = document.getElementById('comment-list')
    const li = document.createElement('li')
    const p = document.createElement('p')
    const deleteBtn = document.createElement('button')
  
  
    li.textContent = newTopic.topic
    p.textContent = `${newTopic.name} - "${newTopic.comments}"`
    p.style.fontStyle = "italic"
    deleteBtn.textContent = "X"
    deleteBtn.classList = "rounded border border-warning"
  
  //debugger
  console.log(p)
    li.appendChild(deleteBtn)
    ul.append(li, p)
   // div.appendChild(p)
     
     
     
    deleteBtn.addEventListener('click', () => {
    li.remove()
    p.remove()
        
    fetch(`http://localhost:3000/topic/${newTopic.id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(topics =>console.log(topics))

    })
}
