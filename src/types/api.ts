// User Types
export interface User {
  id: number;
  created_at: number;
  name: string;
  email: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  phone_number?: string;
  date_of_birth?: string;
  currency?: string;
  monthly_budget?: number;
  notification_preferences?: string;
  onboarding_completed?: boolean;
  address?: string;
}

export interface AuthResponse {
  authToken: string;
  user: User;
}

// Category Types
export interface Category {
  id: number;
  created_at: string;
  name: string;
  color: string;
  icon: string;
  budget_limit: number;
  is_default: boolean;
  user_id: number;
}

// Transaction Types
export interface Transaction {
  id: number;
  created_at: string;
  title: string;
  description: string;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  time: string;
  location: string;
  receipt_image_url: string;
  receipt_data: string;
  status: 'completed' | 'pending' | 'failed';
  notes: string;
  user_id: number;
  category_id: number;
  payment_method_id: number;
}

// Budget Types
export interface Budget {
  id: number;
  created_at: string;
  amount: number;
  period: string;
  start_date: string;
  end_date: string;
  user_id: number;
  category_id: number;
}

// Payment Method Types
export interface PaymentMethod {
  id: number;
  created_at: string;
  name: string;
  type: string;
  last_four_digits: string;
  is_default: boolean;
  is_active: boolean;
  user_id: number;
}

// Notification Types
export interface Notification {
  id: number;
  created_at: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  user_id: number;
}

// Receipt Types
export interface Receipt {
  id: number;
  created_at: string;
  original_image_url: string;
  processed_data: string;
  vendor_name: string;
  total_amount: number;
  tax_amount: number;
  date: string;
  processing_status: string;
  user_id: number;
  transaction_id: number;
}

// Report Types
export interface Report {
  id: number;
  created_at: string;
  report_type: string;
  period_start: string;
  period_end: string;
  data: string;
  generated_at: string;
  user_id: number;
}
