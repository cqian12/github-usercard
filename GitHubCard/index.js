import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/cqian12')
//.then(res => console.log(res.data.login))
.catch(err => console.log(err.message))
//.finally(() => console.log('done'))
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/


/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

let cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/cqian12')
  .then(res => {
    let myCard = createCard(res.data)
    cards.appendChild(myCard)

    axios.get(`${res.data.followers_url}`)
      .then (response => {
        let followers = response.data
        followers.forEach((follower) => {
          axios.get(`https://api.github.com/users/${follower.login}`)
            .then (res => {
              cards.appendChild(createCard(res.data))
            })
            .catch(err => console.log(err.message))
        })
      })
      .catch(err => console.log(err.message))
    })
  .catch(err => console.log(err.message))

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// const followersArray = ['Jie-chelchel','rkshockey','Raj-04','tetondan','dustinmyers','justsml','luishrd','bigknell'];

// followersArray.forEach((user) => {
//   axios.get(`https://api.github.com/users/${user}`)
//   .then (res => {
//     cards.appendChild(createCard(res.data))
//   })
// })
// .catch(err => console.log(err.message))

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function createCard (user) {
  //elements
  let card = document.createElement('div')
  let pic = document.createElement('img')
  let cardInfo = document.createElement('div')
  let name = document.createElement('h3')
  let username = document.createElement('p')
  let location = document.createElement('p')
  let profile = document.createElement('p')
  let htmlU = document.createElement('a')
  let followers = document.createElement('p')
  let following = document.createElement('p')
  let bio = document.createElement('p')

  //class names
  card.classList.add('card')
  cardInfo.classList.add('card-info')
  name.classList.add('name')
  username.classList.add('username')
  
  //modifications to elements
  pic.src = user.avatar_url
  name.textContent = user.name
  username.textContent = user.login
  location.textContent = `Location: ${user.location}`
  profile.textContent = "Profile: "
  htmlU.href = user.html_url
  htmlU.textContent = user.html_url
  followers.textContent = `Followers: ${user.followers}`
  following.textContent = `Following: ${user.following}`
  bio.textContent = `Bio: ${user.bio}`

  //appends for various elements
  card.appendChild(pic)
  card.appendChild(cardInfo)

  cardInfo.appendChild(name)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)
  profile.appendChild(htmlU)

  //returns completed card
  return card
}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
