import type { NextFunction, Request, Response } from "express";
type AsyncController = (req: Request, res: Response, next: NextFunction) => Promise<any>;
declare const catchErrors: (controller: AsyncController) => AsyncController;
export default catchErrors;
//# sourceMappingURL=catchErrors.d.ts.map