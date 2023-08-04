export * from './account.service';
import { AccountService } from './account.service';
export * from './admission.service';
import { AdmissionService } from './admission.service';
export * from './cache.service';
import { CacheService } from './cache.service';
export * from './careMember.service';
import { CareMemberService } from './careMember.service';
export * from './clinicalQualityMatrix.service';
import { ClinicalQualityMatrixService } from './clinicalQualityMatrix.service';
export * from './document.service';
import { DocumentService } from './document.service';
export * from './export.service';
import { ExportService } from './export.service';
export * from './hcc.service';
import { HccService } from './hcc.service';
export * from './notification.service';
import { NotificationService } from './notification.service';
export * from './pBIReport.service';
import { PBIReportService } from './pBIReport.service';
export * from './patient.service';
import { PatientService } from './patient.service';
export * from './paymentReport.service';
import { PaymentReportService } from './paymentReport.service';
export * from './practice.service';
import { PracticeService } from './practice.service';
export * from './role.service';
import { RoleService } from './role.service';
export * from './system.service';
import { SystemService } from './system.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './userRole.service';
import { UserRoleService } from './userRole.service';
export const APIS = [AccountService, AdmissionService, CacheService, CareMemberService, ClinicalQualityMatrixService, DocumentService, ExportService, HccService, NotificationService, PBIReportService, PatientService, PaymentReportService, PracticeService, RoleService, SystemService, UserService, UserRoleService];
