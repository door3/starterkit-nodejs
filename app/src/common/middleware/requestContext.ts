import { IRequest, IResponse } from '../interfaces/http.interfaces';
import { NextFunction } from 'express';

import * as shortid from 'shortid';

export function requestContext(req: IRequest, _: IResponse, next: NextFunction) {
  req.identifier = shortid.generate();
  next();
}
