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
  const [points, setPoints] = React.useState(() => {
    return JSON.parse(localStorage.getItem('points')) || 0;
  });

  const [strikes, setStrikes] = React.useState(() => {
    return JSON.parse(localStorage.getItem('strikes')) || 0;
  });

  // Fetch skips from localStorage correctly
  const [skips, setSkips] = React.useState(() => {
    const savedSkips = JSON.parse(localStorage.getItem('skips'));
    return savedSkips !== null ? savedSkips : 3;
  });

  const [currentIndex, setCurrentIndex] = React.useState(() => {
    return JSON.parse(localStorage.getItem('currentIndex')) || 0;
  });

  const [currentWord, setCurrentWord] = React.useState(words[currentIndex]);
  const [message, setMessage] = React.useState('');
  const [messageClass, setMessageClass] = React.useState('hide');
  const [gameOver, setGameOver] = React.useState(false);

  // Shuffle the current word
  const scrambledWord = shuffle(currentWord);

  // Save to localStorage on state change
  React.useEffect(() => {
    localStorage.setItem('points', JSON.stringify(points));
    localStorage.setItem('strikes', JSON.stringify(strikes));
    localStorage.setItem('skips', JSON.stringify(skips));
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
  }, [points, strikes, skips, currentIndex]);

  // useEffect to monitor strikes and trigger game over if >= 3
  React.useEffect(() => {
    if (strikes >= 3) {
      endGame();
    }
  }, [strikes]);

  const queryHandler = (e) => {
    e.preventDefault();
    const guess = e.target.elements.query.value.toLowerCase();

    if (guess === currentWord) {
      setPoints((prevPoints) => prevPoints + 1);
      setMessage('Correct! Next word.');
      setMessageClass('correct');
      nextWord();
    } else {
      setStrikes((prevStrikes) => prevStrikes + 1);
      setMessage('Wrong, try again!');
      setMessageClass('strike');
    }

    e.target.elements.query.value = ''; // Clear input after guess
  };

  const nextWord = () => {
    if (currentIndex + 1 < words.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCurrentWord(words[currentIndex + 1]);
    } else {
      endGame();
    }
  };

  const skipWord = () => {
    if (skips > 0) {
      setSkips((prevSkips) => prevSkips - 1);
      setMessage('You skipped. Next word.');
      setMessageClass('skipped');
      nextWord();
    } else {
      setMessage('No more skips.');
      setMessageClass('strike');
    }
  };

  const endGame = () => {
    setGameOver(true);
    if (strikes >= 3) {
      setMessage(`Game Over! You lost. Your score: ${points}`);
      setMessageClass('strike');
    } else {
      setMessage(`Congratulations! You won. Your final score: ${points}`);
      setMessageClass('correct');
    }
  };

  // resets everything upon play again
  const playAgain = () => {
    setPoints(0);
    setStrikes(0);
    setSkips(3); // Reset skips to 3 when the game is reset
    setCurrentIndex(0);
    setCurrentWord(words[0]);
    setMessage('');
    setMessageClass('hide'); // Hide message on reset
    setGameOver(false);
  };

  return (
    <div id="game">
      <h1>Welcome to Scramble.</h1>
      <Scores points={points} strikes={strikes} />
      <Message message={message} messageClass={messageClass} />
      <Scrambled word={scrambledWord} />
      <Form queryHandler={queryHandler} skipHandler={skipWord} gameOver={gameOver} skips={skips} />
      {gameOver && <button id="playAgainBtn" onClick={playAgain}>Play Again?</button>}
    </div>
  );
}

// Scores Component - Displays Points and Strikes
function Scores({ points, strikes }) {
  return (
    <div className="scores">
      <div id="points" className="score">
        <h1 id="pointscount">{points}</h1>
        <h4>Points</h4>
      </div>
      <div id="strikes" className="score">
        <h1 id="strikescount">{strikes}</h1>
        <h4>Strikes</h4>
      </div>
    </div>
  );
}

// Message Component - Displays Game Messages
function Message({ message, messageClass }) {
  return (
    <div className={`message ${messageClass}`}>
      <p>{message}</p>
    </div>
  );
}

// Scrambled Component - Displays Scrambled Word
function Scrambled({ word }) {
  return (
    <h1 className="scrambled">{word}</h1>
  );
}

// Form Component - User Input and Skip Button
function Form({ queryHandler, skipHandler, gameOver, skips }) {
  return (
    <div className="form">
      <form id="query" onSubmit={queryHandler}>
        <input type="text" id="query" disabled={gameOver} />
      </form>
      <button id="skipsBtn" onClick={skipHandler} disabled={gameOver}>
        <strong>{skips}</strong> skips remaining
      </button>
    </div>
  );
}

// Grabs Root and renders the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);