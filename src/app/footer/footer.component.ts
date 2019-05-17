import { Component, OnInit } from '@angular/core';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  referrer: string;
  constructor() {}

  ngOnInit() {
    library.add(faFacebookF);
    library.add(faTwitter);
    library.add(faLinkedinIn);
    library.add(faWhatsapp);
    library.add(faPrint);
    library.add(faGooglePlusG);
    library.add(faFacebookMessenger);
    this.referrer = sessionStorage.referrer;
  }
}
