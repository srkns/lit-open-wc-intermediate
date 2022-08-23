import {html, css, LitElement} from 'lit';
import '@material/mwc-button';
//import './brewery-detail.js';

class BreweryApp extends LitElement {
  static get styles() {
    return css`p { color: chocolate }`;
  }
  static get properties() {
    return {
      _serviceURL: {state: true},
      _breweries: {type: Array},
      _filter: {type: String}
    };
  }
  connectedCallback() {
    console.log('brewery-app connected');
    super.connectedCallback();
    if (!this._breweries) {
      console.log('brewery-app connectedCallback calling:fetchBreweries');
      this.fetchBreweries();
      console.log('brewery-app connectedCallback called:fetchBreweries');
    }
  }
  disconnectedCallback() {
    console.log('brewery-app disconnected');
    super.disconnectedCallback();
  }
  update(changed) {
    console.log('brewery-app update');
    super.update(changed);
  }
  updated(changed) {
    console.log('brewery-app updated');
    super.updated(changed);
  }
  firstUpdated() {
    console.log('brewery-app firstUpdated');
    super.firstUpdated();
  }
  constructor() {
    super();
    this._serviceURL = "https://api.openbrewerydb.org/breweries";
    this._breweriesFetched = false;
    this._filter = 'none';
  }
  render() {
    console.log('brewery-app rendered');
    if (!this._breweriesFetched) {
      return html` <p>Breweries Loading...</p> `;
    }
    const total = this._breweries.length;
    const totalVisited = this._breweries.filter(brewery => brewery.visited).length;
    const totalNotVisited = total - totalVisited;
    const breweries = (this._filter === 'none') ? [...this._breweries] : this._breweries.filter(brewery => { return this._filter === 'visited' ? brewery.visited : !brewery.visited });
    return html`
      <p>Total Visit Status : (${totalVisited} visited and ${totalNotVisited} still to go)</p> 
      <mwc-button @click=${this.showVisited}>Show Visited(${totalVisited})</mwc-button>
      <mwc-button @click=${this.showUnvisited}>Show Unvisited(${totalNotVisited})</mwc-button>
      <mwc-button @click=${this.showAll}>Show All(${total})</mwc-button>
      <ul>
        ${breweries.map(brewery => this.breweryDetail(brewery, () => this.toggleVisitedStatus(brewery)))}
      </ul>
      `;
  }
  async fetchBreweries() {
    console.log('brewery-app fetchBreweries fetching Breweries');
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    const jsonResponse = await response.json();
    this._breweries = jsonResponse;
    this._breweries.forEach(element => {
      element.visited = false;
    });
    this._breweriesFetched = true;
    console.log('brewery-app fetchBreweries fetched Breweries');
  }
  toggleVisitedStatus(breweryToUpdate) {
    console.log('brewery-app toggleVisitedStatus');
    this._breweries = this._breweries.map(brewery => {
      return brewery.id === breweryToUpdate.id ? { ...brewery, visited: !brewery.visited } : brewery;
    });
  }
  showVisited() {
    this._filter = 'visited';
  }
  showUnvisited() {
    this._filter = 'unvisited';
  }
  showAll() {
    this._filter = 'none';
  }
  breweryDetail(brewery, visitAction) {
    return html`
      <h3>Name: ${brewery.name} 
        - ${brewery.visited ? 'Visited' : 'Unvisited'} 
        - <mwc-button @click=${visitAction}>${brewery.visited ? 'Un-Visit' : 'Visit'} This!</mwc-button>
      </h3>
      <p>Type: ${brewery.brewery_type}</p>
      <p>City: ${brewery.city}</p>
    `;
  }
}
customElements.define('brewery-app', BreweryApp);
