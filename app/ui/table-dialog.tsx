import * as Dialog from "@radix-ui/react-dialog";
import { VehicleSpec } from "../lib/definitions";

interface TableDialogProps {
  plateNumber: string;
  spec: VehicleSpec;
}

const TableDialog = ({ plateNumber, spec }: TableDialogProps) => (
  <Dialog.Root>
    <Dialog.Trigger asChild className="w-full h-full text-left text-blue-600">
      <button>{spec.brand ? spec.brand : "No brand"}</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow " />
      <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          Thông số xe {plateNumber}
        </Dialog.Title>
        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
          Loại xe: {spec.type}
          <br />
          Hãng: {spec.brand}
          <br />
          Mã loại xe: {spec.modelCode}
          <br />
          Số chỗ ngồi: {spec.noOfSeat}
          <br />
          Sản xuất tại: {spec.madeIn}
          <br />
          Loại xăng: {spec.fuelType}
          <br />
          Mức tiêu thụ nhiên liệu / 100km: {spec.fuelConsumptionPer100Km}
          <br />
          Dung tích bình xăng: {spec.tankCapacity}
          <br />
          Tốc độ tối đa: {spec.topSpeed}
          <br />
          Kích thước bánh trước: {spec.frontRimsDimension}
          <br />
          Kích thước bánh sau: {spec.backRimsDimension}
        </Dialog.Description>

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none">
              Đóng
            </button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button
            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
            aria-label="Close"
          ></button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default TableDialog;
