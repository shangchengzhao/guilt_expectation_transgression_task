/************************* 
 * Interaction Task Test *
 *************************/

import { core, data, sound, util, visual } from './lib/psychojs-2021.2.3.js';
const { PsychoJS } = core;
const { TrialHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'interaction task';  // from the Builder filename that created this script
let expInfo = {'ResponseID': '', 'PROLIFIC_PID': '', 'session': '1'};

const CONFIG = {
  SAVE_DATA_URL: 'save_data.php',
  NEXT_TASK_URL: 'https://yeslab-survey.psych.ucsb.edu/guilt_expectation_trait_task/index.html',
};
function escapeCsvCell(value) {
  if (value === undefined || value === null) {
    return '';
  }
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return '"' + text.replace(/"/g, '""') + '"';
  }
  return text;
}

function buildExperimentCsv(experiment) {
  const rows = experiment._trialsData || [];
  if (rows.length === 0) {
    return '\uFEFF';
  }

  const headers = [];
  const seen = new Set();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        headers.push(key);
      }
    }
  }

  const lines = [headers.map(escapeCsvCell).join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => escapeCsvCell(row[header])).join(','));
  }
  return '\uFEFF' + lines.join('\n');
}

function buildResultsFilename() {
  const participant = expInfo['PROLIFIC_PID'] || expInfo['participant'] || 'PARTICIPANT';
  const date = expInfo['date'] || util.MonotonicClock.getDateStr();
  return participant + '_' + expName + '_' + date + '.csv';
}

function getNextTaskUrl() {
  const params = new URLSearchParams({
    ResponseID: expInfo['ResponseID'] || '',
    PROLIFIC_PID: expInfo['PROLIFIC_PID'] || '',
  });
  return CONFIG.NEXT_TASK_URL + '?' + params.toString();
}

async function saveExperimentResults() {
  const csvData = buildExperimentCsv(psychoJS.experiment);
  const filename = buildResultsFilename();
  const response = await fetch(CONFIG.SAVE_DATA_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({filename: filename, data: csvData}),
  });

  if (!response.ok) {
    throw new Error('HTTP ' + response.status + ': ' + response.statusText);
  }

  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Failed to save data');
  }
  return result;
}

// Start code blocks for 'Before Experiment'
// List for incomplete trials
var incompleteTrials = [];

// save share choice
var share_choice = [];

// redo
var redo_flag = 0

// count current trial
var countTrial = 0

// Practice
var pracrow = [];
for (let i = 0; i < 3; i++) {
    pracrow.push(Math.floor(Math.random() * 10));
}

// Experimental design - formal procedure
var chunks = [];
for (let i = 0; i < 192; i += 12) {
    chunks.push([...Array(12).keys()].map(x => x + i));
}
chunks.push([...Array(6).keys()].map(x => x + 192));
chunks.push([...Array(6).keys()].map(x => x + 198));

// Initialize a list to store the selected trials
var chooserow = [];

// For the both_right condition, randomly choose 1 trials from each DV
for (let chunk of chunks.slice(0, 4)) {
    let choose = [];
    choose.push(chunk[Math.floor(Math.random() * chunk.length)]);
    chooserow = chooserow.concat(choose);
    console.log(`experiment: ${chunk}, choose: ${choose}`);
}

// Randomly choose items from the first 16 chunks (3 items per chunk)
for (let chunk of chunks.slice(4, chunks.length - 2)) {
    let selected = [];
    for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * chunk.length);
        selected.push(chunk[index]);
        chunk.splice(index, 1); // Remove the selected item to avoid duplicates
    }
    chooserow = chooserow.concat(selected);
    console.log(`experiment: ${chunk}, choose: ${selected}`);
}

// Randomly choose items from the last 2 chunks (1 item per chunk)
for (let chunk of chunks.slice(-2)) {
    let index = Math.floor(Math.random() * chunk.length);
    chooserow.push(chunk[index]);
    console.log(`experiment: ${chunk}, choose: ${[chunk[index]]}`);
}

// Unbiased Fisher-Yates shuffle
function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Condition category (0-3) of a trial index
const conditionOf = (x) => Math.floor(x / 12) % 4;

// True if any 3 consecutive trials share the same condition
function hasThreeInARow(arr) {
    for (let i = 0; i < arr.length - 2; i++) {
        if (conditionOf(arr[i]) === conditionOf(arr[i + 1]) &&
            conditionOf(arr[i + 1]) === conditionOf(arr[i + 2])) {
            return true;
        }
    }
    return false;
}

// Reshuffle the whole array until no 3-in-a-row remains. Bounded so it can
// never become an infinite loop / frozen blank screen (the previous version
// could hang forever when the conflict was near the end of the array).
let shuffleAttempts = 0;
do {
    shuffleInPlace(chooserow);
    shuffleAttempts++;
} while (hasThreeInARow(chooserow) && shuffleAttempts < 2000);
if (hasThreeInARow(chooserow)) {
    console.warn(`chooserow: could not satisfy no-3-in-a-row after ${shuffleAttempts} shuffles; proceeding with last ordering.`);
}

console.log("chooserow: ");
console.log(chooserow);
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color('black'),
  units: 'norm',
  waitBlanking: true
});
// schedule the experiment:
util.addInfoFromUrl(expInfo);

const experimentResources = [
  {'name': 'RandomDot16.png', 'path': 'RandomDot16.png'},
  {'name': 'punishpic.png', 'path': 'punishpic.png'},
  {'name': '9dot2.png', 'path': '9dot2.png'},
  {'name': 'condition.csv', 'path': 'condition.csv'},
  {'name': 'RandomDot35.png', 'path': 'RandomDot35.png'},
  {'name': 'RandomDot20.png', 'path': 'RandomDot20.png'},
  {'name': 'RandomDot14.png', 'path': 'RandomDot14.png'},
  {'name': 'pairing_sub.png', 'path': 'pairing_sub.png'},
  {'name': '9290.JPG', 'path': '9290.JPG'},
  {'name': 'Resp_Pic.png', 'path': 'Resp_Pic.png'},
  {'name': 'RandomDot3.png', 'path': 'RandomDot3.png'},
  {'name': 'RandomDot5.png', 'path': 'RandomDot5.png'},
  {'name': 'both_right.png', 'path': 'both_right.png'},
  {'name': 'RandomDot2.png', 'path': 'RandomDot2.png'},
  {'name': 'RandomDot37.png', 'path': 'RandomDot37.png'},
  {'name': 'RandomDot23.png', 'path': 'RandomDot23.png'},
  {'name': 'RandomDot42.png', 'path': 'RandomDot42.png'},
  {'name': 'RandomDot22.png', 'path': 'RandomDot22.png'},
  {'name': 'RandomDot21.png', 'path': 'RandomDot21.png'},
  {'name': 'only_sub_wrong.png', 'path': 'only_sub_wrong.png'},
  {'name': 'prac_condition.csv', 'path': 'prac_condition.csv'},
  {'name': 'RandomDot27.png', 'path': 'RandomDot27.png'},
  {'name': 'RandomDot13.png', 'path': 'RandomDot13.png'},
  {'name': 'RandomDot17.png', 'path': 'RandomDot17.png'},
  {'name': 'RandomDot34.png', 'path': 'RandomDot34.png'},
  {'name': 'RandomDot29.png', 'path': 'RandomDot29.png'},
  {'name': '9dot1.png', 'path': '9dot1.png'},
  {'name': 'RandomDot31.png', 'path': 'RandomDot31.png'},
  {'name': 'RandomDot19.png', 'path': 'RandomDot19.png'},
  {'name': 'RandomDot28.png', 'path': 'RandomDot28.png'},
  {'name': '11dot2.png', 'path': '11dot2.png'},
  {'name': '11dot1.png', 'path': '11dot1.png'},
  {'name': 'RandomDot7.png', 'path': 'RandomDot7.png'},
  {'name': 'RandomDot18.png', 'path': 'RandomDot18.png'},
  {'name': 'RandomDot6.png', 'path': 'RandomDot6.png'},
  {'name': 'only_sub_right.png', 'path': 'only_sub_right.png'},
  {'name': 'RandomDot11.png', 'path': 'RandomDot11.png'},
  {'name': 'RandomDot33.png', 'path': 'RandomDot33.png'},
  {'name': 'RandomDot4.png', 'path': 'RandomDot4.png'},
  {'name': 'RandomDot36.png', 'path': 'RandomDot36.png'},
  {'name': 'RandomDot24.png', 'path': 'RandomDot24.png'},
  {'name': 'RandomDot9.png', 'path': 'RandomDot9.png'},
  {'name': 'RandomDot39.png', 'path': 'RandomDot39.png'},
  {'name': 'RandomDot25.png', 'path': 'RandomDot25.png'},
  {'name': 'RandomDot41.png', 'path': 'RandomDot41.png'},
  {'name': 'RandomDot10.png', 'path': 'RandomDot10.png'},
  {'name': 'RandomDot8.png', 'path': 'RandomDot8.png'},
  {'name': 'RandomDot32.png', 'path': 'RandomDot32.png'},
  {'name': 'RandomDot15.png', 'path': 'RandomDot15.png'},
  {'name': 'Punish_Pair.png', 'path': 'Punish_Pair.png'},
  {'name': 'both_wrong.png', 'path': 'both_wrong.png'},
  {'name': 'RandomDot38.png', 'path': 'RandomDot38.png'},
  {'name': 'RandomDot1.png', 'path': 'RandomDot1.png'},
  {'name': 'RandomDot30.png', 'path': 'RandomDot30.png'},
  {'name': '7360.JPG', 'path': '7360.JPG'},
  {'name': 'RandomDot26.png', 'path': 'RandomDot26.png'},
  {'name': 'RandomDot40.png', 'path': 'RandomDot40.png'},
  {'name': 'RandomDot12.png', 'path': 'RandomDot12.png'}
];

function waitUntilResourcesReady() {
  return function waitUntilResourcesReadyEachFrame() {
    for (const {name} of experimentResources) {
      try {
        psychoJS.serverManager.getResource(name, true);
      } catch (e) {
        return Scheduler.Event.FLIP_REPEAT;
      }
    }
    return Scheduler.Event.NEXT;
  };
}

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(waitUntilResourcesReady());
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(PreDefRoutineBegin());
flowScheduler.add(PreDefRoutineEachFrame());
flowScheduler.add(PreDefRoutineEnd());
flowScheduler.add(WelcomeRoutineBegin());
flowScheduler.add(WelcomeRoutineEachFrame());
flowScheduler.add(WelcomeRoutineEnd());
flowScheduler.add(check_testingRoutineBegin());
flowScheduler.add(check_testingRoutineEachFrame());
flowScheduler.add(check_testingRoutineEnd());
const trials_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_2LoopBegin(trials_2LoopScheduler));
flowScheduler.add(trials_2LoopScheduler);
flowScheduler.add(trials_2LoopEnd);
flowScheduler.add(prac_insRoutineBegin());
flowScheduler.add(prac_insRoutineEachFrame());
flowScheduler.add(prac_insRoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
flowScheduler.add(phase_insRoutineBegin());
flowScheduler.add(phase_insRoutineEachFrame());
flowScheduler.add(phase_insRoutineEnd());
const trialseqLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialseqLoopBegin(trialseqLoopScheduler));
flowScheduler.add(trialseqLoopScheduler);
flowScheduler.add(trialseqLoopEnd);
flowScheduler.add(ave_img_endRoutineBegin());
flowScheduler.add(ave_img_endRoutineEachFrame());
flowScheduler.add(ave_img_endRoutineEnd());
flowScheduler.add(check_incompleteRoutineBegin());
flowScheduler.add(check_incompleteRoutineEachFrame());
flowScheduler.add(check_incompleteRoutineEnd());
const trials_redoLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_redoLoopBegin(trials_redoLoopScheduler));
flowScheduler.add(trials_redoLoopScheduler);
flowScheduler.add(trials_redoLoopEnd);
flowScheduler.add(check_redoRoutineBegin());
flowScheduler.add(check_redoRoutineEachFrame());
flowScheduler.add(check_redoRoutineEnd());
flowScheduler.add(ave_img_endRoutineBegin());
flowScheduler.add(ave_img_endRoutineEachFrame());
flowScheduler.add(ave_img_endRoutineEnd());
flowScheduler.add(endRoutineBegin());
flowScheduler.add(endRoutineEachFrame());
flowScheduler.add(endRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

if (expInfo['PROLIFIC_PID'] && expInfo['ResponseID']) {
  psychoJS.schedule(flowScheduler);
} else {
  psychoJS.schedule(psychoJS.gui.DlgFromDict({
    dictionary: expInfo,
    title: expName
  }));
  psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);
  dialogCancelScheduler.add(quitPsychoJS, '', false);
}

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: experimentResources
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
async function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2021.2.3';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  expInfo['participant'] = expInfo['PROLIFIC_PID']; // primary ID for CSV filename + participant column

  return Scheduler.Event.NEXT;
}


var PreDefClock;
var randint;
var range;
var bottom_textsize;
var scrhig;
var scrwid;
var pairsize0;
var pairsize1;
var pairsize2;
var pairsize3;
var dotsize;
var resultsize;
var resultsize_DV;
var resultpos;
var resultpos_DV;
var punishpicsize;
var imageSizeNorm;
var sizeForImage;
var ypos1;
var ypos2;
var cuepos;
var pairpos;
var pairpos_DV;
var comp_text;
var WelcomeClock;
var welcome;
var pre_instru_resp_2;
var press_space;
var check_testingClock;
var ins_1Clock;
var ins1;
var pre_instru_resp_3;
var press_space1;
var ins__2Clock;
var ins1_4;
var pre_instru_resp_9;
var press_space1_4;
var ins_3Clock;
var ins1_3;
var pre_instru_resp_8;
var press_space1_3;
var ins_4Clock;
var ins2;
var pre_instru_resp_4;
var press_space2;
var Rule;
var aver_imaClock;
var text_18;
var aver_image;
var ins_5Clock;
var ins3;
var pre_instru_resp_5;
var ins_6Clock;
var ins3_2;
var pre_instru_resp_6;
var Check_1Clock;
var check1;
var a1;
var key_resp_3;
var ins_fbClock;
var feedback_2;
var feedback_time;
var Check_2Clock;
var check2;
var b1;
var k1;
var key_resp_4;
var ins_fb_2Clock;
var feedback_3;
var Check_4Clock;
var check4;
var d1;
var k3;
var key_resp_6;
var pairing_sub_7;
var result_2;
var ins_fb_4Clock;
var feedback_5;
var Check_5Clock;
var check5;
var e1;
var key_resp_7;
var pairing_sub_8;
var result_3;
var ins_fb_5Clock;
var feedback_6;
var end_insClock;
var read_againClock;
var text_15;
var prac_insClock;
var text;
var pre_instru_resp;
var prac_staClock;
var start_prac_text;
var prac_stiClock;
var image;
var prac_judgeClock;
var prac_acc;
var prac_judge_text;
var judge_2;
var rect1;
var rect2;
var RightButton_2;
var LeftButton_2;
var prac_fbClock;
var feedback;
var phase_insClock;
var instru_text_2;
var instru_resp_2;
var first_guilt_staClock;
var text_10;
var guilt_pairingClock;
var timejitter;
var ellis;
var pairing_sub;
var pairing_wait;
var Ellipsis_2;
var guilt_cueClock;
var pairing_sub_2;
var attention;
var guilt_stiClock;
var pairing_sub_3;
var dotstipic;
var guilt_judgeClock;
var pairing_sub_4;
var sti_text1;
var judge;
var RightButton;
var LeftButton;
var rect1_2;
var rect2_2;
var text_16;
var guilt_check_answerClock;
var pairing_sub_5;
var wait_check_text;
var Ellipsis_3;
var warn_incompleteClock;
var text_14;
var warn_wrongClock;
var text_12;
var guilt_resultClock;
var pairing_sub_6;
var result;
var punish_text2;
var FillerText;
var PuPicText;
var PunishImg;
var Ellipsis;
var DV_guiltClock;
var slider_guilt;
var text_8;
var key_guilt;
var text_9;
var text_17;
var pairing_sub_cur_trial;
var result_cur_trial;
var time_reminder;
var DV_sharingClock;
var share_slider;
var share_text;
var key_share;
var text_29;
var pairing_sub_cur_trial_2;
var result_cur_trial_2;
var time_reminder2;
var DV_approach_avoidanceClock;
var slider_apology;
var text_apology;
var key_apology;
var slider_hide;
var text_hide;
var text_31;
var pairing_sub_cur_trial_3;
var result_cur_trial_3;
var time_reminder3;
var DV_forgivenessClock;
var slider_forgiveness;
var text_forgiveness;
var key_forgiveness;
var slider_mad;
var text_mad;
var text_19;
var pairing_sub_cur_trial_4;
var result_cur_trial_4;
var time_reminder4;
var ave_img_endClock;
var share_choice_mean;
var text_4;
var ave_img2;
var text_5;
var check_incompleteClock;
var text_11;
var check_redoClock;
var endClock;
var text_13;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "PreDef"
  PreDefClock = new util.Clock();
  randint = function(min, maxplusone) {
    return Math.floor(Math.random() * (maxplusone - min) ) + min;
  }
  range = function (size, startAt = 0) {
      return [...Array(size).keys()].map(i => i + startAt);
  }
  
  // the corresponding JS code can be found in code_JS
  
  // save the index
  // thisExp.addData('rannum',rannum)
  psychoJS.experiment.addData('chooserow', chooserow);
  psychoJS.experiment.addData('ResponseID', expInfo['ResponseID']);
  
  
  bottom_textsize = 0.08;
  scrhig = psychoJS.window.size[1];
  scrwid = psychoJS.window.size[0];
  const IMAGE_PX = {
    'pairing_sub.png': [825, 364],
    'Punish_Pair.png': [357, 273],
    'punishpic.png': [169, 154],
    'Resp_Pic.png': [1039, 350],
    '9290.JPG': [1024, 768],
    '7360.JPG': [1024, 768],
    'both_right.png': [267, 106],
    'both_wrong.png': [279, 107],
    'only_sub_wrong.png': [279, 111],
    'only_sub_right.png': [279, 111],
  };
  imageSizeNorm = function(imgW, imgH, heightNorm) {
    return [((imgW / imgH) * (scrhig / scrwid) * heightNorm), heightNorm];
  };
  sizeForImage = function(imageName, heightNorm) {
    const px = IMAGE_PX[imageName];
    if (!px) {
      console.warn(`sizeForImage: unknown image ${imageName}, using square aspect`);
      return imageSizeNorm(1, 1, heightNorm);
    }
    return imageSizeNorm(px[0], px[1], heightNorm);
  };
  pairsize0 = sizeForImage('pairing_sub.png', 0.7);
  pairsize1 = sizeForImage('pairing_sub.png', 0.7);
  pairsize2 = sizeForImage('Punish_Pair.png', 0.3);
  pairsize3 = [(pairsize2[0] / 2), (pairsize2[1] / 2)];
  dotsize = imageSizeNorm(400, 400, 0.7);
  resultsize = sizeForImage('both_wrong.png', 0.16);
  resultsize_DV = sizeForImage('both_wrong.png', 0.08);
  resultpos = [0, (- 0.05)];
  resultpos_DV = [(- 0.7), 0.65];
  punishpicsize = sizeForImage('punishpic.png', 0.2);
  ypos1 = 0.5;
  ypos2 = 0.2;
  cuepos = [0, ypos1];
  pairpos = [0, ypos2];
  pairpos_DV = [(- 0.7), 0.75];
  comp_text = "Thank you for completing this game! Please wait briefly while we save your data. Once complete, click the <OK> button when it appears. You will be directed to the next game automatically. Your cooperation is greatly appreciated.";
  
  // Initialize components for Routine "Welcome"
  WelcomeClock = new util.Clock();
  welcome = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome',
    text: 'Welcome to this study!\n\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  press_space = new visual.TextStim({
    win: psychoJS.window,
    name: 'press_space',
    text: 'Press  “space” to continue\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.5)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "check_testing"
  check_testingClock = new util.Clock();
  // Initialize components for Routine "ins_1"
  ins_1Clock = new util.Clock();
  ins1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ins1',
    text: 'Please read the following instructions carefully,  it is important for you to understand the task. You will be asked questions about these instructions later on.\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  press_space1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press_space1',
    text: 'Press  “space” to continue\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.7)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "ins__2"
  ins__2Clock = new util.Clock();
  ins1_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ins1_4',
    text: 'Imagine that you are a participant in an experiment that involves you and three other people. You do not know who these other people are, but they are participants like yourself. There will be multiple rounds of interaction between yourself and the others. \nAt the beginning of each round, you will be randomly paired with one of the three other participants as your partner. Then the two of you will complete a “dot-estimation” task.\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_9 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  press_space1_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press_space1_4',
    text: 'Press  “space” to continue\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.7)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "ins_3"
  ins_3Clock = new util.Clock();
  ins1_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ins1_3',
    text: 'Specifically, both you and the partner will see an array of white dots scattered on the screen. Your task is to estimate the total number of these dots.\nAfter the dots disappear, you will see a number on the screen. Now you need to guess whether the number of dots you just saw is greater or smaller than the number on the screen. \nIf you think the number of dots is smaller than the number on the screen, then click the word “Smaller” using your mouse; if you think the number of dots is greater than the number on the screen, then click the word “Greater” using your mouse. \nYou need to make the choice WITHIN 5 SECONDS, otherwise your responses will be recorded as “INCOMPLETE”. You will be reminded to respond faster next round\n\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_8 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  press_space1_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press_space1_3',
    text: 'Press  “space” to continue\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.7)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "ins_4"
  ins_4Clock = new util.Clock();
  ins2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ins2',
    text: "Once both you and your partner submit the responses, you will see your performance on the current round. Correct responses will be indicated by a green tick under the silhouette that represents you and the partner. Incorrect responses will be indicated by a red cross. If both your and your partner's responses are correct, then no one will receive punishment. However, if either or both of you give an incorrect response, then your partner (but not you) will have to watch an aversive image for 5 seconds as a punishment. The table below summarizes how the punishment is delivered. Please read the table carefully. On the next page, you will see an example of an aversive image. It may make you uncomfortable, so if you do not want to see it, you can quit the study now.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.05,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  press_space2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press_space2',
    text: 'Press  “space” to continue\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.9)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  Rule = new visual.ImageStim({
    win : psychoJS.window,
    name : 'Rule', units : 'norm', 
    image : 'Resp_Pic.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.35)], size : sizeForImage('Resp_Pic.png', 0.8),
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  // Initialize components for Routine "aver_ima"
  aver_imaClock = new util.Clock();
  text_18 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_18',
    text: 'Aversive image is presenting',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.65)], height: 0.07,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  aver_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'aver_image', units : 'norm', 
    image : '9290.JPG', mask : undefined,
    ori : 0.0, pos : [0, 0], size : sizeForImage('9290.JPG', 0.5),
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  // Initialize components for Routine "ins_5"
  ins_5Clock = new util.Clock();
  ins3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ins3',
    text: 'After the “dot estimation” task, you will see some questions on the screen that ask about your feelings and thoughts at that moment. Please answer the questions as truthfully as possible by dragging the slider to the place that you see fit using your mouse. After you answer all the questions on the screen, please press the “space” button to confirm and continue.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_5 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ins_6"
  ins_6Clock = new util.Clock();
  ins3_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ins3_2',
    text: 'Please answer the following questions to make sure you understand the instructions correctly. You will need to read the instructions again if you do not answer the questions correctly. Press “space” to move on.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp_6 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Check_1"
  Check_1Clock = new util.Clock();
  check1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'check1',
    text: 'In the imagined game, how many total participants, not including yourself, are participating in the task?\n(Press the corresponding number on your keyboard to choose the answer)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.07,  wrapWidth: 1.65, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  a1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'a1',
    text: '1) one     2) two     3) three     4) four',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ins_fb"
  ins_fbClock = new util.Clock();
  feedback_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  feedback_time = 2;
  
  // Initialize components for Routine "Check_2"
  Check_2Clock = new util.Clock();
  check2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'check2',
    text: '2. How would your partner be determined in each round?\n(Press the corresponding number on your keyboard to choose the answer)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.07,  wrapWidth: 1.65, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  b1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'b1',
    text: '1) One of the three other participants will be randomly selected.\n\n2) The partner will always be the same person throughout the game.\n\n3) The three participants will take turn to be your partner.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  k1=[-0.6,-0.1];
  key_resp_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "ins_fb_2"
  ins_fb_2Clock = new util.Clock();
  feedback_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_3',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  feedback_time = 2;
  
  // Initialize components for Routine "Check_4"
  Check_4Clock = new util.Clock();
  check4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'check4',
    text: '3.The picture below shows the performance of the “dot-estimation” task in one trial. In this case, who will receive the punishment?\n(Press the corresponding number on your keyboard to choose the answer)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.5], height: 0.07,  wrapWidth: 1.65, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  d1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'd1',
    text: '1) You \n\n2) Your partner\n\n3) No one has to receive the punishment\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.8, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  k3=[-0.35,-0.6];
  key_resp_6 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pairing_sub_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_7', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -5.0 
  });
  result_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result_2', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.05)], size : resultsize,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  // Initialize components for Routine "ins_fb_4"
  ins_fb_4Clock = new util.Clock();
  feedback_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_5',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  feedback_time = 2;
  
  // Initialize components for Routine "Check_5"
  Check_5Clock = new util.Clock();
  check5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'check5',
    text: '4.The picture below shows the performance of the “dot-estimation” task in one trial. In this case, who will receive the punishment?\n(Press the corresponding number on your keyboard to choose the answer)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.5], height: 0.07,  wrapWidth: 1.65, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  e1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'e1',
    text: '1) You \n\n2) Your partner\n\n3) No one has to receive the punishment\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.8, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  k3=[-0.35,-0.6];
  key_resp_7 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  pairing_sub_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_8', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -5.0 
  });
  result_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.05)], size : resultsize,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  // Initialize components for Routine "ins_fb_5"
  ins_fb_5Clock = new util.Clock();
  feedback_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_6',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  feedback_time = 2;
  
  // Initialize components for Routine "end_ins"
  end_insClock = new util.Clock();
  // Initialize components for Routine "read_again"
  read_againClock = new util.Clock();
  text_15 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_15',
    text: 'You answered at least one of the comprehension questions wrong!\n\nPlease read the instruction carefully again!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "prac_ins"
  prac_insClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'Before the game starts, please first practice the “dot-estimation” task by yourself.\n\nPress “space” to move on to practice.\n\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  pre_instru_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "prac_sta"
  prac_staClock = new util.Clock();
  start_prac_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'start_prac_text',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.08,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "prac_sti"
  prac_stiClock = new util.Clock();
  image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  // Initialize components for Routine "prac_judge"
  prac_judgeClock = new util.Clock();
  prac_acc = 0;
  
  prac_judge_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'prac_judge_text',
    text: 'Is the number of dots greater larger or smaller than the number below?\n\n\n10\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.1], height: 1.0,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  judge_2 = new core.Mouse({
    win: psychoJS.window,
  });
  judge_2.mouseClock = new util.Clock();
  rect1 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'rect1', 
    vertices: [[-[0.22, 0.01][0]/2.0, 0], [+[0.22, 0.01][0]/2.0, 0]],
    ori: 0.0, pos: [(- 0.3), (- 0.38)],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  rect2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'rect2', 
    vertices: [[-[0.22, 0.01][0]/2.0, 0], [+[0.22, 0.01][0]/2.0, 0]],
    ori: 0.0, pos: [0.3, (- 0.38)],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -4, interpolate: true,
  });
  
  RightButton_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'RightButton_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.3, (- 0.3)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  LeftButton_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'LeftButton_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.3), (- 0.3)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "prac_fb"
  prac_fbClock = new util.Clock();
  feedback = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  feedback_time = 1;
  
  // Initialize components for Routine "phase_ins"
  phase_insClock = new util.Clock();
  instru_text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'instru_text_2',
    text: 'Next the actual game will start.\nDuring the game, please pay attention to the dots and estimate as accurately as possible.\nWhen you are ready, press “space” to start the game\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  instru_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "first_guilt_sta"
  first_guilt_staClock = new util.Clock();
  text_10 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_10',
    text: 'The game is about to begin. \nPlease get ready!\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "guilt_pairing"
  guilt_pairingClock = new util.Clock();
  timejitter = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5];
  ellis = [".", "..", "..."];
  
  pairing_sub = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub', units : 'norm', 
    image : 'pairing_sub.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -1.0 
  });
  pairing_wait = new visual.TextStim({
    win: psychoJS.window,
    name: 'pairing_wait',
    text: 'Pairing partner for you\n\n\nPlease wait',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.3)], height: 0.07,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  Ellipsis_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Ellipsis_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.5)], height: 0.08,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "guilt_cue"
  guilt_cueClock = new util.Clock();
  pairing_sub_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_2', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -1.0 
  });
  attention = new visual.TextStim({
    win: psychoJS.window,
    name: 'attention',
    text: '“Dot-estimation” task is about to start\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.3)], height: 1.0,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: -2.0 
  });
  
  // Initialize components for Routine "guilt_sti"
  guilt_stiClock = new util.Clock();
  pairing_sub_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -1.0 
  });
  dotstipic = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dotstipic', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.4)], size : dotsize,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "guilt_judge"
  guilt_judgeClock = new util.Clock();
  pairing_sub_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_4', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : 0.0 
  });
  sti_text1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'sti_text1',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.3)], height: 1.0,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  judge = new core.Mouse({
    win: psychoJS.window,
  });
  judge.mouseClock = new util.Clock();
  RightButton = new visual.TextStim({
    win: psychoJS.window,
    name: 'RightButton',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.3, (- 0.5)], height: bottom_textsize,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  LeftButton = new visual.TextStim({
    win: psychoJS.window,
    name: 'LeftButton',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.3), (- 0.5)], height: bottom_textsize,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  rect1_2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'rect1_2', 
    vertices: [[-[0.22, 0.01][0]/2.0, 0], [+[0.22, 0.01][0]/2.0, 0]],
    ori: 0.0, pos: [(- 0.3), (- 0.58)],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -6, interpolate: true,
  });
  
  rect2_2 = new visual.ShapeStim ({
    win: psychoJS.window, name: 'rect2_2', 
    vertices: [[-[0.22, 0.01][0]/2.0, 0], [+[0.22, 0.01][0]/2.0, 0]],
    ori: 0.0, pos: [0.3, (- 0.58)],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -7, interpolate: true,
  });
  
  text_16 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_16',
    text: 'Is the number of dots greater larger or smaller than the number below?\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.2)], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  // Initialize components for Routine "guilt_check_answer"
  guilt_check_answerClock = new util.Clock();
  pairing_sub_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_5', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : 0.0 
  });
  wait_check_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'wait_check_text',
    text: 'Checking your answers\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.2)], height: 1.0,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  Ellipsis_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Ellipsis_3',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.3)], height: 0.08,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "warn_incomplete"
  warn_incompleteClock = new util.Clock();
  text_14 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_14',
    text: 'Please respond faster next round',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "warn_wrong"
  warn_wrongClock = new util.Clock();
  text_12 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_12',
    text: 'Please pay attention to the task！',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "guilt_result"
  guilt_resultClock = new util.Clock();
  pairing_sub_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_6', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos, size : 1.0,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -1.0 
  });
  result = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.05)], size : resultsize,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  punish_text2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'punish_text2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.33)], height: 1.0,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: 1.0,
    depth: -3.0 
  });
  
  FillerText = new visual.TextStim({
    win: psychoJS.window,
    name: 'FillerText',
    text: 'No one needs to watch the aversive image\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.33)], height: bottom_textsize,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: 1.0,
    depth: -4.0 
  });
  
  PuPicText = new visual.TextStim({
    win: psychoJS.window,
    name: 'PuPicText',
    text: 'Aversive image is presenting\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.75)], height: bottom_textsize,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  PunishImg = new visual.ImageStim({
    win : psychoJS.window,
    name : 'PunishImg', units : 'norm', 
    image : 'punishpic.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.55)], size : punishpicsize,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  Ellipsis = new visual.TextStim({
    win: psychoJS.window,
    name: 'Ellipsis',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.85)], height: 0.08,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "DV_guilt"
  DV_guiltClock = new util.Clock();
  slider_guilt = new visual.Slider({
    win: psychoJS.window, name: 'slider_guilt',
    size: [1.0, 0.05], pos: [0.05, 0.2], units: 'norm',
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    granularity: 1.0, style: ["SLIDER"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: 0, 
    flip: true,
  });
  
  text_8 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_8',
    text: 'To what extent do you feel guilty?\n(0 = Not at all, 100 = Extremely)\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.45], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_guilt = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_9 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_9',
    text: 'Guilt\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.54), 0.17], height: 0.056,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  text_17 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_17',
    text: 'Press “space” to confirm and move on',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.5)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });
  
  pairing_sub_cur_trial = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_cur_trial', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos_DV, size : pairsize3,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -6.0 
  });
  result_cur_trial = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result_cur_trial', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : resultpos_DV, size : resultsize_DV,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  time_reminder = new visual.TextStim({
    win: psychoJS.window,
    name: 'time_reminder',
    text: 'Please make faster response!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.6)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: -8.0 
  });
  
  // Initialize components for Routine "DV_sharing"
  DV_sharingClock = new util.Clock();
  share_slider = new visual.Slider({
    win: psychoJS.window, name: 'share_slider',
    size: [1.0, 0.05], pos: [0, 0], units: 'norm',
    labels: [0, 1, 2, 3, 4, 5], ticks: [0, 1, 2, 3, 4, 5],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: 0, 
    flip: false,
  });
  
  share_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'share_text',
    text: 'Imagine that you have the option to watch the aversive image too. The longer you watch it, the less your partner has to. How long would you like to watch the aversive image? Choose carefully. We’ll show you the image at the end of the experiment based on your choice.\n(0 second - 5 second)\n\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.2], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_share = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_29 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_29',
    text: 'Press “space” to confirm and move on',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.5)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  pairing_sub_cur_trial_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_cur_trial_2', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos_DV, size : pairsize3,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -5.0 
  });
  result_cur_trial_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result_cur_trial_2', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : resultpos_DV, size : resultsize_DV,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  time_reminder2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'time_reminder2',
    text: 'Please make faster response!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.6)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "DV_approach_avoidance"
  DV_approach_avoidanceClock = new util.Clock();
  slider_apology = new visual.Slider({
    win: psychoJS.window, name: 'slider_apology',
    size: [1.0, 0.07], pos: [0, 0.4], units: 'norm',
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    granularity: 1.0, style: ["SLIDER"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: 0, 
    flip: false,
  });
  
  text_apology = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_apology',
    text: 'To what extent would you want to offer an in-person apology to your partner?\n(0 = Not at all, 100 = Extremely)\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.5], height: 0.07,  wrapWidth: 1.8, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_apology = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  slider_hide = new visual.Slider({
    win: psychoJS.window, name: 'slider_hide',
    size: [1.0, 0.07], pos: [0, (- 0.3)], units: 'norm',
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    granularity: 1.0, style: ["SLIDER"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -3, 
    flip: false,
  });
  
  text_hide = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_hide',
    text: 'To what extent would you want to avoid interacting with your partner? \n(0 = Not at all, 100 = Extremely)\n',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.2)], height: 0.07,  wrapWidth: 1.6, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  text_31 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_31',
    text: 'Press “space” to confirm and move on',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.65)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  pairing_sub_cur_trial_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_cur_trial_3', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos_DV, size : pairsize3,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -7.0 
  });
  result_cur_trial_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result_cur_trial_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : resultpos_DV, size : resultsize_DV,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  time_reminder3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'time_reminder3',
    text: 'Please make faster response!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.75)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: -9.0 
  });
  
  // Initialize components for Routine "DV_forgiveness"
  DV_forgivenessClock = new util.Clock();
  slider_forgiveness = new visual.Slider({
    win: psychoJS.window, name: 'slider_forgiveness',
    size: [1.0, 0.07], pos: [0, 0.3], units: 'norm',
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    granularity: 0.0, style: ["SLIDER"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: 0, 
    flip: false,
  });
  
  text_forgiveness = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_forgiveness',
    text: 'To what extent do you think your partner will forgive you?\n(0 = Not at all, 100 = Extremely)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.5], height: 0.07,  wrapWidth: 1.0, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_forgiveness = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  slider_mad = new visual.Slider({
    win: psychoJS.window, name: 'slider_mad',
    size: [1.0, 0.07], pos: [0, (- 0.35)], units: 'norm',
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    granularity: 0.0, style: ["SLIDER"],
    color: new util.Color('white'), markerColor: new util.Color('Red'), lineColor: new util.Color('White'), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -3, 
    flip: false,
  });
  
  text_mad = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_mad',
    text: 'To what extent do you think your partner is mad at you?\n(0 = Not at all, 100 = Extremely)',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.2)], height: 0.07,  wrapWidth: 1.6, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -4.0 
  });
  
  text_19 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_19',
    text: 'Press “space” to confirm and move on',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.65)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -6.0 
  });
  
  pairing_sub_cur_trial_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'pairing_sub_cur_trial_4', units : 'norm', 
    image : 'Punish_Pair.png', mask : undefined,
    ori : 0.0, pos : pairpos_DV, size : pairsize3,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 512.0, interpolate : true, depth : -7.0 
  });
  result_cur_trial_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'result_cur_trial_4', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : resultpos_DV, size : resultsize_DV,
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  time_reminder4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'time_reminder4',
    text: 'Please make faster response!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.75)], height: 0.05,  wrapWidth: 1.3, ori: 0.0,
    color: new util.Color('red'),  opacity: undefined,
    depth: -9.0 
  });
  
  // Initialize components for Routine "ave_img_end"
  ave_img_endClock = new util.Clock();
  share_choice_mean = 0;
  
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: 'Next we will show you an aversive image according to your intention for compensating your partner.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  ave_img2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'ave_img2', units : 'norm', 
    image : '7360.JPG', mask : undefined,
    ori : 0.0, pos : [0, 0], size : sizeForImage('7360.JPG', 0.5),
    color : new util.Color([1, 1, 1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  text_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_5',
    text: 'Aversive image is presenting',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.65)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "check_incomplete"
  check_incompleteClock = new util.Clock();
  
  
  text_11 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_11',
    text: comp_text,
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "check_redo"
  check_redoClock = new util.Clock();
  // Initialize components for Routine "end"
  endClock = new util.Clock();
  text_13 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_13',
    text: comp_text,
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.07,  wrapWidth: 1.5, ori: 0.0,
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var PreDefComponents;
function PreDefRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'PreDef'-------
    t = 0;
    PreDefClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    PreDefComponents = [];
    
    for (const thisComponent of PreDefComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function PreDefRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'PreDef'-------
    // get current time
    t = PreDefClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of PreDefComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function PreDefRoutineEnd() {
  return async function () {
    //------Ending Routine 'PreDef'-------
    for (const thisComponent of PreDefComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "PreDef" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_2_allKeys;
var WelcomeComponents;
function WelcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'Welcome'-------
    t = 0;
    WelcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_2.keys = undefined;
    pre_instru_resp_2.rt = undefined;
    _pre_instru_resp_2_allKeys = [];
    // keep track of which components have finished
    WelcomeComponents = [];
    WelcomeComponents.push(welcome);
    WelcomeComponents.push(pre_instru_resp_2);
    WelcomeComponents.push(press_space);
    
    for (const thisComponent of WelcomeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function WelcomeRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'Welcome'-------
    // get current time
    t = WelcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *welcome* updates
    if (t >= 0.0 && welcome.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome.tStart = t;  // (not accounting for frame time here)
      welcome.frameNStart = frameN;  // exact frame index
      
      welcome.setAutoDraw(true);
    }

    
    // *pre_instru_resp_2* updates
    if (t >= 0.0 && pre_instru_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_2.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_2.clearEvents(); });
    }

    if (pre_instru_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_2.getKeys({keyList: ['space', 't'], waitRelease: false});
      _pre_instru_resp_2_allKeys = _pre_instru_resp_2_allKeys.concat(theseKeys);
      if (_pre_instru_resp_2_allKeys.length > 0) {
        pre_instru_resp_2.keys = _pre_instru_resp_2_allKeys[_pre_instru_resp_2_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_2.rt = _pre_instru_resp_2_allKeys[_pre_instru_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *press_space* updates
    if (t >= 0.0 && press_space.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press_space.tStart = t;  // (not accounting for frame time here)
      press_space.frameNStart = frameN;  // exact frame index
      
      press_space.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of WelcomeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var testing;
function WelcomeRoutineEnd() {
  return async function () {
    //------Ending Routine 'Welcome'-------
    for (const thisComponent of WelcomeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_2.keys', pre_instru_resp_2.keys);
    if (typeof pre_instru_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_2.rt', pre_instru_resp_2.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_2.stop();
    if (pre_instru_resp_2.keys !== "" && pre_instru_resp_2.keys !== [] && pre_instru_resp_2.keys !== null) {
        if (pre_instru_resp_2.keys === "t") {
            testing = 1;
        } else {
            testing = 0;
        }
    } else {
        testing = 0;
    }
    
    console.log("Is test? ", testing);
    // the Routine "Welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var chooserow;
var check_testingComponents;
function check_testingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'check_testing'-------
    t = 0;
    check_testingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // for testing
    if (testing) {
      chooserow = chooserow.filter((_, index) => index % 10 === 0);
      console.log("Test trials:");
      console.log(chooserow);
    }
    // keep track of which components have finished
    check_testingComponents = [];
    
    for (const thisComponent of check_testingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function check_testingRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'check_testing'-------
    // get current time
    t = check_testingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of check_testingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_testingRoutineEnd() {
  return async function () {
    //------Ending Routine 'check_testing'-------
    for (const thisComponent of check_testingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "check_testing" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var trials_2;
var currentLoop;
function trials_2LoopBegin(trials_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 100, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_2'
    });
    psychoJS.experiment.addLoop(trials_2); // add the loop to the experiment
    currentLoop = trials_2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_2 of trials_2) {
      const snapshot = trials_2.getSnapshot();
      trials_2LoopScheduler.add(importConditions(snapshot));
      trials_2LoopScheduler.add(ins_1RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_1RoutineEachFrame());
      trials_2LoopScheduler.add(ins_1RoutineEnd());
      trials_2LoopScheduler.add(ins__2RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins__2RoutineEachFrame());
      trials_2LoopScheduler.add(ins__2RoutineEnd());
      trials_2LoopScheduler.add(ins_3RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_3RoutineEachFrame());
      trials_2LoopScheduler.add(ins_3RoutineEnd());
      trials_2LoopScheduler.add(ins_4RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_4RoutineEachFrame());
      trials_2LoopScheduler.add(ins_4RoutineEnd());
      trials_2LoopScheduler.add(aver_imaRoutineBegin(snapshot));
      trials_2LoopScheduler.add(aver_imaRoutineEachFrame());
      trials_2LoopScheduler.add(aver_imaRoutineEnd());
      trials_2LoopScheduler.add(ins_5RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_5RoutineEachFrame());
      trials_2LoopScheduler.add(ins_5RoutineEnd());
      trials_2LoopScheduler.add(ins_6RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_6RoutineEachFrame());
      trials_2LoopScheduler.add(ins_6RoutineEnd());
      trials_2LoopScheduler.add(Check_1RoutineBegin(snapshot));
      trials_2LoopScheduler.add(Check_1RoutineEachFrame());
      trials_2LoopScheduler.add(Check_1RoutineEnd());
      trials_2LoopScheduler.add(ins_fbRoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_fbRoutineEachFrame());
      trials_2LoopScheduler.add(ins_fbRoutineEnd());
      trials_2LoopScheduler.add(Check_2RoutineBegin(snapshot));
      trials_2LoopScheduler.add(Check_2RoutineEachFrame());
      trials_2LoopScheduler.add(Check_2RoutineEnd());
      trials_2LoopScheduler.add(ins_fb_2RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_fb_2RoutineEachFrame());
      trials_2LoopScheduler.add(ins_fb_2RoutineEnd());
      trials_2LoopScheduler.add(Check_4RoutineBegin(snapshot));
      trials_2LoopScheduler.add(Check_4RoutineEachFrame());
      trials_2LoopScheduler.add(Check_4RoutineEnd());
      trials_2LoopScheduler.add(ins_fb_4RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_fb_4RoutineEachFrame());
      trials_2LoopScheduler.add(ins_fb_4RoutineEnd());
      trials_2LoopScheduler.add(Check_5RoutineBegin(snapshot));
      trials_2LoopScheduler.add(Check_5RoutineEachFrame());
      trials_2LoopScheduler.add(Check_5RoutineEnd());
      trials_2LoopScheduler.add(ins_fb_5RoutineBegin(snapshot));
      trials_2LoopScheduler.add(ins_fb_5RoutineEachFrame());
      trials_2LoopScheduler.add(ins_fb_5RoutineEnd());
      trials_2LoopScheduler.add(end_insRoutineBegin(snapshot));
      trials_2LoopScheduler.add(end_insRoutineEachFrame());
      trials_2LoopScheduler.add(end_insRoutineEnd());
      trials_2LoopScheduler.add(read_againRoutineBegin(snapshot));
      trials_2LoopScheduler.add(read_againRoutineEachFrame());
      trials_2LoopScheduler.add(read_againRoutineEnd());
      trials_2LoopScheduler.add(endLoopIteration(trials_2LoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_2LoopEnd() {
  psychoJS.experiment.removeLoop(trials_2);

  return Scheduler.Event.NEXT;
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'prac_condition.csv', pracrow),
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      const snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(prac_staRoutineBegin(snapshot));
      trialsLoopScheduler.add(prac_staRoutineEachFrame());
      trialsLoopScheduler.add(prac_staRoutineEnd());
      trialsLoopScheduler.add(prac_stiRoutineBegin(snapshot));
      trialsLoopScheduler.add(prac_stiRoutineEachFrame());
      trialsLoopScheduler.add(prac_stiRoutineEnd());
      trialsLoopScheduler.add(prac_judgeRoutineBegin(snapshot));
      trialsLoopScheduler.add(prac_judgeRoutineEachFrame());
      trialsLoopScheduler.add(prac_judgeRoutineEnd());
      trialsLoopScheduler.add(prac_fbRoutineBegin(snapshot));
      trialsLoopScheduler.add(prac_fbRoutineEachFrame());
      trialsLoopScheduler.add(prac_fbRoutineEnd());
      trialsLoopScheduler.add(endLoopIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);

  return Scheduler.Event.NEXT;
}


var trialseq;
function trialseqLoopBegin(trialseqLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trialseq = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'condition.csv', chooserow),
      seed: undefined, name: 'trialseq'
    });
    psychoJS.experiment.addLoop(trialseq); // add the loop to the experiment
    currentLoop = trialseq;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrialseq of trialseq) {
      const snapshot = trialseq.getSnapshot();
      trialseqLoopScheduler.add(importConditions(snapshot));
      trialseqLoopScheduler.add(first_guilt_staRoutineBegin(snapshot));
      trialseqLoopScheduler.add(first_guilt_staRoutineEachFrame());
      trialseqLoopScheduler.add(first_guilt_staRoutineEnd());
      trialseqLoopScheduler.add(guilt_pairingRoutineBegin(snapshot));
      trialseqLoopScheduler.add(guilt_pairingRoutineEachFrame());
      trialseqLoopScheduler.add(guilt_pairingRoutineEnd());
      trialseqLoopScheduler.add(guilt_cueRoutineBegin(snapshot));
      trialseqLoopScheduler.add(guilt_cueRoutineEachFrame());
      trialseqLoopScheduler.add(guilt_cueRoutineEnd());
      trialseqLoopScheduler.add(guilt_stiRoutineBegin(snapshot));
      trialseqLoopScheduler.add(guilt_stiRoutineEachFrame());
      trialseqLoopScheduler.add(guilt_stiRoutineEnd());
      trialseqLoopScheduler.add(guilt_judgeRoutineBegin(snapshot));
      trialseqLoopScheduler.add(guilt_judgeRoutineEachFrame());
      trialseqLoopScheduler.add(guilt_judgeRoutineEnd());
      trialseqLoopScheduler.add(guilt_check_answerRoutineBegin(snapshot));
      trialseqLoopScheduler.add(guilt_check_answerRoutineEachFrame());
      trialseqLoopScheduler.add(guilt_check_answerRoutineEnd());
      trialseqLoopScheduler.add(warn_incompleteRoutineBegin(snapshot));
      trialseqLoopScheduler.add(warn_incompleteRoutineEachFrame());
      trialseqLoopScheduler.add(warn_incompleteRoutineEnd());
      trialseqLoopScheduler.add(warn_wrongRoutineBegin(snapshot));
      trialseqLoopScheduler.add(warn_wrongRoutineEachFrame());
      trialseqLoopScheduler.add(warn_wrongRoutineEnd());
      trialseqLoopScheduler.add(guilt_resultRoutineBegin(snapshot));
      trialseqLoopScheduler.add(guilt_resultRoutineEachFrame());
      trialseqLoopScheduler.add(guilt_resultRoutineEnd());
      trialseqLoopScheduler.add(DV_guiltRoutineBegin(snapshot));
      trialseqLoopScheduler.add(DV_guiltRoutineEachFrame());
      trialseqLoopScheduler.add(DV_guiltRoutineEnd());
      trialseqLoopScheduler.add(DV_sharingRoutineBegin(snapshot));
      trialseqLoopScheduler.add(DV_sharingRoutineEachFrame());
      trialseqLoopScheduler.add(DV_sharingRoutineEnd());
      trialseqLoopScheduler.add(DV_approach_avoidanceRoutineBegin(snapshot));
      trialseqLoopScheduler.add(DV_approach_avoidanceRoutineEachFrame());
      trialseqLoopScheduler.add(DV_approach_avoidanceRoutineEnd());
      trialseqLoopScheduler.add(DV_forgivenessRoutineBegin(snapshot));
      trialseqLoopScheduler.add(DV_forgivenessRoutineEachFrame());
      trialseqLoopScheduler.add(DV_forgivenessRoutineEnd());
      trialseqLoopScheduler.add(endLoopIteration(trialseqLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialseqLoopEnd() {
  psychoJS.experiment.removeLoop(trialseq);

  return Scheduler.Event.NEXT;
}


var trials_redo;
function trials_redoLoopBegin(trials_redoLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_redo = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'condition.csv', incompleteTrials),
      seed: undefined, name: 'trials_redo'
    });
    psychoJS.experiment.addLoop(trials_redo); // add the loop to the experiment
    currentLoop = trials_redo;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrials_redo of trials_redo) {
      const snapshot = trials_redo.getSnapshot();
      trials_redoLoopScheduler.add(importConditions(snapshot));
      trials_redoLoopScheduler.add(guilt_pairingRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(guilt_pairingRoutineEachFrame());
      trials_redoLoopScheduler.add(guilt_pairingRoutineEnd());
      trials_redoLoopScheduler.add(guilt_cueRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(guilt_cueRoutineEachFrame());
      trials_redoLoopScheduler.add(guilt_cueRoutineEnd());
      trials_redoLoopScheduler.add(guilt_stiRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(guilt_stiRoutineEachFrame());
      trials_redoLoopScheduler.add(guilt_stiRoutineEnd());
      trials_redoLoopScheduler.add(guilt_judgeRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(guilt_judgeRoutineEachFrame());
      trials_redoLoopScheduler.add(guilt_judgeRoutineEnd());
      trials_redoLoopScheduler.add(guilt_check_answerRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(guilt_check_answerRoutineEachFrame());
      trials_redoLoopScheduler.add(guilt_check_answerRoutineEnd());
      trials_redoLoopScheduler.add(warn_incompleteRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(warn_incompleteRoutineEachFrame());
      trials_redoLoopScheduler.add(warn_incompleteRoutineEnd());
      trials_redoLoopScheduler.add(warn_wrongRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(warn_wrongRoutineEachFrame());
      trials_redoLoopScheduler.add(warn_wrongRoutineEnd());
      trials_redoLoopScheduler.add(guilt_resultRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(guilt_resultRoutineEachFrame());
      trials_redoLoopScheduler.add(guilt_resultRoutineEnd());
      trials_redoLoopScheduler.add(DV_guiltRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(DV_guiltRoutineEachFrame());
      trials_redoLoopScheduler.add(DV_guiltRoutineEnd());
      trials_redoLoopScheduler.add(DV_sharingRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(DV_sharingRoutineEachFrame());
      trials_redoLoopScheduler.add(DV_sharingRoutineEnd());
      trials_redoLoopScheduler.add(DV_approach_avoidanceRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(DV_approach_avoidanceRoutineEachFrame());
      trials_redoLoopScheduler.add(DV_approach_avoidanceRoutineEnd());
      trials_redoLoopScheduler.add(DV_forgivenessRoutineBegin(snapshot));
      trials_redoLoopScheduler.add(DV_forgivenessRoutineEachFrame());
      trials_redoLoopScheduler.add(DV_forgivenessRoutineEnd());
      trials_redoLoopScheduler.add(endLoopIteration(trials_redoLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_redoLoopEnd() {
  psychoJS.experiment.removeLoop(trials_redo);

  return Scheduler.Event.NEXT;
}


var _pre_instru_resp_3_allKeys;
var ins_1Components;
function ins_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_1'-------
    t = 0;
    ins_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_3.keys = undefined;
    pre_instru_resp_3.rt = undefined;
    _pre_instru_resp_3_allKeys = [];
    // keep track of which components have finished
    ins_1Components = [];
    ins_1Components.push(ins1);
    ins_1Components.push(pre_instru_resp_3);
    ins_1Components.push(press_space1);
    
    for (const thisComponent of ins_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_1'-------
    // get current time
    t = ins_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ins1* updates
    if (t >= 0.0 && ins1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ins1.tStart = t;  // (not accounting for frame time here)
      ins1.frameNStart = frameN;  // exact frame index
      
      ins1.setAutoDraw(true);
    }

    
    // *pre_instru_resp_3* updates
    if (t >= 0.0 && pre_instru_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_3.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_3.clearEvents(); });
    }

    if (pre_instru_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_3.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_3_allKeys = _pre_instru_resp_3_allKeys.concat(theseKeys);
      if (_pre_instru_resp_3_allKeys.length > 0) {
        pre_instru_resp_3.keys = _pre_instru_resp_3_allKeys[_pre_instru_resp_3_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_3.rt = _pre_instru_resp_3_allKeys[_pre_instru_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *press_space1* updates
    if (t >= 0.0 && press_space1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press_space1.tStart = t;  // (not accounting for frame time here)
      press_space1.frameNStart = frameN;  // exact frame index
      
      press_space1.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_1RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_1'-------
    for (const thisComponent of ins_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_3.keys', pre_instru_resp_3.keys);
    if (typeof pre_instru_resp_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_3.rt', pre_instru_resp_3.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_3.stop();
    // the Routine "ins_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_9_allKeys;
var ins__2Components;
function ins__2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins__2'-------
    t = 0;
    ins__2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_9.keys = undefined;
    pre_instru_resp_9.rt = undefined;
    _pre_instru_resp_9_allKeys = [];
    // keep track of which components have finished
    ins__2Components = [];
    ins__2Components.push(ins1_4);
    ins__2Components.push(pre_instru_resp_9);
    ins__2Components.push(press_space1_4);
    
    for (const thisComponent of ins__2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins__2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins__2'-------
    // get current time
    t = ins__2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ins1_4* updates
    if (t >= 0.0 && ins1_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ins1_4.tStart = t;  // (not accounting for frame time here)
      ins1_4.frameNStart = frameN;  // exact frame index
      
      ins1_4.setAutoDraw(true);
    }

    
    // *pre_instru_resp_9* updates
    if (t >= 0.0 && pre_instru_resp_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_9.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_9.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_9.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_9.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_9.clearEvents(); });
    }

    if (pre_instru_resp_9.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_9.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_9_allKeys = _pre_instru_resp_9_allKeys.concat(theseKeys);
      if (_pre_instru_resp_9_allKeys.length > 0) {
        pre_instru_resp_9.keys = _pre_instru_resp_9_allKeys[_pre_instru_resp_9_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_9.rt = _pre_instru_resp_9_allKeys[_pre_instru_resp_9_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *press_space1_4* updates
    if (t >= 0.0 && press_space1_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press_space1_4.tStart = t;  // (not accounting for frame time here)
      press_space1_4.frameNStart = frameN;  // exact frame index
      
      press_space1_4.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins__2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins__2RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins__2'-------
    for (const thisComponent of ins__2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_9.keys', pre_instru_resp_9.keys);
    if (typeof pre_instru_resp_9.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_9.rt', pre_instru_resp_9.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_9.stop();
    // the Routine "ins__2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_8_allKeys;
var ins_3Components;
function ins_3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_3'-------
    t = 0;
    ins_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_8.keys = undefined;
    pre_instru_resp_8.rt = undefined;
    _pre_instru_resp_8_allKeys = [];
    // keep track of which components have finished
    ins_3Components = [];
    ins_3Components.push(ins1_3);
    ins_3Components.push(pre_instru_resp_8);
    ins_3Components.push(press_space1_3);
    
    for (const thisComponent of ins_3Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_3RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_3'-------
    // get current time
    t = ins_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ins1_3* updates
    if (t >= 0.0 && ins1_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ins1_3.tStart = t;  // (not accounting for frame time here)
      ins1_3.frameNStart = frameN;  // exact frame index
      
      ins1_3.setAutoDraw(true);
    }

    
    // *pre_instru_resp_8* updates
    if (t >= 0.0 && pre_instru_resp_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_8.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_8.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_8.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_8.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_8.clearEvents(); });
    }

    if (pre_instru_resp_8.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_8.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_8_allKeys = _pre_instru_resp_8_allKeys.concat(theseKeys);
      if (_pre_instru_resp_8_allKeys.length > 0) {
        pre_instru_resp_8.keys = _pre_instru_resp_8_allKeys[_pre_instru_resp_8_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_8.rt = _pre_instru_resp_8_allKeys[_pre_instru_resp_8_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *press_space1_3* updates
    if (t >= 0.0 && press_space1_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press_space1_3.tStart = t;  // (not accounting for frame time here)
      press_space1_3.frameNStart = frameN;  // exact frame index
      
      press_space1_3.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_3Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_3RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_3'-------
    for (const thisComponent of ins_3Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_8.keys', pre_instru_resp_8.keys);
    if (typeof pre_instru_resp_8.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_8.rt', pre_instru_resp_8.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_8.stop();
    // the Routine "ins_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_4_allKeys;
var ins_4Components;
function ins_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_4'-------
    t = 0;
    ins_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_4.keys = undefined;
    pre_instru_resp_4.rt = undefined;
    _pre_instru_resp_4_allKeys = [];
    // keep track of which components have finished
    ins_4Components = [];
    ins_4Components.push(ins2);
    ins_4Components.push(pre_instru_resp_4);
    ins_4Components.push(press_space2);
    ins_4Components.push(Rule);
    
    for (const thisComponent of ins_4Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_4RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_4'-------
    // get current time
    t = ins_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ins2* updates
    if (t >= 0.0 && ins2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ins2.tStart = t;  // (not accounting for frame time here)
      ins2.frameNStart = frameN;  // exact frame index
      
      ins2.setAutoDraw(true);
    }

    
    // *pre_instru_resp_4* updates
    if (t >= 0.0 && pre_instru_resp_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_4.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_4.clearEvents(); });
    }

    if (pre_instru_resp_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_4.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_4_allKeys = _pre_instru_resp_4_allKeys.concat(theseKeys);
      if (_pre_instru_resp_4_allKeys.length > 0) {
        pre_instru_resp_4.keys = _pre_instru_resp_4_allKeys[_pre_instru_resp_4_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_4.rt = _pre_instru_resp_4_allKeys[_pre_instru_resp_4_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *press_space2* updates
    if (t >= 0.0 && press_space2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press_space2.tStart = t;  // (not accounting for frame time here)
      press_space2.frameNStart = frameN;  // exact frame index
      
      press_space2.setAutoDraw(true);
    }

    
    // *Rule* updates
    if (t >= 0.0 && Rule.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Rule.tStart = t;  // (not accounting for frame time here)
      Rule.frameNStart = frameN;  // exact frame index
      
      Rule.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_4Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_4RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_4'-------
    for (const thisComponent of ins_4Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_4.keys', pre_instru_resp_4.keys);
    if (typeof pre_instru_resp_4.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_4.rt', pre_instru_resp_4.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_4.stop();
    // the Routine "ins_4" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var aver_imaComponents;
function aver_imaRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'aver_ima'-------
    t = 0;
    aver_imaClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    aver_imaComponents = [];
    aver_imaComponents.push(text_18);
    aver_imaComponents.push(aver_image);
    
    for (const thisComponent of aver_imaComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function aver_imaRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'aver_ima'-------
    // get current time
    t = aver_imaClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_18* updates
    if (t >= 0.0 && text_18.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_18.tStart = t;  // (not accounting for frame time here)
      text_18.frameNStart = frameN;  // exact frame index
      
      text_18.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_18.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_18.setAutoDraw(false);
    }
    
    // *aver_image* updates
    if (t >= 0.0 && aver_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      aver_image.tStart = t;  // (not accounting for frame time here)
      aver_image.frameNStart = frameN;  // exact frame index
      
      aver_image.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (aver_image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      aver_image.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of aver_imaComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function aver_imaRoutineEnd() {
  return async function () {
    //------Ending Routine 'aver_ima'-------
    for (const thisComponent of aver_imaComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_5_allKeys;
var ins_5Components;
function ins_5RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_5'-------
    t = 0;
    ins_5Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_5.keys = undefined;
    pre_instru_resp_5.rt = undefined;
    _pre_instru_resp_5_allKeys = [];
    // keep track of which components have finished
    ins_5Components = [];
    ins_5Components.push(ins3);
    ins_5Components.push(pre_instru_resp_5);
    
    for (const thisComponent of ins_5Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_5RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_5'-------
    // get current time
    t = ins_5Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ins3* updates
    if (t >= 0.0 && ins3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ins3.tStart = t;  // (not accounting for frame time here)
      ins3.frameNStart = frameN;  // exact frame index
      
      ins3.setAutoDraw(true);
    }

    
    // *pre_instru_resp_5* updates
    if (t >= 0.0 && pre_instru_resp_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_5.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_5.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_5.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_5.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_5.clearEvents(); });
    }

    if (pre_instru_resp_5.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_5.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_5_allKeys = _pre_instru_resp_5_allKeys.concat(theseKeys);
      if (_pre_instru_resp_5_allKeys.length > 0) {
        pre_instru_resp_5.keys = _pre_instru_resp_5_allKeys[_pre_instru_resp_5_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_5.rt = _pre_instru_resp_5_allKeys[_pre_instru_resp_5_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_5Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_5RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_5'-------
    for (const thisComponent of ins_5Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_5.keys', pre_instru_resp_5.keys);
    if (typeof pre_instru_resp_5.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_5.rt', pre_instru_resp_5.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_5.stop();
    // the Routine "ins_5" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_6_allKeys;
var ins_6Components;
function ins_6RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_6'-------
    t = 0;
    ins_6Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp_6.keys = undefined;
    pre_instru_resp_6.rt = undefined;
    _pre_instru_resp_6_allKeys = [];
    // keep track of which components have finished
    ins_6Components = [];
    ins_6Components.push(ins3_2);
    ins_6Components.push(pre_instru_resp_6);
    
    for (const thisComponent of ins_6Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_6RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_6'-------
    // get current time
    t = ins_6Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ins3_2* updates
    if (t >= 0.0 && ins3_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ins3_2.tStart = t;  // (not accounting for frame time here)
      ins3_2.frameNStart = frameN;  // exact frame index
      
      ins3_2.setAutoDraw(true);
    }

    
    // *pre_instru_resp_6* updates
    if (t >= 0.0 && pre_instru_resp_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp_6.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp_6.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp_6.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_6.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp_6.clearEvents(); });
    }

    if (pre_instru_resp_6.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp_6.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_6_allKeys = _pre_instru_resp_6_allKeys.concat(theseKeys);
      if (_pre_instru_resp_6_allKeys.length > 0) {
        pre_instru_resp_6.keys = _pre_instru_resp_6_allKeys[_pre_instru_resp_6_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp_6.rt = _pre_instru_resp_6_allKeys[_pre_instru_resp_6_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_6Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_6RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_6'-------
    for (const thisComponent of ins_6Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp_6.keys', pre_instru_resp_6.keys);
    if (typeof pre_instru_resp_6.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp_6.rt', pre_instru_resp_6.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp_6.stop();
    // the Routine "ins_6" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var wrong;
var _key_resp_3_allKeys;
var Check_1Components;
function Check_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'Check_1'-------
    t = 0;
    Check_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if (testing) {
        continueRoutine = false;
    }
    wrong = 0;
    
    key_resp_3.keys = undefined;
    key_resp_3.rt = undefined;
    _key_resp_3_allKeys = [];
    // keep track of which components have finished
    Check_1Components = [];
    Check_1Components.push(check1);
    Check_1Components.push(a1);
    Check_1Components.push(key_resp_3);
    
    for (const thisComponent of Check_1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Check_1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'Check_1'-------
    // get current time
    t = Check_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *check1* updates
    if (t >= 0.0 && check1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      check1.tStart = t;  // (not accounting for frame time here)
      check1.frameNStart = frameN;  // exact frame index
      
      check1.setAutoDraw(true);
    }

    
    // *a1* updates
    if (t >= 0.0 && a1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      a1.tStart = t;  // (not accounting for frame time here)
      a1.frameNStart = frameN;  // exact frame index
      
      a1.setAutoDraw(true);
    }

    
    // *key_resp_3* updates
    if (t >= 0.0 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_3.tStart = t;  // (not accounting for frame time here)
      key_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.clearEvents(); });
    }

    if (key_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_3.getKeys({keyList: ['1', '2', '3', '4'], waitRelease: false});
      _key_resp_3_allKeys = _key_resp_3_allKeys.concat(theseKeys);
      if (_key_resp_3_allKeys.length > 0) {
        key_resp_3.keys = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_3.rt = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Check_1Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var feedback1_text;
var feedback1_text_color;
function Check_1RoutineEnd() {
  return async function () {
    //------Ending Routine 'Check_1'-------
    for (const thisComponent of Check_1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if ((key_resp_3.keys === "3")) {
        feedback1_text = "Correct";
        feedback1_text_color = "green";
    } else {
        feedback1_text = "Incorrect";
        feedback1_text_color = "red";
        wrong = (wrong + 1);
    }
    
    psychoJS.experiment.addData('key_resp_3.keys', key_resp_3.keys);
    if (typeof key_resp_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_3.rt', key_resp_3.rt);
        routineTimer.reset();
        }
    
    key_resp_3.stop();
    // the Routine "Check_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var ins_fbComponents;
function ins_fbRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_fb'-------
    t = 0;
    ins_fbClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_2.setColor(new util.Color(feedback1_text_color));
    feedback_2.setText(feedback1_text);
    if (testing) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    ins_fbComponents = [];
    ins_fbComponents.push(feedback_2);
    
    for (const thisComponent of ins_fbComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_fbRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_fb'-------
    // get current time
    t = ins_fbClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_2* updates
    if (t >= 0.0 && feedback_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_2.tStart = t;  // (not accounting for frame time here)
      feedback_2.frameNStart = frameN;  // exact frame index
      
      feedback_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + feedback_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_fbComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_fbRoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_fb'-------
    for (const thisComponent of ins_fbComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "ins_fb" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_4_allKeys;
var Check_2Components;
function Check_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'Check_2'-------
    t = 0;
    Check_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    b1.setPos(k1);
    b1.setAlignHoriz('left');
    
    key_resp_4.keys = undefined;
    key_resp_4.rt = undefined;
    _key_resp_4_allKeys = [];
    // keep track of which components have finished
    Check_2Components = [];
    Check_2Components.push(check2);
    Check_2Components.push(b1);
    Check_2Components.push(key_resp_4);
    
    for (const thisComponent of Check_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Check_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'Check_2'-------
    // get current time
    t = Check_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *check2* updates
    if (t >= 0.0 && check2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      check2.tStart = t;  // (not accounting for frame time here)
      check2.frameNStart = frameN;  // exact frame index
      
      check2.setAutoDraw(true);
    }

    
    // *b1* updates
    if (t >= 0.0 && b1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      b1.tStart = t;  // (not accounting for frame time here)
      b1.frameNStart = frameN;  // exact frame index
      
      b1.setAutoDraw(true);
    }

    
    // *key_resp_4* updates
    if (t >= 0.0 && key_resp_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_4.tStart = t;  // (not accounting for frame time here)
      key_resp_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_4.clearEvents(); });
    }

    if (key_resp_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_4.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _key_resp_4_allKeys = _key_resp_4_allKeys.concat(theseKeys);
      if (_key_resp_4_allKeys.length > 0) {
        key_resp_4.keys = _key_resp_4_allKeys[_key_resp_4_allKeys.length - 1].name;  // just the last key pressed
        key_resp_4.rt = _key_resp_4_allKeys[_key_resp_4_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Check_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var feedback2_text;
var feedback2_text_color;
function Check_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'Check_2'-------
    for (const thisComponent of Check_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('key_resp_4.keys', key_resp_4.keys);
    if (typeof key_resp_4.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_4.rt', key_resp_4.rt);
        routineTimer.reset();
        }
    
    key_resp_4.stop();
    if ((key_resp_4.keys === "1")) {
        feedback2_text = "Correct";
        feedback2_text_color = "green";
    } else {
        feedback2_text = "Incorrect";
        feedback2_text_color = "red";
        wrong = (wrong + 1);
    }
    
    // the Routine "Check_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var ins_fb_2Components;
function ins_fb_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_fb_2'-------
    t = 0;
    ins_fb_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_3.setColor(new util.Color(feedback2_text_color));
    feedback_3.setText(feedback2_text);
    if (testing) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    ins_fb_2Components = [];
    ins_fb_2Components.push(feedback_3);
    
    for (const thisComponent of ins_fb_2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_fb_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_fb_2'-------
    // get current time
    t = ins_fb_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_3* updates
    if (t >= 0.0 && feedback_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_3.tStart = t;  // (not accounting for frame time here)
      feedback_3.frameNStart = frameN;  // exact frame index
      
      feedback_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + feedback_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_3.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_fb_2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_fb_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_fb_2'-------
    for (const thisComponent of ins_fb_2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "ins_fb_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_6_allKeys;
var Check_4Components;
function Check_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'Check_4'-------
    t = 0;
    Check_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    d1.setPos(k3);
    d1.setAlignHoriz('left')
    key_resp_6.keys = undefined;
    key_resp_6.rt = undefined;
    _key_resp_6_allKeys = [];
    pairing_sub_7.setSize(pairsize2);
    result_2.setImage('only_sub_wrong.png');
    result_2.setSize(sizeForImage('only_sub_wrong.png', 0.16));
    // keep track of which components have finished
    Check_4Components = [];
    Check_4Components.push(check4);
    Check_4Components.push(d1);
    Check_4Components.push(key_resp_6);
    Check_4Components.push(pairing_sub_7);
    Check_4Components.push(result_2);
    
    for (const thisComponent of Check_4Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Check_4RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'Check_4'-------
    // get current time
    t = Check_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *check4* updates
    if (t >= 0.0 && check4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      check4.tStart = t;  // (not accounting for frame time here)
      check4.frameNStart = frameN;  // exact frame index
      
      check4.setAutoDraw(true);
    }

    
    // *d1* updates
    if (t >= 0.0 && d1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      d1.tStart = t;  // (not accounting for frame time here)
      d1.frameNStart = frameN;  // exact frame index
      
      d1.setAutoDraw(true);
    }

    
    // *key_resp_6* updates
    if (t >= 0.0 && key_resp_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_6.tStart = t;  // (not accounting for frame time here)
      key_resp_6.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_6.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_6.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_6.clearEvents(); });
    }

    if (key_resp_6.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_6.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _key_resp_6_allKeys = _key_resp_6_allKeys.concat(theseKeys);
      if (_key_resp_6_allKeys.length > 0) {
        key_resp_6.keys = _key_resp_6_allKeys[_key_resp_6_allKeys.length - 1].name;  // just the last key pressed
        key_resp_6.rt = _key_resp_6_allKeys[_key_resp_6_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *pairing_sub_7* updates
    if (t >= 0.0 && pairing_sub_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_7.tStart = t;  // (not accounting for frame time here)
      pairing_sub_7.frameNStart = frameN;  // exact frame index
      
      pairing_sub_7.setAutoDraw(true);
    }

    
    // *result_2* updates
    if (t >= 0.0 && result_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result_2.tStart = t;  // (not accounting for frame time here)
      result_2.frameNStart = frameN;  // exact frame index
      
      result_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Check_4Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var feedback4_text;
var feedback4_text_color;
function Check_4RoutineEnd() {
  return async function () {
    //------Ending Routine 'Check_4'-------
    for (const thisComponent of Check_4Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('key_resp_6.keys', key_resp_6.keys);
    if (typeof key_resp_6.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_6.rt', key_resp_6.rt);
        routineTimer.reset();
        }
    
    key_resp_6.stop();
    if ((key_resp_6.keys === "2")) {
        feedback4_text = "Correct";
        feedback4_text_color = "green";
    } else {
        feedback4_text = "Incorrect";
        feedback4_text_color = "red";
        wrong = (wrong + 1);
    }
    
    // the Routine "Check_4" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var ins_fb_4Components;
function ins_fb_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_fb_4'-------
    t = 0;
    ins_fb_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_5.setColor(new util.Color(feedback4_text_color));
    feedback_5.setText(feedback4_text);
    if (testing) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    ins_fb_4Components = [];
    ins_fb_4Components.push(feedback_5);
    
    for (const thisComponent of ins_fb_4Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_fb_4RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_fb_4'-------
    // get current time
    t = ins_fb_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_5* updates
    if (t >= 0.0 && feedback_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_5.tStart = t;  // (not accounting for frame time here)
      feedback_5.frameNStart = frameN;  // exact frame index
      
      feedback_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + feedback_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_5.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_fb_4Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_fb_4RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_fb_4'-------
    for (const thisComponent of ins_fb_4Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "ins_fb_4" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_7_allKeys;
var Check_5Components;
function Check_5RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'Check_5'-------
    t = 0;
    Check_5Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    e1.setPos(k3);
    e1.setAlignHoriz('left')
    key_resp_7.keys = undefined;
    key_resp_7.rt = undefined;
    _key_resp_7_allKeys = [];
    pairing_sub_8.setSize(pairsize2);
    result_3.setImage('both_wrong.png');
    result_3.setSize(sizeForImage('both_wrong.png', 0.16));
    // keep track of which components have finished
    Check_5Components = [];
    Check_5Components.push(check5);
    Check_5Components.push(e1);
    Check_5Components.push(key_resp_7);
    Check_5Components.push(pairing_sub_8);
    Check_5Components.push(result_3);
    
    for (const thisComponent of Check_5Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function Check_5RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'Check_5'-------
    // get current time
    t = Check_5Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *check5* updates
    if (t >= 0.0 && check5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      check5.tStart = t;  // (not accounting for frame time here)
      check5.frameNStart = frameN;  // exact frame index
      
      check5.setAutoDraw(true);
    }

    
    // *e1* updates
    if (t >= 0.0 && e1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      e1.tStart = t;  // (not accounting for frame time here)
      e1.frameNStart = frameN;  // exact frame index
      
      e1.setAutoDraw(true);
    }

    
    // *key_resp_7* updates
    if (t >= 0.0 && key_resp_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_7.tStart = t;  // (not accounting for frame time here)
      key_resp_7.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_7.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_7.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_7.clearEvents(); });
    }

    if (key_resp_7.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_7.getKeys({keyList: ['1', '2', '3'], waitRelease: false});
      _key_resp_7_allKeys = _key_resp_7_allKeys.concat(theseKeys);
      if (_key_resp_7_allKeys.length > 0) {
        key_resp_7.keys = _key_resp_7_allKeys[_key_resp_7_allKeys.length - 1].name;  // just the last key pressed
        key_resp_7.rt = _key_resp_7_allKeys[_key_resp_7_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *pairing_sub_8* updates
    if (t >= 0.0 && pairing_sub_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_8.tStart = t;  // (not accounting for frame time here)
      pairing_sub_8.frameNStart = frameN;  // exact frame index
      
      pairing_sub_8.setAutoDraw(true);
    }

    
    // *result_3* updates
    if (t >= 0.0 && result_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result_3.tStart = t;  // (not accounting for frame time here)
      result_3.frameNStart = frameN;  // exact frame index
      
      result_3.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Check_5Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var feedback5_text;
var feedback5_text_color;
function Check_5RoutineEnd() {
  return async function () {
    //------Ending Routine 'Check_5'-------
    for (const thisComponent of Check_5Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('key_resp_7.keys', key_resp_7.keys);
    if (typeof key_resp_7.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_7.rt', key_resp_7.rt);
        routineTimer.reset();
        }
    
    key_resp_7.stop();
    if ((key_resp_7.keys === "2")) {
        feedback5_text = "Correct";
        feedback5_text_color = "green";
    } else {
        feedback5_text = "Incorrect";
        feedback5_text_color = "red";
        wrong = (wrong + 1);
    }
    
    // the Routine "Check_5" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var ins_fb_5Components;
function ins_fb_5RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ins_fb_5'-------
    t = 0;
    ins_fb_5Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback_6.setColor(new util.Color(feedback5_text_color));
    feedback_6.setText(feedback5_text);
    if (testing) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    ins_fb_5Components = [];
    ins_fb_5Components.push(feedback_6);
    
    for (const thisComponent of ins_fb_5Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ins_fb_5RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ins_fb_5'-------
    // get current time
    t = ins_fb_5Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_6* updates
    if (t >= 0.0 && feedback_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_6.tStart = t;  // (not accounting for frame time here)
      feedback_6.frameNStart = frameN;  // exact frame index
      
      feedback_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + feedback_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_6.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ins_fb_5Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ins_fb_5RoutineEnd() {
  return async function () {
    //------Ending Routine 'ins_fb_5'-------
    for (const thisComponent of ins_fb_5Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "ins_fb_5" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var end_insComponents;
function end_insRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'end_ins'-------
    t = 0;
    end_insClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((testing | (wrong === 0))) {
        trials_2.finished = true;
    }
    
    // keep track of which components have finished
    end_insComponents = [];
    
    for (const thisComponent of end_insComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function end_insRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'end_ins'-------
    // get current time
    t = end_insClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of end_insComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function end_insRoutineEnd() {
  return async function () {
    //------Ending Routine 'end_ins'-------
    for (const thisComponent of end_insComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "end_ins" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var read_againComponents;
function read_againRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'read_again'-------
    t = 0;
    read_againClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(3.000000);
    // update component parameters for each repeat
    if ((testing | (wrong === 0))) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    read_againComponents = [];
    read_againComponents.push(text_15);
    
    for (const thisComponent of read_againComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function read_againRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'read_again'-------
    // get current time
    t = read_againClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_15* updates
    if (t >= 0.0 && text_15.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_15.tStart = t;  // (not accounting for frame time here)
      text_15.frameNStart = frameN;  // exact frame index
      
      text_15.setAutoDraw(true);
    }

    frameRemains = 0.0 + 3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_15.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_15.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of read_againComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function read_againRoutineEnd() {
  return async function () {
    //------Ending Routine 'read_again'-------
    for (const thisComponent of read_againComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var _pre_instru_resp_allKeys;
var prac_insComponents;
function prac_insRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'prac_ins'-------
    t = 0;
    prac_insClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pre_instru_resp.keys = undefined;
    pre_instru_resp.rt = undefined;
    _pre_instru_resp_allKeys = [];
    // keep track of which components have finished
    prac_insComponents = [];
    prac_insComponents.push(text);
    prac_insComponents.push(pre_instru_resp);
    
    for (const thisComponent of prac_insComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function prac_insRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'prac_ins'-------
    // get current time
    t = prac_insClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    
    // *pre_instru_resp* updates
    if (t >= 0.0 && pre_instru_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pre_instru_resp.tStart = t;  // (not accounting for frame time here)
      pre_instru_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { pre_instru_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { pre_instru_resp.clearEvents(); });
    }

    if (pre_instru_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = pre_instru_resp.getKeys({keyList: ['space'], waitRelease: false});
      _pre_instru_resp_allKeys = _pre_instru_resp_allKeys.concat(theseKeys);
      if (_pre_instru_resp_allKeys.length > 0) {
        pre_instru_resp.keys = _pre_instru_resp_allKeys[_pre_instru_resp_allKeys.length - 1].name;  // just the last key pressed
        pre_instru_resp.rt = _pre_instru_resp_allKeys[_pre_instru_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of prac_insComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prac_insRoutineEnd() {
  return async function () {
    //------Ending Routine 'prac_ins'-------
    for (const thisComponent of prac_insComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('pre_instru_resp.keys', pre_instru_resp.keys);
    if (typeof pre_instru_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('pre_instru_resp.rt', pre_instru_resp.rt);
        routineTimer.reset();
        }
    
    pre_instru_resp.stop();
    // the Routine "prac_ins" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var count_text;
var prac_staComponents;
function prac_staRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'prac_sta'-------
    t = 0;
    prac_staClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    count_text = ("Practice: Round " + (trials.thisTrialN + 1).toString());
    
    start_prac_text.setText(count_text);
    // keep track of which components have finished
    prac_staComponents = [];
    prac_staComponents.push(start_prac_text);
    
    for (const thisComponent of prac_staComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function prac_staRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'prac_sta'-------
    // get current time
    t = prac_staClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *start_prac_text* updates
    if (t >= 0.0 && start_prac_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      start_prac_text.tStart = t;  // (not accounting for frame time here)
      start_prac_text.frameNStart = frameN;  // exact frame index
      
      start_prac_text.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (start_prac_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      start_prac_text.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of prac_staComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prac_staRoutineEnd() {
  return async function () {
    //------Ending Routine 'prac_sta'-------
    for (const thisComponent of prac_staComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var prac_stiComponents;
function prac_stiRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'prac_sti'-------
    t = 0;
    prac_stiClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    image.setSize(dotsize);
    image.setImage(prac_dot_sti);
    // keep track of which components have finished
    prac_stiComponents = [];
    prac_stiComponents.push(image);
    
    for (const thisComponent of prac_stiComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function prac_stiRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'prac_sti'-------
    // get current time
    t = prac_stiClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *image* updates
    if (t >= 0.0 && image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image.tStart = t;  // (not accounting for frame time here)
      image.frameNStart = frameN;  // exact frame index
      
      image.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of prac_stiComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prac_stiRoutineEnd() {
  return async function () {
    //------Ending Routine 'prac_sti'-------
    for (const thisComponent of prac_stiComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var gotValidClick;
var prac_judgeComponents;
function prac_judgeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'prac_judge'-------
    t = 0;
    prac_judgeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    prac_judge_text.setHeight(0.1);
    // setup some python lists for storing info about the judge_2
    judge_2.clicked_name = [];
    gotValidClick = false; // until a click is received
    RightButton_2.setText(dotrighttext);
    LeftButton_2.setText(dotlefttext);
    // keep track of which components have finished
    prac_judgeComponents = [];
    prac_judgeComponents.push(prac_judge_text);
    prac_judgeComponents.push(judge_2);
    prac_judgeComponents.push(rect1);
    prac_judgeComponents.push(rect2);
    prac_judgeComponents.push(RightButton_2);
    prac_judgeComponents.push(LeftButton_2);
    
    for (const thisComponent of prac_judgeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var rectcolor2;
var rectcolor1;
var prevButtonState;
var _mouseButtons;
function prac_judgeRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'prac_judge'-------
    // get current time
    t = prac_judgeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (RightButton_2.contains(judge_2)) {
        rectcolor2 = "red";
    } else {
        rectcolor2 = "white";
    }
    if (LeftButton_2.contains(judge_2)) {
        rectcolor1 = "red";
    } else {
        rectcolor1 = "white";
    }
    
    
    // *prac_judge_text* updates
    if (t >= 0.0 && prac_judge_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      prac_judge_text.tStart = t;  // (not accounting for frame time here)
      prac_judge_text.frameNStart = frameN;  // exact frame index
      
      prac_judge_text.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (prac_judge_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      prac_judge_text.setAutoDraw(false);
    }
    // *judge_2* updates
    if (t >= 0.0 && judge_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      judge_2.tStart = t;  // (not accounting for frame time here)
      judge_2.frameNStart = frameN;  // exact frame index
      
      judge_2.status = PsychoJS.Status.STARTED;
      judge_2.mouseClock.reset();
      prevButtonState = judge_2.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (judge_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      judge_2.status = PsychoJS.Status.FINISHED;
  }
    if (judge_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = judge_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [RightButton_2,LeftButton_2]) {
            if (obj.contains(judge_2)) {
              gotValidClick = true;
              judge_2.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *rect1* updates
    if (t >= 0.0 && rect1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rect1.tStart = t;  // (not accounting for frame time here)
      rect1.frameNStart = frameN;  // exact frame index
      
      rect1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rect1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rect1.setAutoDraw(false);
    }
    
    if (rect1.status === PsychoJS.Status.STARTED){ // only update if being drawn
      rect1.setLineColor(new util.Color(rectcolor1), false);
    }
    
    // *rect2* updates
    if (t >= 0.0 && rect2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rect2.tStart = t;  // (not accounting for frame time here)
      rect2.frameNStart = frameN;  // exact frame index
      
      rect2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rect2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rect2.setAutoDraw(false);
    }
    
    if (rect2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      rect2.setLineColor(new util.Color(rectcolor2), false);
    }
    
    // *RightButton_2* updates
    if (t >= 0.0 && RightButton_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      RightButton_2.tStart = t;  // (not accounting for frame time here)
      RightButton_2.frameNStart = frameN;  // exact frame index
      
      RightButton_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (RightButton_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      RightButton_2.setAutoDraw(false);
    }
    
    // *LeftButton_2* updates
    if (t >= 0.0 && LeftButton_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      LeftButton_2.tStart = t;  // (not accounting for frame time here)
      LeftButton_2.frameNStart = frameN;  // exact frame index
      
      LeftButton_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (LeftButton_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      LeftButton_2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of prac_judgeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var get_clicked;
var feedback_text;
var feedback_text_color;
var _mouseXYs;
function prac_judgeRoutineEnd() {
  return async function () {
    //------Ending Routine 'prac_judge'-------
    for (const thisComponent of prac_judgeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    get_clicked = judge_2.clicked_name;
    psychoJS.experiment.addData("clicked", get_clicked);
    if ((! gotValidClick)) {
        feedback_text = "Incomplete: Please respond faster";
        feedback_text_color = "red";
    } else {
        if ((judge_2.clicked_name[0] === prac_answer)) {
            feedback_text = "Correct";
            feedback_text_color = "green";
            prac_acc += 1;
        } else {
            feedback_text = "Incorrect";
            feedback_text_color = "red";
        }
    }
    
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = judge_2.getPos();
    _mouseButtons = judge_2.getPressed();
    psychoJS.experiment.addData('judge_2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('judge_2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('judge_2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('judge_2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('judge_2.rightButton', _mouseButtons[2]);
    if (judge_2.clicked_name.length > 0) {
      psychoJS.experiment.addData('judge_2.clicked_name', judge_2.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}


var prac_fbComponents;
function prac_fbRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'prac_fb'-------
    t = 0;
    prac_fbClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    feedback.setColor(new util.Color(feedback_text_color));
    feedback.setText(feedback_text);
    // keep track of which components have finished
    prac_fbComponents = [];
    prac_fbComponents.push(feedback);
    
    for (const thisComponent of prac_fbComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function prac_fbRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'prac_fb'-------
    // get current time
    t = prac_fbClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback* updates
    if (t >= 0.0 && feedback.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback.tStart = t;  // (not accounting for frame time here)
      feedback.frameNStart = frameN;  // exact frame index
      
      feedback.setAutoDraw(true);
    }

    frameRemains = 0.0 + feedback_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of prac_fbComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function prac_fbRoutineEnd() {
  return async function () {
    //------Ending Routine 'prac_fb'-------
    for (const thisComponent of prac_fbComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "prac_fb" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _instru_resp_2_allKeys;
var phase_insComponents;
function phase_insRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'phase_ins'-------
    t = 0;
    phase_insClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    instru_resp_2.keys = undefined;
    instru_resp_2.rt = undefined;
    _instru_resp_2_allKeys = [];
    prac_acc = (prac_acc / 5);
    psychoJS.experiment.addData("prac_acc", prac_acc);
    
    // keep track of which components have finished
    phase_insComponents = [];
    phase_insComponents.push(instru_text_2);
    phase_insComponents.push(instru_resp_2);
    
    for (const thisComponent of phase_insComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function phase_insRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'phase_ins'-------
    // get current time
    t = phase_insClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instru_text_2* updates
    if (t >= 0.0 && instru_text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instru_text_2.tStart = t;  // (not accounting for frame time here)
      instru_text_2.frameNStart = frameN;  // exact frame index
      
      instru_text_2.setAutoDraw(true);
    }

    
    // *instru_resp_2* updates
    if (t >= 0.0 && instru_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instru_resp_2.tStart = t;  // (not accounting for frame time here)
      instru_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instru_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instru_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instru_resp_2.clearEvents(); });
    }

    if (instru_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = instru_resp_2.getKeys({keyList: ['space'], waitRelease: false});
      _instru_resp_2_allKeys = _instru_resp_2_allKeys.concat(theseKeys);
      if (_instru_resp_2_allKeys.length > 0) {
        instru_resp_2.keys = _instru_resp_2_allKeys[_instru_resp_2_allKeys.length - 1].name;  // just the last key pressed
        instru_resp_2.rt = _instru_resp_2_allKeys[_instru_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of phase_insComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function phase_insRoutineEnd() {
  return async function () {
    //------Ending Routine 'phase_ins'-------
    for (const thisComponent of phase_insComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    instru_resp_2.stop();
    // the Routine "phase_ins" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var first_guilt_staComponents;
function first_guilt_staRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'first_guilt_sta'-------
    t = 0;
    first_guilt_staClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    if ((trialseq.thisTrialN !== 0)) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    first_guilt_staComponents = [];
    first_guilt_staComponents.push(text_10);
    
    for (const thisComponent of first_guilt_staComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function first_guilt_staRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'first_guilt_sta'-------
    // get current time
    t = first_guilt_staClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_10* updates
    if (t >= 0.0 && text_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_10.tStart = t;  // (not accounting for frame time here)
      text_10.frameNStart = frameN;  // exact frame index
      
      text_10.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_10.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of first_guilt_staComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function first_guilt_staRoutineEnd() {
  return async function () {
    //------Ending Routine 'first_guilt_sta'-------
    for (const thisComponent of first_guilt_staComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var pairing_wait_time;
var count;
var timejit;
var guilt_pairingComponents;
function guilt_pairingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'guilt_pairing'-------
    t = 0;
    guilt_pairingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pairing_wait_time = (Math.random() + 2);
    count = 0;
    timejit = timejitter;
    
    pairing_sub.setPos(pairpos);
    pairing_sub.setSize(pairsize0);
    // keep track of which components have finished
    guilt_pairingComponents = [];
    guilt_pairingComponents.push(pairing_sub);
    guilt_pairingComponents.push(pairing_wait);
    guilt_pairingComponents.push(Ellipsis_2);
    
    for (const thisComponent of guilt_pairingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var EllipsisText;
function guilt_pairingRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'guilt_pairing'-------
    // get current time
    t = guilt_pairingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if ((t > timejit[0])) {
        EllipsisText = ellis[(count % 3)];
        count = (count + 1);
        timejit = timejit.slice(1);
    }
    
    
    // *pairing_sub* updates
    if (t >= 0.0 && pairing_sub.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub.tStart = t;  // (not accounting for frame time here)
      pairing_sub.frameNStart = frameN;  // exact frame index
      
      pairing_sub.setAutoDraw(true);
    }

    frameRemains = 0.0 + pairing_wait_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_sub.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_sub.setAutoDraw(false);
    }
    
    // *pairing_wait* updates
    if (t >= 0.0 && pairing_wait.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_wait.tStart = t;  // (not accounting for frame time here)
      pairing_wait.frameNStart = frameN;  // exact frame index
      
      pairing_wait.setAutoDraw(true);
    }

    frameRemains = 0.0 + pairing_wait_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_wait.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_wait.setAutoDraw(false);
    }
    
    // *Ellipsis_2* updates
    if (t >= 0 && Ellipsis_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Ellipsis_2.tStart = t;  // (not accounting for frame time here)
      Ellipsis_2.frameNStart = frameN;  // exact frame index
      
      Ellipsis_2.setAutoDraw(true);
    }

    frameRemains = 0 + pairing_wait_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Ellipsis_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Ellipsis_2.setAutoDraw(false);
    }
    
    if (Ellipsis_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      Ellipsis_2.setText(EllipsisText, false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of guilt_pairingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function guilt_pairingRoutineEnd() {
  return async function () {
    //------Ending Routine 'guilt_pairing'-------
    for (const thisComponent of guilt_pairingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "guilt_pairing" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var guilt_cue_time;
var guilt_cueComponents;
function guilt_cueRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'guilt_cue'-------
    t = 0;
    guilt_cueClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    guilt_cue_time = 1;
    
    pairing_sub_2.setSize(pairsize2);
    pairing_sub_2.setImage('Punish_Pair.png');
    attention.setHeight(bottom_textsize);
    // keep track of which components have finished
    guilt_cueComponents = [];
    guilt_cueComponents.push(pairing_sub_2);
    guilt_cueComponents.push(attention);
    
    for (const thisComponent of guilt_cueComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function guilt_cueRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'guilt_cue'-------
    // get current time
    t = guilt_cueClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pairing_sub_2* updates
    if (t >= 0.0 && pairing_sub_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_2.tStart = t;  // (not accounting for frame time here)
      pairing_sub_2.frameNStart = frameN;  // exact frame index
      
      pairing_sub_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + guilt_cue_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_sub_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_sub_2.setAutoDraw(false);
    }
    
    // *attention* updates
    if (t >= 0.0 && attention.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      attention.tStart = t;  // (not accounting for frame time here)
      attention.frameNStart = frameN;  // exact frame index
      
      attention.setAutoDraw(true);
    }

    frameRemains = 0.0 + guilt_cue_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (attention.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      attention.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of guilt_cueComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function guilt_cueRoutineEnd() {
  return async function () {
    //------Ending Routine 'guilt_cue'-------
    for (const thisComponent of guilt_cueComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "guilt_cue" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var guilt_stiComponents;
function guilt_stiRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'guilt_sti'-------
    t = 0;
    guilt_stiClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.500000);
    // update component parameters for each repeat
    pairing_sub_3.setSize(pairsize2);
    pairing_sub_3.setImage('Punish_Pair.png');
    dotstipic.setImage(picture);
    // keep track of which components have finished
    guilt_stiComponents = [];
    guilt_stiComponents.push(pairing_sub_3);
    guilt_stiComponents.push(dotstipic);
    
    for (const thisComponent of guilt_stiComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function guilt_stiRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'guilt_sti'-------
    // get current time
    t = guilt_stiClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pairing_sub_3* updates
    if (t >= 0.0 && pairing_sub_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_3.tStart = t;  // (not accounting for frame time here)
      pairing_sub_3.frameNStart = frameN;  // exact frame index
      
      pairing_sub_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_sub_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_sub_3.setAutoDraw(false);
    }
    
    // *dotstipic* updates
    if (t >= 0.0 && dotstipic.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dotstipic.tStart = t;  // (not accounting for frame time here)
      dotstipic.frameNStart = frameN;  // exact frame index
      
      dotstipic.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dotstipic.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dotstipic.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of guilt_stiComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function guilt_stiRoutineEnd() {
  return async function () {
    //------Ending Routine 'guilt_sti'-------
    for (const thisComponent of guilt_stiComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var guilt_judgeComponents;
function guilt_judgeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'guilt_judge'-------
    t = 0;
    guilt_judgeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    pairing_sub_4.setSize(pairsize2);
    pairing_sub_4.setImage('Punish_Pair.png');
    sti_text1.setText(number);
    sti_text1.setHeight(bottom_textsize);
    // setup some python lists for storing info about the judge
    judge.clicked_name = [];
    gotValidClick = false; // until a click is received
    RightButton.setText(dotrighttext);
    LeftButton.setText(dotlefttext);
    // keep track of which components have finished
    guilt_judgeComponents = [];
    guilt_judgeComponents.push(pairing_sub_4);
    guilt_judgeComponents.push(sti_text1);
    guilt_judgeComponents.push(judge);
    guilt_judgeComponents.push(RightButton);
    guilt_judgeComponents.push(LeftButton);
    guilt_judgeComponents.push(rect1_2);
    guilt_judgeComponents.push(rect2_2);
    guilt_judgeComponents.push(text_16);
    
    for (const thisComponent of guilt_judgeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function guilt_judgeRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'guilt_judge'-------
    // get current time
    t = guilt_judgeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pairing_sub_4* updates
    if (t >= 0.0 && pairing_sub_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_4.tStart = t;  // (not accounting for frame time here)
      pairing_sub_4.frameNStart = frameN;  // exact frame index
      
      pairing_sub_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_sub_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_sub_4.setAutoDraw(false);
    }
    
    // *sti_text1* updates
    if (t >= 0.0 && sti_text1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      sti_text1.tStart = t;  // (not accounting for frame time here)
      sti_text1.frameNStart = frameN;  // exact frame index
      
      sti_text1.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (sti_text1.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      sti_text1.setAutoDraw(false);
    }
    // *judge* updates
    if (t >= 0.0 && judge.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      judge.tStart = t;  // (not accounting for frame time here)
      judge.frameNStart = frameN;  // exact frame index
      
      judge.status = PsychoJS.Status.STARTED;
      judge.mouseClock.reset();
      prevButtonState = judge.getPressed();  // if button is down already this ISN'T a new click
      }
    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (judge.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      judge.status = PsychoJS.Status.FINISHED;
  }
    if (judge.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = judge.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [RightButton,LeftButton]) {
            if (obj.contains(judge)) {
              gotValidClick = true;
              judge.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    if (RightButton.contains(judge)) {
        rectcolor2 = "red";
    } else {
        rectcolor2 = "white";
    }
    if (LeftButton.contains(judge)) {
        rectcolor1 = "red";
    } else {
        rectcolor1 = "white";
    }
    
    
    // *RightButton* updates
    if (t >= 0.0 && RightButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      RightButton.tStart = t;  // (not accounting for frame time here)
      RightButton.frameNStart = frameN;  // exact frame index
      
      RightButton.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (RightButton.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      RightButton.setAutoDraw(false);
    }
    
    // *LeftButton* updates
    if (t >= 0.0 && LeftButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      LeftButton.tStart = t;  // (not accounting for frame time here)
      LeftButton.frameNStart = frameN;  // exact frame index
      
      LeftButton.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (LeftButton.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      LeftButton.setAutoDraw(false);
    }
    
    // *rect1_2* updates
    if (t >= 0.0 && rect1_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rect1_2.tStart = t;  // (not accounting for frame time here)
      rect1_2.frameNStart = frameN;  // exact frame index
      
      rect1_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rect1_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rect1_2.setAutoDraw(false);
    }
    
    if (rect1_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      rect1_2.setLineColor(new util.Color(rectcolor1), false);
    }
    
    // *rect2_2* updates
    if (t >= 0.0 && rect2_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rect2_2.tStart = t;  // (not accounting for frame time here)
      rect2_2.frameNStart = frameN;  // exact frame index
      
      rect2_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (rect2_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      rect2_2.setAutoDraw(false);
    }
    
    if (rect2_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      rect2_2.setLineColor(new util.Color(rectcolor2), false);
    }
    
    // *text_16* updates
    if (t >= 0.0 && text_16.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_16.tStart = t;  // (not accounting for frame time here)
      text_16.frameNStart = frameN;  // exact frame index
      
      text_16.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_16.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_16.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of guilt_judgeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var get_clicked_guilt;
var rep;
function guilt_judgeRoutineEnd() {
  return async function () {
    //------Ending Routine 'guilt_judge'-------
    for (const thisComponent of guilt_judgeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = judge.getPos();
    _mouseButtons = judge.getPressed();
    psychoJS.experiment.addData('judge.x', _mouseXYs[0]);
    psychoJS.experiment.addData('judge.y', _mouseXYs[1]);
    psychoJS.experiment.addData('judge.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('judge.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('judge.rightButton', _mouseButtons[2]);
    if (judge.clicked_name.length > 0) {
      psychoJS.experiment.addData('judge.clicked_name', judge.clicked_name[0]);}
    get_clicked_guilt = judge.clicked_name;
    psychoJS.experiment.addData("clicked_guilt", get_clicked_guilt);
    rep = 1;
    if ((gotValidClick === false)) {
        judge.clicked_name = ["No response"];
    }
    if (((type_trial === 4) & (judge.clicked_name[0] !== answer))) {
        rep = 0;
    }
    if (((type_trial === 5) & (judge.clicked_name[0] !== answer))) {
        rep = 0;
    }
    
    return Scheduler.Event.NEXT;
  };
}


var wait_check_time;
var guilt_check_answerComponents;
function guilt_check_answerRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'guilt_check_answer'-------
    t = 0;
    guilt_check_answerClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pairing_sub_5.setSize(pairsize2);
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    wait_check_time = 0.8;
    count = 0;
    timejit = timejitter;
    
    wait_check_text.setHeight(bottom_textsize);
    // keep track of which components have finished
    guilt_check_answerComponents = [];
    guilt_check_answerComponents.push(pairing_sub_5);
    guilt_check_answerComponents.push(wait_check_text);
    guilt_check_answerComponents.push(Ellipsis_3);
    
    for (const thisComponent of guilt_check_answerComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function guilt_check_answerRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'guilt_check_answer'-------
    // get current time
    t = guilt_check_answerClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pairing_sub_5* updates
    if (t >= 0.0 && pairing_sub_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_5.tStart = t;  // (not accounting for frame time here)
      pairing_sub_5.frameNStart = frameN;  // exact frame index
      
      pairing_sub_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + wait_check_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_sub_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_sub_5.setAutoDraw(false);
    }
    if ((t > timejit[0])) {
        EllipsisText = ellis[(count % 3)];
        count = (count + 1);
        timejit = timejit.slice(1);
    }
    
    
    // *wait_check_text* updates
    if (t >= 0.0 && wait_check_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      wait_check_text.tStart = t;  // (not accounting for frame time here)
      wait_check_text.frameNStart = frameN;  // exact frame index
      
      wait_check_text.setAutoDraw(true);
    }

    frameRemains = 0.0 + wait_check_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (wait_check_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      wait_check_text.setAutoDraw(false);
    }
    
    // *Ellipsis_3* updates
    if (t >= 0 && Ellipsis_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Ellipsis_3.tStart = t;  // (not accounting for frame time here)
      Ellipsis_3.frameNStart = frameN;  // exact frame index
      
      Ellipsis_3.setAutoDraw(true);
    }

    frameRemains = 0 + wait_check_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Ellipsis_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Ellipsis_3.setAutoDraw(false);
    }
    
    if (Ellipsis_3.status === PsychoJS.Status.STARTED){ // only update if being drawn
      Ellipsis_3.setText(EllipsisText, false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of guilt_check_answerComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function guilt_check_answerRoutineEnd() {
  return async function () {
    //------Ending Routine 'guilt_check_answer'-------
    for (const thisComponent of guilt_check_answerComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "guilt_check_answer" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var warn_incompleteComponents;
function warn_incompleteRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'warn_incomplete'-------
    t = 0;
    warn_incompleteClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    if ((gotValidClick === true)) {
        continueRoutine = false;
    } else {
        incompleteTrials.push(chooserow[trialseq.thisTrialN]);
        console.log("incompleteTrials: ", incompleteTrials);
        psychoJS.experiment.addData("incompleteTrials", chooserow[trialseq.thisTrialN]);
    }
    
    // keep track of which components have finished
    warn_incompleteComponents = [];
    warn_incompleteComponents.push(text_14);
    
    for (const thisComponent of warn_incompleteComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function warn_incompleteRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'warn_incomplete'-------
    // get current time
    t = warn_incompleteClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_14* updates
    if (t >= 0.0 && text_14.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_14.tStart = t;  // (not accounting for frame time here)
      text_14.frameNStart = frameN;  // exact frame index
      
      text_14.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_14.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_14.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of warn_incompleteComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function warn_incompleteRoutineEnd() {
  return async function () {
    //------Ending Routine 'warn_incomplete'-------
    for (const thisComponent of warn_incompleteComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var warn_wrongComponents;
function warn_wrongRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'warn_wrong'-------
    t = 0;
    warn_wrongClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    if ((rep !== 0)) {
        continueRoutine = false;
    }
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    
    // keep track of which components have finished
    warn_wrongComponents = [];
    warn_wrongComponents.push(text_12);
    
    for (const thisComponent of warn_wrongComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function warn_wrongRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'warn_wrong'-------
    // get current time
    t = warn_wrongClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_12* updates
    if (t >= 0.0 && text_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_12.tStart = t;  // (not accounting for frame time here)
      text_12.frameNStart = frameN;  // exact frame index
      
      text_12.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_12.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_12.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of warn_wrongComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function warn_wrongRoutineEnd() {
  return async function () {
    //------Ending Routine 'warn_wrong'-------
    for (const thisComponent of warn_wrongComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


var phase1_result_time;
var FillerPunish;
var ValidPunish;
var PunishStart;
var PunishFinish;
var guilt_resultComponents;
function guilt_resultRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'guilt_result'-------
    t = 0;
    guilt_resultClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((rep === 0)) {
        continueRoutine = false;
    }
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    count = 0;
    timejit = timejitter;
    if ((((type_trial === 0) | (type_trial === 4)) | (type_trial === 5))) {
        phase1_result_time = 2;
        FillerPunish = 1;
        ValidPunish = 0;
        PunishStart = 0;
        PunishFinish = 0;
    } else {
        phase1_result_time = 4;
        FillerPunish = 0;
        ValidPunish = 1;
        PunishStart = 1;
        PunishFinish = 3;
    }
    
    pairing_sub_6.setSize(pairsize2);
    result.setImage(stipic);
    result.setSize(sizeForImage(stipic, 0.16));
    punish_text2.setOpacity(ValidPunish);
    punish_text2.setText('Partner will be shown the aversive image\n');
    punish_text2.setHeight(bottom_textsize);
    FillerText.setOpacity(FillerPunish);
    PunishImg.setSize(punishpicsize);
    // keep track of which components have finished
    guilt_resultComponents = [];
    guilt_resultComponents.push(pairing_sub_6);
    guilt_resultComponents.push(result);
    guilt_resultComponents.push(punish_text2);
    guilt_resultComponents.push(FillerText);
    guilt_resultComponents.push(PuPicText);
    guilt_resultComponents.push(PunishImg);
    guilt_resultComponents.push(Ellipsis);
    
    for (const thisComponent of guilt_resultComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function guilt_resultRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'guilt_result'-------
    // get current time
    t = guilt_resultClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (((t - PunishStart) > timejit[0])) {
        EllipsisText = ellis[(count % 3)];
        count = (count + 1);
        timejit = timejit.slice(1);
    } else {
        if ((t < PunishStart)) {
            EllipsisText = ellis[0];
        }
    }
    
    
    // *pairing_sub_6* updates
    if (t >= 0.0 && pairing_sub_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_6.tStart = t;  // (not accounting for frame time here)
      pairing_sub_6.frameNStart = frameN;  // exact frame index
      
      pairing_sub_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + phase1_result_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (pairing_sub_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      pairing_sub_6.setAutoDraw(false);
    }
    
    // *result* updates
    if (t >= 0.0 && result.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result.tStart = t;  // (not accounting for frame time here)
      result.frameNStart = frameN;  // exact frame index
      
      result.setAutoDraw(true);
    }

    frameRemains = 0.0 + phase1_result_time - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (result.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      result.setAutoDraw(false);
    }
    
    // *punish_text2* updates
    if (t >= PunishStart && punish_text2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      punish_text2.tStart = t;  // (not accounting for frame time here)
      punish_text2.frameNStart = frameN;  // exact frame index
      
      punish_text2.setAutoDraw(true);
    }

    frameRemains = PunishStart + PunishFinish - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (punish_text2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      punish_text2.setAutoDraw(false);
    }
    
    // *FillerText* updates
    if (t >= 0.0 && FillerText.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      FillerText.tStart = t;  // (not accounting for frame time here)
      FillerText.frameNStart = frameN;  // exact frame index
      
      FillerText.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (FillerText.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      FillerText.setAutoDraw(false);
    }
    
    // *PuPicText* updates
    if (t >= PunishStart && PuPicText.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      PuPicText.tStart = t;  // (not accounting for frame time here)
      PuPicText.frameNStart = frameN;  // exact frame index
      
      PuPicText.setAutoDraw(true);
    }

    frameRemains = PunishStart + PunishFinish - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (PuPicText.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      PuPicText.setAutoDraw(false);
    }
    
    // *PunishImg* updates
    if (t >= PunishStart && PunishImg.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      PunishImg.tStart = t;  // (not accounting for frame time here)
      PunishImg.frameNStart = frameN;  // exact frame index
      
      PunishImg.setAutoDraw(true);
    }

    frameRemains = PunishStart + PunishFinish - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (PunishImg.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      PunishImg.setAutoDraw(false);
    }
    
    // *Ellipsis* updates
    if (t >= PunishStart && Ellipsis.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Ellipsis.tStart = t;  // (not accounting for frame time here)
      Ellipsis.frameNStart = frameN;  // exact frame index
      
      Ellipsis.setAutoDraw(true);
    }

    frameRemains = PunishStart + PunishFinish - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Ellipsis.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Ellipsis.setAutoDraw(false);
    }
    
    if (Ellipsis.status === PsychoJS.Status.STARTED){ // only update if being drawn
      Ellipsis.setText(EllipsisText, false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of guilt_resultComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function guilt_resultRoutineEnd() {
  return async function () {
    //------Ending Routine 'guilt_result'-------
    for (const thisComponent of guilt_resultComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "guilt_result" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_guilt_allKeys;
var temp;
var DV_guiltComponents;
function DV_guiltRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'DV_guilt'-------
    t = 0;
    DV_guiltClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    slider_guilt.reset()
    key_guilt.keys = undefined;
    key_guilt.rt = undefined;
    _key_guilt_allKeys = [];
    if (((((DV !== 0) | (type_trial === 0)) | (type_trial === 4)) | (type_trial === 5))) {
        continueRoutine = false;
    }
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    temp = 0;
    
    result_cur_trial.setImage(stipic);
    result_cur_trial.setSize(sizeForImage(stipic, 0.08));
    // keep track of which components have finished
    DV_guiltComponents = [];
    DV_guiltComponents.push(slider_guilt);
    DV_guiltComponents.push(text_8);
    DV_guiltComponents.push(key_guilt);
    DV_guiltComponents.push(text_9);
    DV_guiltComponents.push(text_17);
    DV_guiltComponents.push(pairing_sub_cur_trial);
    DV_guiltComponents.push(result_cur_trial);
    DV_guiltComponents.push(time_reminder);
    
    for (const thisComponent of DV_guiltComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DV_guiltRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'DV_guilt'-------
    // get current time
    t = DV_guiltClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *slider_guilt* updates
    if (t >= 0.0 && slider_guilt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_guilt.tStart = t;  // (not accounting for frame time here)
      slider_guilt.frameNStart = frameN;  // exact frame index
      
      slider_guilt.setAutoDraw(true);
    }

    
    // *text_8* updates
    if (t >= 0.0 && text_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_8.tStart = t;  // (not accounting for frame time here)
      text_8.frameNStart = frameN;  // exact frame index
      
      text_8.setAutoDraw(true);
    }

    
    // *key_guilt* updates
    if (((temp == 1)) && key_guilt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_guilt.tStart = t;  // (not accounting for frame time here)
      key_guilt.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_guilt.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_guilt.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_guilt.clearEvents(); });
    }

    if (key_guilt.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_guilt.getKeys({keyList: ['space'], waitRelease: false});
      _key_guilt_allKeys = _key_guilt_allKeys.concat(theseKeys);
      if (_key_guilt_allKeys.length > 0) {
        key_guilt.keys = _key_guilt_allKeys[_key_guilt_allKeys.length - 1].name;  // just the last key pressed
        key_guilt.rt = _key_guilt_allKeys[_key_guilt_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    if ((slider_guilt.getRating() !== undefined)) {
        temp = 1;
    }
    
    // *text_9* updates
    if (t >= 0.0 && text_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_9.tStart = t;  // (not accounting for frame time here)
      text_9.frameNStart = frameN;  // exact frame index
      
      text_9.setAutoDraw(true);
    }

    
    // *text_17* updates
    if (((temp == 1)) && text_17.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_17.tStart = t;  // (not accounting for frame time here)
      text_17.frameNStart = frameN;  // exact frame index
      
      text_17.setAutoDraw(true);
    }

    
    // *pairing_sub_cur_trial* updates
    if (t >= 0.0 && pairing_sub_cur_trial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_cur_trial.tStart = t;  // (not accounting for frame time here)
      pairing_sub_cur_trial.frameNStart = frameN;  // exact frame index
      
      pairing_sub_cur_trial.setAutoDraw(true);
    }

    
    // *result_cur_trial* updates
    if (t >= 0.0 && result_cur_trial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result_cur_trial.tStart = t;  // (not accounting for frame time here)
      result_cur_trial.frameNStart = frameN;  // exact frame index
      
      result_cur_trial.setAutoDraw(true);
    }

    
    // *time_reminder* updates
    if (t >= 10 && time_reminder.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      time_reminder.tStart = t;  // (not accounting for frame time here)
      time_reminder.frameNStart = frameN;  // exact frame index
      
      time_reminder.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of DV_guiltComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DV_guiltRoutineEnd() {
  return async function () {
    //------Ending Routine 'DV_guilt'-------
    for (const thisComponent of DV_guiltComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('slider_guilt.response', slider_guilt.getRating());
    psychoJS.experiment.addData('slider_guilt.rt', slider_guilt.getRT());
    psychoJS.experiment.addData('key_guilt.keys', key_guilt.keys);
    if (typeof key_guilt.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_guilt.rt', key_guilt.rt);
        routineTimer.reset();
        }
    
    key_guilt.stop();
    // the Routine "DV_guilt" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_share_allKeys;
var DV_sharingComponents;
function DV_sharingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'DV_sharing'-------
    t = 0;
    DV_sharingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    share_slider.reset()
    key_share.keys = undefined;
    key_share.rt = undefined;
    _key_share_allKeys = [];
    if (((((DV !== 1) | (type_trial === 0)) | (type_trial === 4)) | (type_trial === 5))) {
        continueRoutine = false;
    }
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    temp = 0;
    
    result_cur_trial_2.setImage(stipic);
    result_cur_trial_2.setSize(sizeForImage(stipic, 0.08));
    // keep track of which components have finished
    DV_sharingComponents = [];
    DV_sharingComponents.push(share_slider);
    DV_sharingComponents.push(share_text);
    DV_sharingComponents.push(key_share);
    DV_sharingComponents.push(text_29);
    DV_sharingComponents.push(pairing_sub_cur_trial_2);
    DV_sharingComponents.push(result_cur_trial_2);
    DV_sharingComponents.push(time_reminder2);
    
    for (const thisComponent of DV_sharingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DV_sharingRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'DV_sharing'-------
    // get current time
    t = DV_sharingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *share_slider* updates
    if (t >= 0.0 && share_slider.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      share_slider.tStart = t;  // (not accounting for frame time here)
      share_slider.frameNStart = frameN;  // exact frame index
      
      share_slider.setAutoDraw(true);
    }

    
    // *share_text* updates
    if (t >= 0.0 && share_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      share_text.tStart = t;  // (not accounting for frame time here)
      share_text.frameNStart = frameN;  // exact frame index
      
      share_text.setAutoDraw(true);
    }

    
    // *key_share* updates
    if (((temp == 1)) && key_share.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_share.tStart = t;  // (not accounting for frame time here)
      key_share.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_share.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_share.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_share.clearEvents(); });
    }

    if (key_share.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_share.getKeys({keyList: ['space'], waitRelease: false});
      _key_share_allKeys = _key_share_allKeys.concat(theseKeys);
      if (_key_share_allKeys.length > 0) {
        key_share.keys = _key_share_allKeys[_key_share_allKeys.length - 1].name;  // just the last key pressed
        key_share.rt = _key_share_allKeys[_key_share_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    if ((share_slider.getRating() !== undefined)) {
        temp = 1;
    }
    
    
    // *text_29* updates
    if (((temp == 1)) && text_29.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_29.tStart = t;  // (not accounting for frame time here)
      text_29.frameNStart = frameN;  // exact frame index
      
      text_29.setAutoDraw(true);
    }

    
    // *pairing_sub_cur_trial_2* updates
    if (t >= 0.0 && pairing_sub_cur_trial_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_cur_trial_2.tStart = t;  // (not accounting for frame time here)
      pairing_sub_cur_trial_2.frameNStart = frameN;  // exact frame index
      
      pairing_sub_cur_trial_2.setAutoDraw(true);
    }

    
    // *result_cur_trial_2* updates
    if (t >= 0.0 && result_cur_trial_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result_cur_trial_2.tStart = t;  // (not accounting for frame time here)
      result_cur_trial_2.frameNStart = frameN;  // exact frame index
      
      result_cur_trial_2.setAutoDraw(true);
    }

    
    // *time_reminder2* updates
    if (t >= 10 && time_reminder2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      time_reminder2.tStart = t;  // (not accounting for frame time here)
      time_reminder2.frameNStart = frameN;  // exact frame index
      
      time_reminder2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of DV_sharingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DV_sharingRoutineEnd() {
  return async function () {
    //------Ending Routine 'DV_sharing'-------
    for (const thisComponent of DV_sharingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('share_slider.response', share_slider.getRating());
    psychoJS.experiment.addData('share_slider.rt', share_slider.getRT());
    psychoJS.experiment.addData('key_share.keys', key_share.keys);
    if (typeof key_share.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_share.rt', key_share.rt);
        routineTimer.reset();
        }
    
    key_share.stop();
    share_choice.push(share_slider.getRating());
    
    // the Routine "DV_sharing" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_apology_allKeys;
var DV_approach_avoidanceComponents;
function DV_approach_avoidanceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'DV_approach_avoidance'-------
    t = 0;
    DV_approach_avoidanceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    slider_apology.reset()
    key_apology.keys = undefined;
    key_apology.rt = undefined;
    _key_apology_allKeys = [];
    slider_hide.reset()
    if (((((DV !== 2) | (type_trial === 0)) | (type_trial === 4)) | (type_trial === 5))) {
        continueRoutine = false;
    }
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    temp = 0;
    
    result_cur_trial_3.setImage(stipic);
    result_cur_trial_3.setSize(sizeForImage(stipic, 0.08));
    // keep track of which components have finished
    DV_approach_avoidanceComponents = [];
    DV_approach_avoidanceComponents.push(slider_apology);
    DV_approach_avoidanceComponents.push(text_apology);
    DV_approach_avoidanceComponents.push(key_apology);
    DV_approach_avoidanceComponents.push(slider_hide);
    DV_approach_avoidanceComponents.push(text_hide);
    DV_approach_avoidanceComponents.push(text_31);
    DV_approach_avoidanceComponents.push(pairing_sub_cur_trial_3);
    DV_approach_avoidanceComponents.push(result_cur_trial_3);
    DV_approach_avoidanceComponents.push(time_reminder3);
    
    for (const thisComponent of DV_approach_avoidanceComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DV_approach_avoidanceRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'DV_approach_avoidance'-------
    // get current time
    t = DV_approach_avoidanceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *slider_apology* updates
    if (t >= 0.0 && slider_apology.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_apology.tStart = t;  // (not accounting for frame time here)
      slider_apology.frameNStart = frameN;  // exact frame index
      
      slider_apology.setAutoDraw(true);
    }

    
    // *text_apology* updates
    if (t >= 0.0 && text_apology.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_apology.tStart = t;  // (not accounting for frame time here)
      text_apology.frameNStart = frameN;  // exact frame index
      
      text_apology.setAutoDraw(true);
    }

    
    // *key_apology* updates
    if (((temp == 1)) && key_apology.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_apology.tStart = t;  // (not accounting for frame time here)
      key_apology.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_apology.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_apology.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_apology.clearEvents(); });
    }

    if (key_apology.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_apology.getKeys({keyList: ['space'], waitRelease: false});
      _key_apology_allKeys = _key_apology_allKeys.concat(theseKeys);
      if (_key_apology_allKeys.length > 0) {
        key_apology.keys = _key_apology_allKeys[_key_apology_allKeys.length - 1].name;  // just the last key pressed
        key_apology.rt = _key_apology_allKeys[_key_apology_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *slider_hide* updates
    if (t >= 0.0 && slider_hide.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_hide.tStart = t;  // (not accounting for frame time here)
      slider_hide.frameNStart = frameN;  // exact frame index
      
      slider_hide.setAutoDraw(true);
    }

    
    // *text_hide* updates
    if (t >= 0.0 && text_hide.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_hide.tStart = t;  // (not accounting for frame time here)
      text_hide.frameNStart = frameN;  // exact frame index
      
      text_hide.setAutoDraw(true);
    }

    if ((slider_apology.getRating() !== undefined) && (slider_hide.getRating() !== undefined)) {
        temp = 1;
    }
    
    
    // *text_31* updates
    if (((temp == 1)) && text_31.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_31.tStart = t;  // (not accounting for frame time here)
      text_31.frameNStart = frameN;  // exact frame index
      
      text_31.setAutoDraw(true);
    }

    
    // *pairing_sub_cur_trial_3* updates
    if (t >= 0.0 && pairing_sub_cur_trial_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_cur_trial_3.tStart = t;  // (not accounting for frame time here)
      pairing_sub_cur_trial_3.frameNStart = frameN;  // exact frame index
      
      pairing_sub_cur_trial_3.setAutoDraw(true);
    }

    
    // *result_cur_trial_3* updates
    if (t >= 0.0 && result_cur_trial_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result_cur_trial_3.tStart = t;  // (not accounting for frame time here)
      result_cur_trial_3.frameNStart = frameN;  // exact frame index
      
      result_cur_trial_3.setAutoDraw(true);
    }

    
    // *time_reminder3* updates
    if (t >= 20 && time_reminder3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      time_reminder3.tStart = t;  // (not accounting for frame time here)
      time_reminder3.frameNStart = frameN;  // exact frame index
      
      time_reminder3.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of DV_approach_avoidanceComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DV_approach_avoidanceRoutineEnd() {
  return async function () {
    //------Ending Routine 'DV_approach_avoidance'-------
    for (const thisComponent of DV_approach_avoidanceComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('slider_apology.response', slider_apology.getRating());
    psychoJS.experiment.addData('slider_apology.rt', slider_apology.getRT());
    psychoJS.experiment.addData('key_apology.keys', key_apology.keys);
    if (typeof key_apology.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_apology.rt', key_apology.rt);
        routineTimer.reset();
        }
    
    key_apology.stop();
    psychoJS.experiment.addData('slider_hide.response', slider_hide.getRating());
    psychoJS.experiment.addData('slider_hide.rt', slider_hide.getRT());
    // the Routine "DV_approach_avoidance" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_forgiveness_allKeys;
var DV_forgivenessComponents;
function DV_forgivenessRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'DV_forgiveness'-------
    t = 0;
    DV_forgivenessClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    slider_forgiveness.reset()
    key_forgiveness.keys = undefined;
    key_forgiveness.rt = undefined;
    _key_forgiveness_allKeys = [];
    slider_mad.reset()
    if (((((DV !== 3) | (type_trial === 0)) | (type_trial === 4)) | (type_trial === 5))) {
        continueRoutine = false;
    }
    if ((gotValidClick === false)) {
        continueRoutine = false;
    }
    temp = 0;
    
    result_cur_trial_4.setImage(stipic);
    result_cur_trial_4.setSize(sizeForImage(stipic, 0.08));
    // keep track of which components have finished
    DV_forgivenessComponents = [];
    DV_forgivenessComponents.push(slider_forgiveness);
    DV_forgivenessComponents.push(text_forgiveness);
    DV_forgivenessComponents.push(key_forgiveness);
    DV_forgivenessComponents.push(slider_mad);
    DV_forgivenessComponents.push(text_mad);
    DV_forgivenessComponents.push(text_19);
    DV_forgivenessComponents.push(pairing_sub_cur_trial_4);
    DV_forgivenessComponents.push(result_cur_trial_4);
    DV_forgivenessComponents.push(time_reminder4);
    
    for (const thisComponent of DV_forgivenessComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function DV_forgivenessRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'DV_forgiveness'-------
    // get current time
    t = DV_forgivenessClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *slider_forgiveness* updates
    if (t >= 0.0 && slider_forgiveness.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_forgiveness.tStart = t;  // (not accounting for frame time here)
      slider_forgiveness.frameNStart = frameN;  // exact frame index
      
      slider_forgiveness.setAutoDraw(true);
    }

    
    // *text_forgiveness* updates
    if (t >= 0.0 && text_forgiveness.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_forgiveness.tStart = t;  // (not accounting for frame time here)
      text_forgiveness.frameNStart = frameN;  // exact frame index
      
      text_forgiveness.setAutoDraw(true);
    }

    
    // *key_forgiveness* updates
    if (((temp == 1)) && key_forgiveness.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_forgiveness.tStart = t;  // (not accounting for frame time here)
      key_forgiveness.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_forgiveness.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_forgiveness.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_forgiveness.clearEvents(); });
    }

    if (key_forgiveness.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_forgiveness.getKeys({keyList: ['space'], waitRelease: false});
      _key_forgiveness_allKeys = _key_forgiveness_allKeys.concat(theseKeys);
      if (_key_forgiveness_allKeys.length > 0) {
        key_forgiveness.keys = _key_forgiveness_allKeys[_key_forgiveness_allKeys.length - 1].name;  // just the last key pressed
        key_forgiveness.rt = _key_forgiveness_allKeys[_key_forgiveness_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *slider_mad* updates
    if (t >= 0.0 && slider_mad.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_mad.tStart = t;  // (not accounting for frame time here)
      slider_mad.frameNStart = frameN;  // exact frame index
      
      slider_mad.setAutoDraw(true);
    }

    
    // *text_mad* updates
    if (t >= 0.0 && text_mad.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_mad.tStart = t;  // (not accounting for frame time here)
      text_mad.frameNStart = frameN;  // exact frame index
      
      text_mad.setAutoDraw(true);
    }

    if ((slider_forgiveness.getRating() !== undefined) && (slider_mad.getRating() !== undefined)) {
        temp = 1;
    }
    
    // *text_19* updates
    if (t >= 0.0 && text_19.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_19.tStart = t;  // (not accounting for frame time here)
      text_19.frameNStart = frameN;  // exact frame index
      
      text_19.setAutoDraw(true);
    }

    
    // *pairing_sub_cur_trial_4* updates
    if (t >= 0.0 && pairing_sub_cur_trial_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pairing_sub_cur_trial_4.tStart = t;  // (not accounting for frame time here)
      pairing_sub_cur_trial_4.frameNStart = frameN;  // exact frame index
      
      pairing_sub_cur_trial_4.setAutoDraw(true);
    }

    
    // *result_cur_trial_4* updates
    if (t >= 0.0 && result_cur_trial_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      result_cur_trial_4.tStart = t;  // (not accounting for frame time here)
      result_cur_trial_4.frameNStart = frameN;  // exact frame index
      
      result_cur_trial_4.setAutoDraw(true);
    }

    
    // *time_reminder4* updates
    if (t >= 20 && time_reminder4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      time_reminder4.tStart = t;  // (not accounting for frame time here)
      time_reminder4.frameNStart = frameN;  // exact frame index
      
      time_reminder4.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of DV_forgivenessComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DV_forgivenessRoutineEnd() {
  return async function () {
    //------Ending Routine 'DV_forgiveness'-------
    for (const thisComponent of DV_forgivenessComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('slider_forgiveness.response', slider_forgiveness.getRating());
    psychoJS.experiment.addData('slider_forgiveness.rt', slider_forgiveness.getRT());
    psychoJS.experiment.addData('key_forgiveness.keys', key_forgiveness.keys);
    if (typeof key_forgiveness.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_forgiveness.rt', key_forgiveness.rt);
        routineTimer.reset();
        }
    
    key_forgiveness.stop();
    psychoJS.experiment.addData('slider_mad.response', slider_mad.getRating());
    psychoJS.experiment.addData('slider_mad.rt', slider_mad.getRT());
    // the Routine "DV_forgiveness" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var cleaned_share_choice;
var ave_img_endComponents;
function ave_img_endRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ave_img_end'-------
    t = 0;
    ave_img_endClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    console.log(`Before presenting aversive images, show share choice:
    ${share_choice}`
    );
    if (((incompleteTrials.length === 0) || (redo_flag === 1))) {
        continueRoutine = true;
        cleaned_share_choice = function () {
        var _pj_a = [], _pj_b = share_choice;
        for (var _pj_c = 0, _pj_d = _pj_b.length; (_pj_c < _pj_d); _pj_c += 1) {
            var x = _pj_b[_pj_c];
            if ((x !== null)) {
                _pj_a.push(x);
            }
        }
        return _pj_a;
    }
    .call(this);
        share_choice_mean = (util.sum(cleaned_share_choice) / cleaned_share_choice.length);
        console.log(`share choice mean is:${share_choice_mean}`);
    } else {
        continueRoutine = false;
        share_choice_mean = 0;
    }
    
    // keep track of which components have finished
    ave_img_endComponents = [];
    ave_img_endComponents.push(text_4);
    ave_img_endComponents.push(ave_img2);
    ave_img_endComponents.push(text_5);
    
    for (const thisComponent of ave_img_endComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function ave_img_endRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ave_img_end'-------
    // get current time
    t = ave_img_endClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_4* updates
    if (t >= 0.0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index
      
      text_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_4.setAutoDraw(false);
    }
    
    // *ave_img2* updates
    if (t >= 4 && ave_img2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ave_img2.tStart = t;  // (not accounting for frame time here)
      ave_img2.frameNStart = frameN;  // exact frame index
      
      ave_img2.setAutoDraw(true);
    }

    frameRemains = 4 + share_choice_mean - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ave_img2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      ave_img2.setAutoDraw(false);
    }
    
    // *text_5* updates
    if (t >= 4 && text_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_5.tStart = t;  // (not accounting for frame time here)
      text_5.frameNStart = frameN;  // exact frame index
      
      text_5.setAutoDraw(true);
    }

    frameRemains = 4 + share_choice_mean - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_5.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ave_img_endComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ave_img_endRoutineEnd() {
  return async function () {
    //------Ending Routine 'ave_img_end'-------
    for (const thisComponent of ave_img_endComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "ave_img_end" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var check_incompleteComponents;
function check_incompleteRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'check_incomplete'-------
    t = 0;
    check_incompleteClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(8.000000);
    // update component parameters for each repeat
    if ((incompleteTrials.length === 0)) {
        continueRoutine = true;
    } else {
        continueRoutine = false;
    }
    
    // Add into data
    //psychoJS.experiment.addData('incompleteTrials', incompleteTrials);
    
    // keep track of which components have finished
    check_incompleteComponents = [];
    check_incompleteComponents.push(text_11);
    
    for (const thisComponent of check_incompleteComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function check_incompleteRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'check_incomplete'-------
    // get current time
    t = check_incompleteClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_11* updates
    if (t >= 0.0 && text_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_11.tStart = t;  // (not accounting for frame time here)
      text_11.frameNStart = frameN;  // exact frame index
      
      text_11.setAutoDraw(true);
    }

    frameRemains = 0.0 + 8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_11.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_11.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of check_incompleteComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_incompleteRoutineEnd() {
  return async function () {
    //------Ending Routine 'check_incomplete'-------
    for (const thisComponent of check_incompleteComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if ((incompleteTrials.length === 0)) {
        // all trails are completed. End of the experiment
        return quitPsychoJS('Experiment 1 completed. Goodbye!', true);
    }
    return Scheduler.Event.NEXT;
  };
}


var redo_flag;
var check_redoComponents;
function check_redoRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'check_redo'-------
    t = 0;
    check_redoClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    redo_flag = 1;
    
    // keep track of which components have finished
    check_redoComponents = [];
    
    for (const thisComponent of check_redoComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function check_redoRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'check_redo'-------
    // get current time
    t = check_redoClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of check_redoComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_redoRoutineEnd() {
  return async function () {
    //------Ending Routine 'check_redo'-------
    for (const thisComponent of check_redoComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "check_redo" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var endComponents;
function endRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'end'-------
    t = 0;
    endClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(8.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    endComponents = [];
    endComponents.push(text_13);
    
    for (const thisComponent of endComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function endRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'end'-------
    // get current time
    t = endClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_13* updates
    if (t >= 0.0 && text_13.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_13.tStart = t;  // (not accounting for frame time here)
      text_13.frameNStart = frameN;  // exact frame index
      
      text_13.setAutoDraw(true);
    }

    frameRemains = 0.0 + 8 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_13.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_13.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of endComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function endRoutineEnd() {
  return async function () {
    //------Ending Routine 'end'-------
    for (const thisComponent of endComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }

  psychoJS.experiment.experimentEnded = true;

  try {
    await saveExperimentResults();
    console.log('Data saved successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    if (isCompleted) {
      const proceed = confirm(
        'Warning: There was an error saving your data. Continue to the next task anyway?'
      );
      if (!proceed) {
        psychoJS.gui.dialog({error: 'Could not save data. Please contact the researcher.'});
        return Scheduler.Event.QUIT;
      }
    } else {
      psychoJS.gui.dialog({error: 'Could not save data. Please contact the researcher.'});
      return Scheduler.Event.QUIT;
    }
  }

  try {
    psychoJS._scheduler.stop();
    psychoJS.window.close();
    if (psychoJS._window && typeof psychoJS._window.closeFullScreen === 'function') {
      psychoJS._window.closeFullScreen();
    }
  } catch (cleanupError) {
    console.warn('Cleanup error:', cleanupError);
  }

  if (isCompleted) {
    window.location.href = getNextTaskUrl();
  } else if (message) {
    window.alert(message);
  }

  return Scheduler.Event.QUIT;
}
