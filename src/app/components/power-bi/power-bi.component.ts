import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-power-bi',
  templateUrl: './power-bi.component.html',
  styleUrls: ['./power-bi.component.scss']
})
export class PowerBIComponent {
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
