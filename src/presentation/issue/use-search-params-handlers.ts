import { useSearchParams } from 'react-router-dom';
import { Label } from '../../domain/model/label/label';
import { Milestone } from '../../domain/model/milestone/milestone';
import { User } from '../../domain/model/user/user';
import { IssuesFilterPayload } from '../../domain/model/issue/payload';

export const OPEN_STATUS_KEY = 'isOpen';
export const LABEL_KEY = 'label';
export const MILESTONE_KEY = 'milestone';
export const AUTHOR_KEY = 'author';
export const ASSIGNEE_KEY = 'assignee';
export const LIKE_KEY = 'like';
export const NO_KEY = 'no';

export const OPEN = 'open';
export const CLOSE = 'close';
export const UNLABELD = 'label';
export const NOT_WITH_MILESTONE = 'milestone';
export const ASSIGNED_TO_NOBODY = 'assignee';

export default function useSearchParamsHandlers() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getOpenStatusSearchParam = () => searchParams.get(OPEN_STATUS_KEY);
  const getLabelSearchParam = () => searchParams.get(LABEL_KEY);
  const getMilestoneSearchParam = () => searchParams.get(MILESTONE_KEY);
  const getAuthorSearchParam = () => searchParams.get(AUTHOR_KEY);
  const getAssigneeSearchParam = () => searchParams.get(ASSIGNEE_KEY);
  const getLikeSearchParams = () => searchParams.getAll(LIKE_KEY);
  const getNoSearchParams = () => searchParams.getAll(NO_KEY);

  const setOpenStatusSearchParam = (isOpen: boolean | null) => {
    if (isOpen === null) {
      searchParams.delete(OPEN_STATUS_KEY);
    } else {
      searchParams.set(OPEN_STATUS_KEY, isOpen ? OPEN : CLOSE);
    }
    setSearchParams(searchParams);
  };

  const toggleLabelSearchParam = (value: Label['title']) => {
    const noSearchParams = searchParams.getAll(NO_KEY);
    if (noSearchParams.includes(UNLABELD)) {
      searchParams.delete(NO_KEY);
      noSearchParams
        .filter((noSearchParam) => noSearchParam !== UNLABELD)
        .forEach((noSearchParam) => searchParams.append(NO_KEY, noSearchParam));
    }

    if (searchParams.get(LABEL_KEY) === value) {
      searchParams.delete(LABEL_KEY);
    } else {
      searchParams.set(LABEL_KEY, value);
    }
    setSearchParams(searchParams);
  };

  const toggleMilestoneSearchParam = (value: Milestone['title']) => {
    const noSearchParams = searchParams.getAll(NO_KEY);
    if (noSearchParams.includes(NOT_WITH_MILESTONE)) {
      searchParams.delete(NO_KEY);
      noSearchParams
        .filter((noSearchParam) => noSearchParam !== NOT_WITH_MILESTONE)
        .forEach((noSearchParam) => searchParams.append(NO_KEY, noSearchParam));
    }

    if (searchParams.get(MILESTONE_KEY) === value) {
      searchParams.delete(MILESTONE_KEY);
    } else {
      searchParams.set(MILESTONE_KEY, value);
    }
    setSearchParams(searchParams);
  };

  const toggleAuthorSearchParam = (value: User['nickname']) => {
    if (searchParams.get(AUTHOR_KEY) === value) {
      searchParams.delete(AUTHOR_KEY);
    } else {
      searchParams.set(AUTHOR_KEY, value);
    }

    setSearchParams(searchParams);
  };

  const toggleAssigneeSearchParam = (value: User['nickname']) => {
    const noSearchParams = searchParams.getAll(NO_KEY);
    if (noSearchParams.includes(ASSIGNED_TO_NOBODY)) {
      searchParams.delete(NO_KEY);
      noSearchParams
        .filter((noSearchParam) => noSearchParam !== ASSIGNED_TO_NOBODY)
        .forEach((noSearchParam) => searchParams.append(NO_KEY, noSearchParam));
    }

    if (searchParams.get(ASSIGNEE_KEY) === value) {
      searchParams.delete(ASSIGNEE_KEY);
    } else {
      searchParams.set(ASSIGNEE_KEY, value);
    }
    setSearchParams(searchParams);
  };

  const setLikeSearchParams = (values: string[]) => {
    searchParams.delete(LIKE_KEY);
    values.forEach((value) => searchParams.append(LIKE_KEY, value));
    setSearchParams(searchParams);
  };

  const toggleUnlabeled = () => {
    searchParams.delete(LABEL_KEY);

    const noSearchParams = searchParams.getAll(NO_KEY);

    if (noSearchParams.includes(UNLABELD)) {
      searchParams.delete(NO_KEY);
      noSearchParams
        .filter((noSearchParam) => noSearchParam !== UNLABELD)
        .forEach((noSearchParam) => searchParams.append(NO_KEY, noSearchParam));
    } else {
      searchParams.append(NO_KEY, UNLABELD);
    }

    setSearchParams(searchParams);
  };

  const toggleNotWithMilestone = () => {
    searchParams.delete(MILESTONE_KEY);

    const noSearchParams = searchParams.getAll(NO_KEY);

    if (noSearchParams.includes(NOT_WITH_MILESTONE)) {
      searchParams.delete(NO_KEY);
      noSearchParams
        .filter((noSearchParam) => noSearchParam !== NOT_WITH_MILESTONE)
        .forEach((noSearchParam) => searchParams.append(NO_KEY, noSearchParam));
    } else {
      searchParams.append(NO_KEY, NOT_WITH_MILESTONE);
    }

    setSearchParams(searchParams);
  };

  const toggleAssignedToNobody = () => {
    searchParams.delete(ASSIGNEE_KEY);

    const noSearchParams = searchParams.getAll(NO_KEY);

    if (noSearchParams.includes(ASSIGNED_TO_NOBODY)) {
      searchParams.delete(NO_KEY);
      noSearchParams
        .filter((noSearchParam) => noSearchParam !== ASSIGNED_TO_NOBODY)
        .forEach((noSearchParam) => searchParams.append(NO_KEY, noSearchParam));
    } else {
      searchParams.append(NO_KEY, ASSIGNED_TO_NOBODY);
    }

    setSearchParams(searchParams);
  };

  const initSearchParams = () => {
    searchParams.delete(OPEN_STATUS_KEY);
    searchParams.delete(LABEL_KEY);
    searchParams.delete(MILESTONE_KEY);
    searchParams.delete(AUTHOR_KEY);
    searchParams.delete(ASSIGNEE_KEY);
    searchParams.delete(LIKE_KEY);
    searchParams.delete(NO_KEY);

    searchParams.set(OPEN_STATUS_KEY, OPEN);
    setSearchParams(searchParams);
  };

  const parseSearchQuery = (query: string) => {
    const terms = query.split(' ');

    const initialFilter: IssuesFilterPayload = {
      likes: [],
      no: {},
    };

    const addTermToFilter = (filter: IssuesFilterPayload, term: string) => {
      const [key, value] = term.split(':');

      switch (key) {
        case '':
          break;

        case OPEN_STATUS_KEY:
          if (value === OPEN) filter.isOpen = true;
          if (value === CLOSE) filter.isOpen = false;
          break;

        case LABEL_KEY:
          filter.labelTitle = value;
          break;

        case MILESTONE_KEY:
          filter.milestoneTitle = value;
          break;

        case AUTHOR_KEY:
          filter.authorNickname = value;
          break;

        case ASSIGNEE_KEY:
          filter.assigneeNickname = value;
          break;

        case NO_KEY:
          if (value === UNLABELD) filter.no!.label = 'unlabeled';
          if (value === NOT_WITH_MILESTONE)
            filter.no!.milestone = 'notWithMilestone';
          if (value === ASSIGNED_TO_NOBODY)
            filter.no!.assignee = 'assignedToNobody';
          break;

        default:
          filter.likes!.push(term);
          break;
      }

      return filter;
    };

    return terms.reduce<IssuesFilterPayload>(addTermToFilter, initialFilter);
  };

  // 검색어 -> url
  const convertQueryToParams = (searchQuery: string) => {
    const {
      isOpen,
      labelTitle,
      milestoneTitle,
      authorNickname,
      assigneeNickname,
      likes,
      no,
    } = parseSearchQuery(searchQuery);
    searchParams.delete(OPEN_STATUS_KEY);
    searchParams.delete(LIKE_KEY);
    searchParams.delete(LABEL_KEY);
    searchParams.delete(AUTHOR_KEY);
    searchParams.delete(ASSIGNEE_KEY);
    searchParams.delete(MILESTONE_KEY);
    searchParams.delete(NO_KEY);

    if (isOpen !== undefined)
      searchParams.set(OPEN_STATUS_KEY, isOpen ? OPEN : CLOSE);
    if (labelTitle) searchParams.set(LABEL_KEY, labelTitle);
    if (milestoneTitle) searchParams.set(MILESTONE_KEY, milestoneTitle);
    if (authorNickname) searchParams.set(AUTHOR_KEY, authorNickname);
    if (assigneeNickname) searchParams.set(ASSIGNEE_KEY, assigneeNickname);
    if (likes?.length)
      likes.forEach((value) => searchParams.append(LIKE_KEY, value));

    if (no && 'label' in no) {
      searchParams.delete(LABEL_KEY);
      searchParams.append(NO_KEY, UNLABELD);
    }
    if (no && 'milestone' in no) {
      searchParams.delete(MILESTONE_KEY);
      searchParams.append(NO_KEY, NOT_WITH_MILESTONE);
    }
    if (no && 'assignee' in no) {
      searchParams.delete(ASSIGNEE_KEY);
      searchParams.append(NO_KEY, ASSIGNED_TO_NOBODY);
    }

    setSearchParams(searchParams);
  };

  const convertParamsToQuery = () => {
    let query = '';
    if (isCloseStatus) query += `${OPEN_STATUS_KEY}:${CLOSE} `;
    if (isOpenStatus) query += `${OPEN_STATUS_KEY}:${OPEN} `;

    const labelSearchParam = getLabelSearchParam();
    if (labelSearchParam) query += `${LABEL_KEY}:${labelSearchParam} `;

    const milestoneSearchParam = getMilestoneSearchParam();
    if (milestoneSearchParam)
      query += `${MILESTONE_KEY}:${milestoneSearchParam} `;

    const authorSearchParam = getAuthorSearchParam();
    if (authorSearchParam) query += `${AUTHOR_KEY}:${authorSearchParam} `;

    const assigneeSearchParam = getAssigneeSearchParam();
    if (assigneeSearchParam) query += `${ASSIGNEE_KEY}:${assigneeSearchParam} `;

    const likeSearchParmas = getLikeSearchParams();
    if (likeSearchParmas) query += likeSearchParmas.join(' ');

    const noSearchParams = getNoSearchParams();
    if (noSearchParams)
      query += noSearchParams
        .map((noSearchParam) => `no:${noSearchParam}`)
        .join(' ');

    return query;
  };

  const getFilterOptions = () => {
    const filterOptions: IssuesFilterPayload = {};

    if (isCloseStatus) filterOptions.isOpen = false;
    if (isOpenStatus) filterOptions.isOpen = true;

    const labelSearchParam = searchParams.get(LABEL_KEY);
    if (labelSearchParam) filterOptions.labelTitle = labelSearchParam;

    const milestoneSearchParam = searchParams.get(MILESTONE_KEY);
    if (milestoneSearchParam)
      filterOptions.milestoneTitle = milestoneSearchParam;

    const authorSearchParam = searchParams.get(AUTHOR_KEY);
    if (authorSearchParam) filterOptions.authorNickname = authorSearchParam;

    const assigneeSearchParam = searchParams.get(ASSIGNEE_KEY);
    if (assigneeSearchParam)
      filterOptions.assigneeNickname = assigneeSearchParam;

    const likeSearchParmas = searchParams.getAll(LIKE_KEY);
    if (likeSearchParmas.length) filterOptions.likes = likeSearchParmas;

    const noSearchParams = searchParams.getAll(NO_KEY);
    if (noSearchParams.length) {
      filterOptions.no = {};
      noSearchParams.forEach((noSearchParam) => {
        if (noSearchParam === UNLABELD) filterOptions.no!.label = 'unlabeled';
        if (noSearchParam === NOT_WITH_MILESTONE)
          filterOptions.no!.milestone = 'notWithMilestone';
        if (noSearchParam === ASSIGNED_TO_NOBODY)
          filterOptions.no!.assignee = 'assignedToNobody';
      });
    }

    return filterOptions;
  };

  const isOpenStatus = searchParams.get(OPEN_STATUS_KEY) === OPEN;
  const isCloseStatus = searchParams.get(OPEN_STATUS_KEY) === CLOSE;
  const isUnLabeld = searchParams.getAll(NO_KEY)?.includes(UNLABELD);
  const isNotWithMilestone = searchParams
    .getAll(NO_KEY)
    ?.includes(NOT_WITH_MILESTONE);
  const isAssignedToNobody = searchParams
    .getAll(NO_KEY)
    ?.includes(ASSIGNED_TO_NOBODY);

  const hasLabelSearchParam = searchParams.has(LABEL_KEY);
  const hasMilestoneSearchParam = searchParams.has(MILESTONE_KEY);
  const hasLikeSearchParam = searchParams.has(LIKE_KEY);
  const hasAuthorSearchParam = searchParams.has(AUTHOR_KEY);
  const hasAssigneeSearchParam = searchParams.has(ASSIGNEE_KEY);
  const hasNoSearchParam = searchParams.has(NO_KEY);

  return {
    getOpenStatusSearchParam,
    getLabelSearchParam,
    getMilestoneSearchParam,
    getAuthorSearchParam,
    getAssigneeSearchParam,
    getLikeSearchParams,
    getNoSearchParams,

    setOpenStatusSearchParam,
    toggleLabelSearchParam,
    toggleMilestoneSearchParam,
    toggleAuthorSearchParam,
    toggleAssigneeSearchParam,
    toggleUnlabeled,
    toggleNotWithMilestone,
    toggleAssignedToNobody,
    setLikeSearchParams,
    initSearchParams,

    isOpenStatus,
    isCloseStatus,
    isUnLabeld,
    isNotWithMilestone,
    isAssignedToNobody,
    hasLabelSearchParam,
    hasMilestoneSearchParam,
    hasAuthorSearchParam,
    hasAssigneeSearchParam,
    hasLikeSearchParam,
    hasNoSearchParam,

    convertQueryToParams,
    convertParamsToQuery,
    getFilterOptions,
  };
}
