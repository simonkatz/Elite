import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

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
  private allTeams: any;
  private allTeamDivisions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApi: EliteApi, private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTournament = this.navParams.data;
    let loader = this.loadingController.create({
      content: "Getting data..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTournament.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
          _.chain(data.teams)
           .groupBy('division')
           .toPairs()
           .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
           .value();
        this.teams = this.allTeamDivisions;
      });

      loader.dismiss();
    });
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
