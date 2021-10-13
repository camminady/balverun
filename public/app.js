const firebaseConfig = {
  apiKey: 'AIzaSyAvHl1vRHgt1QvybKekpeYKqv2lC9csvn0',
  authDomain: 'balverun.firebaseapp.com',
  databaseURL:
    'https://balverun-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'balverun',
  storageBucket: 'balverun.appspot.com',
  messagingSenderId: '598052161895',
  appId: '1:598052161895:web:4b58b9880e39900613c7c2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const dbRef = firebase.database().ref();

const usersRef = dbRef.child('users');
const userListUI = document.getElementById('userList');

usersRef.on('child_added', (snap) => {
  let user = snap.val();

  let $li = document.createElement('li');
  $li.innerHTML = user.name;
  $li.setAttribute('child-key', snap.key);
  $li.addEventListener('click', userClicked);
  userListUI.append($li);
});

function userClicked(e) {
  var userID = e.target.getAttribute('child-key');

  const userRef = dbRef.child('users/' + userID);
  const userDetailUI = document.getElementById('userDetail');

  userDetailUI.innerHTML = '';

  userRef.on('child_added', (snap) => {
    var $p = document.createElement('p');
    $p.innerHTML = snap.key + ' - ' + snap.val();
    userDetailUI.append($p);
  });
}
