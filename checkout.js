class Checkout {

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
     * 
     */
    constructor() {
        this.modality = 0;
        this.parseModality = new Map([
            [0, 'Rank Boosting'],
            [1, 'Win Boosting'],
            [2, 'Tournament Boosting'],
            [3, 'Placements'],
            [4, 'Seasonal Reward Wins']
        ])
        this.maps = [];
        this.maps[0] = new Map([
            ['0', 0], 
            ['1', 1],
            ['2', 3],
            ['3', 5],
            ['4', 7],
            ['5', 9],
            ['6', 11],
            ['7', 13],
            ['8', 15],
            ['9', 17],
            ['10', 20],
            ['11', 23],
            ['12', 25],
            ['13', 28],
            ['14', 30],
            ['15', 35],
            ['16', 40],
            ['17', 45],
            ['18', 55],
            ['19', 65],
            ['20', 80],
            ['21', 115]
        ]);
        this.maps[1] = new Map([
            ['0', 1],
            ['1', 1],
            ['2', 1],
            ['3', 1],
            ['4', 1],
            ['5', 1],
            ['6', 1],
            ['7', 1],
            ['8', 1],
            ['9', 1],
            ['10', 1],
            ['11', 1],
            ['12', 1],
            ['13', 1],
            ['14', 1],
            ['15', 1],
            ['16', 2],
            ['17', 2],
            ['18', 2],
            ['19', 2],
            ['20', 2],
            ['21', 3]
        ]);
        this.maps[2] = new Map([
            ['0', 5],
            ['1', 5],
            ['2', 5],
            ['3', 7],
            ['4', 10],
            ['5', 15],
            ['6', 20],
            ['7', 50]
        ]);
        this.maps[3] = new Map([
            ['0', 10],
            ['1', 10],
            ['2', 10],
            ['3', 10],
            ['4', 10],
            ['5', 10],
            ['6', 20],
            ['7', 30]
        ]);
        this.parseMaps = []
        this.parseMaps[0] = [
            'Bronze I',
            'Bronze II',
            'Bronze III',
            'Silver I',
            'Silver II',
            'Silver III',
            'Gold I',
            'Gold II',
            'Gold III',
            'Platinum I',
            'Platinum II',
            'Platinum III',
            'Diamond I',
            'Diamond II',
            'Diamond III',
            'Champion I',
            'Champion II',
            'Champion III',
            'Grand Champion I',
            'Grand Champion II',
            'Grand Champion III',
        ]
        this.parseMaps[1] = [
            'Bronze II',
            'Bronze III',
            'Silver I',
            'Silver II',
            'Silver III',
            'Gold I',
            'Gold II',
            'Gold III',
            'Platinum I',
            'Platinum II',
            'Platinum III',
            'Diamond I',
            'Diamond II',
            'Diamond III',
            'Champion I',
            'Champion II',
            'Champion III',
            'Grand Champion I',
            'Grand Champion II',
            'Grand Champion III',
            'Supersonic Legends'
        ]
        this.parseMaps[2] = [
            'Bronze',
            'Silver',
            'Gold',
            'Platinum',
            'Diamond',
            'Champion',
            'Grand Champion',
            'Supersonic Legends'
        ]
        this.parseMaps[3] = [
            'Bronze',
            'Silver',
            'Gold',
            'Platinum',
            'Diamond',
            'Champion I',
            'Champion II',
            'Champion III',
            'Grand Champion I'
        ]
        this.parseMaps[4] = [
            'Bronze I',
            'Bronze II',
            'Bronze III',
            'Silver I',
            'Silver II',
            'Silver III',
            'Gold I',
            'Gold II',
            'Gold III',
            'Platinum I',
            'Platinum II',
            'Platinum III',
            'Diamond I',
            'Diamond II',
            'Diamond III',
            'Champion I',
            'Champion II',
            'Champion III',
            'Grand Champion I',
            'Grand Champion II',
            'Grand Champion III',
            'Supersonic Legend'
        ]
        this.queue = 0;
        this.parseQueue = [
            '1v1',
            '2v2',
            '3v3'
        ]
        this.platform = 0;
        this.parsePlatform = new Map([
            [0, 'PC'],
            [1, 'Console']
        ])
        this.playwithbooster = false;
    }

    parseMessage(json) {
        var message = "```";
        message += "Username: " + json.username;
        message += "\nModalità: " + this.parseModality.get(json.modality);
        message += "\nRank attuale: " + this.parseMaps[json.modality][json.currentrank];
        message += "\nRank desiderato: " + this.parseMaps[json.modality][json.desiredrank];
        message += "\nNumero di vittorie: " + json.numberofwins
        message += "\nCoda: " + this.parseQueue[json.queue];
        message += "\nPiattaforma: " + this.parsePlatform.get(json.platform);
        message += "\nGioca col booster: " + json.playwithbooster;
        message += "\nPRICE: €" + this.calculatePrice(json);
        message += "```";
        return message;
    }

    calculatePrice(json) {
        var price = 0;
        var adds = 0;
      
        if (json.modality == 0) { // Rank boosting
          // Current rank price
          var currentrank = this.maps[json.modality].get(json.currentrank);
      
          // Desired rank price
          var desiredrank = this.maps[json.modality].get(json.desiredrank);
      
          // Check queue
          if (json.queue == 2) {
            adds += (desiredrank - currentrank) * 10 / 100;
            console.log("adds = " + adds);
          }
          price = (desiredrank - currentrank) + adds;
        }
      
        if (json.modality == 1 || json.modality == 3) { // Win boosting  / Seasonal Reward
          // Current rank price
          var currentrank = this.maps[json.modality].get(json.currentrank);
      
          // Number of wins
          currentrank *= json.numberofwins;
      
          // Check queue
          if (json.queue == 2) {
            adds += currentrank * 10 / 100;
            console.log("adds = " + adds);
          }
          price = currentrank + adds;
        }
        
        if (json.modality == 2) { // Tournament boosting
          // Current rank price
          var currentrank = this.maps[json.modality].get(json.currentrank);
      
          // Check queue
          if (json.queue == 2) {
            adds += currentrank * 10 / 100;
            console.log("adds = " + adds);
          }
          price = currentrank + adds;
        }
        
        // Price
        if (json.playwithbooster == true) {
          console.log("pwb = " + (price * 50 / 100))
          price += price * 50 / 100;
        }
        
        console.log(price);
        return price;
      }
    
}

module.exports = Checkout;