import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { EliteApi } from '../../shared/shared';
/**
 * Generated class for the StandingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  team: any;
  standings: any[];
  allStandings: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi) {
    this.team = this.navParams.data;
    let tournamentData = this.eliteApi.getCurrentTournament();
    this.standings = tournamentData.standings;
  }

  ionViewDidLoad() {
    this.allStandings = _.chain(this.standings)
                         .groupBy('division')
                         .toPairs()
                         .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
                         .value();
    console.log('Standings:', this.standings)
    console.log('Division Standings:', this.allStandings)
  }

}
