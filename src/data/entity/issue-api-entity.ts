export interface IssueSummaryEntity {
  data: {
    id: number;
    title: string;
    is_open: boolean;
    created_at: string;
    labels: {
      id: number;
      title: string;
      text_color: string;
      background_color: string;
    } | null;
    milestones: {
      id: number;
      title: string;
    } | null;
    users: {
      id: string;
      raw_user_meta_data: {
        nickname: string;
        avatar: string;
      };
    };
  }[];
  openIssueCount: number;
  closeIssueCount: number;
}

export interface IssueDetailEntity {
  data: {
    id: number;
    title: string;
    contents: string;
    is_open: boolean;
    created_at: Date;
    users: {
      id: string;
      raw_user_meta_data: {
        nickname: string;
        avatar: string;
      };
    };
    labels: {
      id: number;
      title: string;
      text_color: string;
      background_color: string;
    } | null;
    milestones: {
      id: number;
      title: string;
    } | null;
    comments:
      | {
          id: number;
          contents: string;
          created_at: Date;
          users: {
            id: string;
            raw_user_meta_data: {
              nickname: string;
              avatar: string;
            };
          };
        }[]
      | null;
  };
}
