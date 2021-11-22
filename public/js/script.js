/**
 * Navbar scroll
 */
var offset = 86;
function scrollIntoView(selector, offset = 0) {
  window.scroll(0, document.querySelector(selector).offsetTop - offset);
}

$('.navbar a').click(function(event) {
    event.preventDefault();
    scrollIntoView($(this).attr('href'), offset);
});

/**
 * Create your boost
 * 
 * MODALITY:
 *  - 0: rank boosting
 *  - 1: win boosting
 *  - 2: tournament boosting
 *  - 3: placements
 *  - 4: seasonal reward wins
 * 
 * RANKS:
 * maps[0] < rank, price >
 * maps[1] < rank, price >
 * maps[2] < rank, price >
 * maps[3] < rank, price >
 * maps[4] < rank, price >
 * 
 * QUEUE:
 * - 0: 1v1 
 * - 1: 2v2
 * - 3: 3v3 +10%
 * 
 * PLATFORM:
 * - 0: pc
 * - 1: console
 * 
 * PLAY WITH BOOSTER:
 * - false: no
 * - true: yes +40%
 * - disabled for: desired rank >= gc2 or tournament ssl
 * 
 */
var username = "";
var modality = 0;
var maps = [];
maps[0] = new Map();
maps[1] = new Map();
maps[2] = new Map();
maps[3] = new Map();
maps[4] = new Map();
var queue = 0;
var platform = 0;
var playwithbooster = false;
var price = 0;
var adds = 0;

maps[0].set('0', 0); // Bronze 1
maps[0].set('1', 1); // Bronze 2
maps[0].set('2', 3); // Bronze 3
maps[0].set('3', 5); // Silver 1
maps[0].set('4', 8); // Silver 2
maps[0].set('5', 10); // Silver 3
maps[0].set('6', 15); // Gold 1
maps[0].set('7', 20); // Gold 2
maps[0].set('8', 25); // Gold 3
maps[0].set('9', 30); // Plat 1
maps[0].set('10', 40); // Plat 2
maps[0].set('11', 50); // Plat 3
maps[0].set('12', 65); // Diamond 1
maps[0].set('13', 80); // Diamond 2
maps[0].set('14', 100); // Diamond 3
maps[0].set('15', 125); // Champ 1
maps[0].set('16', 150); // Champ 2
maps[0].set('17', 180); // Champ 3
maps[0].set('18', 200); // GC 1
maps[0].set('19', 250); // GC 2
maps[0].set('20', 310); // GC 3
maps[0].set('21', 400); // SSL

maps[1].set('0', 1); // Bronze 1
maps[1].set('1', 1); // Bronze 2
maps[1].set('2', 1); // Bronze 3
maps[1].set('3', 2); // Silver 1
maps[1].set('4', 2); // Silver 2
maps[1].set('5', 2); // Silver 3
maps[1].set('6', 3); // Gold 1
maps[1].set('7', 3); // Gold 2
maps[1].set('8', 3); // Gold 3
maps[1].set('9', 4); // Plat 1
maps[1].set('10', 4); // Plat 2
maps[1].set('11', 4); // Plat 3
maps[1].set('12', 4); // Diamond 1
maps[1].set('13', 4); // Diamond 2
maps[1].set('14', 4); // Diamond 3
maps[1].set('15', 5); // Champ 1
maps[1].set('16', 5); // Champ 2
maps[1].set('17', 5); // Champ 3
maps[1].set('18', 6); // GC 1
maps[1].set('19', 6); // GC 2
maps[1].set('20', 8); // GC 3
maps[1].set('21', 10); // SSL

maps[2].set('0', 10); // Bronze 
maps[2].set('1', 14); // Silver 
maps[2].set('2', 20); // Gold 
maps[2].set('3', 25); // Plat 
maps[2].set('4', 30); // Diamond 
maps[2].set('5', 45); // Champ 
maps[2].set('6', 70); // GC 
maps[2].set('7', 100); // SSL

maps[3].set('0', 1); // Bronze 
maps[3].set('1', 2); // Silver 
maps[3].set('2', 2); // Gold 
maps[3].set('3', 3); // Plat 
maps[3].set('4', 3); // Diamond 
maps[3].set('5', 4); // Champ 1
maps[3].set('6', 4); // Champ 2
maps[3].set('7', 4); // Champ 3
maps[3].set('8', 6); // GC 1

maps[4].set('0', 1); // Bronze 1
maps[4].set('1', 1); // Bronze 2
maps[4].set('2', 1); // Bronze 3
maps[4].set('3', 2); // Silver 1
maps[4].set('4', 2); // Silver 2
maps[4].set('5', 2); // Silver 3
maps[4].set('6', 3); // Gold 1
maps[4].set('7', 3); // Gold 2
maps[4].set('8', 3); // Gold 3
maps[4].set('9', 4); // Plat 1
maps[4].set('10', 4); // Plat 2
maps[4].set('11', 4); // Plat 3
maps[4].set('12', 4); // Diamond 1
maps[4].set('13', 4); // Diamond 2
maps[4].set('14', 4); // Diamond 3
maps[4].set('15', 5); // Champ 1
maps[4].set('16', 5); // Champ 2
maps[4].set('17', 5); // Champ 3
maps[4].set('18', 6); // GC 1
maps[4].set('19', 6); // GC 2
maps[4].set('20', 8); // GC 3
maps[4].set('21', 10); // SSL

var selectMap = ['#rank', '#win', '#t', '#p', '#sr'];

//Create your boost: Modality 
function replace(target) {
  var options = document.getElementsByClassName('option');
  for (i = 0; i < options.length; i++) {
    options[i].style.display = "none";
  }
  var border = document.getElementsByClassName('card');
  for (i = 0; i < border.length; i++) {
    border[i].style.borderColor = "#323232";
    //border[i].style.backgroundColor = "#323232";
  }
  document.getElementById(target).style.display = "block";
  document.getElementById(target + 'card').style.borderWidth = "3px";
  document.getElementById(target + 'card').style.borderColor = "#14FFEC";
  //document.getElementById(target + 'card').style.backgroundColor = "#0D7377";
}
replace('rank'); // default

$('#rankcard').click(() => {
  replace('rank');
  modality = 0;
})

$('#wincard').click(() => {
  replace('win');
  modality = 1;
})

$('#tcard').click(() => {
  replace('t');
  modality = 2;
})

$('#pcard').click(() => {
  replace('p');
  modality = 3;
})

$('#srcard').click(() => {
  replace('sr');
  modality = 4;
}) 

// Create your boost: platform
/*function platform(target) {
  var options = document.getElementsByClassName('element');
  for (i = 0; i < options.length; i++) {
    options[i].style.borderColor = "#212121";
  }
  document.getElementById(target).style.borderWidth = "5px";
  document.getElementById(target).style.borderColor = "#14FFEC";
}
platform('pc');
*/

var options = document.getElementsByClassName('element');
for (i = 0; i < options.length; i++) {
  options[i].style.borderColor = "#212121";
}
document.getElementById('pc').style.borderWidth = "5px";
document.getElementById('pc').style.borderColor = "#14FFEC";

$('#pc').click(() => {
  var options = document.getElementsByClassName('element');
  for (i = 0; i < options.length; i++) {
    options[i].style.borderColor = "#212121";
  }
  document.getElementById('pc').style.borderWidth = "5px";
  document.getElementById('pc').style.borderColor = "#14FFEC";
  
  platform = 0;
})

$('#console').click(() => {
  var options = document.getElementsByClassName('element');
  for (i = 0; i < options.length; i++) {
    options[i].style.borderColor = "#212121";
  }
  document.getElementById('console').style.borderWidth = "5px";
  document.getElementById('console').style.borderColor = "#14FFEC";

  platform = 1;
})

function calculatePrice() {
  price = 0;
  adds = 0;

  if (modality == 0) { // Rank boosting
    // Current rank price
    var currentrank = maps[modality].get( $(selectMap[modality] + "1").find("option:selected").val().toString() );

    // Desired rank price
    var desiredrank = maps[modality].get( $(selectMap[modality] + "2").find("option:selected").val().toString() );

    // Check queue
    queue = $(selectMap[modality] + "3").find("option:selected").val();
    if (queue == 2) {
      adds += (desiredrank - currentrank) * 10 / 100;
      console.log("adds = " + adds);
    }
    price = (desiredrank - currentrank) + adds;
  }

  if (modality == 1 || modality == 3 || modality == 4) { // Win boosting / Placements / Seasonal Reward
    // Current rank price
    var currentrank = maps[modality].get( $(selectMap[modality] + "1").find("option:selected").val().toString() );

    // Number of wins
    currentrank *= $(selectMap[modality] + "2input").val();

    // Check queue
    queue = $(selectMap[modality] + "3").find("option:selected").val();
    if (queue == 2) {
      adds += currentrank * 10 / 100;
      console.log("adds = " + adds);
    }
    price = currentrank + adds;
  }
  
  if (modality == 2) { // Tournament boosting
    // Current rank price
    var currentrank = maps[modality].get( $(selectMap[modality] + "1").find("option:selected").val().toString() );

    // Check queue
    queue = $(selectMap[modality] + "2").find("option:selected").val();
    if (queue == 2) {
      adds += currentrank * 10 / 100;
      console.log("adds = " + adds);
    }
    price = currentrank + adds;
  }
  
  // Check "play with booster"
  playwithbooster = $("#pwb").is(":checked");

  // Price
  if (playwithbooster == true) {
    console.log("pwb = " + (price * 40 / 100))
    price += price * 40 / 100;
  }
  
  console.log(price);
  $("#price").text("€ " + price);
}

calculatePrice();

// Update checkout
$(".update").click(() => {
  calculatePrice();
})
$("select").on('change', () => {
  calculatePrice();
})

/**
 * Send checkout
 */
function checkout() {
  
  username = $('#username').val();

  if (modality == 0) {
    axios.post('/checkout', {
      "username": username,
      "modality": modality,
      "currentrank": $(selectMap[modality] + "1").find("option:selected").val(),
      "desiredrank": $(selectMap[modality] + "2").find("option:selected").val(),
      "queue": queue,
      "platform": platform,
      "playwithbooster": playwithbooster
    })
    .then((res) => {
      console.log(res);
    })
  }
  if (modality == 1 || modality == 3 || modality == 4) {
    axios.post('/checkout', {
      "username": username,
      "modality": modality,
      "currentrank": $(selectMap[modality] + "1").find("option:selected").val(),
      "numberofwins": $(selectMap[modality] + "2input").val(),
      "queue": queue,
      "platform": platform,
      "playwithbooster": playwithbooster
    })
    .then((res) => {
      console.log(res);
    })
  }
  if (modality == 2) {
    axios.post('/checkout', {
      "username": username,
      "modality": modality,
      "currentrank": $(selectMap[modality] + "1").find("option:selected").val(),
      "queue": queue,
      "platform": platform,
      "playwithbooster": playwithbooster
    })
    .then((res) => {
      console.log(res);
    })
  }

}

$('#checkoutbutton').click(() => {
  checkout();
})