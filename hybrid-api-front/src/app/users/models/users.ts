import {AvatarPictureDTO, Job, JobPictureDTO} from "../../jobs/job.model";

export interface BaseUser {
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
   /* imageUrl: string*/
  userPicture?: AvatarPictureDTO | null; // Doit correspondre au type du model
  isAuthenticated: boolean
  authorities: string[]
  accessToken: string,
  token: string,
  notification: NotificationRegister
}

export interface User extends BaseUser {
  userType: 'USER'

}

export interface Provider extends BaseUser {
  userType: 'PROVIDER'
  address: Address,
  phone :string,
  numberOfMissionsPublished: number,
}

export interface Jobber extends BaseUser {
  userType: 'JOBBER'
  jobs: Job[],
  phone :string,
  experiences: number;
  numberOfMissionsExecuted: number;
}

interface Address {
  street: number,
  number: number,
  city: string,
  phone: string,
}


export type AppUser = User | Provider | Jobber;


export type  NotificationRegister={
  name:string,
  email : string
 }

export type FormLogin ={
  // firstname: string,
  // lastname ? : string,
  email : string,
  password:string,
}





export type RegistrationResponse = {
  success: boolean,
  message:string,
  fullName:string,
  userRole: string
}


export type FormRegister ={
  firstname: string,
  lastname  : string,
  email : string,
  password:string,
  userRole: string
}








//
//
//
//
// export interface User {
//    firstname : string,
//    lastname : string,
//    uerfullname: string,
//    email : string,
//    imageUrl: string,
//    isAuthenticated: boolean,
//    userRole: string,
//    //type: string,
//    authorities:string[]
//  notification: NotificationRegister
//  }
// export type  NotificationRegister={
//   name:string,
//   email : string
//  }


//
//
//

//
//
//
//  export interface ProvidersInfos {
//    firstname : string,
//    lastname : string,
//    email : string,
//    imageUrl: string,
//    isAuthenticated: boolean,
//    userRole: string,
//    //type: string,
//    authorities:string[],
//    address: Address;
//    notification: NotificationRegister
//  }
//
//
// export interface Jobber {
//   firstname: string
//   lastname: string
//   fullname: string
//   email: string
//   imageUrl: string
//   isAuthenticated: boolean
//   role: string
//  // type: 'JOBBER'
//
//
//   jobs: Job[]
// }
//
