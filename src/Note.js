import React from "react";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      edit: false
    };
    this.renderDisplay = this.renderDisplay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.randomBetween = this.randomBetween.bind(this);
  }

  randomBetween(x, y, s) {
    return x + Math.ceil(Math.random() * y) + s;
  }

  componentDidUpdate() {
    var textArea;
    if (this.state.edit) {
      textArea = this._newText;
      textArea.focus();
      textArea.select();
    }
  }

  componentWillMount() {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, "px"),
      top: this.randomBetween(0, window.innerHeight - 150, "px"),
      // bottom: this.randomBetween(0, window.innerWidth , "%"),
      // left: this.randomBetween(0, window.innerHeight , "%"),
      transform: `rotate(${this.randomBetween(-25, 25, "deg")})`
    };
  }

  shouldComponentUpdate(nextProp, nextStat) {
    return this.props.children !== nextProp.children || this.state !== nextStat;
  }

  edit() {
    this.setState({
      edit: true
    });
  }
  remove() {
    this.props.onRemove(this.props.index);
  }

  save(e) {
    e.preventDefault();
    this.props.onChange(this._newText.value, this.props.index);
    this.setState({
      edit: false
    });
  }

  renderForm() {
    return (
      <div className="note" style={this.style}>
        <form onSubmit={this.save}>
          <textarea
            className="textarea"
            ref={input => (this._newText = input)}
            defaultValue={this.props.children}
          />
          <button>submit</button>
        </form>
      </div>
    );
  }
  renderDisplay() {
    return (
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button id="edit" onClick={this.edit}>
            Edit
          </button>
          <button id="remove" onClick={this.remove}>
            Remove
          </button>
        </span>
      </div>
    );
  }

  render() {
    return this.state.edit ? this.renderForm() : this.renderDisplay();
  }
}

export default Note;
