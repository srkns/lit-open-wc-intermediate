import {html, css, LitElement} from 'lit';
import './brewery-detail.js';

class BreweryApp extends LitElement {
  static get styles() {
    return css`p { color: chocolate }`;
  }
  static get properties() {
    return {
      _serviceURL: {state: true},
      _breweries: {type: Array},
      _breweriesFetched: {type: Boolean},
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
  }
  render() {
    console.log('brewery-app rendered');
    if (!this._breweriesFetched) {
      return html` <p>Breweries Loading...</p> `;
    }
    const totalVisited = this._breweries.filter(brewery => brewery.visited).length;
    const totalNotVisited = this._breweries.length - totalVisited;
    return html`
      <p>Total Visit Status : (${totalVisited} visited and ${totalNotVisited} still to go)</p> 
      <ul>
      ${this._breweries.map(brewery => html`
          <li>
            <brewery-detail 
              .name=${brewery.name} 
              .type=${brewery.brewery_type} 
              .city=${brewery.city} 
              .url=${brewery.website_url}
              @toggle-visited-status=${() => this.toggleVisitedStatus(brewery)}
            ></brewery-detail>
          </li>`,)}
      </ul> `;
  }
  async fetchBreweries() {
    console.log('brewery-app fetchBreweries fetching Breweries');
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    const jsonResponse = await response.json();
    this._breweries = jsonResponse;
    this._breweriesFetched = true;
    console.log('brewery-app fetchBreweries fetched Breweries');
  }
  toggleVisitedStatus(breweryToUpdate) {
    console.log('brewery-app toggleVisitedStatus');
    this._breweries = this._breweries.map(brewery => {
      return brewery === breweryToUpdate ? { ...brewery, visited: !brewery.visited } : brewery;
    });
  }
}
customElements.define('brewery-app', BreweryApp);
