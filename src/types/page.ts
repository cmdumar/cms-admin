export interface Page {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface PagesResponse {
  status: string;
  data: Page[];
}

export interface PageResponse {
  status: string;
  data: Page;
}

export interface PageParams {
  id: string;
}
