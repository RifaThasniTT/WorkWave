import { Router } from "express";
import { container } from "../di/container";
import AdminUserController from "../controllers/admin/user.controller";
import TYPES from "../di/types";
import AdminCompanyController from "../controllers/admin/company.controller";
import { verifyToken } from "../middleware/adminAuth.middleware";

const router = Router();
const userController = container.get<AdminUserController>(
  TYPES.AdminUserController
);
const companyController = container.get<AdminCompanyController>(
  TYPES.AdminCompanyController
);

//Authentication
router.post("/login", userController.login.bind(userController));
router.post("/logout", verifyToken("admin"), userController.logout.bind(userController));

//User Management
router.get(
  "/users",
  verifyToken("admin"),
  userController.listUsers.bind(userController)
);
router.patch(
  "/users/:userId/block",
  verifyToken("admin"),
  userController.blockOrUnblockUser.bind(userController)
);

//Company Management
router.get(
  "/companies",
  verifyToken("admin"),
  companyController.listCompanies.bind(companyController)
);
router.patch(
  "/companies/:companyId/block",
  verifyToken("admin"),
  companyController.blockOrUnblockCompany.bind(companyController)
);
router.get(
  "/companies/requests",
  verifyToken("admin"),
  companyController.listRequests.bind(companyController)
);
router.patch(
  "/companies/:companyId/request-status",
  verifyToken("admin"),
  companyController.updateRequestStatus.bind(companyController)
);

export default router;
