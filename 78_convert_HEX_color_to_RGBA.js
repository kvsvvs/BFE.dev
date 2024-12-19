function hexToRgb(hex) {
    if (typeof hex !== 'string' || !/^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})([a-fA-F0-9]{2})?$/.test(hex)) {
      throw new Error('Invalid hexadecimal color format');
    }
  
    if (hex.length === 4 || hex.length === 5) {
      hex = '#' + [...hex.slice(1)].map(char => char + char).join('');
    }
  
    const rgb = hex.slice(1, 7);
    const alphaHex = hex.slice(7);
    const r = parseInt(rgb.slice(0, 2), 16);
    const g = parseInt(rgb.slice(2, 4), 16);
    const b = parseInt(rgb.slice(4, 6), 16);
  
    let alpha = alphaHex ? parseInt(alphaHex, 16) / 255 : 1;
    alpha = Math.round(alpha * 100) / 100; // Round to 2 decimal places
  
    return `rgba(${r},${g},${b},${alpha})`;
  }
  
  // Test cases
  console.log(hexToRgb('#fff'));               // 'rgba(255,255,255,1)'
  console.log(hexToRgb('#ffffff'));            // 'rgba(255,255,255,1)'
  console.log(hexToRgb('#123456'));            // 'rgba(18,52,86,1)'
  console.log(hexToRgb('#123'));               // 'rgba(17,34,51,1)'
  console.log(hexToRgb('#ff573300'));          // 'rgba(255,87,51,0)'
  console.log(hexToRgb('#ff573380'));          // 'rgba(255,87,51,0.5)'
  console.log(hexToRgb('#1234'));              // 'rgba(17,34,51,0.27)'
  
  // Invalid inputs
  try {
    console.log(hexToRgb('123'));              // Throws error
  } catch (err) {
    console.error(err.message);
  }
  try {
    console.log(hexToRgb('#zzz'));             // Throws error
  } catch (err) {
    console.error(err.message);
  }
  