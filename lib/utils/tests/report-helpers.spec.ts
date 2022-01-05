import { calculatePoDRotation } from '../report-helpers';

describe('report helpers', () => {
  describe('calculatePoDRotation', () => {
    it('should calculate 130 for 0% at 0', () => {
      const rotation = Math.floor(calculatePoDRotation(0));

      expect(rotation).toBe(130);
    });
    it('should calculate 0 for 1% at 0.01', () => {
      const rotation = Math.floor(calculatePoDRotation(0.01));

      expect(rotation).toBe(0);
    });
    it('should calculate 91 for 5% at 0.05', () => {
      const rotation = Math.floor(calculatePoDRotation(0.05));

      expect(rotation).toBe(-91);
    });
    it('should calculate -130 for 10% at 0.10', () => {
      const rotation = Math.floor(calculatePoDRotation(0.1));

      expect(rotation).toBe(-130);
    });
    it('should calculate -153 for 15% at 0.15', () => {
      const rotation = Math.floor(calculatePoDRotation(0.15));

      expect(rotation).toBe(-153);
    });
    it('should calculate -221 for 50% at 0.5', () => {
      const rotation = Math.floor(calculatePoDRotation(0.5));

      expect(rotation).toBe(-221);
    });
    it('should calculate -260 for 100% at 1', () => {
      const rotation = Math.floor(calculatePoDRotation(1));

      expect(rotation).toBe(-260);
    });
  });
});
