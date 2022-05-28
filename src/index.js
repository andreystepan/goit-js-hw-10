import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCounties from './js/fetchCountries';

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}
 
const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(handleInputSearchBox, DEBOUNCE_DELAY));

function handleInputSearchBox(e) {
    const name = e.target.value.trim();
     if (name === '') {
    clearData();
    return;
  }
    fetchCounties(name).then(countries => {
         clearData();
        console.log ('countries:', countries)
    if (countries.length > 10) {
         Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    else if (countries.length === 1) {
        refs.countryInfo.insertAdjacentHTML('afterbegin', renderCountry(countries[0]));
    }
        else 
    {
        const list = renderCountries(countries).join(' ');
        refs.countryList.insertAdjacentHTML('afterbegin', list);
        }
    }).catch(error => {
      Notiflix.Notify.failure("Oops, there is no country with that name");
    });
    
    
}

function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
 

function renderCountries(countries) {
  return countries.map(country => {
    return `
    <li class="country_item"> 
    <img src = "${country.flags.svg}" alt = Flag of "${country.name.official}}" class = "flag" ">
    <span class = "country_title" >${country.name.official}</span>
    </li>`;
  });
}


function renderCountry(country) {
  return `
    <div class="info-title">
    <img src = "${country.flags.svg}" alt = Flag of "${country.name.official}" class = "flag" ">
    <p><span class="info-title-element">Country: </span>${country.name.official}</p>
    <p><span class="info-title-element">Capital: </span>${country.capital}</p>
    <p><span class="info-title-element">Population: </span>${country.population}</p>
    <p><span class="info-title-element">language: </span>${Object.values(country.languages)}</p>
  </div>`;
}
