import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-PBI',
  templateUrl: './PBI.component.html',
  styleUrls: ['./PBI.component.scss']
})
export class PBIComponent {
  embedConfig!: any;
  @Input() config: any;

  ngOnInit(): void {
    this.embedConfig = {
      type: 'report',
      id: this.config.id,
      embedUrl: this.config.embedUrl,
      accessToken: this.config.embedToken.token,
      // tokenType: models.TokenType.Embed,
      hostname: 'https://app.powerbi.com',
      settings: {
        panes: {
          filters: {
            expanded: false,
            visible: false,
          },
        },
        // background: models.BackgroundType.Transparent,
      },
    };
  }
}
