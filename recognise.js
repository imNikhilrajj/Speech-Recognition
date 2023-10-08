document.querySelector(".download").addEventListener("click", function () {
const userInput = document.querySelector(".result").value;

var myHeaders = new Headers();
myHeaders.append("apikey", "m6ObbYvhdMQnRhBHKSbsSKfhHD6cWeId");

// var raw ='Hey buddy, how are you? strange to see you here.';
var requestOptions = {
  method: 'POST',
  redirect: 'follow',
  headers: myHeaders,
  body: userInput
};

fetch("https://api.apilayer.com/text_to_emotion", requestOptions)
  .then(response => response.json()) // Parse JSON response
  .then(data => {
    const emotions = [];
    for (const emotion in data) {
      const score = data[emotion];
      if (score > 0.0) {
        emotions.push({ emotion, score });
      }
    }

    // Sort emotions by score in descending order
    emotions.sort((a, b) => b.score - a.score);

    // Display the filtered and sorted emotions
    const resultEmotion = document.querySelector(".resultEmotion");
    if (emotions.length > 0) {
      resultEmotion.innerHTML = "<strong>Emotions: </strong>";
      emotions.forEach(emotionObj => {
        const scoreAsPercentage = (emotionObj.score * 100).toFixed(0); // Convert to percentage
          resultEmotion.innerHTML += ` ${emotionObj.emotion}: ${scoreAsPercentage}%  `;
        });
    } else {
      resultEmotion.innerHTML = "No emotions found with scores > 0.0.";
    }
  })
  .catch(error => console.log('error', error));

});

const clearbtnn = document.querySelector(".clear");
clearbtnn.addEventListener("click", function () {
  const resultEmotion = document.querySelector(".resultEmotion");
  resultEmotion.innerHTML = ""; // Clear the content
});

