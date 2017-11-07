import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams, ToastController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';

import { EliteApi } from '../../shared/shared';
import { GamePage } from '../pages';

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  dateFilter: any;
  allGames: any[];
  team: any;
  games: any[];
  teamStanding: any;
  private tournamentData: any;
  useDateFilter = false;
  isFollowing = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController)
  {
    this.team = this.navParams.data;
    this.tournamentData = this.eliteApi.getCurrentTournament();
    this.teamStanding = _.find(this.tournamentData.standings, {"teamId": this.team.id });
  }

  ionViewDidLoad() {
    this.games = _.chain(this.tournamentData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();
      this.allGames = this.games;
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = (isTeam1 ? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    }

    gameClicked($event, game){
      let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
      this.navCtrl.parent.parent.push(GamePage, sourceGame);
    }

    dateChanged() {
      if (this.useDateFilter) {
        this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
      } else {
        this.games = this.allGames;
      }
    }

    getScoreWorL(game) {
      return game.scoreDisplay ? game.scoreDisplay[0] : '';
    }

    getScoreDisplayBadgeClass(game) {
      return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
    }

    toggleFollow() {
      if(this.isFollowing) {
        let confirm = this.alertCtrl.create({
          title: 'Unfollow?',
          message:  'Are you sure you want to unfollow?',
          buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              //TODO: Persist data here.

              let toast = this.toastCtrl.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            },
          },
          {
            text: 'No',
          }]
        });
        confirm.present();
      } else {
        this.isFollowing = true;
        //TODO: persist data here.
      }
    }
}
