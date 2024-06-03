import {
  ONE_DAY,
  ONE_HOUR,
  ONE_MINUTE,
  ONE_MONTH,
  ONE_SECOND,
  ONE_YEAR,
} from './constants';
import { getTimeDiff } from './helpers';

describe('getTimeDiff()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('60초 미만 차이일 경우 "방금"을 반환한다.', () => {
    const now = new Date(Date.now());
    const date = new Date(now.getTime() - 30 * ONE_SECOND);
    vi.setSystemTime(now);

    const result = getTimeDiff(date);

    expect(result).toBe('방금');
  });

  it('1분 이상 1시간 미만 차이일 경우 "n분"을 반환한다.', () => {
    const now = new Date(Date.now());
    const date = new Date(now.getTime() - 10 * ONE_MINUTE);
    vi.setSystemTime(now);

    const result = getTimeDiff(date);

    expect(result).toBe('10분');
  });

  it('1시간 이상 1일 미만 차이일 경우 "n시간"을 반환한다.', () => {
    const now = new Date(Date.now());
    const date = new Date(now.getTime() - 3 * ONE_HOUR);
    vi.setSystemTime(now);

    const result = getTimeDiff(date);

    expect(result).toBe('3시간');
  });

  it('1일 이상 1개월 미만 차이일 경우 "n일"을 반환한다.', () => {
    const now = new Date(Date.now());
    const date = new Date(now.getTime() - 5 * ONE_DAY);
    vi.setSystemTime(now);

    const result = getTimeDiff(date);

    expect(result).toBe('5일');
  });

  it('1개월 이상 1년 미만 차이일 경우 "n개월"을 반환한다.', () => {
    const now = new Date(Date.now());
    const date = new Date(now.getTime() - 8 * ONE_MONTH);
    vi.setSystemTime(now);

    const result = getTimeDiff(date);

    expect(result).toBe('8개월');
  });

  it('1년 이상 차이일 경우 "n년"을 반환한다.', () => {
    const now = new Date(Date.now());
    const date = new Date(now.getTime() - 2 * ONE_YEAR);
    vi.setSystemTime(now);

    const result = getTimeDiff(date);

    expect(result).toBe('2년');
  });
});
