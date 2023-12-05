

const form = document.querySelector("form");
const locationInput = document.querySelector("input[type=text]");
const message1 = document.querySelector("#message-1");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    message1.textContent = "Loading...";
    message1.classList.remove("error");
    
    const location = locationInput.value;
    
    fetch("/weather?location=" + location).then((response) => {
        response.json().then((data) => {

            if(data.error){
                message1.textContent = data.error;
                message1.classList.add("error");
            }else{
                message1.textContent = data.forecast;
            }
        });
    });
});