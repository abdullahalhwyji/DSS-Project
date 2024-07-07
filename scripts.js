document.getElementById('fuzzyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const sleepDuration = parseFloat(document.getElementById('sleepDuration').value);
    const sleepQuality = parseFloat(document.getElementById('sleepQuality').value);
    const mood = parseFloat(document.getElementById('mood').value);
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);

    const sleepDurationFuzzy = fuzzifySleepDuration(sleepDuration);
    const sleepQualityFuzzy = fuzzifySleepQuality(sleepQuality);
    const moodFuzzy = fuzzifyMood(mood);
    const activityLevelFuzzy = fuzzifyActivityLevel(activityLevel);

    const action = determineAction(sleepDurationFuzzy, sleepQualityFuzzy, moodFuzzy, activityLevelFuzzy);

    document.getElementById('result').innerText = `Action Needed: ${action}`;
});

function fuzzifySleepDuration(x) {
    return {
        short: x < 5 ? 1 : (x <= 7 ? (7 - x) / 2 : 0),
        adequate: x < 6 ? 0 : (x <= 8 ? (x - 6) / 2 : (x <= 9 ? 1 : (x <= 10 ? (10 - x) / 1 : 0))),
        long: x > 11 ? 1 : (x >= 9 ? (x - 9) / 2 : 0)
    };
}

function fuzzifySleepQuality(x) {
    return {
        poor: x < 2 ? 1 : (x <= 4 ? (4 - x) / 2 : 0),
        fair: x < 3 ? 0 : (x <= 5 ? (x - 3) / 2 : (x == 5 ? 1 : (x <= 7 ? (7 - x) / 2 : 0))),
        good: x > 8 ? 1 : (x >= 6 ? (x - 6) / 2 : 0)
    };
}

function fuzzifyMood(x) {
    return {
        bad: x < 2 ? 1 : (x <= 4 ? (4 - x) / 2 : 0),
        neutral: x < 3 ? 0 : (x <= 5 ? (x - 3) / 2 : (x == 5 ? 1 : (x <= 7 ? (7 - x) / 2 : 0))),
        good: x > 8 ? 1 : (x >= 6 ? (x - 6) / 2 : 0)
    };
}

function fuzzifyActivityLevel(x) {
    return {
        low: x < 2 ? 1 : (x <= 4 ? (4 - x) / 2 : 0),
        moderate: x < 3 ? 0 : (x <= 5 ? (x - 3) / 2 : (x == 5 ? 1 : (x <= 7 ? (7 - x) / 2 : 0))),
        high: x > 8 ? 1 : (x >= 6 ? (x - 6) / 2 : 0)
    };
}

function determineAction(sleepDurationFuzzy, sleepQualityFuzzy, moodFuzzy, activityLevelFuzzy) {
    const rules = [
        {conditions: ['short', 'poor', 'bad', 'low'], action: 'Adjust Life'},
        {conditions: ['short', 'poor', 'bad', 'moderate'], action: 'Adjust Life'},
        {conditions: ['short', 'poor', 'bad', 'high'], action: 'Adjust Life'},
        {conditions: ['short', 'poor', 'good', 'low'], action: 'Adjust Life'},
        {conditions: ['short', 'poor', 'good', 'moderate'], action: 'Adjust Life'},
        {conditions: ['short', 'poor', 'good', 'high'], action: 'Adjust Life'},
        {conditions: ['short', 'good', 'bad', 'low'], action: 'Adjust Life'},
        {conditions: ['short', 'good', 'bad', 'moderate'], action: 'Adjust Life'},
        {conditions: ['short', 'good', 'bad', 'high'], action: 'Adjust Life'},
        {conditions: ['short', 'good', 'good', 'low'], action: 'Adjust Life'},
        {conditions: ['short', 'good', 'good', 'moderate'], action: 'Adjust Life'},
        {conditions: ['short', 'good', 'good', 'high'], action: 'No Action Needed'},
        {conditions: ['adequate', 'poor', 'bad', 'low'], action: 'Adjust Life'},
        {conditions: ['adequate', 'poor', 'bad', 'moderate'], action: 'Adjust Life'},
        {conditions: ['adequate', 'poor', 'bad', 'high'], action: 'Adjust Life'},
        {conditions: ['adequate', 'poor', 'good', 'low'], action: 'Adjust Life'},
        {conditions: ['adequate', 'poor', 'good', 'moderate'], action: 'Adjust Life'},
        {conditions: ['adequate', 'poor', 'good', 'high'], action: 'No Action Needed'},
        {conditions: ['adequate', 'good', 'bad', 'low'], action: 'Adjust Life'},
        {conditions: ['adequate', 'good', 'bad', 'moderate'], action: 'Adjust Life'},
        {conditions: ['adequate', 'good', 'bad', 'high'], action: 'Adjust Life'},
        {conditions: ['adequate', 'good', 'good', 'low'], action: 'Adjust Life'},
        {conditions: ['adequate', 'good', 'good', 'moderate'], action: 'No Action Needed'},
        {conditions: ['adequate', 'good', 'good', 'high'], action: 'No Action Needed'},
        {conditions: ['long', 'poor', 'bad', 'low'], action: 'Adjust Life'},
        {conditions: ['long', 'poor', 'bad', 'moderate'], action: 'Adjust Life'},
        {conditions: ['long', 'poor', 'bad', 'high'], action: 'Adjust Life'},
        {conditions: ['long', 'poor', 'good', 'low'], action: 'Adjust Life'},
        {conditions: ['long', 'poor', 'good', 'moderate'], action: 'Adjust Life'},
        {conditions: ['long', 'poor', 'good', 'high'], action: 'Adjust Life'},
        {conditions: ['long', 'good', 'bad', 'low'], action: 'Adjust Life'},
        {conditions: ['long', 'good', 'bad', 'moderate'], action: 'Adjust Life'},
        {conditions: ['long', 'good', 'bad', 'high'], action: 'Adjust Life'},
        {conditions: ['long', 'good', 'good', 'low'], action: 'Adjust Life'},
        {conditions: ['long', 'good', 'good', 'moderate'], action: 'Adjust Life'},
        {conditions: ['long', 'good', 'good', 'high'], action: 'No Action Needed'}
    ];

    for (let rule of rules) {
        if (sleepDurationFuzzy[rule.conditions[0]] && sleepQualityFuzzy[rule.conditions[1]] && moodFuzzy[rule.conditions[2]] && activityLevelFuzzy[rule.conditions[3]]) {
            return rule.action;
        }
    }
    return 'No Action Needed';
}
