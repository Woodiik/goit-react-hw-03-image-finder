import PropTypes from 'prop-types';

import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    name: '',
  };
  onChange = e => {
    this.setState({ name: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    this.props.onSubmit(name);
    this.setState({ name: '' });
  };
  render() {
    return (
      <header className="searchbar">
        <form className="searchform" onSubmit={this.onSubmit}>
          <button className="searchform-button" type="submit">
            <span>Search</span>
          </button>

          <input
            className="searchform-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.name}
            onChange={this.onChange}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
