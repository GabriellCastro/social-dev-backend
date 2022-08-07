import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token não encontrado!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);

    const { id: userId } = decoded as TokenPayload;

    req.user = {
      id: userId,
    };

    return next();
  } catch {
    throw new AppError("JWT token inválido!", 401);
  }
}
