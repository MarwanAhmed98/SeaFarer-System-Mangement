
import { IEmployee } from './../../../shared/interfaces/iemployee';
import { SearchMobilePipe } from './../../../shared/pipes/SearcMobile/search-mobile.pipe';
import { Component, inject, OnInit } from '@angular/core';
import { AllSeaFarersService } from '../../../core/services/AllSeaFarers/all-sea-farers.service';
import { ISeaFarer } from '../../../shared/interfaces/isea-farer';
import { SearchPipe } from '../../../shared/pipes/Search/search.pipe';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddSeaFarerService } from '../../../core/services/AddSeaFarer/add-sea-farer.service';
import { ActiveService } from '../../../core/services/Active/active.service';
import { CommonModule, NgClass } from '@angular/common';
import { EmployeeIdService } from '../../../core/services/EmployeeId/employee-id.service';
import { VisaIdService } from '../../../core/services/VisaId/visa-id.service';
import { IVisa } from '../../../shared/interfaces/ivisa';
import { NavbarComponent } from "../../../layouts/Navbar/navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [FormsModule, ReactiveFormsModule, NgClass, CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly allSeaFarersService = inject(AllSeaFarersService);
  private readonly addSeaFarerService = inject(AddSeaFarerService);
  private readonly activeService = inject(ActiveService);
  private readonly employeeIdService = inject(EmployeeIdService);
  private readonly visaIdService = inject(VisaIdService);

  SeaList: ISeaFarer[] = [];
  EmployeeList: IEmployee[] = [];
  VisaList: IVisa[] = [];
  isUpdateMode: boolean = false;
  currentSeafarerId: number | null = null;
  text: string = "";
  text2: string = "";
  successMessage: string | null = null;
  errorMessage: string | null = null;
  currentPage: number = 1;
  pageSize: number = 10; 
  totalPages: number = 1;
  maxVisiblePages: number = 5;

  ProfileForm: FormGroup = new FormGroup({
    entity: new FormGroup({
      Id: new FormControl(null),
      EmpId: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/)]),
      VisaSponsorId: new FormControl(null, Validators.required),
      Nationality: new FormControl(null),
      BirthDate: new FormControl(null),
      PlaceOfBirth: new FormControl(null),
      Religion: new FormControl(null),
      MaritalStatus: new FormControl(null),
      NameOfSpouse: new FormControl(null),
      NoOfChildren: new FormControl(0, [Validators.min(0)]),
      BodyWeight: new FormControl(0, [Validators.min(0)]),
      Height: new FormControl(0, [Validators.min(0)]),
      NearestAirport: new FormControl(null),
      Remarks: new FormControl(null, Validators.maxLength(200)),
      HireDate: new FormControl(null),
      PassportNumber: new FormControl(null),
      PassPortIssueDate: new FormControl(null),
      PassPortExpiryDate: new FormControl(null),
      Rank: new FormControl(null),
      VisaUAEIdNO: new FormControl(null),
      VisaIssueDate: new FormControl(null, Validators.required),
      VisaExpiryDate: new FormControl(null, Validators.required),
      ResidenceNumber: new FormControl(null),
      HealthInsuranceExpiryDate: new FormControl(null),
      Email: new FormControl(null, Validators.email),
      PermanentAddressHomeCountry: new FormControl(null),
      ContactNumberHomeCountry: new FormControl(null),
      ContactNameAndNumberDuringEmergenciesUAE: new FormControl(null),
      ContactNameAndNumberDuringEmergenciesHome: new FormControl(null),
      SeamanBookNO: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      SeamanIssueDate: new FormControl(null),
      SeamanExpiryDate: new FormControl(null),
      CicpaNO: new FormControl(null),
      CicpaIssueDate: new FormControl(null),
      CicpaExpiryDate: new FormControl(null),
      Declaration: new FormControl(null, Validators.maxLength(500)),
      SignedOffFromAShipDueToMedicalReason: new FormControl(false),
      SignedOffFromAShipDueToMedicalReasonComment: new FormControl(null),
      UndergoneAnyMdicalOperation: new FormControl(null),
      UndergoneAnyMdicalOperationComment: new FormControl(null),
      DoctorConsultation: new FormControl(null),
      DoctorConsultationComment: new FormControl(null),
      HealthOrDisabilityProblem: new FormControl(null),
      HealthOrDisabilityProblemComment: new FormControl(null),
      InquiryOrInvolvedMaritimeAccident: new FormControl(false),
      InquiryOrInvolvedMaritimeAccidentComment: new FormControl(null),
      LicenseSuspendedOrRevoked: new FormControl(null),
      LicenseSuspendedOrRevokedComment: new FormControl(null),
    }),
    Qualifications: new FormArray([], Validators.required),
    Certificates: new FormArray([], Validators.required),
    Languages: new FormArray([], Validators.required),
    References: new FormArray([], Validators.required),
    WorkExperiences: new FormArray([], Validators.required),
  });

  ngOnInit(): void {
    this.getSeaFarers();
    this.getId();
    this.getVisa();
  }

  getSeaFarers() {
    this.allSeaFarersService.getAllSeaFarers().subscribe({
      next: (res) => {
        this.SeaList = res.Data;
        this.updatePagination();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load seafarers. Please try again.';
        this.resetMessages();
      }
    });
  }

  getId() {
    this.employeeIdService.getEmployeeId().subscribe({
      next: (res: any[]) => {
        this.EmployeeList = res.slice(0, 100);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load employee IDs. Please try again.';
        this.resetMessages();
      },
    });
  }

  getVisa() {
    this.visaIdService.getVisaId().subscribe({
      next: (res: any[]) => {
        this.VisaList = res.slice(0, 100);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load visa IDs. Please try again.';
        this.resetMessages();
      },
    });
  }

  addQualification() {
    const qualification = new FormGroup({
      DegreeOrCourse: new FormControl(null, Validators.required),
      CourseIssueDate: new FormControl(null, Validators.required),
      ExpiryDate: new FormControl(null, Validators.required),
      MajorOrSubject: new FormControl(null, Validators.required),
      University: new FormControl(null, Validators.required),
      Country: new FormControl(null, Validators.required),
      Type: new FormControl(null, Validators.required),
    });
    (this.ProfileForm.get('Qualifications') as FormArray).push(qualification);
  }

  editFarer(item: ISeaFarer) {
    this.isUpdateMode = true;
    this.currentSeafarerId = item.Id || item.EmpId;
    this.ProfileForm.patchValue({
      entity: {
        Id: item.Id,
        EmpId: item.EmpId,
        VisaSponsorId: item.VisaSponsorId,
        Nationality: item.Nationality,
        BirthDate: item.BirthDate,
        PlaceOfBirth: item.BirthPlace,
        Religion: item.Religion,
        MaritalStatus: item.MaritalStatus,
        NameOfSpouse: item.NameOfSpouse,
        NoOfChildren: item.NoOfChildren,
        BodyWeight: item.BodyWeight,
        Height: item.Height,
        NearestAirport: item.NearestAirport,
        Remarks: item.Remarks,
        PassportNumber: item.PassportNumber,
        PassPortIssueDate: item.PassPortIssueDate,
        PassPortExpiryDate: item.PassportExpireDate,
        VisaUAEIdNO: item.VisaUAEIdNO,
        VisaIssueDate: item.VisaIssueDate,
        VisaExpiryDate: item.VisaExpiryDate,
        ResidenceNumber: item.ResidenceNumber,
        Email: item.Email,
        PermanentAddressHomeCountry: item.PermanentAddressHomeCountry,
        ContactNumberHomeCountry: item.ContactNumberHomeCountry,
        ContactNameAndNumberDuringEmergenciesUAE: item.ContactNameAndNumberDuringEmergenciesUAE,
        ContactNameAndNumberDuringEmergenciesHome: item.ContactNameAndNumberDuringEmergenciesHome,
        SeamanBookNO: item.SeamanBookNO,
        SeamanIssueDate: item.SeamanIssueDate,
        SeamanExpiryDate: item.SeamanExpiryDate,
        CicpaNO: item.CicpaNO,
        CicpaIssueDate: item.CicpaIssueDate,
        CicpaExpiryDate: item.CicpaExpiryDate,
        Declaration: item.Declaration,
        SignedOffFromAShipDueToMedicalReason: item.SignedOffFromAShipDueToMedicalReason,
        SignedOffFromAShipDueToMedicalReasonComment: item.SignedOffFromAShipDueToMedicalReasonComment,
        UndergoneAnyMdicalOperation: item.UndergoneAnyMdicalOperation,
        UndergoneAnyMdicalOperationComment: item.UndergoneAnyMdicalOperationComment,
        DoctorConsultation: item.DoctorConsultation,
        DoctorConsultationComment: item.DoctorConsultationComment,
        HealthOrDisabilityProblem: item.HealthOrDisabilityProblem,
        HealthOrDisabilityProblemComment: item.HealthOrDisabilityProblemComment,
        InquiryOrInvolvedMaritimeAccident: item.InquiryOrInvolvedMaritimeAccident,
        InquiryOrInvolvedMaritimeAccidentComment: item.InquiryOrInvolvedMaritimeAccidentComment,
        LicenseSuspendedOrRevoked: item.LicenseSuspendedOrRevoked,
        LicenseSuspendedOrRevokedComment: item.LicenseSuspendedOrRevokedComment,
      }
    });
  }

  SubmitForm(): void {
    const data = {
      ...this.ProfileForm.value,
      entity: {
        ...this.ProfileForm.value.entity,
        Id: this.currentSeafarerId || 0
      }
    };
    this.addSeaFarerService.AddFarer(data).subscribe({
      next: (res) => {
        this.successMessage = 'Seafarer added successfully!';
        this.isUpdateMode = false;
        this.currentSeafarerId = null;
        this.ProfileForm.reset();
        this.currentPage = 1;
        this.getSeaFarers();
        this.resetMessages();
      },
      error: (err) => {
        this.errorMessage = 'Failed to add seafarer. Please try again.';
        this.resetMessages();
      }
    });
  }

  UpdateFarer(): void {
    if (!this.currentSeafarerId) {
      this.errorMessage = 'No seafarer selected for update.';
      this.resetMessages();
      return;
    }
    const data = {
      ...this.ProfileForm.value,
      entity: {
        ...this.ProfileForm.value.entity,
        Id: this.currentSeafarerId
      }
    };
    this.addSeaFarerService.AddFarer(data).subscribe({
      next: (res) => {
        this.successMessage = 'Seafarer updated successfully!';
        this.isUpdateMode = false;
        this.currentSeafarerId = null;
        this.ProfileForm.reset();
        this.currentPage = 1;
        this.getSeaFarers();
        this.resetMessages();
      },
      error: (err) => {
        this.errorMessage = 'Failed to update seafarer. Please try again.';
        this.resetMessages();
      }
    });
  }

  toggleSeaFarer(item: ISeaFarer) {
    const newStatus = item.Status === 1 ? 2 : 1;
    this.activeService.ActivateSeaFarer(item.Id, newStatus, item.EmpId).subscribe({
      next: (res) => {
        if (res.Result) {
          item.Status = newStatus;
          this.successMessage = `Seafarer status ${newStatus === 1 ? 'activated' : 'deactivated'} successfully!`;
          this.resetMessages();
        } else {
          this.errorMessage = res.ErrorMessage || 'Failed to update status.';
          this.resetMessages();
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to update seafarer status. Please try again.';
        this.resetMessages();
      }
    });
  }

  resetMessages() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000);
  }
  updatePagination(filteredList?: ISeaFarer[]) {
    const list = filteredList || this.SeaList;
    this.totalPages = Math.ceil(list.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages || 1);
  }

  getPaginatedSeaFarers(): ISeaFarer[] {
    const filteredList = new SearchPipe().transform(
      new SearchMobilePipe().transform(this.SeaList, this.text2),
      this.text
    );
    this.updatePagination(filteredList);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filteredList.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

    if (end - start < this.maxVisiblePages - 1) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}

