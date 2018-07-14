const _ = require("lodash");

/**
 * Iterate over experiment's conditions and return whether the experiment should run or not
 * 
 * @param {Array} conditions 
 * @param {Object} params 
 */
function evaluateTargetConditions(conditions, params) {
	for (let condition of conditions) {
		if (condition.country && condition.country !== params.country) {
			return false;
		}
	
		if (condition.percentage && Math.random() > condition.percentage) {
			return false;
		}	
	}

	return true;
}

function addVariant(buttonsConfig, variant) {
	const configIndex = _.findIndex(buttonsConfig, ["name", variant.name]);      
		
	if(variant.color) {
	  buttonsConfig[configIndex].color = variant.color;
	}

	if(variant.switchWith) {
	  const switchWithIndex = _.findIndex(buttonsConfig, ["name", variant.switchWith]);      
	  [buttonsConfig[configIndex], buttonsConfig[switchWithIndex]] = [buttonsConfig[switchWithIndex], buttonsConfig[configIndex]]
	}

	return buttonsConfig;
}

class TestConfig {
	static getButtonsConfig(buttonsConfig, experiments, params) {
		experiments.forEach(experiment => {
			if (evaluateTargetConditions(experiment.target, params)) {
			  return experiment.variants.reduce((config, variant) => {
				  return addVariant(config, variant);
			  }, buttonsConfig);
			}
		  });

		return buttonsConfig;
	}
}

module.exports = TestConfig;