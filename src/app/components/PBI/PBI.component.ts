import { Component, Input, OnInit } from '@angular/core';
declare const powerbi: any;

@Component({
  selector: 'app-PBI',
  templateUrl: './PBI.component.html',
  styleUrls: ['./PBI.component.scss']
})
export class PBIComponent implements OnInit {
  @Input() config: any;

  ngOnInit(): void {
    this.embedReport();
  }

  embedReport(): void {
    const embedContainer = document.getElementById('embedContainer');

    const config = {
      type: 'report',
      id: this.config.id,
      embedUrl: this.config.embedUrl,
      accessToken: this.config.embedToken.token,
      tokenType: 1,
      settings: {
        panes: {
          filters: {
            expanded: false,
            visible: false
          }
        },
      }
    };

    console.log("PBI COMPONENT CONFIG SET...");
    console.log(config);

    const report = powerbi.embed(embedContainer, config);

    report.off("loaded");

    report.on("loaded", () => {
      console.log("Report loaded");
    });

    report.off("error");

    report.on("error", (error: any) => {
      console.error(error);
    });
  }
}
