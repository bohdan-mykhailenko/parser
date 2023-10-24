const getParsedCharacteristics = (characteristics) => {
  const parsedData = {};

  const screenResolutionMatch = characteristics.match(/екран:\s(.*?)\s•/);
  if (screenResolutionMatch) {
    parsedData.screen_resolution = screenResolutionMatch[1].trim();
  }

  const screenTypeMatch = characteristics.match(/екран:\s(.*?)\s•\s(.*?)\s•/);
  if (screenTypeMatch) {
    parsedData.screen_resolution = screenTypeMatch[1].trim();
    parsedData.screen_type = screenTypeMatch[2].trim();
  }

  const processorMatch = characteristics.match(/процесор:\s(.*?)\s•/);
  if (processorMatch) {
    parsedData.processor = processorMatch[1].trim();
  }

  const osMatch = characteristics.match(/ОС:\s(.*?)\s•/);
  if (osMatch) {
    parsedData.os = osMatch[1].trim();
  }

  const accumulatorMatch = characteristics.match(/акумулятор:\s(\d+)\sмАгод/);
  if (accumulatorMatch) {
    parsedData.accumulator = accumulatorMatch[1];
  }

  const cameraMatches = characteristics.match(/камера:\s(\d+\s\(.*?\))\sМп/g);
  if (cameraMatches) {
    const cameraResolutions = cameraMatches.map(match => {
      const resolutionMatches = match.match(/(\d+)\s\(.*?\)/g);

      if (resolutionMatches) {
        return resolutionMatches.map(resolution => resolution.replace(/\s\(.*\)/, '') + 'Мп').join(', ');
      }
    });

    parsedData.camera = cameraResolutions.join('\n');
  }

  const nfcMatch = characteristics.match(/NFC:\s\+/);
  if (nfcMatch) {
    parsedData.nfc = nfcMatch ? 'Yes' : 'No';
  }

  return parsedData;
}

module.exports = parseCharacteristics;