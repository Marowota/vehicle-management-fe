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
  teacherId: number;
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
}
