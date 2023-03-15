import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-profile-section',
  templateUrl: './patient-profile-section.component.html',
  styleUrls: ['./patient-profile-section.component.scss']
})
export class PatientProfileSectionComponent {
  profile: any = {
    id: 961,
    name: "Lixxxxxx ne",
    dateofBirth: "1957-10-22T00:00:00",
    age: 65,
    gender: "F",
    preferredTime: "",
    language: "-",
    status: "Written Consent (8/22/2019)",
    requiredTimeSlot: 0,
    appointmentType: "Dual",
    enrollmentNumber: "ZXDY06257796",
    address: " 10***** **** ***** Rd ***** **** *****, Brownsville, Tennessee 38012",
    payerName: null,
    memberId: "ZXDY06257796",
    email: "*****@*******",
    state: [
      "1240"
    ],
    zipcode: "38012",
    timeZone: "US/Central",
    lat: 35.6074339,
    lng: -89.2847251,
    eligibilityEndDate: "2021-12-31T00:00:00",
    addressType: "Home",
    clientName: "BCBSTN",
    clientId: 4584,
    lineOfBusinessId: 2,
    enableCareTeamMapping: false,
    isCentralTeamOutReachMode: false,
    phoneNumber: 584672294439,
    npEligibilityStatus: ""
  }
}
