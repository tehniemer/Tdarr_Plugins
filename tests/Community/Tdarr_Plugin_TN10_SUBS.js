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
        rm_extra_lang: 'true',
      },
      otherArguments: {},
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
      + 'Text stream 6: fre Stream is unwanted, removing. \n',
    },
  },
  {
    input: {
      file: (() => {
        const file = _.cloneDeep(require('../sampleData/media/sampleH264_3.json'));
        file.ffProbeData.streams[7].disposition.forced = 1;
        return file;
      })(),
      librarySettings: {},
      inputs: {
        language: 'fre',
        extract: 'true',
        rm_extra_lang: 'true',
      },
      otherArguments: {},
    },
    output: {
      processFile: true,
      error: false,
      preset: '-y <io> -map 0:7 "C:/Transcode/Source Folder/h264.fre.forced.srt" -map 0 -c copy -map -0:6',
      container: '.mkv',
      handBrakeMode: false,
      FFmpegMode: true,
      reQueueAfter: false,
      infoLog: 'Found subs!\n'
      + 'Text stream 6: en Stream is unwanted, removing. \n'
      + 'Text stream 7: fre.forced Stream will be copied. Stream will be extracted to file. \n',
    },
  },
];

void run(tests);
