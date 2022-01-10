import { MockBoardMembers } from '../../mock-data/boardMembers';
import { getBoardMember } from '../text-helpers';

describe('Text Helpers', () => {
  describe('getBoardMember', () => {
    it('should return the first CEO', () => {
      // @ts-ignore
      expect(getBoardMember('CEO', MockBoardMembers)).toBe(
        'Mr Kevin P. Murphy'
      );
    });
    it('should return the first CFO', () => {
      // @ts-ignore
      expect(getBoardMember('CFO', MockBoardMembers)).toBe('Mr Imran Nawaz');
    });
    it('should return the first Chairman', () => {
      // @ts-ignore
      expect(getBoardMember('Chairman', MockBoardMembers)).toBe(
        'Mr John Murray Allan'
      );
    });
    it('should return an empty string for all positions if the array is empty', () => {
      // @ts-ignore
      expect(getBoardMember('CEO', [])).toBe('');
      expect(getBoardMember('CFO', [])).toBe('');
      expect(getBoardMember('Chairman', [])).toBe('');
    });
    it('should return an empty string for all positions if the array is undefined', () => {
      // @ts-ignore
      expect(getBoardMember('CEO')).toBe('');
      expect(getBoardMember('CFO')).toBe('');
      expect(getBoardMember('Chairman')).toBe('');
    });
  });
});
