/* eslint max-len: 0 */
const _ = require('lodash');
const run = require('../helpers/run');

const tests = [
  {
    input: {
      file: _.cloneDeep(require('../sampleData/media/sampleH264_1.json')),
      librarySettings: {},
      inputs: {
      },
      otherArguments: {},
    },
    output: {
      processFile: false,
      error: false,
      preset: '',
      container: '.mp4',
      handBrakeMode: false,
      FFmpegMode: true,
      reQueueAfter: false,
      infoLog: 'No subs in file, skipping!\n',
    },
  },
  {
    input: {
      file: _.cloneDeep(require('../sampleData/media/sampleH264_2.json')),
      librarySettings: {},
      inputs: {
        extract: true,
      },
      otherArguments: {},
    },
    output: {
      processFile: false,
      error: true,
      preset: '',
      container: '.mkv',
      handBrakeMode: false,
      FFmpegMode: true,
      reQueueAfter: false,
      infoLog: 'Please configure language. Skipping this plugin. \n',
    },
  },
  {
    input: {
      file: _.cloneDeep(require('../sampleData/media/sampleH264_2.json')),
      librarySettings: {},
      inputs: {
        language: 'eng',
      },
      otherArguments: {
        originalLibraryFile: _.cloneDeep(require('../sampleData/media/sampleH264_2.json')),
      },
    },
    output: {
      processFile: true,
      error: false,
      preset: '-y <io> -map 0 -c copy -map -0:6',
      container: '.mkv',
      handBrakeMode: false,
      FFmpegMode: true,
      reQueueAfter: false,
      infoLog: 'Found subs!\n'
      + 'Text stream 6: fre. Stream is unwanted, removing. \n',
    },
  },
];

void run(tests);
