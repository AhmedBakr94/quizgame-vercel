// Firebase Configuration - ببياناتك الخاصة
const firebaseConfig = {
  apiKey: "AIzaSyDP67jLlaaXXPx6cKXVTP5v_ybELuP8hZE",
  authDomain: "quizgameapp-e753f.firebaseapp.com",
  databaseURL: "https://quizgameapp-e753f-default-rtdb.firebaseio.com",
  projectId: "quizgameapp-e753f",
  storageBucket: "quizgameapp-e753f.appspot.com",
  messagingSenderId: "916555134633",
  appId: "1:916555134633:web:dc6da3dd04084996bf1bb8",
  measurementId: "G-JQPRYC0SDW"
};

// AdMob Configuration - ببياناتك الخاصة
const admobConfig = {
  appId: "ca-app-pub-1749527081276279~5871964075",
  bannerId: "ca-app-pub-1749527081276279/9185642681",
  interstitialId: "ca-app-pub-1749527081276279/1234567890",
  rewardedId: "ca-app-pub-1749527081276279/0987654321"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();

// Initialize AdMob
function initAdMob() {
  if (typeof admob !== 'undefined') {
    admob.initAdmob(admobConfig.appId, admobConfig.bannerId);
    admob.setOptions({
      publisherId: admobConfig.appId,
      interstitialAdId: admobConfig.interstitialId,
      bannerAtTop: false,
      overlap: false,
      isTesting: false
    });
  }
}

export { db, auth, admobConfig, initAdMob };
