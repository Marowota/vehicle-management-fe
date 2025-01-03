export interface TableBaseProps {
  className?: string;
  children?: React.ReactNode;
}

export enum AccountRole {
  TEACHER,
  ADMIN,
}

export interface Account {
  id: number;
  email: string;
  username: string;
  name: string;
  role: AccountRole;
  isEnabled: boolean;
  password: string;
}

export interface Vehicle {
  plateNumber: string;
  vehicleSpec: VehicleSpec;
  cost: number;
  health: string;
  currentInspectId?: string;
  isRemoved?: boolean;
}

export interface VehicleInspectionInfo {
  inspectionNo: string;
  plateNumber: string;
  registrationDate: Date;
  validUntil: Date;
  cost: number;
}

export interface VehicleMaintenanceInfo {
  id: number;
  plateNumber: string;
  start: Date;
  end: Date;
  cost: number;
  addedFuel: number;
  info: string;
}

export interface VehicleRegisterInfo {
  id: number;
  plateNumber: string;
  teacherName: string;
  courseName: string;
  start: Date;
  end: Date;
}

export interface VehicleSpec {
  id?: number;
  type: string;
  brand: string;
  modelCode: string;
  noOfSeat: number;
  madeIn: string;
  fuelType: string;
  fuelConsumptionPer100Km: number;
  tankCapacity: number;
  topSpeed: number;
  frontRimsDimension: string;
  backRimsDimension: string;
}

export interface VehicleUsageInfo {
  id: number;
  plateNumber: string;
  fuelUsed: number;
}

export enum RequestResult {
  SUCCESS,
  ERROR,
  MISSING_DATA,
  NOT_AUTHENTICATED,
}

export enum InspectionResult {
  SUCCESS,
  ERROR,
  MISSING_DATA,
  EXISTED,
}

export enum RegisterResult {
  ACCEPTED = "ACCEPTED",
  NO_TEACHER = "NO_TEACHER",
  DATE_COLLISION = "DATE_COLLISION",
  MAINTAINING = "MAINTAINING",
  ERROR = "ERROR",
}

export interface SvgProps {
  className?: string;
}

export interface ResponseInfo {
  message: string;
  result: RequestResult;
}

export enum InspectionSearchParams {
  REGISTRATION_DATE = "REGISTRATION_DATE",
  VALID_UNTIL = "VALID_UNTIL",
  PLATE_NUMBER = "PLATE_NUMBER",
  INSPECTION_NO = "INSPECTION_NO",
}

export interface Dashboard {
  numberOfVehicles: number;
  usingVehicles: number;
  inspectedVehicles: number;
  totalYearCost: number;
  costPerMonth: number[];
  usingVehiclesDetail: VehicleRegisterInfo[];
}

export enum MaintenanceSearchType {
  PLATE_NUMBER = "PLATE_NUMBER",
  START = "START",
  END = "END",
}

export enum AccountRequestResult {
  EXISTED = "EXISTED",
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  ERROR = "ERROR",
}
