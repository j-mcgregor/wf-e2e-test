/* eslint-disable sonarjs/cognitive-complexity */
import {
  mockCsvValues,
  mockReportObject,
  mockUploadReportReqBody
} from '../../../__mocks__/reports/report-helpers/mock-data';
import {
  calculateLGDPercent,
  calculateLGDRotation,
  calculatePoDRatio,
  calculatePoDRotation,
  calculateSMEZScoreMax,
  calculateSMEZScoreRotation,
  makeUploadReportReqBody
} from '../report-helpers';

describe('report helpers', () => {
  describe('calculateSMEZScoreMax', () => {
    it('should be less than 2 for 900 to 1000', () => {
      expect(Number(calculateSMEZScoreMax(900).toFixed(2))).toBe(0.9);
      expect(Number(calculateSMEZScoreMax(910).toFixed(2))).toBe(0.91);
      expect(Number(calculateSMEZScoreMax(920).toFixed(2))).toBe(0.92);
      expect(Number(calculateSMEZScoreMax(930).toFixed(2))).toBe(0.93);
      expect(Number(calculateSMEZScoreMax(940).toFixed(2))).toBe(0.94);
      expect(Number(calculateSMEZScoreMax(950).toFixed(2))).toBe(0.95);
      expect(Number(calculateSMEZScoreMax(960).toFixed(2))).toBe(0.96);
      expect(Number(calculateSMEZScoreMax(970).toFixed(2))).toBe(0.97);
      expect(Number(calculateSMEZScoreMax(980).toFixed(2))).toBe(0.98);
      expect(Number(calculateSMEZScoreMax(990).toFixed(2))).toBe(0.99);
    });

    it('should be 0.9 for between 700 and 900', () => {
      expect(Number(calculateSMEZScoreMax(700).toFixed(2))).toBe(0.8);
      expect(Number(calculateSMEZScoreMax(710).toFixed(2))).toBe(0.81);
      expect(Number(calculateSMEZScoreMax(720).toFixed(2))).toBe(0.81);
      expect(Number(calculateSMEZScoreMax(730).toFixed(2))).toBe(0.82);
      expect(Number(calculateSMEZScoreMax(740).toFixed(2))).toBe(0.82);
      expect(Number(calculateSMEZScoreMax(750).toFixed(2))).toBe(0.83);
      expect(Number(calculateSMEZScoreMax(760).toFixed(2))).toBe(0.83);
      expect(Number(calculateSMEZScoreMax(770).toFixed(2))).toBe(0.84);
      expect(Number(calculateSMEZScoreMax(780).toFixed(2))).toBe(0.84);
      expect(Number(calculateSMEZScoreMax(790).toFixed(2))).toBe(0.85);
      expect(Number(calculateSMEZScoreMax(800).toFixed(2))).toBe(0.85);
      expect(Number(calculateSMEZScoreMax(810).toFixed(2))).toBe(0.86);
      expect(Number(calculateSMEZScoreMax(820).toFixed(2))).toBe(0.86);
      expect(Number(calculateSMEZScoreMax(830).toFixed(2))).toBe(0.86);
      expect(Number(calculateSMEZScoreMax(840).toFixed(2))).toBe(0.87);
      expect(Number(calculateSMEZScoreMax(850).toFixed(2))).toBe(0.88);
      expect(Number(calculateSMEZScoreMax(860).toFixed(2))).toBe(0.88);
      expect(Number(calculateSMEZScoreMax(870).toFixed(2))).toBe(0.89);
      expect(Number(calculateSMEZScoreMax(880).toFixed(2))).toBe(0.89);
      expect(Number(calculateSMEZScoreMax(890).toFixed(2))).toBe(0.9);
    });

    it('should be 0.8 for between 500 and 700', () => {
      expect(Number(calculateSMEZScoreMax(500).toFixed(2))).toBe(0.7);
      expect(Number(calculateSMEZScoreMax(510).toFixed(2))).toBe(0.7);
      expect(Number(calculateSMEZScoreMax(520).toFixed(2))).toBe(0.71);
      expect(Number(calculateSMEZScoreMax(530).toFixed(2))).toBe(0.71);
      expect(Number(calculateSMEZScoreMax(540).toFixed(2))).toBe(0.72);
      expect(Number(calculateSMEZScoreMax(550).toFixed(2))).toBe(0.72);
      expect(Number(calculateSMEZScoreMax(560).toFixed(2))).toBe(0.73);
      expect(Number(calculateSMEZScoreMax(570).toFixed(2))).toBe(0.73);
      expect(Number(calculateSMEZScoreMax(580).toFixed(2))).toBe(0.74);
      expect(Number(calculateSMEZScoreMax(590).toFixed(2))).toBe(0.74);
      expect(Number(calculateSMEZScoreMax(600).toFixed(2))).toBe(0.75);
      expect(Number(calculateSMEZScoreMax(610).toFixed(2))).toBe(0.76);
      expect(Number(calculateSMEZScoreMax(620).toFixed(2))).toBe(0.76);
      expect(Number(calculateSMEZScoreMax(630).toFixed(2))).toBe(0.76);
      expect(Number(calculateSMEZScoreMax(640).toFixed(2))).toBe(0.77);
      expect(Number(calculateSMEZScoreMax(650).toFixed(2))).toBe(0.77);
      expect(Number(calculateSMEZScoreMax(660).toFixed(2))).toBe(0.78);
      expect(Number(calculateSMEZScoreMax(670).toFixed(2))).toBe(0.78);
      expect(Number(calculateSMEZScoreMax(680).toFixed(2))).toBe(0.79);
      expect(Number(calculateSMEZScoreMax(690).toFixed(2))).toBe(0.79);
    });

    it('should be 0.7 for between 400 and 500', () => {
      expect(Number(calculateSMEZScoreMax(400).toFixed(2))).toBe(0.6);
      expect(Number(calculateSMEZScoreMax(410).toFixed(2))).toBe(0.61);
      expect(Number(calculateSMEZScoreMax(420).toFixed(2))).toBe(0.62);
      expect(Number(calculateSMEZScoreMax(430).toFixed(2))).toBe(0.63);
      expect(Number(calculateSMEZScoreMax(440).toFixed(2))).toBe(0.64);
      expect(Number(calculateSMEZScoreMax(450).toFixed(2))).toBe(0.65);
      expect(Number(calculateSMEZScoreMax(460).toFixed(2))).toBe(0.66);
      expect(Number(calculateSMEZScoreMax(470).toFixed(2))).toBe(0.67);
      expect(Number(calculateSMEZScoreMax(480).toFixed(2))).toBe(0.68);
      expect(Number(calculateSMEZScoreMax(490).toFixed(2))).toBe(0.69);
    });

    it('should be 0.6 for between 270 and 400', () => {
      expect(Number(calculateSMEZScoreMax(270).toFixed(2))).toBe(0.5);
      expect(Number(calculateSMEZScoreMax(275).toFixed(2))).toBe(0.5);
      expect(Number(calculateSMEZScoreMax(280).toFixed(2))).toBe(0.51);
      expect(Number(calculateSMEZScoreMax(285).toFixed(2))).toBe(0.51);
      expect(Number(calculateSMEZScoreMax(290).toFixed(2))).toBe(0.52);
      expect(Number(calculateSMEZScoreMax(295).toFixed(2))).toBe(0.52);
      expect(Number(calculateSMEZScoreMax(300).toFixed(2))).toBe(0.52);
      expect(Number(calculateSMEZScoreMax(305).toFixed(2))).toBe(0.53);
      expect(Number(calculateSMEZScoreMax(310).toFixed(2))).toBe(0.53);
      expect(Number(calculateSMEZScoreMax(315).toFixed(2))).toBe(0.53);
      expect(Number(calculateSMEZScoreMax(320).toFixed(2))).toBe(0.54);
      expect(Number(calculateSMEZScoreMax(325).toFixed(2))).toBe(0.54);
      expect(Number(calculateSMEZScoreMax(330).toFixed(2))).toBe(0.55);
      expect(Number(calculateSMEZScoreMax(335).toFixed(2))).toBe(0.55);
      expect(Number(calculateSMEZScoreMax(340).toFixed(2))).toBe(0.55);
      expect(Number(calculateSMEZScoreMax(345).toFixed(2))).toBe(0.56);
      expect(Number(calculateSMEZScoreMax(350).toFixed(2))).toBe(0.56);
      expect(Number(calculateSMEZScoreMax(355).toFixed(2))).toBe(0.57);
      expect(Number(calculateSMEZScoreMax(360).toFixed(2))).toBe(0.57);
      expect(Number(calculateSMEZScoreMax(365).toFixed(2))).toBe(0.57);
      expect(Number(calculateSMEZScoreMax(370).toFixed(2))).toBe(0.58);
      expect(Number(calculateSMEZScoreMax(375).toFixed(2))).toBe(0.58);
      expect(Number(calculateSMEZScoreMax(380).toFixed(2))).toBe(0.58);
      expect(Number(calculateSMEZScoreMax(385).toFixed(2))).toBe(0.59);
      expect(Number(calculateSMEZScoreMax(390).toFixed(2))).toBe(0.59);
      expect(Number(calculateSMEZScoreMax(395).toFixed(2))).toBe(0.6);
    });

    it('should be 0.5 for between 100 and 270', () => {
      expect(Number(calculateSMEZScoreMax(100).toFixed(2))).toBe(0.2);
      expect(Number(calculateSMEZScoreMax(110).toFixed(2))).toBe(0.21);
      expect(Number(calculateSMEZScoreMax(120).toFixed(2))).toBe(0.21);
      expect(Number(calculateSMEZScoreMax(130).toFixed(2))).toBe(0.22);
      expect(Number(calculateSMEZScoreMax(140).toFixed(2))).toBe(0.22);
      expect(Number(calculateSMEZScoreMax(150).toFixed(2))).toBe(0.23);
      expect(Number(calculateSMEZScoreMax(160).toFixed(2))).toBe(0.24);
      expect(Number(calculateSMEZScoreMax(170).toFixed(2))).toBe(0.24);
      expect(Number(calculateSMEZScoreMax(180).toFixed(2))).toBe(0.25);
      expect(Number(calculateSMEZScoreMax(190).toFixed(2))).toBe(0.25);
      expect(Number(calculateSMEZScoreMax(200).toFixed(2))).toBe(0.26);
      expect(Number(calculateSMEZScoreMax(210).toFixed(2))).toBe(0.26);
      expect(Number(calculateSMEZScoreMax(220).toFixed(2))).toBe(0.27);
      expect(Number(calculateSMEZScoreMax(230).toFixed(2))).toBe(0.28);
      expect(Number(calculateSMEZScoreMax(240).toFixed(2))).toBe(0.28);
      expect(Number(calculateSMEZScoreMax(250).toFixed(2))).toBe(0.29);
      expect(Number(calculateSMEZScoreMax(260).toFixed(2))).toBe(0.29);
    });

    it('should be 0.2 for between 0 and 100', () => {
      expect(Number(calculateSMEZScoreMax(0).toFixed(2))).toBe(0.0);
      expect(Number(calculateSMEZScoreMax(10).toFixed(2))).toBe(0.02);
      expect(Number(calculateSMEZScoreMax(20).toFixed(2))).toBe(0.04);
      expect(Number(calculateSMEZScoreMax(30).toFixed(2))).toBe(0.06);
      expect(Number(calculateSMEZScoreMax(40).toFixed(2))).toBe(0.08);
      expect(Number(calculateSMEZScoreMax(50).toFixed(2))).toBe(0.1);
      expect(Number(calculateSMEZScoreMax(60).toFixed(2))).toBe(0.12);
      expect(Number(calculateSMEZScoreMax(70).toFixed(2))).toBe(0.14);
      expect(Number(calculateSMEZScoreMax(80).toFixed(2))).toBe(0.16);
      expect(Number(calculateSMEZScoreMax(90).toFixed(2))).toBe(0.18);
    });
  });

  describe('calculateSMEZScoreRotation', () => {
    it('should be 130 for 900 to 1000', () => {
      expect(Number(calculateSMEZScoreRotation(900).toFixed(1))).toBe(104.0);
      expect(Number(calculateSMEZScoreRotation(910).toFixed(1))).toBe(106.6);
      expect(Number(calculateSMEZScoreRotation(920).toFixed(1))).toBe(109.2);
      expect(Number(calculateSMEZScoreRotation(930).toFixed(1))).toBe(111.8);
      expect(Number(calculateSMEZScoreRotation(940).toFixed(1))).toBe(114.4);
      expect(Number(calculateSMEZScoreRotation(950).toFixed(1))).toBe(117.0);
      expect(Number(calculateSMEZScoreRotation(960).toFixed(1))).toBe(119.6);
      expect(Number(calculateSMEZScoreRotation(970).toFixed(1))).toBe(122.2);
      expect(Number(calculateSMEZScoreRotation(980).toFixed(1))).toBe(124.8);
      expect(Number(calculateSMEZScoreRotation(990).toFixed(1))).toBe(127.4);
    });

    it('should be 104 for between 700 and 900', () => {
      expect(Number(calculateSMEZScoreRotation(700).toFixed(1))).toBe(78.0);
      expect(Number(calculateSMEZScoreRotation(710).toFixed(1))).toBe(79.3);
      expect(Number(calculateSMEZScoreRotation(720).toFixed(1))).toBe(80.6);
      expect(Number(calculateSMEZScoreRotation(730).toFixed(1))).toBe(81.9);
      expect(Number(calculateSMEZScoreRotation(740).toFixed(1))).toBe(83.2);
      expect(Number(calculateSMEZScoreRotation(750).toFixed(1))).toBe(84.5);
      expect(Number(calculateSMEZScoreRotation(760).toFixed(1))).toBe(85.8);
      expect(Number(calculateSMEZScoreRotation(770).toFixed(1))).toBe(87.1);
      expect(Number(calculateSMEZScoreRotation(780).toFixed(1))).toBe(88.4);
      expect(Number(calculateSMEZScoreRotation(790).toFixed(1))).toBe(89.7);
      expect(Number(calculateSMEZScoreRotation(800).toFixed(1))).toBe(91.0);
      expect(Number(calculateSMEZScoreRotation(810).toFixed(1))).toBe(92.3);
      expect(Number(calculateSMEZScoreRotation(820).toFixed(1))).toBe(93.6);
      expect(Number(calculateSMEZScoreRotation(830).toFixed(1))).toBe(94.9);
      expect(Number(calculateSMEZScoreRotation(840).toFixed(1))).toBe(96.2);
      expect(Number(calculateSMEZScoreRotation(850).toFixed(1))).toBe(97.5);
      expect(Number(calculateSMEZScoreRotation(860).toFixed(1))).toBe(98.8);
      expect(Number(calculateSMEZScoreRotation(870).toFixed(1))).toBe(100.1);
      expect(Number(calculateSMEZScoreRotation(880).toFixed(1))).toBe(101.4);
      expect(Number(calculateSMEZScoreRotation(890).toFixed(1))).toBe(102.7);
    });

    it('should be 78 for between 500 and 700', () => {
      expect(Number(calculateSMEZScoreRotation(500).toFixed(1))).toBe(52.0);
      expect(Number(calculateSMEZScoreRotation(510).toFixed(1))).toBe(53.3);
      expect(Number(calculateSMEZScoreRotation(520).toFixed(1))).toBe(54.6);
      expect(Number(calculateSMEZScoreRotation(530).toFixed(1))).toBe(55.9);
      expect(Number(calculateSMEZScoreRotation(540).toFixed(1))).toBe(57.2);
      expect(Number(calculateSMEZScoreRotation(550).toFixed(1))).toBe(58.5);
      expect(Number(calculateSMEZScoreRotation(560).toFixed(1))).toBe(59.8);
      expect(Number(calculateSMEZScoreRotation(570).toFixed(1))).toBe(61.1);
      expect(Number(calculateSMEZScoreRotation(580).toFixed(1))).toBe(62.4);
      expect(Number(calculateSMEZScoreRotation(590).toFixed(1))).toBe(63.7);
      expect(Number(calculateSMEZScoreRotation(600).toFixed(1))).toBe(65.0);
      expect(Number(calculateSMEZScoreRotation(610).toFixed(1))).toBe(66.3);
      expect(Number(calculateSMEZScoreRotation(620).toFixed(1))).toBe(67.6);
      expect(Number(calculateSMEZScoreRotation(630).toFixed(1))).toBe(68.9);
      expect(Number(calculateSMEZScoreRotation(640).toFixed(1))).toBe(70.2);
      expect(Number(calculateSMEZScoreRotation(650).toFixed(1))).toBe(71.5);
      expect(Number(calculateSMEZScoreRotation(660).toFixed(1))).toBe(72.8);
      expect(Number(calculateSMEZScoreRotation(670).toFixed(1))).toBe(74.1);
      expect(Number(calculateSMEZScoreRotation(680).toFixed(1))).toBe(75.4);
      expect(Number(calculateSMEZScoreRotation(690).toFixed(1))).toBe(76.7);
    });

    it('should be 52 for between 400 and 500', () => {
      expect(Number(calculateSMEZScoreRotation(400).toFixed(1))).toBe(26.0);
      expect(Number(calculateSMEZScoreRotation(410).toFixed(1))).toBe(28.6);
      expect(Number(calculateSMEZScoreRotation(420).toFixed(1))).toBe(31.2);
      expect(Number(calculateSMEZScoreRotation(430).toFixed(1))).toBe(33.8);
      expect(Number(calculateSMEZScoreRotation(440).toFixed(1))).toBe(36.4);
      expect(Number(calculateSMEZScoreRotation(450).toFixed(1))).toBe(39.0);
      expect(Number(calculateSMEZScoreRotation(460).toFixed(1))).toBe(41.6);
      expect(Number(calculateSMEZScoreRotation(470).toFixed(1))).toBe(44.2);
      expect(Number(calculateSMEZScoreRotation(480).toFixed(1))).toBe(46.8);
      expect(Number(calculateSMEZScoreRotation(490).toFixed(1))).toBe(49.4);
    });

    it('should be 26 for between 270 and 400', () => {
      expect(Number(calculateSMEZScoreRotation(270).toFixed(1))).toBe(0.0);
      expect(Number(calculateSMEZScoreRotation(280).toFixed(1))).toBe(2.0);
      expect(Number(calculateSMEZScoreRotation(290).toFixed(1))).toBe(4.0);
      expect(Number(calculateSMEZScoreRotation(300).toFixed(1))).toBe(6.0);
      expect(Number(calculateSMEZScoreRotation(310).toFixed(1))).toBe(8.0);
      expect(Number(calculateSMEZScoreRotation(320).toFixed(1))).toBe(10.0);
      expect(Number(calculateSMEZScoreRotation(330).toFixed(1))).toBe(12.0);
      expect(Number(calculateSMEZScoreRotation(340).toFixed(1))).toBe(14.0);
      expect(Number(calculateSMEZScoreRotation(350).toFixed(1))).toBe(16.0);
      expect(Number(calculateSMEZScoreRotation(360).toFixed(1))).toBe(18.0);
      expect(Number(calculateSMEZScoreRotation(370).toFixed(1))).toBe(20.0);
      expect(Number(calculateSMEZScoreRotation(380).toFixed(1))).toBe(22.0);
      expect(Number(calculateSMEZScoreRotation(390).toFixed(1))).toBe(24.0);
    });

    it('should be 0 for between 100 and 270', () => {
      expect(Number(calculateSMEZScoreRotation(100).toFixed(1))).toBe(-78.0);
      expect(Number(calculateSMEZScoreRotation(110).toFixed(1))).toBe(-76.5);
      expect(Number(calculateSMEZScoreRotation(120).toFixed(1))).toBe(-74.9);
      expect(Number(calculateSMEZScoreRotation(130).toFixed(1))).toBe(-73.4);
      expect(Number(calculateSMEZScoreRotation(140).toFixed(1))).toBe(-71.9);
      expect(Number(calculateSMEZScoreRotation(150).toFixed(1))).toBe(-70.4);
      expect(Number(calculateSMEZScoreRotation(160).toFixed(1))).toBe(-68.8);
      expect(Number(calculateSMEZScoreRotation(170).toFixed(1))).toBe(-67.3);
      expect(Number(calculateSMEZScoreRotation(180).toFixed(1))).toBe(-65.8);
      expect(Number(calculateSMEZScoreRotation(190).toFixed(1))).toBe(-64.2);
      expect(Number(calculateSMEZScoreRotation(200).toFixed(1))).toBe(-62.7);
      expect(Number(calculateSMEZScoreRotation(210).toFixed(1))).toBe(-61.2);
      expect(Number(calculateSMEZScoreRotation(220).toFixed(1))).toBe(-59.6);
      expect(Number(calculateSMEZScoreRotation(230).toFixed(1))).toBe(-58.1);
      expect(Number(calculateSMEZScoreRotation(240).toFixed(1))).toBe(-56.6);
      expect(Number(calculateSMEZScoreRotation(250).toFixed(1))).toBe(-55.1);
      expect(Number(calculateSMEZScoreRotation(260).toFixed(1))).toBe(-53.5);
    });

    it('should be -78 for between 0 and 100', () => {
      expect(Number(calculateSMEZScoreRotation(0).toFixed(1))).toBe(-130.0);
      expect(Number(calculateSMEZScoreRotation(10).toFixed(1))).toBe(-124.8);
      expect(Number(calculateSMEZScoreRotation(20).toFixed(1))).toBe(-119.6);
      expect(Number(calculateSMEZScoreRotation(30).toFixed(1))).toBe(-114.4);
      expect(Number(calculateSMEZScoreRotation(40).toFixed(1))).toBe(-109.2);
      expect(Number(calculateSMEZScoreRotation(50).toFixed(1))).toBe(-104.0);
      expect(Number(calculateSMEZScoreRotation(60).toFixed(1))).toBe(-98.8);
      expect(Number(calculateSMEZScoreRotation(70).toFixed(1))).toBe(-93.6);
      expect(Number(calculateSMEZScoreRotation(80).toFixed(1))).toBe(-88.4);
      expect(Number(calculateSMEZScoreRotation(90).toFixed(1))).toBe(-83.2);
    });
  });

  describe('calculatePoDRatio', () => {
    it('should correctly calculate the ratio', () => {
      expect(calculatePoDRatio(0)).toBe(0);
      expect(calculatePoDRatio(0.5)).toBe(0.01);
      expect(calculatePoDRatio(1)).toBe(0.02);
      expect(calculatePoDRatio(1.5)).toBe(0.03);
      expect(calculatePoDRatio(2)).toBe(0.04);
      expect(calculatePoDRatio(2.5)).toBe(0.05);
      expect(calculatePoDRatio(3)).toBe(0.06);
      expect(calculatePoDRatio(3.5)).toBe(0.07);
      expect(calculatePoDRatio(4)).toBe(0.08);
      expect(calculatePoDRatio(4.5)).toBe(0.09);
      expect(calculatePoDRatio(5)).toBe(0.1);
      expect(calculatePoDRatio(5.5)).toBe(0.11);
      expect(calculatePoDRatio(6)).toBe(0.12);
      expect(calculatePoDRatio(6.5)).toBe(0.13);
      expect(calculatePoDRatio(7)).toBe(0.14);
      expect(calculatePoDRatio(7.5)).toBe(0.15);
      expect(calculatePoDRatio(8)).toBe(0.16);
      expect(calculatePoDRatio(8.5)).toBe(0.17);
      expect(calculatePoDRatio(9)).toBe(0.18);
      expect(calculatePoDRatio(9.5)).toBe(0.19);
    });
  });

  describe('calculatePoDRotation', () => {
    it('should correctly calculate the rotation', () => {
      expect(calculatePoDRotation(0)).toBe(-130);
      expect(calculatePoDRotation(0.5)).toBe(-127.4);
      expect(calculatePoDRotation(1)).toBe(-124.8);
      expect(calculatePoDRotation(1.5)).toBe(-122.2);
      expect(calculatePoDRotation(2)).toBe(-119.6);
      expect(calculatePoDRotation(2.5)).toBe(-117);
      expect(calculatePoDRotation(3)).toBe(-114.4);
      expect(calculatePoDRotation(3.5)).toBe(-111.8);
      expect(calculatePoDRotation(4)).toBe(-109.2);
      expect(calculatePoDRotation(4.5)).toBe(-106.6);
      expect(calculatePoDRotation(5)).toBe(-104);
      expect(calculatePoDRotation(5.5)).toBe(-101.4);
      expect(calculatePoDRotation(6)).toBe(-98.8);
      expect(calculatePoDRotation(6.5)).toBe(-96.2);
      expect(calculatePoDRotation(7)).toBe(-93.6);
      expect(calculatePoDRotation(7.5)).toBe(-91);
      expect(calculatePoDRotation(8)).toBe(-88.4);
      expect(calculatePoDRotation(8.5)).toBe(-85.8);
      expect(calculatePoDRotation(9)).toBe(-83.2);
      expect(calculatePoDRotation(9.5)).toBe(-80.6);
    });
  });

  describe('calculateLGDPercent', () => {
    it('correctly calculate the LGD percent', () => {
      expect(calculateLGDPercent(0)).toBe(0);
      expect(calculateLGDPercent(0.5)).toBe(0.005);
      expect(calculateLGDPercent(1)).toBe(0.01);
      expect(calculateLGDPercent(1.5)).toBe(0.015);
      expect(calculateLGDPercent(2)).toBe(0.02);
      expect(calculateLGDPercent(2.5)).toBe(0.025);
      expect(calculateLGDPercent(3)).toBe(0.03);
      expect(calculateLGDPercent(3.5)).toBe(0.035);
      expect(calculateLGDPercent(4)).toBe(0.04);
      expect(calculateLGDPercent(4.5)).toBe(0.045);
      expect(calculateLGDPercent(5)).toBe(0.05);
      expect(calculateLGDPercent(5.5)).toBe(0.055);
      expect(calculateLGDPercent(6)).toBe(0.06);
      expect(calculateLGDPercent(6.5)).toBe(0.065);
      expect(calculateLGDPercent(7)).toBe(0.07);
      expect(calculateLGDPercent(7.5)).toBe(0.075);
      expect(calculateLGDPercent(8)).toBe(0.08);
      expect(calculateLGDPercent(8.5)).toBe(0.085);
      expect(calculateLGDPercent(9)).toBe(0.09);
      expect(calculateLGDPercent(9.5)).toBe(0.095);
    });
  });

  describe('calculateLGDRotation', () => {
    it('correctly calculate the LGD rotation', () => {
      expect(calculateLGDRotation(0)).toBe(-130);
      expect(calculateLGDRotation(0.5)).toBe(-128.7);
      expect(calculateLGDRotation(1)).toBe(-127.4);
      expect(calculateLGDRotation(1.5)).toBe(-126.1);
      expect(calculateLGDRotation(2)).toBe(-124.8);
      expect(calculateLGDRotation(2.5)).toBe(-123.5);
      expect(calculateLGDRotation(3)).toBe(-122.2);
      expect(calculateLGDRotation(3.5)).toBe(-120.9);
      expect(calculateLGDRotation(4)).toBe(-119.6);
      expect(calculateLGDRotation(4.5)).toBe(-118.3);
      expect(calculateLGDRotation(5)).toBe(-117);
      expect(calculateLGDRotation(5.5)).toBe(-115.7);
      expect(calculateLGDRotation(6)).toBe(-114.4);
      expect(calculateLGDRotation(6.5)).toBe(-113.1);
      expect(calculateLGDRotation(7)).toBe(-111.8);
      expect(calculateLGDRotation(7.5)).toBe(-110.5);
      expect(calculateLGDRotation(8)).toBe(-109.2);
      expect(calculateLGDRotation(8.5)).toBe(-107.9);
      expect(calculateLGDRotation(9)).toBe(-106.6);
      expect(calculateLGDRotation(9.5)).toBe(-105.3);
    });
  });

  describe('makeUploadReportReqBody', () => {
    it('should create the correct upload object given the correct data', () => {
      expect(makeUploadReportReqBody(mockReportObject, mockCsvValues)).toEqual(
        mockUploadReportReqBody
      );
    });
  });
});
