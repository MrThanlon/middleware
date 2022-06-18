module.exports = {
    roots: ["<rootDir>"],
    transform: {
      "^.+\\.tsx?$": "ts-jest" //The transform config just tells jest to use ts-jest for ts / tsx files.
    }
  };