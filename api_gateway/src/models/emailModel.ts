export class GeneralEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class OrderStatusChangeEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class CustomerWarningEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class CustomerTerminationEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class SupplierTerminationEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class CustomerInvoiceEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
    readonly pdfFilePath?: any;
}

export class SupplierCredentialsEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class PurchaseOrderStatusEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class InventoryRefundStatusEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}

export class ResetPasswordEmailDTO {
    readonly receiverName?: string;
    readonly emailSubject?: string;
    readonly emailBody?: string;
    readonly receiverEmail?: string;
}