/* eslint-disable sonarjs/no-duplicate-string */

// update will occur after job is completed

/**
 * stage 1:
 * PENDING => job.created_at === job.updated_at || !finished_at
 * stage 2.a:
 * COMPLETED => job.created_at !== job.updated_at // finished_at will be later
 * stage 2.b:
 * FAILED => job.created_at !== job.updated_at && job.total_reports === job.failed_reports
 */

const d1 = new Date();
const d2 = new Date();

const now = d1.toISOString();

const oneHourAgo = new Date(d2.setHours(d2.getHours() - 1));
const overFourHoursAgo = new Date(d2.setHours(d2.getHours() - 5));

export const mockBatchReports = {
  batchReports: [
    // PENDING
    {
      id: '713bcdc8-161c-4651-baa0-2a8add2800bf',
      name: 'pending 1',
      created_at: now,
      updated_at: now,
      finished_at: null,
      owner_id: '29940f49-0ba8-4898-a060-a9beb7677e57',
      total_reports: 0,
      failed_reports: 0
    },
    {
      id: '2130aaf9-599b-4005-8963-96f74fe7791b',
      name: 'pending 2',
      created_at: now,
      updated_at: now,
      finished_at: null,
      owner_id: '29940f49-0ba8-4898-a060-a9beb7677e57',
      total_reports: 10,
      failed_reports: 10
    },
    // COMPLETE
    {
      id: '44c8aca7-0885-4c92-b541-70193fece48b',
      name: 'completed 1',
      created_at: overFourHoursAgo,
      updated_at: oneHourAgo,
      finished_at: null,
      owner_id: '29940f49-0ba8-4898-a060-a9beb7677e57',
      total_reports: null,
      failed_reports: 3081
    },
    {
      id: '2332d661-3ef3-478b-a587-a5199090081c',
      name: 'completed 2',
      created_at: overFourHoursAgo,
      updated_at: oneHourAgo,
      finished_at: null,
      owner_id: '29940f49-0ba8-4898-a060-a9beb7677e57',
      total_reports: 0,
      failed_reports: 3
    },
    // FAILED
    {
      id: '0879b343-cf08-4d35-b0df-e7abd6b297c7',
      name: 'failed 1',
      created_at: overFourHoursAgo,
      updated_at: oneHourAgo,
      finished_at: null,
      owner_id: '29940f49-0ba8-4898-a060-a9beb7677e57',
      total_reports: 3,
      failed_reports: 3
    },
    {
      id: 'd64f31ce-1ff5-4b94-873a-faa7062a66f3',
      name: 'failed 2',
      created_at: overFourHoursAgo,
      updated_at: oneHourAgo,
      finished_at: null,
      owner_id: '29940f49-0ba8-4898-a060-a9beb7677e57',
      total_reports: 6,
      failed_reports: 6
    }
  ]
};
