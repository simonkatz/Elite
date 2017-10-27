import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    let selectedTournament = this.navParams.data;

    this.eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
      this.teams = data.teams;
    });
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
