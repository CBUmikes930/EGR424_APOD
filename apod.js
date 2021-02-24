//return date string in YYYY-MM-DD format
const getDateString = date => 
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const displayPicture = data => {
    let html = "<div id='content'>";
    
    if(data.error) {      // error - display message
        html += `<span class="error">${data.error.message}e/span>`;
    }
    else if (data.code) {  // problem - display message
        html += `<span class="error">${data.msg}</span`;
    }
    else {                  // sucesss display image/video data
        html += `<h3>${data.title}</h3>`;
        const width = 700;
        switch (data.media_type) {
            case "image":
                html += `<img src="${data.url}" width=${width} alt="NASA photo.jpg">`;
                break;
            case "video":
                html += `<iframe src=${data.url} frameborder="0" allowfullscreen></iframe>`;
                break;
            default:
                html += `<img src="images/notavailable.png" width="$(width)" alt="NASA photo.jpg">`;
        }

        // date and copyright
        html += `<div>${data.date}`;
        if (data.copyright) {
            html += `<span class="right">&copy; ${data.copyright}</span>`;
        }
        html += "</div>";

        // explanation
        html += `<p>${data.explanation}</p>`;
    }
    html += `</div>`;
    // display HTML
    $("#display").html(html);
};

const displayPictures = data => {
    let html = "<div id='content'>";
    for (var key = 0; key < data.length; key++) {
        if(data[key].error) {      // error - display message
            html += `<span class="error">${data[key].error.message}e/span>`;
        }
        else if (data[key].code) {  // problem - display message
            html += `<span class="error">${data[key].msg}</span`;
        }
        else {                  // sucesss display image/video data
            html += `<h3>${data[key].title}</h3>`;
            const width = 700;
            switch (data[key].media_type) {
                case "image":
                    html += `<img src="${data[key].url}" width=${width} alt="NASA photo.jpg">`;
                    break;
                case "video":
                    html += `<iframe src=${data[key].url} frameborder="0" allowfullscreen></iframe>`;
                    break;
                default:
                    html += `<img src="images/notavailable.png" width="$(width)" alt="NASA photo.jpg">`;
            }
    
            // date and copyright
            html += `<div>${data[key].date}`;
            if (data[key].copyright) {
                html += `<span class="right">&copy; ${data[key].copyright}</span>`;
            }
            html += "</div>";
        
            // explanation
            html += `<p>${data[key].explanation}</p>`;
            if (key < data.length - 1) {
                html += `<br><br><hr><br><br>`;
            }
        }
    }
    html += `</div>`;
    // display HTML
    $("#display").html(html);
};

const displayError = error => {
    let html = `<span class="error">${error.message}</span>`;
    $("#display").html(html);
};


$(document).ready( () => {
    const today = new Date();
    let dateStr = getDateString(today);

    const dateTextbox = $("#date");
    dateTextbox.val(dateStr);
    dateTextbox.focus();

    $("#view_button").click( () => {
        dateStr = $("#date").val();
        const dateObj = new Date(dateStr);

        if(dateObj == "Invalid Date") {
            const msg = "Please enter valid date in YYYY-MM-DD format."
            $("#display").html(`<span class="error">${msg}</span>`);
        }
        else {
            dateStr = getDateString(dateObj);

            // build URL for API request
            const domain = `https://api.nasa.gov/planetary/apod`;
            const request = `?api_key=DEMO_KEY&date=${dateStr}`;
            
            const url = domain + request;

            fetch(url)
                .then(response => response.json())
                .then(json => displayPicture(json))
                .catch(e => displayError(e));
        }
        $("#date").focus();
    });

    $("#random_button").click( () => {
        count = $("#count").val();
        if (count <= 0) {
            const msg = "Please enter valid positive number."
            $("#display").html(`<span class="error">${msg}</span>`);
        }
        else {
            const domain = `https://api.nasa.gov/planetary/apod`;
            const request = `?api_key=DEMO_KEY&count=${count}`;

            const url = domain + request;

            fetch(url)
                .then(response => response.json())
                .then(json => displayPictures(json))
                .catch(e => displayError(e));
        }
        $("#count").focus();
    });
});