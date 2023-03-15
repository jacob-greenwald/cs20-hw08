API_URL = "https://randomuser.me/api/";
function getUser() {
    /* Step 1: Make instance of request object...
    ...to make HTTP request after page is loaded*/
    request = new XMLHttpRequest();
    console.log("1 - request object created");

    // Step 2: Set the URL for the AJAX request to be the JSON file

    request.open("GET", API_URL, true)

    console.log("2 - opened request file");

    // Step 3: set up event handler/callback

    request.onreadystatechange = function() {
        console.log("3 - readystatechange event fired.");

        if (request.readyState == 4 && request.status == 200) {

            // Step 5: wait for done + success
            console.log("5 - response received");
            result = request.responseText;
            data = JSON.parse(result)["results"][0];
            displayUserData(data);
        }
        else if (request.readyState == 4 && request.status != 200) {

            document.getElementById("data").innerHTML = "Something is wrong!  Check the logs to see where this went off the rails";

        }

        else if (request.readyState == 3) {

            document.getElementById("data").innerHTML = "Too soon!  Try again";

        }

    }
    // Step 4: fire off the HTTP request
    request.send();
    console.log("4 - Request sent");
}

function getUserFetch() {
    res = fetch(API_URL)
    .then (res => res.text())
    .then (res => {
        data = JSON.parse(res)["results"][0];
        console.log(data);
        displayUserData(data, true);

    })
    .catch (error => console.log(error))
}

function displayUserData(data, used_fetch) {
    // Given a data object containing user data, displays the data on the page.
    // If used_fetch == true, displays the data in the userFetchInfo Div
    document.getElementById("name" + (used_fetch ? "Fetch" : "")).innerHTML ="Name: " + data["name"]["title"] + " " + data["name"]["first"] + " " + data["name"]["last"]; 
    document.getElementById("email" + (used_fetch ? "Fetch" : "")).innerHTML ="Email: " + data["email"];
    document.getElementById("phone" + (used_fetch ? "Fetch" : "")).innerHTML ="Phone number: " + data["cell"];
    document.getElementById("age" + (used_fetch ? "Fetch" : "")).innerHTML ="Age: " + data["registered"]["age"];
    document.getElementById("location" + (used_fetch ? "Fetch" : "")).innerHTML ="Location: " + data["location"]["city"] + ", " + data["location"]["country"];
    document.getElementById("username" + (used_fetch ? "Fetch" : "")).innerHTML ="Username: " + data["login"]["username"];
    document.getElementById("password" + (used_fetch ? "Fetch" : "")).innerHTML ="Password: " + data["login"]["password"];
}

getUser()
getUserFetch()