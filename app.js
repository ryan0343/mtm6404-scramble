/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

// Array of 10 words
const words = [
  "elephant",
  "computer",
  "banana",
  "programming",
  "mountain",
  "sunshine",
  "keyboard",
  "guitar",
  "coffee",
  "chocolate"
];




// Overall App
function App() {
  return (
    <div id="game">
      <h2>Welcome to Scramble.</h2>
      <Scores ></Scores>
      <Message ></Message>
      <Scrambled ></Scrambled>
      <Form ></Form>
    </div>
  )
}

function Scores() {
  return (
    <div className="scores">
    <div id="points" className="score">
      <h1 id="pointscount">0</h1>
      <h4>Points</h4>
    </div>
    <div id="strikes" className="score">
      <h1 id="strikescount">0</h1>
      <h4>Strikes</h4>
    </div>
  </div>
  )
}

function Message() {
  return (
    <div className="message correct">
      <p>Correct, next word.</p>
    </div>
  )
}

function Scrambled() {
  return (
  <h1 className="scrambled">DNKEYO</h1>
)
}

function Form() {
  return (
    <div className="form">
      <input type="text" id="query" />
      <button id="skipsBtn"><strong>3</strong> skips remaining</button>
    </div>
  );
}

// Grabs Root and renders

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)