/* eslint-disable sonarjs/cognitive-complexity */
import {
  calculateLGDPercent,
  calculateLGDRotation,
  calculatePoDRatio,
  calculatePoDRotation,
  calculateSMEZScoreMax,
  calculateSMEZScoreRotation
} from '../report-helpers';

describe('report helpers', () => {
  it('pass tests', () => {
    expect(1).toBe(1);
  });

  describe('calculateSMEZScoreMax', () => {
    it('should be less than 2 for 900 to 1000', () => {
      for (let i = 900; i < 1000; i += 10) {
        expect(calculateSMEZScoreMax(i)).toBeLessThan(2);
      }
    });

    it('should be 0.9 for between 700 and 900', () => {
      for (let i = 700; i < 900; i += 10) {
        expect(calculateSMEZScoreMax(i)).toBe(0.9);
      }
    });

    it('should be 0.8 for between 500 and 700', () => {
      for (let i = 500; i < 700; i += 10) {
        expect(calculateSMEZScoreMax(i)).toBe(0.8);
      }
    });

    it('should be 0.7 for between 400 and 500', () => {
      for (let i = 400; i < 500; i += 10) {
        expect(calculateSMEZScoreMax(i)).toBe(0.7);
      }
    });

    it('should be 0.6 for between 270 and 400', () => {
      for (let i = 270; i < 400; i += 5) {
        expect(calculateSMEZScoreMax(i)).toBe(0.6);
      }
    });

    it('should be 0.5 for between 100 and 270', () => {
      for (let i = 100; i < 270; i++) {
        expect(calculateSMEZScoreMax(i)).toBe(0.5);
      }
    });

    it('should be 0.2 for between 0 and 100', () => {
      for (let i = 0; i < 100; i++) {
        expect(calculateSMEZScoreMax(i)).toBe(0.2);
      }
    });
  });

  describe('calculateSMEZScoreRotation', () => {
    it('should be 130 for 900 to 1000', () => {
      for (let i = 900; i < 1000; i += 10) {
        expect(calculateSMEZScoreRotation(i)).toBe(130);
      }
    });

    it('should be 104 for between 700 and 900', () => {
      for (let i = 700; i < 900; i += 10) {
        expect(calculateSMEZScoreRotation(i)).toBe(104);
      }
    });

    it('should be 78 for between 500 and 700', () => {
      for (let i = 500; i < 700; i += 10) {
        expect(calculateSMEZScoreRotation(i)).toBe(78);
      }
    });

    it('should be 52 for between 400 and 500', () => {
      for (let i = 400; i < 500; i += 10) {
        expect(calculateSMEZScoreRotation(i)).toBe(52);
      }
    });

    it('should be 26 for between 270 and 400', () => {
      for (let i = 270; i < 400; i += 5) {
        expect(calculateSMEZScoreRotation(i)).toBe(26);
      }
    });

    it('should be 0 for between 100 and 270', () => {
      for (let i = 100; i < 270; i++) {
        expect(calculateSMEZScoreRotation(i)).toBe(0);
      }
    });

    it('should be -78 for between 0 and 100', () => {
      for (let i = 0; i < 100; i++) {
        expect(calculateSMEZScoreRotation(i)).toBe(-78);
      }
    });
  });

  describe('calculatePoDRatio', () => {
    it('should correctly calculate the ratio', () => {
      expect(calculatePoDRatio(0.5)).toBe(0.9);
      expect(calculatePoDRatio(1)).toBe(0.1);
      expect(calculatePoDRatio(1.5)).toBe(0.2);
      expect(calculatePoDRatio(2)).toBe(0.3);
      expect(calculatePoDRatio(2.5)).toBe(0.4);
      expect(calculatePoDRatio(3)).toBe(0.5);
      expect(calculatePoDRatio(3.5)).toBe(0.6);
      expect(calculatePoDRatio(4)).toBe(0.7);
      expect(calculatePoDRatio(4.5)).toBe(0.8);
      expect(calculatePoDRatio(5)).toBe(0.9);
      expect(calculatePoDRatio(5.5)).toBe(1);
      expect(calculatePoDRatio(6)).toBe(1);
      expect(calculatePoDRatio(6.5)).toBe(1);
      expect(calculatePoDRatio(7)).toBe(1);
      expect(calculatePoDRatio(7.5)).toBe(1);
      expect(calculatePoDRatio(8)).toBe(1);
      expect(calculatePoDRatio(8.5)).toBe(1);
      expect(calculatePoDRatio(9)).toBe(1);
      expect(calculatePoDRatio(9.5)).toBe(1);
    });
  });

  describe('calculatePoDRotation', () => {
    it('should correctly calculate the rotation', () => {
      expect(calculatePoDRotation(0)).toBe(130);
      expect(calculatePoDRotation(0.5)).toBe(104);
      expect(calculatePoDRotation(1)).toBe(-104);
      expect(calculatePoDRotation(1.5)).toBe(-78);
      expect(calculatePoDRotation(2)).toBe(-52);
      expect(calculatePoDRotation(2.5)).toBe(-26);
      expect(calculatePoDRotation(3)).toBe(0);
      expect(calculatePoDRotation(3.5)).toBe(26);
      expect(calculatePoDRotation(4)).toBe(52);
      expect(calculatePoDRotation(4.5)).toBe(78);
      expect(calculatePoDRotation(5)).toBe(104);
      expect(calculatePoDRotation(5.5)).toBe(130);
      expect(calculatePoDRotation(6)).toBe(130);
      expect(calculatePoDRotation(6.5)).toBe(130);
      expect(calculatePoDRotation(7)).toBe(130);
      expect(calculatePoDRotation(7.5)).toBe(130);
      expect(calculatePoDRotation(8)).toBe(130);
      expect(calculatePoDRotation(8.5)).toBe(130);
      expect(calculatePoDRotation(9)).toBe(130);
      expect(calculatePoDRotation(9.5)).toBe(130);
    });
  });

  describe('calculateLGDPercent', () => {
    it('correctly calculate the LGD percent', () => {
      expect(calculateLGDPercent(0)).toBe(0);
      expect(calculateLGDPercent(0.5)).toBe(0.58);
      expect(calculateLGDPercent(1)).toBe(0.1);
      expect(calculateLGDPercent(1.5)).toBe(0.6);
      expect(calculateLGDPercent(2)).toBe(1);
      expect(calculateLGDPercent(2.5)).toBe(1);
      expect(calculateLGDPercent(3)).toBe(1);
      expect(calculateLGDPercent(3.5)).toBe(1);
      expect(calculateLGDPercent(4)).toBe(1);
      expect(calculateLGDPercent(4.5)).toBe(1);
      expect(calculateLGDPercent(5)).toBe(1);
      expect(calculateLGDPercent(5.5)).toBe(1);
      expect(calculateLGDPercent(6)).toBe(1);
      expect(calculateLGDPercent(6.5)).toBe(1);
      expect(calculateLGDPercent(7)).toBe(1);
      expect(calculateLGDPercent(7.5)).toBe(1);
      expect(calculateLGDPercent(8)).toBe(1);
      expect(calculateLGDPercent(8.5)).toBe(1);
      expect(calculateLGDPercent(9)).toBe(1);
      expect(calculateLGDPercent(9.5)).toBe(1);
      expect(calculateLGDPercent(10)).toBe(1);
    });
  });

  describe('calculateLGDRotation', () => {
    it('correctly calculate the LGD rotation', () => {
      expect(calculateLGDRotation(0)).toBe(-130);
      expect(calculateLGDRotation(0.5)).toBe(20.799999999999983);
      expect(calculateLGDRotation(1)).toBe(-104);
      expect(calculateLGDRotation(1.5)).toBe(26);
      expect(calculateLGDRotation(2)).toBe(130);
      expect(calculateLGDRotation(2.5)).toBe(130);
      expect(calculateLGDRotation(3)).toBe(130);
      expect(calculateLGDRotation(3.5)).toBe(130);
      expect(calculateLGDRotation(4)).toBe(130);
      expect(calculateLGDRotation(4.5)).toBe(130);
      expect(calculateLGDRotation(5)).toBe(130);
      expect(calculateLGDRotation(5.5)).toBe(130);
      expect(calculateLGDRotation(6)).toBe(130);
      expect(calculateLGDRotation(6.5)).toBe(130);
      expect(calculateLGDRotation(7)).toBe(130);
      expect(calculateLGDRotation(7.5)).toBe(130);
      expect(calculateLGDRotation(8)).toBe(130);
      expect(calculateLGDRotation(8.5)).toBe(130);
      expect(calculateLGDRotation(9)).toBe(130);
      expect(calculateLGDRotation(9.5)).toBe(130);
      expect(calculateLGDRotation(10)).toBe(130);
    });
  });
});
