import React, { useState } from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

const _ = require("lodash");

function App() {
  const [emojies, setEmojies] = useState(
    emojipedia.map((emojiTerm) => renderEmoji(emojiTerm))
  );

  function handleChange(event) {
    const searchTerm = _.lowerCase(event.target.value),
      newEmojipedia = emojipedia.filter(
        (emoji) =>
          _.lowerCase(emoji.name).includes(searchTerm) ||
          _.lowerCase(emoji.meaning).includes(searchTerm)
      );
    setEmojies(newEmojipedia.map((emojiTerm) => renderEmoji(emojiTerm)));
  }

  function renderEmoji(emoji) {
    return (
      <Entry
        key={emoji.id}
        emoji={emoji.emoji}
        name={emoji.name}
        description={emoji.meaning}
      />
    );
  }

  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <input
        className="search-input"
        type="text"
        placeholder="Search emoji.."
        onChange={handleChange}
      ></input>
      <dl className="dictionary">{emojies}</dl>
    </div>
  );
}

export default App;
