export class Contact {
  ID: number;
  FullName: string;
  Email: string;
  Subject: string;
  Description: string;
  Replies: Contact[];
  ContactId: Number;
  IsShow: boolean;
  IsConfirm: boolean;
  IsRead: boolean;
  IsEmailSend: boolean;
  CreatedAt: any;
  ContactType: number;
}
