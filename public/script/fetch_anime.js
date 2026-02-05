document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault()


const form = document.querySelector("#register")

const linkError = document.querySelector(".link.error")
const nameError = document.querySelector(".name.error")
const descError = document.querySelector(".description.error")
const epError = document.querySelector(".episodes.error")

form.addEventListener("submit", async(e)=>{
    linkError.textContent = ""    
    nameError.textContent = ""    
    descError.textContent = ""    
    e.preventDefault()
    const link = form.link.value
    const name = form.name.value
    const description = form.description.value
    const episodes = form.episodes.value
    const user = form.user.value
    console.log("User:", user)
    try{
      const res = await fetch("/home/anime/register",{
            method: "POST",
            body: JSON.stringify({link,name, description, episodes, user}),
            headers: {"Content-Type": "application/json"}
        })
    const data = await res.json()
    console.log(data)
    if(data.error){
        linkError.textContent = data.error.link
        nameError.textContent = data.error.Name
        descError.textContent = data.error.Description
        epError.textContent = data.error.Episodes
    }
    if(data.success){
        window.location.href = "/"
    }
    }catch(err){
        console.error(err)
    }
})})