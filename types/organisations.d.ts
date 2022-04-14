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

export interface OrganisationUser {
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  full_name: string;
  organisation_id: string;
  preferences: {
    defaults: {
      locale: string;
      currency: string;
      home_page: string;
      reporting_country: string;
    };
    communication: {
      batch_report_email: boolean;
      service_updates: boolean;
      company_updates: boolean;
    };
  };
  id: string;
}
