import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  @Input() templateConfigUrl = '';
 templateConfig: any = {};
 ngOnInit() {
  if (this.templateConfigUrl) {
    fetch(this.templateConfigUrl)
    .then((response => response.json()))
    .then((data: any) => {
      console.log('JSON data:', data);
      this.templateConfig = data;
    })
  }
  
 }
}
