const scriptURL = "https://script.google.com/macros/s/AKfycbwx3RtvfIyAZkNm6egTUwhBZXZsxLo3V7IuB9INmz7wG8DlmhN_daNDTQoDnChq4abz/exec";
let testAnswer = 3610;
let startTime = 0;

async function verifyPIN(pin) {
  const res = await fetch(`${scriptURL}?pin=${encodeURIComponent(pin)}`);
  const data = await res.json();

  if (!data.allowed) {
    giveError();
    return;
  }else {
  startTest();
  }
}

function giveError() {
    document.getElementById('status').innerHTML = '<p>You are not allowed to take the test. This could be because:</p><ol><li>You already took it.</li><li>You did not sign up for our experiment.</li><li>You used an incorrect link.</li><li>We made a mistake.</li></ol>';
}

function startTest() {
  generateQuestion();
  document.getElementById('status').style.display = 'none';
  document.getElementById('test').style.display = 'block';
  startTime = Date.now();
}

function generateQuestion() {
  /*Might want to wait to do randomization until we know lots of people signed up. Otherwise it is unlikely that someone will post an answer on the internet.
  const dad=rc("Ashton","Barry");
  const mom=rc("Vinisha","Tracey");
  const son=rc("Bill","Chad");
  const sonsWife=rc("Clarence","Clifford");
  const daughter=rc("Nicole","Marlene");
  const daughtersHusband=rc("Dale","Gary");
  const sonsSon=rc("Graham","Howard");
  const sonsDaughter=rc("Angela","Ashley");
  const daughtersSon=rc("Jeffery","Keith");
  const daughtersDaughter=rc("Janice","Jill");*/
  
  document.getElementById('questionText').innerHTML = "Bananas cost $1.50. Apples cost as many cents as the number of bananas Billy likes. Jane is married to Joe. Bob had a kid named Boe with Janet. X’s dad was Billy and X’s mom was Janey. Jane and Joe’s kids are Bob and Billy. Jane likes 7 bananas and 5 less apples than Boe. Joe likes 3 more bananas than the amount of apples his wife likes, and Joe likes one fifth the amount of apples Boe likes. Bob likes 6 times more bananas than his son and 4 less apples than the amount of bananas Joe likes. Janet likes half as many bananas as Janey and twice the amount of apples as Jane. Boe likes 3 bananas and 20 apples. Billy likes one less banana than his mom and one more apple than Joe. Janey likes twice as many bananas than X, and two more bananas than the amount of apples Billy likes. X likes 8 more bananas than Bob and 6 less apples than Joe.<br><br>If Boe’s cousin got only bananas and as many bananas as he liked, and X’s uncle’s son’s grandpa got only apples and half as many as he liked, how many cents would this cost?";
}

function rc(c1,c2) {
  return Math.random()>.5?c1:c2;
}

// Run on load
const urlParams = new URLSearchParams(window.location.search);
const pin = urlParams.get('pin');
if (pin) {
  verifyPIN(pin);
} else {
  giveError;
}

function checkAnswer() {
  if (document.getElementById("answer").value==testAnswer) {
    //submit
    submitTest();
    document.getElementById('test').style.display = 'none';
    document.getElementById('done').style.display = 'block';
  } else {
    alert("Incorrect, we promise. Please keep trying.");
  }
}

function submitTest() {
  const formURL = "https://docs.google.com/forms/d/1o055QqkDx_DVr60dEPyJSK608tN1lHmF4SiKROEmvZ4/formResponse";

  const formData = new FormData();
  formData.append("entry.464330742", pin);
  formData.append("entry.1342333440", String(Date.now()-startTime)); 

  fetch(formURL, {
    method: "POST",
    mode: "no-cors", // necessary for Google Forms
    body: formData,
  })
  .then(() => console.log("Data sent successfully"))
  .catch(error => console.error("Error sending data:", error));
}