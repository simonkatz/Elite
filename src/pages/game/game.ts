import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
    this.game = this.navParams.data;
  }

  ionViewDidLoad() {
  }

  teamTapped(teamId){
    let tournamentData = this.eliteApi.getCurrentTournament();
    let team = tournamentData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
