import { ReportUploadRequestBody } from './report';

export type BatchAutoUploadHeaders = 'iso_code' | 'company_id';

export interface BatchReportResponse {
  currency: string;
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  finished_at?: Date;
  total_reports?: number;
  failed_reports?: number;
  owner_id: number;
  summaries?: BatchSummary[];
  has_failed?: boolean;
}

export interface Entity {
  iso_code: string;
  company_id: string;
}

export interface BatchSummary {
  id: string;
  company_name: string;
  iso_code: string;
  company_id: string;
  sme_z_score: number;
  bond_rating_equivalent: string;
  loss_given_default: number;
  probability_of_default_1_year: number;
  created_at: string;
  bookmarked: boolean;
}

export interface GetBatchSummary extends BatchReportResponse {
  skip: number;
  limit: number;
  summaries: BatchSummary[];
}

/**
 * Request body shape
 */
export interface BatchReport<T> {
  name: string;
  currency?: string;
  entities: T[];
  /** @deprecated */
  accounts_type: number;
}

/**
 * @todo check to see if still relevant since the refactor
 */

// GET /api/v1/jobs/batch response

export type BatchJobsGetAllResponse = BatchReportResponse[];

// POST /api/v1/jobs/batch request

export type BatchAutoRequest = BatchReport<Entity>;

// POST /api/v1/jobs/batch response

export type CreateBatchJobResponse = BatchReportResponse;

// GET /api/v1/jobs/batch/{batch_id} response

export type BatchJobGetByIdResponse = GetBatchSummary;

// POST /api/v1/jobs/batch/upload request

export type BatchManualRequest = BatchReport<ReportUploadRequestBody>;

// POST /api/v1/jobs/batch/upload response

export type BatchJobUploadResponse = BatchReportResponse;
