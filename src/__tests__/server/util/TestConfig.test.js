import TestConfigUtil from "../../../server/util/TestConfig";
import defaultButtonsConfig from "../../../../config/buttons.config";
import _ from "lodash";

describe("Parse buttons config", () => {
	const mockMath = Object.create(global.Math);
	mockMath.random = () => 0.5;
	global.Math = mockMath;

	test("Switch between AC and % buttons and change the color", () => {
		const clonedConfig = _.cloneDeep(defaultButtonsConfig);
		const mockedExperiments = [
			{
				"target": [],
				"variants": [
					{ "name": "AC", "color": "#432843", "switchWith": "%" },
				]
			},
		];

		const ACIndex = _.findIndex(clonedConfig, ["name", "AC"]);
		const percentageIndex = _.findIndex(clonedConfig, ["name", "%"]);

		const buttonsConfig = TestConfigUtil.getButtonsConfig(clonedConfig, mockedExperiments, {});

		expect(_.findIndex(buttonsConfig, ["name", "AC"])).toBe(percentageIndex);
		expect(_.find(buttonsConfig, ["name", "AC"]).color).toBe("#432843");

		expect(_.findIndex(buttonsConfig, ["name", "%"])).toBe(ACIndex);
	});

	test("Apply variant only if user from US", () => {
		let clonedConfig = _.cloneDeep(defaultButtonsConfig);
		const mockedExperiments = [
			{
				"target": [
					{ country: "us" }
				],
				"variants": [
					{ "name": "AC", "color": "#432843" },
				]
			},
		];

		let buttonsConfig = TestConfigUtil.getButtonsConfig(clonedConfig, mockedExperiments, { country: "us" });
		expect(_.find(buttonsConfig, ["name", "AC"]).color).toBe("#432843");

		clonedConfig = _.cloneDeep(defaultButtonsConfig);
		buttonsConfig = TestConfigUtil.getButtonsConfig(clonedConfig, mockedExperiments, { });
		expect(_.find(buttonsConfig, ["name", "AC"]).color).toBeUndefined();
	});

	test("Apply variant to only 50% of the users", () => {
		let clonedConfig = _.cloneDeep(defaultButtonsConfig);
		const mockedExperiments = [
			{
				"target": [
					{ percentage: 0.6 }
				],
				"variants": [
					{ "name": "AC", "color": "#432843" },
				]
			},
			{
				"target": [
					{ percentage: 0.4 }
				],
				"variants": [
					{ "name": "%", "color": "#123456" },
				]
			},
		];

		let buttonsConfig = TestConfigUtil.getButtonsConfig(clonedConfig, mockedExperiments, { });

		const ACConfig = _.find(buttonsConfig, ["name", "AC"]);
		expect(ACConfig.color).toBe("#432843");

		const percentageConfig = _.find(buttonsConfig, ["name", "%"]);
		expect(percentageConfig.color).toBeUndefined();
	});
});