import jsConfuser from 'js-confuser'; // Import jsConfuser module

document.addEventListener('DOMContentLoaded', function () {
  const obfuscateButton = document.getElementById('obfuscate-button');
  const fileUpload = document.getElementById('file-upload');
  const obfuscationLevel = document.getElementById('obfuscation-level');
  const outputSection = document.getElementById('output-section');
  const obfuscatedBody = document.getElementById('obfuscated-body');
  const downloadBtn = document.getElementById('download-btn');
  const copyBtn = document.getElementById('copy-btn');

  obfuscateButton.addEventListener('click', function () {
    const file = fileUpload.files[0];
    if (!file) {
      alert('Please upload a JavaScript file');
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const code = e.target.result;
      const level = obfuscationLevel.value;

      let options = {};

      if (level === 'advanced') {
        options = {
          target: 'node',
          preset: 'high',
          calculator: 1,
          compact: true,
          hexadecimalNumbers: true,
          controlFlowFlattening: 1,
          deadCode: 1,
          dispatcher: true,
          duplicateLiteralsRemoval: 1,
          flatten: true,
          globalConcealing: true,
          identifierGenerator: 'randomized',
          minify: true,
          movedDeclarations: true,
          objectExtraction: true,
          opaquePredicates: 1,
          renameVariables: true,
          renameGlobals: true,
          shuffle: { hash: 1, true: 1 },
          stack: 1,
          stringConcealing: true,
          stringCompression: true,
          stringEncoding: 1,
          stringSplitting: true,
          rgf: false
        };
      }

      try {
        const obfuscatedCode = jsConfuser.obfuscate(code, options).getObfuscatedCode();
        displayObfuscatedCode(obfuscatedCode);
      } catch (error) {
        alert('Error obfuscating code: ' + error.message);
      }
    };
    reader.readAsText(file);
  });

  function displayObfuscatedCode(obfuscatedCode) {
    const row = document.createElement('tr');
    const indexCell = document.createElement('td');
    indexCell.textContent = '1';
    const codeCell = document.createElement('td');
    codeCell.textContent = obfuscatedCode;

    row.appendChild(indexCell);
    row.appendChild(codeCell);
    obfuscatedBody.appendChild(row);

    outputSection.classList.remove('hidden');

    downloadBtn.addEventListener('click', function () {
      const blob = new Blob([obfuscatedCode], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'obfuscated_code.js';
      link.click();
    });

    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(obfuscatedCode).then(function () {
        alert('Code copied to clipboard');
      });
    });
  }
});
