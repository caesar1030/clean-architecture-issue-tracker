export interface IssueEntity {
  data: {
    id: number;
    title: string;
    contents: string;
    is_open: boolean;
    created_at: Date;
    author: {
      id: string;
      raw_user_meta_data: {
        nickname: string;
        avatar: string;
      };
    };
    assignee: {
      id: string;
      raw_user_meta_data: {
        nickname: string;
        avatar: string;
      };
    } | null;
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
          author: {
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

export interface IssuesEntity {
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
    author: {
      id: string;
      raw_user_meta_data: {
        nickname: string;
        avatar: string;
      };
    };
    assignee: {
      id: string;
      raw_user_meta_data: {
        nickname: string;
        avatar: string;
      };
    } | null;
  }[];
  openIssueCount: number;
  closeIssueCount: number;
}
