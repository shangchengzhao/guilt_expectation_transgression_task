# Basic Information
**Author**: Shangcheng Zhao
This experiment is revised based on the one named 'Game' in Yeslab pavlovia account 
**Creation Date**: 11/20/2023 - 10/03/2024
**Last Revision**: 07/07/2026

# Self-hosting

Hosted on `yeslab-survey.psych.ucsb.edu` (same server as congress_semantic).

- Entry: `index.html` (PsychoJS 2021.2.3)
- Data save: `save_data.php` writes CSV to `data/`
- Participant ID: `PROLIFIC_PID` (filename + `participant` column); `ResponseID` in `ResponseID` column
- Post-task redirect: `guilt_sad_trait_task` on the same server

See [TESTING_DATA_SAVING.md](TESTING_DATA_SAVING.md) for deploy and test steps.

# Important changelog
- July 2026: Self-hosted on yeslab-survey; PHP data saving; redirect to guilt_sad_trait_task
- July 2026: Abandon other js and python scripts, as well as psychopy builder, all changes directly applied on `interaction_task.js`

# Python script
trial_randomization.ipynb: generating "condo.xlsx"

# Variables
**answer**: For attention check. If participants got wrong in the trials with correct answers, start the routine 'warn' to ask them pay more attention

# Condition
## previous
**'condo.xlsx'**: 252 trials
type_trial == 4&5: with correct answer, 12 trials, all both_right(?)
type_trial == 0, both_right, 60 trials, include DV from 0-4 (12 trials each)
type_trial == 1, both_wrong
type_trial == 2, only_sub_right
type_trial == 3, only_sub_wrong
5 DVS: (0) self guilt-related emotions, (1) other guilt-related emotions (2) sharing (3) responsibility (4) money
**'condition.xlsx'**: 204 trials. Not included in this experiment
type_trial == 4&5: 12
other type_trial: 48
This version is 192+12, 4 DVs
## current
**'condition.xlsx'**: 252 trials
type_trial == 4&5: with correct answer, a total of 12 trials, all both_right. 4: a obviously small number of dots, 5: regular number of dot (about 20)
type_trial == 0, both_right, 60 trials, include DV from 0-4 (12 trials each)
type_trial == 1, both_wrong
type_trial == 2, only_sub_right
type_trial == 3, only_sub_wrong
4 DVS: (0) guilt, (1) sharing (2) approach/avoidance (3) forgiveness
repetition: 3 times for all experimental trials, 1 times for each type of attention check trial

# Duration
first_guilt_sta: "The game is about to begin", 2s
paring: 4-5s
guilt_cue: "“Dot-estimation” task is about to start", 3s
dot presentation: 1.5s
guilt_judge: 5s
guilt_check_answer: 3s
guilt result: if no one is punished - 2s, if watch - 13s
showing DV, wait for response
The average time for whole procedure is 29.25s + response time (10s, assumed) = 40s per trial

# Duration - revised
first_guilt_sta: "The game is about to begin", 2s
paring: 4-5s
guilt_cue: "“Dot-estimation” task is about to start", 3s
dot presentation: 1.5s
guilt_judge: 5s
guilt_check_answer: 3s
guilt result: if no one is punished - 2s, if watch - 13s
showing DV, wait for response
The average time for whole procedure is 29.25s + response time (10s, assumed) = 40s per trial

# Modification
## Practice
cut down the presenting time of "correct" in practice phase from 3 sec to 1.5
Time limitation in practice phase: 5s
Practice dot presentation: 2 sec to 1.5
remove instruction before practice ("practice is about to begin")
## Experiment
### Presentation Duration
first_guilt_sta: "The game is about to begin", 1s
paring: 2-3s
guilt_cue: "“Dot-estimation” task is about to start", 1s
dot presentation: 1.5s
guilt_judge: 5s
guilt_check_answer: 1.5s
guilt result: if no one is punished - 2s, if watch - 13s
showing DV, wait for response
The average time for whole procedure is 24.25s + response time (10s, assumed) = 35s per trial
### Other changes
Add variable **tesing** for easy test part of formal experiment
Add loop **trial_redo**. Record incomple trials in variable **incompleteTrials** and give pps a second chance to re-complete them

