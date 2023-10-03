const btn = document.querySelector('.btn');
const result = document.querySelector('.result');
let recognition;
let transcriptWords = new Set();

// Function to load and display the previously stored text
function loadStoredText() {
    const storedText = localStorage.getItem('transcriptText');
    if (storedText) {
        transcriptWords = new Set(storedText.split(' '));
        result.innerHTML = storedText;
    }
}

// Load stored text when the page loads
window.addEventListener('load', loadStoredText);

// Start recording when the button is clicked
btn.addEventListener('click', () => {
    var speech = true;
    recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
        
        const words = transcript.split(' '); // Split the transcript into words
        words.forEach(word => transcriptWords.add(word));   
        // Update the result section with the unique words
        const updatedText = Array.from(transcriptWords).join(' ');
        result.innerHTML = updatedText;

        // Store the updated text in localStorage
        localStorage.setItem('transcriptText', updatedText);
    })

    if(speech == true){
        recognition.start();
        btn.querySelector('.start').innerHTML = 'Listening...';
        btn.querySelector('.icon').innerHTML = '<i class="fa-solid fa-ear-listen"></i>'
    } 

    recognition.addEventListener('end', () => {
        // Change button text back to original after recording stops
        btn.querySelector('.start').innerHTML = 'Start Recording';
        btn.querySelector('.icon').innerHTML = '<i class="fa-solid fa-microphone"></i>';
        speech = false; // Update speech variable
    });
})

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', () => {
    transcriptWords.clear(); // Clear the transcriptText variable
    result.innerHTML = ''; // Clear the result section
    localStorage.removeItem('transcriptText'); // Remove the stored text
});

//speech to text api details
// api key: PD78lB7MeMUbzrzJVFtzrABudikFOZ0N

//JOB_ID="JOB_ID_FROM_PREVIOUS_STEP"
// curl -L -X GET "https://asr.api.speechmatics.com/v2/jobs/${JOB_ID}/transcript?format=txt" \
// -H "Authorization: Bearer PD78lB7MeMUbzrzJVFtzrABudikFOZ0N"
