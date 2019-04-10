import React from "react";
import Note from "./Note";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.eachNote = this.eachNote.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextId = this.nextId.bind(this);
  }


  update(newText, i) {
    this.setState(prevstate => ({
      notes: prevstate.notes.map(note =>
        note.id !== i ? note : { ...note, note: newText }
      )
    }));
  }

  remove(id) {
    this.setState(prevstate => ({
      notes: prevstate.notes.filter(note => note.id !== id)
    }));
  }

  add(text) {
    this.setState(prevstate => ({
      notes: [
        ...prevstate.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }));
  }

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }

  eachNote(note) {
    return (
      <Note
        key={note.id}
        index={note.id}
        onChange={this.update}
        onRemove={this.remove}
      >
        {note.note}
      </Note>
    );
  }

  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button id="add" onClick={this.add.bind(null, "Place note here")}>
          add
        </button>
      </div>
    );
  }
}

export default Board;
