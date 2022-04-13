export interface Organisation {
  name: string;
  max_users: number;
  send_user_limit_email: boolean;
  id: string;
  quota: {
    enable_quota: boolean;
    quota_limit: number;
    quota_used: number;
    renewal_date: string;
    renewal_date_advance_days: number;
    send_renewal_email: boolean;
    send_quota_limit_email: boolean;
    assigned_wf_user: string;
    assigned_customer_email: string;
  };
}
