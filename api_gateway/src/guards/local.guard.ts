/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class AdminAuthGuard extends AuthGuard('admin'){}
export class CustomerAuthGuard extends AuthGuard('customer'){}
export class SupplierAuthGuard extends AuthGuard('supplier'){}