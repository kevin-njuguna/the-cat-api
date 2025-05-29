const factsList = document.getElementById('facts-list');
const factsBtn = document.getElementById('submit-facts-button');
const factsInput = document.getElementById('cat-facts');
const errorElement = document.getElementById('error');
const photosInput = document.getElementById('cat-photos');
const photosButton = document.getElementById('cat-photos-button');
const imgContainer = document.getElementById('img-container');
const spinner = document.getElementById('spinner');

function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.add('display-error');
}

function hideError() {
  errorElement.classList.remove('display-error');
}


function showSpinner() {
  spinner.classList.remove('hidden');
}

function hideSpinner() {
  spinner.classList.add('hidden');
}

async function fetchCatFacts(count) {
  const response = await axios.get(`https://meowfacts.herokuapp.com/?count=${count}`);
  return response.data.data;
}

factsBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const count = parseInt(factsInput.value);

  if (!count || count < 1 || count > 50) {
    showError('Please enter a valid number (1-50).');
    return;
  }

  hideError();
  factsList.innerHTML = '';
  showSpinner();

  try {
    const facts = await fetchCatFacts(count);
    facts.forEach(fact => {
      const li = document.createElement('li');
      li.textContent = fact;
      factsList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    showError('Failed to load cat facts.');
  } finally {
    hideSpinner();
  }
});


async function fetchCatPhotos(numberOfCatPhotos) {
  const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${numberOfCatPhotos}`);
  return response.data;
}

photosButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const count = parseInt(photosInput.value);

  if (!count || count < 1 || count > 10) {
    showError('Please enter a valid number of photos (1-10).');
    return;
  }

  hideError();
  imgContainer.innerHTML = '';
  showSpinner();

  try {
    const photos = await fetchCatPhotos(count);
    photos.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'img-wrapper';

      const img = document.createElement('img');
      img.src = cat.url;
      img.alt = 'Cat photo';
      img.style.width = '250px';
      img.style.margin = '10px';

      div.appendChild(img);
      imgContainer.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    showError('Failed to load cat images.');
  } finally {
    hideSpinner();
  }
});