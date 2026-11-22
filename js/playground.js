/**
 * Interactive Gemini Prompt & Agent Playground Simulation
 * Demonstrates Pratap Varma's Prompt Engineering, AI Agent, and LLM pipeline skills.
 */

(function () {
  const terminal = document.getElementById('playground-output');
  const buttons = document.querySelectorAll('.prompt-pill-btn');
  if (!terminal || !buttons.length) return;

  const SCENARIOS = {
    attendance: {
      prompt: "PROMPT: Analyze current attendance: Total classes: 84, Attended: 62 (73.8%). Target: 75%. Calculate remaining requirement and skippable threshold.",
      agentLog: [
        "[Agent Core]: Ingesting student academic profile...",
        "[Math Engine]: Current = 62 / 84 = 73.81%",
        "[Target Check]: Gap = 75.00% - 73.81% = -1.19% [BELOW SAFE THRESHOLD]",
        "[Solver]: Formula: (62 + x) / (84 + x) >= 0.75  =>  x >= 4 classes required.",
        "[Forecast Result]:",
        "  - Status: ⚠️ In Danger Zone (< 75%)",
        "  - Consecutive Classes Required: 4 classes without absence",
        "  - Skippable Buffer: 0 classes (Leaves on freeze until threshold reached)",
        "  - Projected Percentage after 4 wins: 75.00% (66 / 88)"
      ]
    },
    disease: {
      prompt: "PROMPT: Vision analysis on leaf sample: Chlorotic lesion patterns on tomato foliage, concentric rings, humidity 82%.",
      agentLog: [
        "[CNN Layer]: Feature maps extracted from 256x256 tensor...",
        "[Inference]: High-activation filter matches: 'Early Blight' (Alternaria solani)",
        "[Confidence]: 96.4% confidence score",
        "[Gemini Advisory Agent]: Generating treatment protocol...",
        "  - Diagnosis: Tomato Early Blight (Alternaria solani)",
        "  - Symptoms: Brown concentric target-spot lesions on lower foliage",
        "  - Organic Remediation: Apply copper-based fungicide or Bacillus subtilis spray",
        "  - Weather Advisory: High ambient humidity detected (82%). Avoid overhead irrigation!"
      ]
    }
  };

  let typingTimeout = null;

  function streamOutput(lines, index = 0) {
    if (index >= lines.length) {
      terminal.innerHTML += `<div style="margin-top:10px; color:#10b981; font-weight:600;">✦ Execution Complete · Latency: 210ms · Model: Gemini Pro Engine</div>`;
      terminal.scrollTop = terminal.scrollHeight;
      return;
    }

    const line = lines[index];
    const isHeader = line.startsWith('PROMPT:');
    const color = isHeader ? '#ff7e95' : (line.includes('⚠️') || line.includes('🚨') ? '#fbbf24' : '#a5b4fc');
    
    terminal.innerHTML += `<div style="color:${color}; margin-bottom:4px;">${line}</div>`;
    terminal.scrollTop = terminal.scrollHeight;

    typingTimeout = setTimeout(() => {
      streamOutput(lines, index + 1);
    }, 110);
  }

  function runScenario(key) {
    if (typingTimeout) clearTimeout(typingTimeout);
    const scenario = SCENARIOS[key];
    if (!scenario) return;

    terminal.innerHTML = `<div style="color:#00f2fe; margin-bottom:8px;">[Initializing Pratap's AI Reasoning Pipeline...]</div>`;
    
    setTimeout(() => {
      streamOutput([scenario.prompt, ...scenario.agentLog]);
    }, 200);
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const scenarioKey = btn.getAttribute('data-scenario');
      runScenario(scenarioKey);
    });
  });

  // Run initial scenario
  runScenario('attendance');
})();
