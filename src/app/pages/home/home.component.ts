import { Component, OnInit } from '@angular/core';
import { faGithub, faTwitter, faCodepen} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faGithub = faGithub;
  faCodepen = faCodepen;
  faTwitter = faTwitter;

  constructor() { }

  ngOnInit() {
  }

}
