document.addEventListener("DOMContentLoaded", (e)=>{
    e.preventDefault()
   const form = document.querySelector('#register');
    const userError = document.querySelector(".user.error");
    const passError = document.querySelector(".pass.error");
    form.addEventListener("submit", async(e)=>{
        e.preventDefault()
        const user = form.user.value    
        const pass = form.pass.value    
        userError.textContent = "";
        passError.textContent = "";
    const res = await fetch("/register", {
        method : "POST",
        body: JSON.stringify({user,pass}),
        headers: {"Content-Type": "application/json"}
    })

    const data = await res.json()
    console.log(data)
    if(data.error){
        userError.textContent = data.error.user;
        passError.textContent = data.error.pass;
        return;
    }
    if(data.userId){
        window.location.href = "/home"
    }
    })
})