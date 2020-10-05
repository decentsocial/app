const $userListings = document.querySelector('#user-listings')
const $emptyUserListings = document.querySelector('#empty-user-listings')
const $createListing = document.querySelector('#create-listing')
const $createListingForm = document.querySelector('#create-listing-form')
const $previewContent = document.querySelector('#preview-content')

getUserListings()

window.$('#create-listing-form input,#create-listing-form textarea').on('change', function (e) {
  $previewContent.removeAttribute('hidden')
  const listing = parseUserListing()

  window.fetch('/api/listing-preview', {
    method: 'POST',
    body: JSON.stringify(listing),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.text())
    .then(data => {
      $previewContent.innerHTML = `
<div class="section">
  <object type="text/html" data="/preview">${data}</object>
</div>
        `
    })
})
$createListing.addEventListener('click', () => {
  const errorAlert = document.querySelector('#error-alert')
  errorAlert.setAttribute('hidden', true)
  const successAlert = document.querySelector('#success-alert')
  successAlert.setAttribute('hidden', true)

  const listing = parseUserListing()

  window.fetch('/api/listing', {
    method: 'POST',
    body: JSON.stringify(listing),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        errorAlert.removeAttribute('hidden')
        errorAlert.innerText = data
          .map((error) => {
            if (/duplicate listing/gi.test(error)) return 'It seems you created a similar listing - try to change title and template'
            if (error === 'MISSING_USER_LISTING_TEMPLATE') return 'Please select a template'
            if (error === 'MISSING_USER_LISTING_TITLE') return 'Please set a listing title'
            if (error === 'MISSING_USER_LISTING_DESCRIPTION') return 'Please set a listing description'
            if (error === 'TEMPLATE_ERROR') return 'Failed to compile template. Please verify your input'
            if (error === 'INVALID_USER_LISTING_IMAGE') return 'Please make sure the image urls are valid'
            return error
          }).join('\n')
        return
      }
      successAlert.removeAttribute('hidden')
      successAlert.innerHTML = `Listing created successfully!`
      getUserListings(data)
      $createListingForm.reset()
      $previewContent.innerHTML = ''
      return data
    })
    .catch((err) => {
      console.error(err)
    })
})

function getUserListings (lastCreated) {
  $userListings.setAttribute('hidden', true)
  $emptyUserListings.setAttribute('hidden', true)
  window.fetch('/api/listing')
    .then(res => res.json())
    .then(userListings => {
      window.userListings = userListings
      if (userListings.length > 0) {
        showUserListings(userListings, lastCreated, $userListings)
      } else {
        showEmptyListings($emptyUserListings)
      }
    })
    .catch(err => {
      console.error(err)
    })
}

function showUserListings (userListings, lastCreated, $userListings) {
  $userListings.removeAttribute('hidden')
  $userListings.innerHTML = `
  <h1 class="title mt-4">Your listing templates</h1>
  <table class="table table-hover">
    <thead>
      <tr>
      <th scope="col">Actions</th>
        <th scope="col">Title</th>
        <!--<th scope="col">Template</th>-->
        <th scope="col">Preview</th>
      </tr>
    </thead>

    <tbody>
      ${userListings.map((listing, i) => `
        <tr class="${(lastCreated && listing._id === lastCreated._id) ? 'table-warning' : ''}">
        <td>
          <div class="btn-group" role="group" aria-label="Actions">
            <button type="button" class="btn btn-sm btn-secondary" onclick="copyToClipboard('${listing._id}')">Copy HTML</button>
            <textarea id="text-${listing._id}" style="width:1px;height:1px;opacity:0">${listing.compiledTemplate}</textarea>
          </div>
        </td>
          <td scope="row">${listing.title}</td>
          <!--<td>${listing.template}</td>-->
          <td style="width: 500px; height: 300px"><object style="width: 500px;max-height: 300px;overflow: scroll;display: block;" type="text/html" data="/preview">${listing.compiledTemplate}</object></td>
        </tr>
      `).join('\n')}
    </tbody>
  </table>
  `
}

function copyToClipboard (listingId) {
  var copyText = document.querySelector(`#text-${listingId}`)
  copyText.select()
  document.execCommand('copy')
}

function showEmptyListings ($emptyUserListings) {
  $emptyUserListings.removeAttribute('hidden')
}

function parseUserListing () {
  const title = trim(document.querySelector('#listing-title').value)
  let description = trim(document.querySelector('#listing-description').value)
  description = description.split('\n').join('<br>')
  let image1 = trim(document.querySelector('#listing-image-1').value)
  console.log({ image1 })
  if (image1 && image1.includes('drive.google.com/file/d')) {
    const imageId = /\/d\/([^\\/]+)\/?/gi.exec(image1)[1]
    console.log({ imageId })
    if (imageId) image1 = `http://drive.google.com/uc?export=download&id=${imageId}`
  }
  console.log('after', { image1 })

  const brand = trim(document.querySelector('#listing-brand').value)
  const compatibility = trim(document.querySelector('#listing-compatibility').value)
  const material = trim(document.querySelector('#listing-material').value)
  const templateEl = document.querySelector('[name="template"]:checked')
  const template = +(templateEl && templateEl.value)
  const listing = {
    title,
    brand,
    compatibility,
    material,
    description,
    template,
    image1
  }
  return listing
}

function trim (str) {
  if (typeof str !== 'string') return ''
  return str.trim()
}
