import { Request, Response } from 'express';

export interface IRequest extends Request {
  identifier?: string;
}

// tslint:disable-next-line:no-empty-interface
export interface IResponse extends Response {

}
