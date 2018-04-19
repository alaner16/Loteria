import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { RecordPage } from '../record/record';
import { ConfigPage } from '../config/config';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = RecordPage;
  tab3Root = ConfigPage;

  constructor() {

  }
}
