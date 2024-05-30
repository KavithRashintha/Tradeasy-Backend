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