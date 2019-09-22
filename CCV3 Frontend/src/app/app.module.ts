import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Routes,RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective,FileUploadModule  } from 'ng2-file-upload';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { GenericService } from './generic.service';
import { AuthService } from './auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { NavComponent } from './header/nav/nav.component';
import { AlertComponent } from './content/alert/alert.component';
import { AlertWidthDirective } from './content/directives/alert-width.directive';
import { CseComponent } from './content/subjects/BTech/cse/cse.component';
import { EceComponent } from './content/subjects/BTech/ece/ece.component';
import { HomeComponent } from './content/home/home.component';
import { HeadingsDirective } from './content/directives/headings.directive';
import { NotFoundComponent } from './content/not-found/not-found.component';
import { CseYear1Component } from './content/subjects/BTech/cse/cse-year1/cse-year1.component';
import { CseYear2Component } from './content/subjects/BTech/cse/cse-year2/cse-year2.component';
import { CseYear3Component } from './content/subjects/BTech/cse/cse-year3/cse-year3.component';
import { CseYear4Component } from './content/subjects/BTech/cse/cse-year4/cse-year4.component';
import { EceYear1Component } from './content/subjects/BTech/ece/ece-year1/ece-year1.component';
import { EceYear2Component } from './content/subjects/BTech/ece/ece-year2/ece-year2.component';
import { EceYear3Component } from './content/subjects/BTech/ece/ece-year3/ece-year3.component';
import { EceYear4Component } from './content/subjects/BTech/ece/ece-year4/ece-year4.component';
import { NotesTemplateComponent } from './content/subjects/notes-template/notes-template.component';
import { NotesTemplateDirective } from './content/directives/notes-template.directive';
import { PdfViewComponent } from './content/subjects/pdf-view/pdf-view.component';
import { SignupComponent } from './content/user/signup/signup.component';
import { LoginComponent } from './content/user/login/login.component';
import { SubjectComponentComponent } from './content/subjects/subject-component/subject-component.component';
import { EmailVerifyComponent } from './content/user/email-verify/email-verify.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { userAuthInterceptorService } from 'src/app/content/user/userAuthInterceptor.service';
import { ProfileComponent } from './content/user/profile/profile.component';
import { UploadComponent } from './content/user/upload/upload.component'
import { AuthGuard } from './content/user/auth.guard';
import { StaredComponent } from './content/user/stared/stared.component';
import { ForgotPasswordComponent } from './content/user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './content/user/reset-password/reset-password.component';
import { ChangePwdComponent } from './content/user/change-pwd/change-pwd.component';
import { EditProfileComponent } from './content/user/edit-profile/edit-profile.component';
import { StringLengthPipe } from './pipes/string-length.pipe';
import { AdminComponent } from './content/user/admin/admin.component';
import { AuthDocsComponent } from './content/user/admin/auth-docs/auth-docs.component';
import { AdminNotesTemplateComponent } from './content/user/admin/admin-notes-template/admin-notes-template.component';
import { AdminPdfViewComponent } from './content/user/admin/admin-pdf-view/admin-pdf-view.component';
import { FeedbackComponent } from './content/user/feedback/feedback.component';
import { LibraryComponent } from './content/subjects/Library/library/library.component';
import { AllComponent } from './content/subjects/Library/All/all.component';
import { JEEComponent } from './content/subjects/jee/jee.component';

const appRoutes:Routes=[
  {path: '',component: HomeComponent},
  {path: 'signup',component: SignupComponent},
  {path: 'login',component: LoginComponent},
  {path: 'emailVerify/:id',component: EmailVerifyComponent},
  {path: 'user/profile',component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/feedback',component: FeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/upload',component: UploadComponent, canActivate: [AuthGuard]},
  {path: 'user/stared',component: StaredComponent, canActivate: [AuthGuard]},
  {path: 'user/changePwd',component: ChangePwdComponent, canActivate: [AuthGuard]},
  {path: 'user/editProfile',component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'user/forgotPassword',component: ForgotPasswordComponent},
  {path: 'user/resetPassword/:resetToken',component: ResetPasswordComponent},
  {path: 'user/admin',component: AdminComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: '/user/admin/authDocs',pathMatch: 'full'},
    {path: 'authDocs', component: AuthDocsComponent},
    {path: 'notification', component: StaredComponent}
  ]},
  {path: 'JEE',component: JEEComponent, children: [
    {path: '', redirectTo: '/JEE/physics',pathMatch: 'full'},
    {path: 'physics', component: SubjectComponentComponent, data:{subjectName: 'Physics',endpointEnd: 'physics'}},
    {path: 'chemistry', component: SubjectComponentComponent, data:{subjectName: 'Chemistry',endpointEnd: 'chemistry'}},
    {path: 'maths', component: SubjectComponentComponent, data:{subjectName: 'Mathematics',endpointEnd: 'maths'}},
  ]},
  {path: 'BTech/cse',component: CseComponent, children: [
    {path: '', redirectTo: '/BTech/cse/year1',pathMatch: 'full'},
    {path: 'year1', component: CseYear1Component},
    {path: 'year2', component: CseYear2Component},
    {path: 'year3', component: CseYear3Component},
    {path: 'year4', component: CseYear4Component},

    //1st semester cse
    {path: 'appliedMathematics1', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 1',endpointEnd: 'appliedMathematics1'}},    
    {path: 'manufacturingProcesses', component: SubjectComponentComponent, data:{subjectName: 'Manufacturing Processes',endpointEnd: 'manufacturingProcesses'}},
    {path: 'appliedChemistry', component: SubjectComponentComponent, data:{subjectName: 'Applied Chemistry',endpointEnd: 'appliedChemistry'}},
    {path: 'appliedPhysics1', component: SubjectComponentComponent, data:{subjectName: 'Applied Physics 1',endpointEnd: 'appliedPhysics1'}},
    {path: 'electricalTechnology', component: SubjectComponentComponent, data:{subjectName: 'Electrical Technology',endpointEnd: 'electricalTechnology'}},
    {path: 'fundamentalsOfComputing', component: SubjectComponentComponent, data:{subjectName: 'Fundamentals Of Computing',endpointEnd: 'fundamentalsOfComputing'}},

    //2nd semester cse
    {path: 'appliedMathematics2', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 2',endpointEnd: 'appliedMathematics2'}},    
    {path: 'electronicDevices', component: SubjectComponentComponent, data:{subjectName: 'Electronic Devices',endpointEnd: 'electronicDevices'}},
    {path: 'engineeringMechanics', component: SubjectComponentComponent, data:{subjectName: 'Engineering Mechanics',endpointEnd: 'engineeringMechanics'}},
    {path: 'appliedPhysics2', component: SubjectComponentComponent, data:{subjectName: 'Applied Physics 2',endpointEnd: 'appliedPhysics2'}},
    {path: 'introductionToProgramming', component: SubjectComponentComponent, data:{subjectName: 'Introduction To Programming',endpointEnd: 'introductionToProgramming'}},


    //3th semester cse
    {path: 'appliedMathematics3', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 3',endpointEnd: 'appliedMathematics3'}},    
    {path: 'switchingTheoryLogicDesign', component: SubjectComponentComponent, data:{subjectName: 'Switching Theory Logic Design',endpointEnd: 'switchingTheoryLogicDesign'}},
    {path: 'dataStructures', component: SubjectComponentComponent, data:{subjectName: 'Data Structures',endpointEnd: 'dataStructures'}},
    {path: 'foundationOfComputerScience', component: SubjectComponentComponent, data:{subjectName: 'Foundation Of Computer Science',endpointEnd: 'foundationOfComputerScience'}},
    {path: 'computerGraphicsAndMultimedia', component: SubjectComponentComponent, data:{subjectName: 'Computer Graphics & Multimedia',endpointEnd: 'computerGraphicsAndMultimedia'}},
    {path: 'signalsSystems', component: SubjectComponentComponent, data:{subjectName: 'Signals Systems',endpointEnd: 'signalsSystems'}},

    //4th semester cse
    {path: 'appliedMathematics4', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 4',endpointEnd: 'appliedMathematics4'}},    
    {path: 'computerOrganizationArchitecture', component: SubjectComponentComponent, data:{subjectName: 'Computer Organization & Architecture',endpointEnd: 'computerOrganizationArchitecture'}},
    {path: 'database-management-system', component: SubjectComponentComponent, data:{subjectName: 'Database Management System',endpointEnd: 'databaseManagementSystem'}},
    {path: 'communicationSystems', component: SubjectComponentComponent, data:{subjectName: 'Communication Systems',endpointEnd: 'communicationSystems'}},
    {path: 'theoryOfComputation', component: SubjectComponentComponent, data:{subjectName: 'Theory Of Computation',endpointEnd: 'theoryOfComputation'}},
    {path: 'objectedOrientedProgramming', component: SubjectComponentComponent, data:{subjectName: 'Objected Oriented Programming',endpointEnd: 'objectedOrientedProgramming'}},


    //5th semester cse
    {path: 'digitalCommunication', component: SubjectComponentComponent, data:{subjectName: 'Digital Communication',endpointEnd: 'digitalCommunication'}},
    {path: 'algorithmDesignAndAnalysis', component: SubjectComponentComponent, data:{subjectName: 'Algorithm design & Analysis',endpointEnd: 'algorithmDesignAndAnalysis'}},    
    {path: 'softwareEngineering', component: SubjectComponentComponent, data:{subjectName: 'Software Engineering',endpointEnd: 'softwareEngineering'}},
    {path: 'javaProgramming', component: SubjectComponentComponent, data:{subjectName: 'Java Programming',endpointEnd: 'javaProgramming'}},


    //6th semester cse
    {path: 'microprocessorsMicrocontrollers', component: SubjectComponentComponent, data:{subjectName: 'Microprocessors & Microcontrollers',endpointEnd: 'microprocessorsMicrocontrollers'}},    
    {path: 'compilerDesign', component: SubjectComponentComponent, data:{subjectName: 'Compiler Design',endpointEnd: 'compilerDesign'}},    
    {path: 'operatingSystem', component: SubjectComponentComponent, data:{subjectName: 'Operating System',endpointEnd: 'operatingSystem'}},
    {path: 'computerNetworks', component: SubjectComponentComponent, data:{subjectName: 'Computer Networks',endpointEnd: 'computerNetworks'}},
    {path: 'webTechnology', component: SubjectComponentComponent, data:{subjectName: 'Web Technology',endpointEnd: 'webTechnology'}},
    {path: 'artificialIntelligence', component: SubjectComponentComponent, data:{subjectName: 'Artificial Intelligence',endpointEnd: 'artificialIntelligence'}},

    //7th semester cse
    {path: 'informationSecurity', component: SubjectComponentComponent, data:{subjectName: 'Information Security',endpointEnd: 'informationSecurity'}},    
    {path: 'softwareTesting', component: SubjectComponentComponent, data:{subjectName: 'Software Testing & Quality  Assurance',endpointEnd: 'softwareTesting'}},
    {path: 'wirelessCommunication', component: SubjectComponentComponent, data:{subjectName: 'Wireless Communication',endpointEnd: 'wirelessCommunication'}},
    {path: 'controlSystems', component: SubjectComponentComponent, data:{subjectName: 'Control Systems',endpointEnd: 'controlSystems'}},
    {path: 'embeddedSystems', component: SubjectComponentComponent, data:{subjectName: 'Embedded Systems',endpointEnd: 'embeddedSystems'}},    

    //8th semester cse
    {path: 'mobileComputing', component: SubjectComponentComponent, data:{subjectName: 'Mobile Computing',endpointEnd: 'mobileComputing'}},
    {path: 'machineLearning', component: SubjectComponentComponent, data:{subjectName: 'Machine Learning',endpointEnd: 'machineLearning'}},    
    {path: 'adhocSensorNetworks', component: SubjectComponentComponent, data:{subjectName: 'Adhoc & Sensor Networks',endpointEnd: 'adhocSensorNetworks'}},
    {path: 'informationTheoryCoding', component: SubjectComponentComponent, data:{subjectName: 'Information Theory & Coding',endpointEnd: 'informationTheoryCoding'}},

  ]},
  {path: 'BTech/ece',component: EceComponent, children: [
    {path: '', redirectTo: '/BTech/ece/year1',pathMatch: 'full'},
    {path: 'year1', component: EceYear1Component},
    {path: 'year2', component: EceYear2Component},
    {path: 'year3', component: EceYear3Component},
    {path: 'year4', component: EceYear4Component},

    //1st semester ece
    {path: 'appliedMathematics1', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 1',endpointEnd: 'appliedMathematics1'}},    
    {path: 'manufacturingProcesses', component: SubjectComponentComponent, data:{subjectName: 'Manufacturing Processes',endpointEnd: 'manufacturingProcesses'}},
    {path: 'appliedChemistry', component: SubjectComponentComponent, data:{subjectName: 'Applied Chemistry',endpointEnd: 'appliedChemistry'}},
    {path: 'appliedPhysics1', component: SubjectComponentComponent, data:{subjectName: 'Applied Physics 1',endpointEnd: 'appliedPhysics1'}},
    {path: 'electricalTechnology', component: SubjectComponentComponent, data:{subjectName: 'Electrical Technology',endpointEnd: 'electricalTechnology'}},
    {path: 'fundamentalsOfComputing', component: SubjectComponentComponent, data:{subjectName: 'Fundamentals Of Computing',endpointEnd: 'fundamentalsOfComputing'}},

    //2nd semester ece
    {path: 'appliedMathematics2', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 2',endpointEnd: 'appliedMathematics2'}},    
    {path: 'electronicDevices', component: SubjectComponentComponent, data:{subjectName: 'Electronic Devices',endpointEnd: 'electronicDevices'}},
    {path: 'engineeringMechanics', component: SubjectComponentComponent, data:{subjectName: 'Engineering Mechanics',endpointEnd: 'engineeringMechanics'}},
    {path: 'appliedPhysics2', component: SubjectComponentComponent, data:{subjectName: 'Applied Physics 2',endpointEnd: 'appliedPhysics2'}},
    {path: 'introductionToProgramming', component: SubjectComponentComponent, data:{subjectName: 'Introduction To Programming',endpointEnd: 'introductionToProgramming'}},


    //3th semester ece
    {path: 'appliedMathematics3', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 3',endpointEnd: 'appliedMathematics3'}},    
    {path: 'switchingTheoryLogicDesign', component: SubjectComponentComponent, data:{subjectName: 'Switching Theory Logic Design',endpointEnd: 'switchingTheoryLogicDesign'}},
    {path: 'dataStructures', component: SubjectComponentComponent, data:{subjectName: 'Data Structures',endpointEnd: 'dataStructures'}},
    {path: 'analogElectronics1', component: SubjectComponentComponent, data:{subjectName: 'Analog Electronics 1',endpointEnd: 'analogElectronics1'}},
    {path: 'electronicInstrumentsMeasurements', component: SubjectComponentComponent, data:{subjectName: 'Electronic Instruments Measurements',endpointEnd: 'electronicInstrumentsMeasurements'}},
    {path: 'signalsSystems', component: SubjectComponentComponent, data:{subjectName: 'Signals Systems',endpointEnd: 'signalsSystems'}},

    //4th semester ece
    {path: 'appliedMathematics4', component: SubjectComponentComponent, data:{subjectName: 'Applied Mathematics 4',endpointEnd: 'appliedMathematics4'}},    
    {path: 'analogElectronics2', component: SubjectComponentComponent, data:{subjectName: 'Analog Electronics 2',endpointEnd: 'analogElectronics2'}},
    {path: 'communicationSystems', component: SubjectComponentComponent, data:{subjectName: 'Communication Systems',endpointEnd: 'communicationSystems'}},
    {path: 'computerOrganizationArchitecture', component: SubjectComponentComponent, data:{subjectName: 'Computer Organization & Architecture',endpointEnd: 'computerOrganizationArchitecture'}},
    {path: 'networkAnalysisSynthesis', component: SubjectComponentComponent, data:{subjectName: 'Network Analysis & Synthesis',endpointEnd: 'networkAnalysisSynthesis'}},
    {path: 'electromagneticFieldTheory', component: SubjectComponentComponent, data:{subjectName: 'Electronic Magnetic Field Theory',endpointEnd: 'electromagneticFieldTheory'}},

    //5th semester ece
    {path: 'microprocessorsMicrocontrollers', component: SubjectComponentComponent, data:{subjectName: 'Microprocessors & Microcontrollers',endpointEnd: 'microprocessorsMicrocontrollers'}},    
    {path: 'digitalSystemDesign', component: SubjectComponentComponent, data:{subjectName: 'Digital System Design',endpointEnd: 'digitalSystemDesign'}},
    {path: 'digitalCommunication', component: SubjectComponentComponent, data:{subjectName: 'Digital Communication',endpointEnd: 'digitalCommunication'}},
    {path: 'controlSystems', component: SubjectComponentComponent, data:{subjectName: 'Control Systems',endpointEnd: 'controlSystems'}},


    //6th semester ece
    {path: 'microwaveEngineering', component: SubjectComponentComponent, data:{subjectName: 'Microwave Engineering',endpointEnd: 'microwaveEngineering'}},    
    {path: 'digitalSignalProcessing', component: SubjectComponentComponent, data:{subjectName: 'Digital Signal Processing',endpointEnd: 'digitalSignalProcessing'}},
    {path: 'dataCommunicationNetworks', component: SubjectComponentComponent, data:{subjectName: 'Data Communication & Networks',endpointEnd: 'dataCommunicationNetworks'}},
    {path: 'informationTheoryCoding', component: SubjectComponentComponent, data:{subjectName: 'Information Theory & Coding',endpointEnd: 'informationTheoryCoding'}},
    {path: 'vlsi', component: SubjectComponentComponent, data:{subjectName: 'VLSI',endpointEnd: 'vlsi'}},
    {path: 'antennaWavePropogation', component: SubjectComponentComponent, data:{subjectName: 'Antenna & Wave Propogation',endpointEnd: 'antennaWavePropogation'}},

    //7th semester ece
    {path: 'embeddedSystems', component: SubjectComponentComponent, data:{subjectName: 'Embedded Systems',endpointEnd: 'embeddedSystems'}},    
    {path: 'opticalCommunication', component: SubjectComponentComponent, data:{subjectName: 'Optical Communication',endpointEnd: 'opticalCommunication'}},
    {path: 'wirelessCommunication', component: SubjectComponentComponent, data:{subjectName: 'Wireless Communication',endpointEnd: 'wirelessCommunication'}},
    {path: 'projectManagement', component: SubjectComponentComponent, data:{subjectName: 'Project Management',endpointEnd: 'projectManagement'}},
    {path: 'database-management-system', component: SubjectComponentComponent, data:{subjectName: 'Database Management System',endpointEnd: 'databaseManagementSystem'}},

    //8th semester ece
    {path: 'satelliteCommunication', component: SubjectComponentComponent, data:{subjectName: 'Satellite Communication',endpointEnd: 'satelliteCommunication'}},    
    {path: 'nextGenerationNetworks', component: SubjectComponentComponent, data:{subjectName: 'Next Generation Networks',endpointEnd: 'nextGenerationNetworks'}},
    {path: 'mobileComputing', component: SubjectComponentComponent, data:{subjectName: 'Mobile Computing',endpointEnd: 'mobileComputing'}},
    {path: 'adhocSensorNetworks', component: SubjectComponentComponent, data:{subjectName: 'Adhoc & Sensor Networks',endpointEnd: 'adhocSensorNetworks'}},

  ]},
  {path: 'Library',component: LibraryComponent, children: [
    {path: '', redirectTo: '/Library/all',pathMatch: 'full'},
    {path: 'all', component: AllComponent},
    {path: 'selfHelp', component: SubjectComponentComponent, data:{subjectName: 'Self Help books',endpointEnd: 'selfHelp'}},
  ]},
  {path: 'pdf/:folder/:filename/:originalname/:heading',component: PdfViewComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [
    // FileSelectDirective,
    AppComponent,
    HeaderComponent,
    ContentComponent,
    NavComponent,
    AlertComponent,
    AlertWidthDirective,
    CseComponent,
    EceComponent,
    HomeComponent,
    HeadingsDirective,
    NotFoundComponent,
    CseYear1Component,
    CseYear2Component,
    CseYear3Component,
    CseYear4Component,
    EceYear1Component,
    EceYear2Component,
    EceYear3Component,
    EceYear4Component,
    NotesTemplateComponent,
    NotesTemplateDirective,
    PdfViewComponent,
    SignupComponent,
    LoginComponent,
    SubjectComponentComponent,
    EmailVerifyComponent,
    ProfileComponent,
    UploadComponent,
    StaredComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePwdComponent,
    EditProfileComponent,
    StringLengthPipe,
    AdminComponent,
    AuthDocsComponent,
    AdminNotesTemplateComponent,
    AdminPdfViewComponent,
    FeedbackComponent,
    LibraryComponent,
    AllComponent,
    JEEComponent,
  ],
  imports: [
    PdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FileUploadModule,
    FontAwesomeModule
  ],
  
  providers: [GenericService,
              AuthService, 
              {
                provide: HTTP_INTERCEPTORS,
                useClass: userAuthInterceptorService, 
                multi: true
              }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

