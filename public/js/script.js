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
 *  - 3: seasonal reward wins
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
var queue = 0;
var platform = 0;
var playwithbooster = false;
var price = 0;
var adds = 0;

maps[0].set('0', 0); // Bronze 1
maps[0].set('1', 1); // Bronze 2
maps[0].set('2', 3); // Bronze 3
maps[0].set('3', 5); // Silver 1
maps[0].set('4', 7); // Silver 2
maps[0].set('5', 9); // Silver 3
maps[0].set('6', 11); // Gold 1
maps[0].set('7', 13); // Gold 2
maps[0].set('8', 15); // Gold 3
maps[0].set('9', 17); // Plat 1
maps[0].set('10', 20); // Plat 2
maps[0].set('11', 23); // Plat 3
maps[0].set('12', 25); // Diamond 1
maps[0].set('13', 28); // Diamond 2
maps[0].set('14', 30); // Diamond 3
maps[0].set('15', 35); // Champ 1
maps[0].set('16', 40); // Champ 2
maps[0].set('17', 45); // Champ 3
maps[0].set('18', 55); // GC 1
maps[0].set('19', 65); // GC 2
maps[0].set('20', 80); // GC 3
maps[0].set('21', 115); // SSL

maps[1].set('0', 1); // Bronze 1
maps[1].set('1', 1); // Bronze 2
maps[1].set('2', 1); // Bronze 3
maps[1].set('3', 1); // Silver 1
maps[1].set('4', 1); // Silver 2
maps[1].set('5', 1); // Silver 3
maps[1].set('6', 1); // Gold 1
maps[1].set('7', 1); // Gold 2
maps[1].set('8', 1); // Gold 3
maps[1].set('9', 1); // Plat 1
maps[1].set('10', 1); // Plat 2
maps[1].set('11', 1); // Plat 3
maps[1].set('12', 1); // Diamond 1
maps[1].set('13', 1); // Diamond 2
maps[1].set('14', 1); // Diamond 3
maps[1].set('15', 1); // Champ 1
maps[1].set('16', 2); // Champ 2
maps[1].set('17', 2); // Champ 3
maps[1].set('18', 2); // GC 1
maps[1].set('19', 2); // GC 2
maps[1].set('20', 2); // GC 3
maps[1].set('21', 3); // SSL

maps[2].set('0', 5); // Bronze 
maps[2].set('1', 5); // Silver 
maps[2].set('2', 5); // Gold 
maps[2].set('3', 7); // Plat 
maps[2].set('4', 10); // Diamond 
maps[2].set('5', 15); // Champ 
maps[2].set('6', 20); // GC 
maps[2].set('7', 50); // SSL

maps[3].set('0', 10); // Bronze
maps[3].set('1', 10); // Silver
maps[3].set('2', 10); // Gold
maps[3].set('3', 10); // Plat
maps[3].set('4', 10); // Diamond
maps[3].set('5', 10); // Champ
maps[3].set('6', 20); // GC
maps[3].set('7', 30); // SSL

var selectMap = ['#rank', '#win', '#t', '#sr'];

function checkQueue(target) {
  if (target == 'rank') {
    if ( $('#rank3').find('option:selected').val() == 0 ) {
      $("#pwb").prop('checked', false);
      $("#pwb").attr('disabled', true);
    } else {
      $("#pwb").removeAttr('disabled');
    }
  }
  if (target == 'win') {
    if ( $('#win3').find('option:selected').val() == 0 ) {
      $("#pwb").prop('checked', false);
      $("#pwb").attr('disabled', true);
    } else {
      $("#pwb").removeAttr('disabled');
    }
  }
  if (target == 't') {
    if ( $('#t2').find('option:selected').val() == 0 ) {
      $("#pwb").prop('checked', false);
      $("#pwb").attr('disabled', true);
    } else {
      $("#pwb").removeAttr('disabled');
    }
  }
  if (target == 'sr') {
    if ( $('#sr3').find('option:selected').val() == 0 ) {
      $("#pwb").prop('checked', false);
      $("#pwb").attr('disabled', true);
    } else {
      $("#pwb").removeAttr('disabled');
    }
  }
}

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

  checkQueue(target);
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

$('#srcard').click(() => {
  replace('sr');
  modality = 3;
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

  if (modality == 1) { // Win boosting / Placements / Seasonal Reward
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
  
  if (modality == 2 || modality == 3) { // Tournament boosting
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
  if (playwithbooster == true && queue != 0) {
    console.log("pwb = " + (price * 50 / 100))
    price += price * 50 / 100;
  }
  
  (Math.round(price * 100) / 100).toFixed(2); // 2 dec format
  console.log(price);
  $("#price").text("€ " + price);
}

calculatePrice();

// Update checkout
$(".update").click(() => {
  calculatePrice();
})

$(".currentrank").on('change', (event) => {
  if (modality == 0) {
    var currentrank = parseInt( $("#rank1").find("option:selected").val() );
    var desiredrank = parseInt( $("#rank2").find("option:selected").val() );
    
    console.log(currentrank, desiredrank)

    if (desiredrank <= currentrank) {
      $('#rank2 option')
      .removeAttr('selected')
      .filter('[value=' + (currentrank + 1) +']')
      .attr('selected', true);
    }
  }
  calculatePrice();
})
$(".desiredrank").on('change', (event) => {
  if (modality == 0) {
    var currentrank = parseInt( $("#rank1").find("option:selected").val() );
    var desiredrank = parseInt( $("#rank2").find("option:selected").val() );
    
    console.log(currentrank, desiredrank)

    if (desiredrank <= currentrank) {
      $('#rank1 option')
      .removeAttr('selected')
      .filter('[value=' + (desiredrank - 1) +']')
      .attr('selected', true);
    }
  }
  calculatePrice();
})

// Check when queue is 1v1
$(".queue").on('change', (event) => {
  if (event.target.value == 0) {
    $("#pwb").prop('checked', false);
    $("#pwb").attr('disabled', true);
  } else {
    $("#pwb").removeAttr('disabled');
  }
  calculatePrice()
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
  if (modality == 1) {
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
  if (modality == 2 || modality == 3) {
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

$('#directmessage').click(() => {
  var username = $('#name').val();
  var message = $('#message').val();
  axios.post('/message', {
    "username": username,
    "message": message
  })
  .then((res) => {
    console.log(res);
  })
})