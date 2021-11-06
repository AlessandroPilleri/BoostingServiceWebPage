class Checkout {

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
            ['4', 8],
            ['5', 10],
            ['6', 15],
            ['7', 20],
            ['8', 25],
            ['9', 30],
            ['10', 40],
            ['11', 50],
            ['12', 65],
            ['13', 80],
            ['14', 100],
            ['15', 125],
            ['16', 150],
            ['17', 180],
            ['18', 200],
            ['19', 250],
            ['20', 310],
            ['21', 400]
        ]);
        this.maps[1] = new Map([
            ['0', 1],
            ['1', 1],
            ['2', 1],
            ['3', 2],
            ['4', 2],
            ['5', 2],
            ['6', 3],
            ['7', 3],
            ['8', 3],
            ['9', 4],
            ['10', 4],
            ['11', 4],
            ['12', 4],
            ['13', 4],
            ['14', 4],
            ['15', 5],
            ['16', 5],
            ['17', 5],
            ['18', 6],
            ['19', 6],
            ['20', 8],
            ['21', 10]
        ]);
        this.maps[2] = new Map([
            ['0', 10],
            ['1', 14],
            ['2', 20],
            ['3', 25],
            ['4', 30],
            ['5', 45],
            ['6', 70],
            ['7', 100]
        ]);
        this.maps[3] = new Map([
            ['0', 1],
            ['1', 2],
            ['2', 2],
            ['3', 3],
            ['4', 3],
            ['5', 4],
            ['6', 4],
            ['7', 4],
            ['8', 6]
        ]);
        this.maps[4] = new Map([
            ['0', 1], // Bronze 1
            ['1', 1], // Bronze 2
            ['2', 1], // Bronze 3
            ['3', 2], // Silver 1
            ['4', 2], // Silver 2
            ['5', 2], // Silver 3
            ['6', 3], // Gold 1
            ['7', 3], // Gold 2
            ['8', 3], // Gold 3
            ['9', 4], // Plat 1
            ['10', 4], // Plat 2
            ['11', 4], // Plat 3
            ['12', 4], // Diamond 1
            ['13', 4], // Diamond 2
            ['14', 4], // Diamond 3
            ['15', 5], // Champ 1
            ['16', 5], // Champ 2
            ['17', 5], // Champ 3
            ['18', 6], // GC 1
            ['19', 6], // GC 2
            ['20', 8], // GC 3
            ['21', 10], // SSL
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
      
        if (json.modality == 1 || json.modality == 3 || json.modality == 4) { // Win boosting / Placements / Seasonal Reward
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
          console.log("pwb = " + (price * 40 / 100))
          price += price * 40 / 100;
        }
        
        console.log(price);
        return price;
      }
    
}

module.exports = Checkout;