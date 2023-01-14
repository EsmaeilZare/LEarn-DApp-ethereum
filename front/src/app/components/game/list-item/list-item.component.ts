import { Component } from '@angular/core';
import { Game } from 'src/app/types';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  game1 : Game = {
    id : 1,
    details: {
      title : "Avalin Bazi",
      description : "In avali bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain",
      price : 100,
      numQuestions : 2,
      thumbnail : "https://d35aaqx5ub95lt.cloudfront.net/images/f2a2e608c854822ad2563a09595e7827.png"
    },

    stats : {
      numBuyers : 1,
      rating : 70,
      numRaters : 1,
    },

    questions : [],
    playerStats : {
      isCreator : true,
      isPurchased : false,
      highscore : 100,
      rating : 7
    }
  }

  game2 : Game = {
    id : 2,
    details: {
      title : "Dovomin Bazi",
      description : "In dovomin bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain",
      price : 30,
      numQuestions : 2,
      thumbnail : "https://pbs.twimg.com/media/EBX6u-xW4AAlhoR.jpg"
    },

    stats : {
      numBuyers : 1,
      rating : 50,
      numRaters : 1,
    },

    questions : [],
    playerStats : {
      isCreator : true,
      isPurchased : false,
      highscore : 100,
      rating : 7
    }
  }

  game3 : Game = {
    id : 3,
    details: {
      title : "Sevomin Bazi",
      description : "In sevomin bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain",
      price : 100,
      numQuestions : 2,
      thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Alex_Ferguson_02_%28cropped%29.jpg"
    },

    stats : {
      numBuyers : 1,
      rating : 5,
      numRaters : 1,
    },

    questions : [],
    playerStats : {
      isCreator : true,
      isPurchased : false,
      highscore : 100,
      rating : 7
    }
  }

  game4 : Game = {
    id : 3,
    details: {
      title : "Sevomin Bazi",
      description : "In sevomin bazie kirie maast b hamin soorati ke molaheze mikonid. binandegan va shenavandegane aziz. kir too blockchain",
      price : 100,
      numQuestions : 2,
      thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f5/Alex_Ferguson_02_%28cropped%29.jpg"
    },

    stats : {
      numBuyers : 1,
      rating : 5,
      numRaters : 1,
    },

    questions : [],
    playerStats : {
      isCreator : true,
      isPurchased : true,
      highscore : 100,
      rating : 7
    }
  }



  games : Game[] = [this.game1, this.game2, this.game3, this.game4]

}
