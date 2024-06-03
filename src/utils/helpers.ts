import {
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_MONTH,
  ONE_YEAR,
} from './constants';

export const getTimeDiff = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / ONE_MINUTE);
  const hours = Math.floor(diff / ONE_HOUR);
  const days = Math.floor(diff / ONE_DAY);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (diff < ONE_MINUTE) {
    return '방금';
  } else if (diff < ONE_HOUR) {
    return `${minutes}분`;
  } else if (diff < ONE_DAY) {
    return `${hours}시간`;
  } else if (diff < ONE_MONTH) {
    return `${days}일`;
  } else if (diff < ONE_YEAR) {
    return `${months}개월`;
  } else {
    return `${years}년`;
  }
};

export const generateRandomColor = (): string => {
  return `#${Array.from(
    { length: 6 },
    () => '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
  ).join('')}`;
};
