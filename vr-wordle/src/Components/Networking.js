const API_URL = process.env.REACT_APP_API_URL;
class Networking {
  async getWordScores(word) {
    const response = await fetch(`${API_URL}/scores?word=${word}`, {
      method: "GET",
    });
    const json = await response.json();
    return json;
  }

  async getUserScores(username) {
    const response = await fetch(`${API_URL}/scores?username=${username}`, {
      method: "GET",
    });
    const json = await response.json();
    return json;
  }

  async postScore(score, word, username) {
    const response = await fetch(`${API_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score,
        word,
        username,
      }),
    });

    const json = await response.json();
    return json;
  }

  async getGuesses(username, date) {
    const response = await fetch(
      `${API_URL}/guesses?username=${username}&date=${date}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ username, date }),
      }
    );
    const json = await response.json();
    return json;
  }

  async postGuess(username, date, guess_1) {
    const response = await fetch(`${API_URL}/guesses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, date, guess_1 }),
    });
    const json = await response.json();
    return json;
  }

  async updateGuess(username, date, guess, count) {
    const response = await fetch(`${API_URL}/updateGuesses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, date, guess, count }),
    });
    const json = await response.json();
    console.log(json);
    return json;
  }
}

export default Networking;
