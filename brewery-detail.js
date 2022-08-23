import {html, css, LitElement} from 'lit';

class BreweryDetail extends LitElement {
  static get styles() {
    return css`p { color: coral }`;
  }
  static get properties() {
    return {
      id: String,
      name: String,
      type: String,
      city: String,
      visited: {type: Boolean},
      url: String
    };
  }
  constructor() {
    super();
    this.id = '';
    this.name = '';
    this.type = '';
    this.city = '';
    this.visited = false;
    this.url = '';
  }
  render() {
    console.log('brewery-detail rendered');
    return html`
      <h3>Name: ${this.name} - ${this.visitedStatus(this.visited)} - <button @click=${this.visit}>${this.visitButtonText()} This!</button></h3>
      <p>Type: ${this.type}</p>
      <p>City: ${this.city}</p>
    `;
  }
  visitedStatus(visited) {
    if (visited) {
      return 'Visited';
    }
    return 'Not Visited';
  }
  visit() {
    console.log('brewery-detail visit');
    this.dispatchEvent(new CustomEvent('toggle-visited-status'));
  }
  visitButtonText() {
    if (this.visited) {
      return 'Un-Visit';
    }
    return 'Visit';
  }
}
customElements.define('brewery-detail', BreweryDetail);
