import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Base64 } from 'js-base64';
import {environment} from 'src/environments/environment';

const URL=environment.backendLink+"/auth/uploadDocs";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  docsUploadForm:any;
  isAuthenticated:boolean;
  selectedFile:any;
  startedUploading:boolean=false;
  allUploaded:boolean=false;
  fileTypeError:number=0;
  processCompleted:boolean=false;
  emailVerified:boolean=false;
  unableToSubmitForm=false;

  //Course array
  courseArray=[
    {name: 'JEE', value: 'jee'},
    {name: 'B.Tech', value: 'btech'},
    {name: 'Library', value: 'library'},
  ];

  //Course streams array
  btechStreamArray=[
    {name: 'ECE', value: 'ece'},
    {name: 'CSE', value: 'cse'},
  ];
  
  // mtechStreamArray=[
  //   {name: 'MECE', value: 'mece'},
  //   {name: 'MCSE', value: 'mcse'},
  // ];

  //Stream subject arrays
  jeeArray=[
    {path: 'physics', data:{subjectName: 'Physics',endpointEnd: 'physics'}},    
    {path: 'chemistry', data:{subjectName: 'Chemistry',endpointEnd: 'chemistry'}},    
    {path: 'maths', data:{subjectName: 'Mathematics',endpointEnd: 'maths'}},    
  ];

  libraryArray=[
    {path: 'selfHelp', data:{subjectName: 'Self help books',endpointEnd: 'selfHelp'}},    
    {path: 'miscellaneous', data:{subjectName: 'Miscellaneous',endpointEnd: 'miscellaneous'}},    
  ];
  
  btechEceArray=[
    //Array copied from app.module.ts
    //1st semester ece
    {path: 'appliedMathematics1', data:{subjectName: 'Applied Mathematics 1',endpointEnd: 'appliedMathematics1'}},    
    {path: 'manufacturingProcesses', data:{subjectName: 'Manufacturing Processes',endpointEnd: 'manufacturingProcesses'}},
    {path: 'appliedChemistry', data:{subjectName: 'Applied Chemistry',endpointEnd: 'appliedChemistry'}},
    {path: 'appliedPhysics1', data:{subjectName: 'Applied Physics 1',endpointEnd: 'appliedPhysics1'}},
    {path: 'electricalTechnology', data:{subjectName: 'Electrical Technology',endpointEnd: 'electricalTechnology'}},
    {path: 'fundamentalsOfComputing', data:{subjectName: 'Fundamentals Of Computing',endpointEnd: 'fundamentalsOfComputing'}},

    //2nd semester ece
    {path: 'appliedMathematics2', data:{subjectName: 'Applied Mathematics 2',endpointEnd: 'appliedMathematics2'}},    
    {path: 'electronicDevices', data:{subjectName: 'Electronic Devices',endpointEnd: 'electronicDevices'}},
    {path: 'engineeringMechanics', data:{subjectName: 'Engineering Mechanics',endpointEnd: 'engineeringMechanics'}},
    {path: 'appliedPhysics2', data:{subjectName: 'Applied Physics 2',endpointEnd: 'appliedPhysics2'}},
    {path: 'introductionToProgramming', data:{subjectName: 'Introduction To Programming',endpointEnd: 'introductionToProgramming'}},


    //3th semester ece
    {path: 'appliedMathematics3', data:{subjectName: 'Applied Mathematics 3',endpointEnd: 'appliedMathematics3'}},    
    {path: 'switchingTheoryLogicDesign', data:{subjectName: 'Switching Theory Logic Design',endpointEnd: 'switchingTheoryLogicDesign'}},
    {path: 'dataStructures', data:{subjectName: 'Data Structures',endpointEnd: 'dataStructures'}},
    {path: 'analogElectronics1', data:{subjectName: 'Analog Electronics 1',endpointEnd: 'analogElectronics1'}},
    {path: 'electronicInstrumentsMeasurements', data:{subjectName: 'Electronic Instruments Measurements',endpointEnd: 'electronicInstrumentsMeasurements'}},
    {path: 'signalsSystems', data:{subjectName: 'Signals Systems',endpointEnd: 'signalsSystems'}},

    //4th semester ece
    {path: 'appliedMathematics4', data:{subjectName: 'Applied Mathematics 4',endpointEnd: 'appliedMathematics4'}},    
    {path: 'analogElectronics2', data:{subjectName: 'Analog Electronics 2',endpointEnd: 'analogElectronics2'}},
    {path: 'communicationSystems', data:{subjectName: 'Communication Systems',endpointEnd: 'communicationSystems'}},
    {path: 'computerOrganizationArchitecture', data:{subjectName: 'Computer Organization & Architecture',endpointEnd: 'computerOrganizationArchitecture'}},
    {path: 'networkAnalysisSynthesis', data:{subjectName: 'Network Analysis & Synthesis',endpointEnd: 'networkAnalysisSynthesis'}},
    {path: 'electromagneticFieldTheory', data:{subjectName: 'Electronic Magnetic Field Theory',endpointEnd: 'electromagneticFieldTheory'}},

    //5th semester ece
    {path: 'microprocessorsMicrocontrollers', data:{subjectName: 'Microprocessors & Microcontrollers',endpointEnd: 'microprocessorsMicrocontrollers'}},    
    {path: 'digitalSystemDesign', data:{subjectName: 'Digital System Design',endpointEnd: 'digitalSystemDesign'}},
    {path: 'digitalCommunication', data:{subjectName: 'Digital Communication',endpointEnd: 'digitalCommunication'}},
    {path: 'controlSystems', data:{subjectName: 'Control Systems',endpointEnd: 'controlSystems'}},


    //6th semester ece
    {path: 'microwaveEngineering', data:{subjectName: 'Microwave Engineering',endpointEnd: 'microwaveEngineering'}},    
    {path: 'digitalSignalProcessing', data:{subjectName: 'Digital Signal Processing',endpointEnd: 'digitalSignalProcessing'}},
    {path: 'dataCommunicationNetworks', data:{subjectName: 'Data Communication & Networks',endpointEnd: 'dataCommunicationNetworks'}},
    {path: 'informationTheoryCoding', data:{subjectName: 'Information Theory & Coding',endpointEnd: 'informationTheoryCoding'}},
    {path: 'vlsi', data:{subjectName: 'VLSI',endpointEnd: 'vlsi'}},
    {path: 'antennaWavePropogation', data:{subjectName: 'Antenna & Wave Propogation',endpointEnd: 'antennaWavePropogation'}},

    //7th semester ece
    {path: 'embeddedSystems', data:{subjectName: 'Embedded Systems',endpointEnd: 'embeddedSystems'}},    
    {path: 'opticalCommunication', data:{subjectName: 'Optical Communication',endpointEnd: 'opticalCommunication'}},
    {path: 'wirelessCommunication', data:{subjectName: 'Wireless Communication',endpointEnd: 'wirelessCommunication'}},
    {path: 'projectManagement', data:{subjectName: 'Project Management',endpointEnd: 'projectManagement'}},
    {path: 'database-management-system', data:{subjectName: 'Database Management System',endpointEnd: 'databaseManagementSystem'}},

    //8th semester ece
    {path: 'satelliteCommunication', data:{subjectName: 'Satellite Communication',endpointEnd: 'satelliteCommunication'}},    
    {path: 'nextGenerationNetworks', data:{subjectName: 'Next Generation Networks',endpointEnd: 'nextGenerationNetworks'}},
    {path: 'mobileComputing', data:{subjectName: 'Mobile Computing',endpointEnd: 'mobileComputing'}},
    {path: 'adhocSensorNetworks', data:{subjectName: 'Adhoc & Sensor Networks',endpointEnd: 'adhocSensorNetworks'}},

  ];  

  btechCseArray=[

    //1st semester cse
    {path: 'appliedMathematics1', data:{subjectName: 'Applied Mathematics 1',endpointEnd: 'appliedMathematics1'}},    
    {path: 'manufacturingProcesses', data:{subjectName: 'Manufacturing Processes',endpointEnd: 'manufacturingProcesses'}},
    {path: 'appliedChemistry', data:{subjectName: 'Applied Chemistry',endpointEnd: 'appliedChemistry'}},
    {path: 'appliedPhysics1', data:{subjectName: 'Applied Physics 1',endpointEnd: 'appliedPhysics1'}},
    {path: 'electricalTechnology', data:{subjectName: 'Electrical Technology',endpointEnd: 'electricalTechnology'}},
    {path: 'fundamentalsOfComputing', data:{subjectName: 'Fundamentals Of Computing',endpointEnd: 'fundamentalsOfComputing'}},

    //2nd semester cse
    {path: 'appliedMathematics2', data:{subjectName: 'Applied Mathematics 2',endpointEnd: 'appliedMathematics2'}},    
    {path: 'electronicDevices', data:{subjectName: 'Electronic Devices',endpointEnd: 'electronicDevices'}},
    {path: 'engineeringMechanics', data:{subjectName: 'Engineering Mechanics',endpointEnd: 'engineeringMechanics'}},
    {path: 'appliedPhysics2', data:{subjectName: 'Applied Physics 2',endpointEnd: 'appliedPhysics2'}},
    {path: 'introductionToProgramming', data:{subjectName: 'Introduction To Programming',endpointEnd: 'introductionToProgramming'}},


    //3th semester cse
    {path: 'appliedMathematics3', data:{subjectName: 'Applied Mathematics 3',endpointEnd: 'appliedMathematics3'}},    
    {path: 'switchingTheoryLogicDesign', data:{subjectName: 'Switching Theory Logic Design',endpointEnd: 'switchingTheoryLogicDesign'}},
    {path: 'dataStructures', data:{subjectName: 'Data Structures',endpointEnd: 'dataStructures'}},
    {path: 'foundationOfComputerScience', data:{subjectName: 'Foundation Of Computer Science',endpointEnd: 'foundationOfComputerScience'}},
    {path: 'computerGraphicsAndMultimedia', data:{subjectName: 'Computer Graphics & Multimedia',endpointEnd: 'computerGraphicsAndMultimedia'}},
    {path: 'signalsSystems', data:{subjectName: 'Signals Systems',endpointEnd: 'signalsSystems'}},

    //4th semester ece
    {path: 'appliedMathematics4', data:{subjectName: 'Applied Mathematics 4',endpointEnd: 'appliedMathematics4'}},    
    {path: 'computerOrganizationArchitecture', data:{subjectName: 'Computer Organization & Architecture',endpointEnd: 'computerOrganizationArchitecture'}},
    {path: 'database-management-system', data:{subjectName: 'Database Management System',endpointEnd: 'databaseManagementSystem'}},
    {path: 'communicationSystems', data:{subjectName: 'Communication Systems',endpointEnd: 'communicationSystems'}},
    {path: 'theoryOfComputation', data:{subjectName: 'Theory Of Computation',endpointEnd: 'theoryOfComputation'}},
    {path: 'objectedOrientedProgramming', data:{subjectName: 'Objected Oriented Programming',endpointEnd: 'objectedOrientedProgramming'}},


    //5th semester cse
    {path: 'digitalCommunication', data:{subjectName: 'Digital Communication',endpointEnd: 'digitalCommunication'}},
    {path: 'algorithmDesignAndAnalysis', data:{subjectName: 'Algorithm design & Analysis',endpointEnd: 'algorithmDesignAndAnalysis'}},    
    {path: 'softwareEngineering', data:{subjectName: 'Software Engineering',endpointEnd: 'softwareEngineering'}},
    {path: 'javaProgramming', data:{subjectName: 'Java Programming',endpointEnd: 'javaProgramming'}},


    //6th semester cse
    {path: 'microprocessorsMicrocontrollers', data:{subjectName: 'Microprocessors & Microcontrollers',endpointEnd: 'microprocessorsMicrocontrollers'}},    
    {path: 'compilerDesign', data:{subjectName: 'Compiler Design',endpointEnd: 'compilerDesign'}},    
    {path: 'operatingSystem', data:{subjectName: 'Operating System',endpointEnd: 'operatingSystem'}},
    {path: 'computerNetworks', data:{subjectName: 'Computer Networks',endpointEnd: 'computerNetworks'}},
    {path: 'webTechnology', data:{subjectName: 'Web Technology',endpointEnd: 'webTechnology'}},
    {path: 'artificialIntelligence', data:{subjectName: 'Artificial Intelligence',endpointEnd: 'artificialIntelligence'}},

    //7th semester cse
    {path: 'informationSecurity', data:{subjectName: 'Information Security',endpointEnd: 'informationSecurity'}},    
    {path: 'softwareTesting', data:{subjectName: 'Software Testing & Quality  Assurance',endpointEnd: 'softwareTesting'}},
    {path: 'wirelessCommunication', data:{subjectName: 'Wireless Communication',endpointEnd: 'wirelessCommunication'}},
    {path: 'controlSystems', data:{subjectName: 'Control Systems',endpointEnd: 'controlSystems'}},
    {path: 'embeddedSystems', data:{subjectName: 'Embedded Systems',endpointEnd: 'embeddedSystems'}},    

    //8th semester cse
    {path: 'mobileComputing', data:{subjectName: 'Mobile Computing',endpointEnd: 'mobileComputing'}},
    {path: 'machineLearning', data:{subjectName: 'Machine Learning',endpointEnd: 'machineLearning'}},    
    {path: 'adhocSensorNetworks', data:{subjectName: 'Adhoc & Sensor Networks',endpointEnd: 'adhocSensorNetworks'}},
    {path: 'informationTheoryCoding', data:{subjectName: 'Information Theory & Coding',endpointEnd: 'informationTheoryCoding'}},

  ];

  private userObject:any;
  private token: any;
  public uploader:FileUploader=new FileUploader({url: URL});

  constructor(private authService:AuthService) { 
    this.uploader.onCompleteItem=(item:any, response:any, status:any, headers:any)=>{
      this.startedUploading=true;
      // console.log("Item:")
      // console.log((item))
      // console.log("Response:")
      // console.log(JSON.parse(response))
      this.docsUploadForm.patchValue({
        fileLocation: JSON.parse(response).fileLocation,
        filename: JSON.parse(response).filename,
        originalname: JSON.parse(response).originalname
      })
      this.submit();
    }
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false;
      if(file.file.type!="application/pdf")
      {
        this.fileTypeError++;
      }
      // console.log("File uploaded#:")
      // console.log(file)
    }

    this.uploader.onCompleteAll=()=>{
      // console.log("All files uploaded")
      this.allUploaded=true;
    }
    this.uploader.onCancelItem=()=>{
      // console.log("This file is cancelled: ")
    }
  }

  ngOnInit() {  
    this.authService.theLoginObs
    .subscribe(
      loadedUser=>{
        this.isAuthenticated=!!loadedUser.token;
        if(this.isAuthenticated)
        {
          this.token=loadedUser.token;
          var payLoad=this.token.split('.')[1];
          var base64=payLoad.replace('-','+').replace('_','/');
          this.userObject=JSON.parse(atob(base64));
          
          this.emailVerified=this.userObject.emailVerified;
          this.docsUploadForm = new FormGroup({
          heading: new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(50)]),
          text: new FormControl('', [Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
          course:  new FormControl('', [Validators.required]),
          stream:  new FormControl('', [Validators.required]),
          subject: new FormControl('', [Validators.required]),
          userFirstName: new FormControl(Base64.decode(this.userObject.firstName), [Validators.required]),
          userEmail: new FormControl(this.userObject.email, [Validators.required]),
          fileLocation: new FormControl(null),
          filename: new FormControl(null),
          originalname: new FormControl(null),
          })

        }
      },
      err=>{
        console.log(err)
      }
      )
    
    
  }

  fileChange(event)
  {
    // console.log("event")
    // console.log(event)
    // this.fileName=event.target.files[0].name
  }

  submit()
  {
    // console.log("Which form getting submitted:::::::::::")
    // console.log(this.docsUploadForm.value)
    // console.log(this.docsUploadForm.value.docFile)
    
    this.authService.docUploadFormSubmit(this.docsUploadForm.value)
    .subscribe(
      data=>{
        // console.log("data")
        // console.log(data)
        this.processCompleted=data.success;
      },
      err=>{
        console.log("Err1")
        console.log(err)
        this.unableToSubmitForm=true
      }
    )
  }

  itemCancelled(file)
  {
    // console.log("One doc is cancelled!")
    // console.log(file)
    if(file.file.type!="application/pdf")
    {
      this.fileTypeError--;
    }
  }
  
  courseChange()
  {
    if(this.docsUploadForm.value.course=="btech")
    {
        this.docsUploadForm.patchValue({
          stream:  ''
        })
    }
    else
    {
      this.docsUploadForm.patchValue({
        stream:  ' '
      })
    }
  }

}
